// proceduresController.js
const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).json(err);
        }

        // Consulta para obtener los clientes
        conn.query('SELECT id, name FROM customer', (err, customer) => {
            if (err) {
                return res.status(500).json(err);
            }

            // Consulta para obtener las órdenes
            conn.query('SELECT order_id, customer_id FROM orders', (err, orders) => {
                if (err) {
                    return res.status(500).json(err);
                }

                // Combinar los datos de órdenes y clientes en un formato adecuado
                const ordersWithCustomerNames = orders.map(order => ({
                    order_id: order.order_id,
                    customer_id: order.customer_id,
                    // Aquí puedes buscar el nombre del cliente correspondiente
                    // y asignarlo a una propiedad, por ejemplo, customer_name
                    customer_name: findCustomerName(customer, order.customer_id),
                }));

                res.render('procedures', { customer: customer, orders: ordersWithCustomerNames });
            });
        });
    });
};

// Función para encontrar el nombre del cliente por su ID
function findCustomerName(customers, customerId) {
    const customer = customers.find(c => c.id === customerId);
    return customer ? customer.name : 'Cliente Desconocido';
}


controller.calculateTotal = (req, res) => {
    const clienteID = req.query.clienteID;

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).json({ error: 'Error en la conexión a la base de datos' });
        }

        conn.query('CALL CalcularTotalPedidosCliente(?, @TotalPedidos)', [clienteID], (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al llamar al procedimiento almacenado' });
            }

            conn.query('SELECT @TotalPedidos AS TotalPedidos', (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al recuperar el resultado' });
                }

                const totalPedidos = results[0].TotalPedidos;
                res.send({
                    totalPedidos: totalPedidos
                });
            });
        });
    });
};

controller.detallesPedido = (req, res) => {
    const pedidoID = req.query.pedidoID;

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).json({ error: 'Error en la conexión a la base de datos' });
        }

        conn.query('CALL DetallesPedido(?)', [pedidoID], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error al llamar al procedimiento almacenado' });
            }

            const detallesPedido = results[0]; // Supongo que los resultados del procedimiento se encuentran en results[0]

            res.send({
                detallesPedido: detallesPedido
            });
        });
    });
};

module.exports = controller;
