// functionsController.js
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

            res.render('functions', { customer: customer, totalPedidos: null });
        });
    });
};

controller.calculateTotal = (req, res) => {
    const clienteID = req.query.clienteID;

    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).json({ error: 'Error en la conexión a la base de datos' });
        }

        conn.query('SELECT CalcularTotalPedidosCliente(?) AS totalPedidos', [clienteID], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error al llamar a la función' });
            }

            const totalPedidos = results[0].totalPedidos;
            res.send({
                totalPedidos: totalPedidos
            });
        });
    });
};

controller.productoMasComprado = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).json({ error: 'Error en la conexión a la base de datos' });
        }

        conn.query('SELECT ProductoMasComprado() AS productoMasComprado', (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error al llamar a la función' });
            }

            const productoMasComprado = results[0].productoMasComprado;
            res.send({
                productoMasComprado: productoMasComprado
            });
        });
    });
};

module.exports = controller;
