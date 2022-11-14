const conn = require('../../config/database');

module.exports = (app) => {

        // ********* DEPARTAMENTOS ************


    //se usa para consultar departamentos
    app.get('/dep/:id', (req, res) => {
        let query = `SELECT * FROM sagemedicinebd.departamento WHERE id_departamento='${req.params.id}'`;
        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en Base de Datos", datos: []});
            }else{
                res.json(filas);
            }
        });
    });
    //se usa para consultar todos los departamentos
    app.get('/dep', (req, res) => {
        let query = `SELECT * FROM sagemedicinebd.departamento`;
        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en Base de Datos", datos: [error.message]});
            }else{
                res.json(filas);
            }
        });
    });


    // ********* MUNICIPIOS ************

    //se usa para consultar municipios
    app.get('/muni/:id', (req, res) => {
        let query = `SELECT * FROM sagemedicinebd.municipios WHERE id_departamento='${req.params.id}'`;
        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en Base de Datos", datos: []});
            }else{
                res.json(filas);
            }
        });
    });

    //se usa para consultar municipios
    app.get('/munis/:id', (req, res) => {
        let query = `SELECT * FROM sagemedicinebd.municipios WHERE id_municipio='${req.params.id}'`;
        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en Base de Datos", datos: []});
            }else{
                res.json(filas);
            }
        });
    });

    //se usa para consultar todos los municipios
    app.get('/muni', (req, res) => {
        let query = `SELECT * FROM sagemedicinebd.municipios`;
        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en Base de Datos", datos: [error.message]});
            }else{
                res.json(filas);
            }
        });
    });
}