// vistasController.js
const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        // Consulta para obtener datos de la primera vista
        conn.query('SELECT * FROM vista_pedidos_con_clientes', (err, pedidosConClientes) => {
            if (err) {
                res.json(err);
            }

            // Consulta para obtener datos de la segunda vista
            conn.query('SELECT * FROM vista_detalles_productos_en_pedidos', (err, detallesProductosEnPedidos) => {
                if (err) {
                    res.json(err);
                }

                // Combina los resultados en un solo objeto de datos
                const data = {
                    pedidosConClientes: pedidosConClientes,
                    detallesProductosEnPedidos: detallesProductosEnPedidos
                };

                // Renderiza la vista "vistas.ejs" con los datos combinados
                res.render('vistas', { data: data });
            });
        });
    });
};

module.exports = controller;
