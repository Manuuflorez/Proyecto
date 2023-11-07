//orderController.js
const controller = {};

// Controlador para listar órdenes
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).json(err);
        }

        // Consulta para obtener las órdenes
        conn.query('SELECT * FROM orders', (err, orders) => {
            if (err) {
                return res.status(500).json(err);
            }

            // Consulta para obtener los clientes
            conn.query('SELECT id, name FROM customer', (err, customer) => {
                if (err) {
                    return res.status(500).json(err);
                }

                // Consulta para obtener los productos
                conn.query('SELECT product_id, product_name, unit_price FROM products', (err, products) => {
                    if (err) {
                        return res.status(500).json(err);
                    }

                    res.render('orders', {
                        data: orders,
                        customer: customer,
                        products: products
                    });
                });
            });
        });
    });
};

// Mostrar formulario de creación de órdenes
controller.create = (req, res) => {
    res.render('order_create');
};

// Guardar una nueva orden
controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        if (err) {
            return res.json(err);
        }

        conn.query('INSERT INTO orders SET ?', [data], (err, order) => {
            if (err) {
                return res.json(err);
            }

            res.redirect('/orders');
        });
    });
};

// Eliminar una orden
controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).json(err);
        }

        conn.query('DELETE FROM orders WHERE order_id = ?', [id], (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.redirect('/orders');
        });
    });
};

module.exports = controller;
