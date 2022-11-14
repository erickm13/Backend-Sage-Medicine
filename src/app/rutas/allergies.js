const conn = require('../../config/database');

module.exports = (app) => {

        // ********* Alergias************


    //se usa para consultar alergia
    app.get('/alergias/:tipo', (req, res) => {
        let query = `SELECT * FROM sagemedicinebd.alergias WHERE tipo='${req.params.tipo}'`;
        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en Base de Datos", datos: [error.message]});
            }else{
                res.json(filas);
            }
        });
    });
    //se usa para consultar todas las alergias
    app.get('/alergias', (req, res) => {
        let query = `SELECT * FROM sagemedicinebd.alergias`;
        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en Base de Datos", datos: [error.message]});
            }else{
                res.json(filas);
            }
        });
    });

	//se usa para asignar ealergias a usuarios
    app.post('/asignar-alergia', (req, res) => {
        let query =
		`INSERT INTO sagemedicinebd.asigna_alergias (
			id_alergias,
			id_usuario)
			VALUES (
				'${req.body.id_alergias}',
				'${req.body.id_usuario}'
				)`;

        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en Base de Datos", datos: [error.message]});
            }else{
                res.json({status: 0, mensaje: "Se asigno la alergia al usuario", datos: []});
            }
        });
    });

	//se usa para listar alergias de usuarios
    app.get('/usuario-alergia', (req, res) => {
        let query =
		`SELECT *
		FROM sagemedicinebd.asigna_alergias
		WHERE
		id_usuario = '${req.body.id_usuario}'`;

        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en Base de Datos", datos: [error.message]});
            }else{
                res.json(filas);
            }
        });
    });
}