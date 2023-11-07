const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            res.json(err);
            return;
        }

        // Consulta para obtener datos de los tres joins
        const query = `
            SELECT 
                o.order_id AS ID_Pedido, 
                c.name AS Nombre_Cliente, 
                o.order_date AS Fecha_Pedido, 
                p.product_name AS Producto, 
                p.unit_price AS Precio_Unitario, 
                o.total_amount AS Total 
            FROM orders o 
            INNER JOIN customer c ON o.customer_id = c.id 
            INNER JOIN products p ON o.product_id = p.product_id
            UNION
            SELECT 
                NULL AS ID_Pedido, 
                c.name AS Nombre_Cliente, 
                NULL AS Fecha_Pedido, 
                NULL AS Producto, 
                SUM(o.total_amount) AS Precio_Unitario, 
                SUM(o.total_amount) AS Total 
            FROM customer c 
            LEFT JOIN orders o ON c.id = o.customer_id 
            GROUP BY c.name
            UNION
            SELECT 
                NULL AS ID_Pedido, 
                NULL AS Nombre_Cliente, 
                NULL AS Fecha_Pedido, 
                p.product_name AS Producto, 
                NULL AS Precio_Unitario, 
                COUNT(o.order_id) AS Total 
            FROM products p 
            LEFT JOIN orders o ON p.product_id = o.product_id
            GROUP BY p.product_name
        `;

        conn.query(query, (err, result) => {
            if (err) {
                res.json(err);
                return;
            }

            // Divide los resultados en tres grupos
            const data = {
                pedidosConClientes: result.filter((item) => item.ID_Pedido !== null),
                resumenClientes: result.filter((item) => item.ID_Pedido === null && item.Producto === null),
                resumenProductos: result.filter((item) => item.ID_Pedido === null && item.Nombre_Cliente === null)
            };

            // Renderiza la vista "joins.ejs" con los datos divididos
            res.render('joins', { data: data });
        });
    });
};

module.exports = controller;
