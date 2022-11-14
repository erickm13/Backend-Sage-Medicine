const conn = require('../../config/database');

module.exports = (app) => {
    //se usa para actualizar stado doctores
    app.put('/doctors/:id', (req, res) => {
        let query =

        `UPDATE sagemedicinebd.doctores
        SET habilitado = '${req.body.habilitado}'
        WHERE id_doctor='${req.params.id}'`;

        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en Base de Datos", datos: []});
            }else{
                res.json({status: 1, mensaje: "Doctor actualizado en DB", datos: []});
            }
        });
    });
    //se usa para consultar doctores
    app.get('/doctors/:id', (req, res) => {
        let query = `SELECT * FROM sagemedicinebd.doctores WHERE id_doctor='${req.params.id}'`;
        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en Base de Datos", datos: []});
            }else{
                res.json(filas);
            }
        });
    });
    //se usa para consultar todos los doctores
    app.get('/doctors', (req, res) => {
        let query = `SELECT * FROM sagemedicinebd.doctores`;
        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en Base de Datos", datos: [error.message]});
            }else{
                res.json(filas);
            }
        });
    });

    //se usa para consultar todos los doctores(id,nombredoc,habilitado,direccion,nombreEsp,nombreMuni)
    app.get('/doctors-potente/:id', (req, res) => {
        let query =
        `SELECT sagemedicinebd.doctores.id_doctor, sagemedicinebd.doctores.nombre,sagemedicinebd.doctores.email, sagemedicinebd.doctores.telefono, sagemedicinebd.doctores.habilitado , sagemedicinebd.doctores.direccion, sagemedicinebd.especialidades.nombre_especialidad, sagemedicinebd.municipios.nombre_municipio, sagemedicinebd.departamento.nombre_departamento
        FROM sagemedicinebd.doctores 
        INNER JOIN  sagemedicinebd.asigna_especialidad
        ON sagemedicinebd.doctores.id_doctor = sagemedicinebd.asigna_especialidad.id_doctor
        INNER JOIN sagemedicinebd.especialidades
        ON sagemedicinebd.especialidades.id_especialidad = sagemedicinebd.asigna_especialidad.id_especialidad
        INNER JOIN sagemedicinebd.municipios
        ON sagemedicinebd.doctores.id_municipio = sagemedicinebd.municipios.id_municipio
        INNER JOIN sagemedicinebd.departamento
        ON sagemedicinebd.municipios.id_departamento = sagemedicinebd.departamento.id_departamento WHERE sagemedicinebd.doctores.id_doctor = '${req.params.id}'`;
        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en Base de Datos", datos: [error.message]});
            }else{
                res.json(filas);
            }
        });
    });

    //se usa para consultar todos los doctores(id,nombredoc,habilitado,direccion,nombreEsp,nombreMuni)
    app.get('/doctors-potente', (req, res) => {
        let query =
        `SELECT sagemedicinebd.doctores.id_doctor, sagemedicinebd.doctores.nombre, sagemedicinebd.doctores.email,sagemedicinebd.doctores.habilitado , sagemedicinebd.doctores.direccion, sagemedicinebd.especialidades.nombre_especialidad, sagemedicinebd.municipios.nombre_municipio, sagemedicinebd.departamento.nombre_departamento
        FROM sagemedicinebd.doctores
        INNER JOIN  sagemedicinebd.asigna_especialidad
        ON sagemedicinebd.doctores.id_doctor = sagemedicinebd.asigna_especialidad.id_doctor
        INNER JOIN sagemedicinebd.especialidades
        ON sagemedicinebd.especialidades.id_especialidad = sagemedicinebd.asigna_especialidad.id_especialidad
        INNER JOIN sagemedicinebd.municipios
        ON sagemedicinebd.doctores.id_municipio = sagemedicinebd.municipios.id_municipio
        INNER JOIN sagemedicinebd.departamento
        ON sagemedicinebd.municipios.id_departamento = sagemedicinebd.departamento.id_departamento`;
        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en Base de Datos", datos: [error.message]});
            }else{
                res.json(filas);
            }
        });
    });

    //se usa para insertar un doctor
    app.post('/doctors', (req, res) => {
        //{nombre: "..", apellido: ".." etc.. }
        let query =
        `INSERT INTO
        sagemedicinebd.doctores (
            id_doctor,
			colegiado,
            email,
            telefono,
            nombre,
            fecha_registro,
            fecha_nacimiento,
            direccion,
            id_municipio,
			habilitado)
        VALUES (
                '${req.body.id_doctor}',
                '${req.body.colegiado}',
                '${req.body.email}',
                '${req.body.telefono}',
                '${req.body.nombre}',
                '${req.body.fecha_registro}',
                '${req.body.fecha_nacimiento}',
                '${req.body.direccion}',
				'${req.body.id_municipio}',
                '${req.body.habilitado}')`;

        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, mensaje: "Error en DB", datos: [error.message]});
            }else{
                res.json({status: 1, mensaje: "Doctor insertado en DB", datos: []});
            }
        });
    });
}