const controller = {};

// Listar productos
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.json(err);
        }

        conn.query('SELECT * FROM products', (err, products) => {
            if (err) {
                return res.json(err);
            }

            res.render('products', {
                data: products
            });
        });
    });
};

// Mostrar formulario de creación de producto
controller.create = (req, res) => {
    res.render('product_create');
};

// Guardar un nuevo producto
controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        if (err) {
            return res.json(err);
        }

        conn.query('INSERT INTO products SET ?', [data], (err, product) => {
            if (err) {
                return res.json(err);
            }

            res.redirect('/products');
        });
    });
};

// Mostrar formulario de edición de producto
controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        if (err) {
            return res.json(err);
        }

        conn.query('SELECT * FROM products WHERE product_id = ?', [id], (err, product) => {
            if (err) {
                return res.json(err);
            }

            res.render('product_edit', {
                data: product[0]
            });
        });
    });
};

// Actualizar un producto
controller.update = (req, res) => {
    const { id } = req.params;
    const newProduct = req.body;
    req.getConnection((err, conn) => {
        if (err) {
            return res.json(err);
        }

        conn.query('UPDATE products SET ? WHERE product_id = ?', [newProduct, id], (err, rows) => {
            if (err) {
                return res.json(err);
            }

            res.redirect('/products');
        });
    });
};

// Eliminar un producto
controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        if (err) {
            return res.json(err);
        }

        conn.query('DELETE FROM products WHERE product_id = ?', [id], (err, rows) => {
            if (err) {
                return res.json(err);
            }

            res.redirect('/products');
        });
    });
};

module.exports = controller;
