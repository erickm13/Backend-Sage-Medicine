const conn = require('../../config/database');

module.exports = (app) => {

        // ********* Especialidades************


    //se usa para consultar especialidad
    app.get('/esp/:id', (req, res) => {
        let query = `SELECT * FROM sagemedicinebd.especialidades WHERE id_especialidad='${req.params.id}'`;
        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en Base de Datos", datos: []});
            }else{
                res.json(filas);
            }
        });
    });
    //se usa para consultar todas las especialidades
    app.get('/esp', (req, res) => {
        let query = `SELECT * FROM sagemedicinebd.especialidades`;
        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en Base de Datos", datos: [error.message]});
            }else{
                res.json(filas);
            }
        });
    });

	//se usa para asignar especialidades a doctores
    app.post('/asignar-especialidad', (req, res) => {
        let query =
		`INSERT INTO sagemedicinebd.asigna_especialidad (
			id_doctor,
			id_especialidad)
			VALUES (
				'${req.body.id_doctor}',
				'${req.body.id_especialidad}'
				)`;

        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en Base de Datos", datos: [error.message]});
            }else{
                res.json({status: 1, mensaje: "Se asigno correctamente la especialidad al doctor", datos: []});
            }
        });
    });

	//se usa para listar especialidades de doctores
    app.get('/listar-esp-doc/:id_doctor', (req, res) => {
        let query =
		`SELECT *
		FROM sagemedicinebd.asigna_especialidad
		WHERE
		id_doctor = '${req.params.id_doctor}'`;

        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en Base de Datos", datos: [error.message]});
            }else{
                res.json(filas);
            }
        });
    });

}