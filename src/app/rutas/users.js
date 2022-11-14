const conn = require('../../config/database');

module.exports = (app) => {
    //se usa para actualizar usuarios
    app.post('/users/:id', (req, res) => {
        let query =

        `UPDATE sagemedicinebd.usuarios
        SET telefono = '${req.body.telefono}'
        WHERE id_usuario='${req.params.id}'`;

        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en Base de Datos", datos: []});
            }else{
                res.json({status: 1, mensaje: "Usuario actualizado en DB", datos: []});
            }
        });
    });
    //se usa para consultar usuarios
    app.get('/users/:id', (req, res) => {
        let query = `SELECT * FROM sagemedicinebd.usuarios WHERE id_usuario='${req.params.id}'`;
        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en Base de Datos", datos: [error.message]});
            }else{
                res.json(filas);
            }
        });
    });
    //se usa para consultar todos los usuarios
    app.get('/users', (req, res) => {
        let query = `SELECT * FROM sagemedicinebd.usuarios`;
        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en Base de Datos", datos: [error.message]});
            }else{
                res.json(filas);
            }
        });
    });
    //se usa para insertar un usuario
    app.post('/users', (req, res) => {
        //{nombre: "..", apellido: ".." etc.. }
        let query =
        `INSERT INTO
        sagemedicinebd.usuarios (
            id_usuario,
            dpi,
            email,
            telefono,
            nombre,
            fecha_registro,
            fecha_nacimiento,
            direccion,
            id_municipio)
        VALUES (
                '${req.body.id_usuario}',
                '${req.body.dpi}',
                '${req.body.email}',
                '${req.body.telefono}',
                '${req.body.nombre}',
                '${req.body.fecha_registro}',
                '${req.body.fecha_nacimiento}',
                '${req.body.direccion}',
                '${req.body.id_municipio}')`;

        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en DB", datos: []});
            }else{
                res.json({status: 1, mensaje: "Usuario insertado en DB", datos: []});
            }
        });
    });
}