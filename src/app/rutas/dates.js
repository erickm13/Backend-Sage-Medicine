const conn = require('../../config/database');

module.exports = (app) => {

        // ********* CITAS ************

    //se usa para consultar citas a doctores(id, fecha, habilitado, nombre-usuario) por id_doctor
    app.get('/date-user/:id', (req, res) => {
        let query =
        `SELECT sagemedicinebd.horario.id_horario, sagemedicinebd.horario.costo,sagemedicinebd.horario.datos_receta , sagemedicinebd.horario.fecha_hora, sagemedicinebd.horario.habilitado , sagemedicinebd.usuarios.nombre,sagemedicinebd.usuarios.telefono, sagemedicinebd.usuarios.email, sagemedicinebd.alergias.nombre_alergia
        FROM sagemedicinebd.horario
        INNER JOIN sagemedicinebd.usuarios
        ON sagemedicinebd.horario.id_usuario = sagemedicinebd.usuarios.id_usuario
        INNER JOIN sagemedicinebd.asigna_alergias
        ON sagemedicinebd.usuarios.id_usuario = sagemedicinebd.asigna_alergias.id_usuario
        INNER JOIN sagemedicinebd.alergias
        ON sagemedicinebd.asigna_alergias.id_alergias = sagemedicinebd.alergias.id_alergias
        WHERE sagemedicinebd.horario.id_doctor='${req.params.id}'`;

        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en Base de Datos", datos: []});
            }else{
                res.json(filas);
            }
        });
    });
    
    //se usa para consultar citas a doctores(id, fecha, habilitado, nombre-usuario) por id_usuario
    app.get('/date-dateid/:id', (req, res) => {
        let query =
        `SELECT sagemedicinebd.horario.id_horario, sagemedicinebd.horario.costo,sagemedicinebd.horario.datos_receta , sagemedicinebd.horario.fecha_hora, sagemedicinebd.horario.habilitado , sagemedicinebd.usuarios.nombre,sagemedicinebd.usuarios.telefono, sagemedicinebd.usuarios.email, sagemedicinebd.alergias.nombre_alergia
        FROM sagemedicinebd.horario
        INNER JOIN sagemedicinebd.usuarios
        ON sagemedicinebd.horario.id_usuario = sagemedicinebd.usuarios.id_usuario
        INNER JOIN sagemedicinebd.asigna_alergias
        ON sagemedicinebd.usuarios.id_usuario = sagemedicinebd.asigna_alergias.id_usuario
        INNER JOIN sagemedicinebd.alergias
        ON sagemedicinebd.asigna_alergias.id_alergias = sagemedicinebd.alergias.id_alergias
        WHERE sagemedicinebd.horario.id_horario='${req.params.id}'`;

        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en Base de Datos", datos: []});
            }else{
                res.json(filas);
            }
        });
    });

    //se usa para consultar citas a Usuarios(id, fecha, habilitado, nombre_doctor)
    app.get('/date-doctor/:id', (req, res) => {
        let query =
        `SELECT sagemedicinebd.horario.id_horario, sagemedicinebd.horario.fecha_hora, sagemedicinebd.horario.habilitado , sagemedicinebd.doctores.nombre
        FROM sagemedicinebd.horario
        INNER JOIN sagemedicinebd.doctores
        ON sagemedicinebd.horario.id_doctor= sagemedicinebd.doctores.id_doctor
        WHERE id_usuario='${req.params.id}'`;

        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en Base de Datos", datos: []});
            }else{
                res.json(filas);
            }
        });
    });

    //se usa para eliminar cita
    app.delete('/date-delete/:id', (req, res) => {
        let query = `DELETE FROM sagemedicinebd.horario WHERE id_horario='${req.params.id}'`;
        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en Base de Datos", datos: []});
            }else{
                res.json({status: 1, mensaje: "Cita Eliminada", datos: []});
            }
        });
    });


    //se usa para consultar citas(fecha-nombre)
    app.get('/date-calendar/:id', (req, res) => {
        let query = `SELECT * FROM sagemedicinebd.horario WHERE id_usuario='${req.params.id}'`;
        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en Base de Datos", datos: []});
            }else{
                res.json(filas);
            }
        });
    });


    //se usa para consultar cita
    app.get('/date/:id', (req, res) => {
        let query = `SELECT * FROM sagemedicinebd.horario WHERE id_usuario='${req.params.id}'`;
        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en Base de Datos", datos: []});
            }else{
                res.json(filas);
            }
        });
    });
    //se usa para insertar cita
    app.post('/date', (req, res) => {
        let query = `INSERT INTO sagemedicinebd.horario (
			fecha_hora,
			habilitado,
			costo,
			id_usuario,
			id_doctor,
			datos_receta)
			VALUES (
				'${req.body.fecha_hora}',
				'${req.body.habilitado}',
				'${req.body.costo}',
				'${req.body.id_usuario}',
				'${req.body.id_doctor}',
				'${req.body.datos_receta}'
				)`;
        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en Base de Datos", datos: [error.message]});
            }else{
                res.json({status: 1, mensaje: "Cita ingresada con exito", datos: []});
            }
        });
    });

	//se usa para actualizar status de cita
    app.put('/date/:id', (req, res) => {
        let query = `UPDATE sagemedicinebd.horario SET habilitado = '${req.body.habilitado}' WHERE (id_horario = '${req.params.id}') `
        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en Base de Datos", datos: [error.message]});
            }else{
                res.json({status: 1, mensaje: "Cita Actualizada con exito", datos: []});
            }
        });
    });

    //se usa para actualizar receta de cita
    app.put('/date-receta/:id', (req, res) => {
        let query = `UPDATE sagemedicinebd.horario SET datos_receta = '${req.body.datos_receta}' WHERE (id_horario = '${req.params.id}') `
        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en Base de Datos", datos: [error.message]});
            }else{
                res.json({status: 1, mensaje: "Receta Enviada con exito", datos: []});
            }
        });
    });

    
}