CREATE DATABASE proyecto;

USE proyecto;

-- Crear la tabla de clientes   
    CREATE TABLE customer(
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        address VARCHAR(100) NOT NULL,
        phone VARCHAR(15)
    );


-- Crear la tabla de pedidos
    CREATE TABLE orders (
        order_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        customer_id INT(6) UNSIGNED,
        order_date DATE,
        total_amount DECIMAL(10, 2),
        product_id INT(6) UNSIGNED,
        quantity INT,
        FOREIGN KEY (customer_id) REFERENCES customer(id)
    );


-- Crear la tabla de productos
    CREATE TABLE products (
        product_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        product_name VARCHAR(50) NOT NULL,
        unit_price DECIMAL(10, 2) NOT NULL
    );
    

-- Insertar datos de clientes
    INSERT INTO customer (name, address, phone)
    VALUES
        ('Juan Pérez', 'Calle 123', '555-1234'),
        ('María López', 'Avenida 789', '555-5678'),
        ('Carlos García', 'Carrera 456', '555-9876');


-- Insertar datos de productos
    INSERT INTO products (product_name, unit_price)
    VALUES
        ('Camiseta', 20000),
        ('Pantalones', 35500),
        ('Zapatos', 60000);


-- Insertar datos de pedidos
    INSERT INTO orders (customer_id, order_date, total_amount, product_id, quantity)
    VALUES
        (1, '2023-01-15', 100.00, 1, 2),
        (1, '2023-02-20', 150.50, 2, 3),
        (2, '2023-03-10', 75.25, 3, 1);


--Vista 1: Detalles de Pedidos con Información del Cliente (JOIN entre "orders" y "customer"): 
--Esta vista combina información de pedidos y clientes.
    CREATE VIEW vista_pedidos_con_clientes AS
    SELECT o.order_id AS ID_Pedido, c.name AS Nombre_Cliente, o.order_date AS Fecha_Pedido, o.total_amount AS Total
    FROM orders o
    INNER JOIN customer c ON o.customer_id = c.id;


--Vista 2: Detalles de Productos en Pedidos (JOIN entre "orders" y "products")
--Esta vista muestra detalles de productos en pedidos.
    CREATE VIEW vista_detalles_productos_en_pedidos AS
    SELECT o.order_id AS ID_Pedido, p.product_name AS producto, o.quantity AS cantidad
    FROM orders o
    INNER JOIN products p ON o.product_id = p.product_id;


--Procedimiento Almacenado 1: Obtener los Detalles de un Pedido
    CREATE PROCEDURE DetallesPedido(
        IN PedidoID INT
    )
    BEGIN
        SELECT o.order_id AS ID_Pedido, c.name AS Nombre_Cliente, o.order_date AS Fecha_Pedido, o.total_amount AS Total
        FROM orders o
        INNER JOIN customer c ON o.customer_id = c.id
        WHERE o.order_id = PedidoID;
    END

    CALL DetallesPedido(12);

--Procedimiento Almacenado  2: Calcular el Total de Pedidos de un Cliente
    CREATE PROCEDURE CalcularTotalPedidosCliente(
        IN ClienteID INT,
        OUT TotalPedidos INT
    )
    BEGIN
        SELECT COUNT(order_id) INTO TotalPedidos
        FROM orders
        WHERE customer_id = ClienteID;
    END

    CALL CalcularTotalPedidosCliente(11, @TotalPedidos);

    SELECT @TotalPedidos;


--Trigger 1: Seguimiento de las actualizaciones en la tabla customer
    CREATE TABLE customerUpdate (
        update_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        customer_id INT(6) UNSIGNED,
        action VARCHAR(10),
        action_date TIMESTAMP
    );

    CREATE TRIGGER customerUpdate_trigger
    AFTER UPDATE ON customer
    FOR EACH ROW
    BEGIN
        INSERT INTO customerUpdate (customer_id, action, action_date)
        VALUES (NEW.id, 'UPDATE', NOW());
    END;


--Trigger 2: Actualiza la columna `total_amount` en la tabla `customer`
    CREATE TRIGGER update_customer_total_amount
    AFTER UPDATE ON orders
    FOR EACH ROW
    BEGIN
    UPDATE customer
    SET total_amount = NEW.total_amount
    WHERE id = NEW.customer_id;
    END;


--Funcion avanzada 1: Calcular la suma de los montos totales de pedidos para ese cliente 
    SET GLOBAL log_bin_trust_function_creators = 1;

    CREATE FUNCTION CalcularTotalPedidosCliente(clienteID INT) RETURNS DECIMAL(10, 2)
    BEGIN
        DECLARE total DECIMAL(10, 2);
        
        SELECT SUM(total_amount) INTO total
        FROM orders
        WHERE customer_id = clienteID;
        
        RETURN total;
    END;

--Fncion avanzada 2: Calcular cuál es el producto que más compran los clientes
    CREATE FUNCTION ProductoMasComprado() RETURNS VARCHAR(50)
    BEGIN
        DECLARE productoMasComprado VARCHAR(50);
        
        SELECT p.product_name
        INTO productoMasComprado
        FROM products p
        JOIN (
            SELECT o.product_id, SUM(o.total_amount) AS totalComprado
            FROM orders o
            GROUP BY o.product_id
            ORDER BY totalComprado DESC
            LIMIT 1
        ) AS subquery ON p.product_id = subquery.product_id;
        
        RETURN productoMasComprado;
    END;
