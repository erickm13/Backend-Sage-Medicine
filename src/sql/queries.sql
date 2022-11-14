USE sagemedicinebd;

CREATE TABLE departamento(
	id_departamento int PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(75)
);

CREATE TABLE municipios(
	id_municipio int PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(75),
    id_departamento int signed not null,
    FOREIGN KEY (id_departamento) REFERENCES departamento(id_departamento)
);

CREATE TABLE alergias(
	id_alergias int PRIMARY KEY AUTO_INCREMENT,
	nombre varchar(50),
	tipo varchar(1) # Letra para indicar que tipo de alergia es (Alimento A, Medicamento M, etc).
);

CREATE TABLE usuarios(
	id_usuario varchar (30) PRIMARY KEY,
    dpi varchar(13),
    email varchar(50),
    telefono varchar(8),
    nombre varchar(100),
    fecha_registro date,
    fecha_nacimiento date,
    direccion varchar(200),
    id_municipio int not null,
    FOREIGN KEY (id_municipio) REFERENCES municipios(id_municipio)
);

CREATE TABLE asigna_alergias(
	id_alergias int not null,
    id_usuario  varchar (30) not null,
    PRIMARY KEY(id_alergias,id_usuario),
    FOREIGN KEY (id_alergias) REFERENCES alergias(id_alergias),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE doctores(
	id_doctor varchar (30) PRIMARY KEY,
    colegiado varchar(15),
    email varchar(50),
    telefono varchar(8),
    nombre varchar(100),
    fecha_registro date,
    fecha_nacimiento date,
    direccion varchar(200),
    id_municipio int not null,
    habilitado boolean, -- En base a su estado se muestra al doctor o no en la plataforma
    FOREIGN KEY (id_municipio) REFERENCES municipios(id_municipio)
);

CREATE TABLE especialidades(
	id_especialidad int PRIMARY KEY AUTO_INCREMENT,
    nombre varchar(100)
);

CREATE TABLE asigna_especialidad(
	id_doctor varchar (30),
    id_especialidad int,
    PRIMARY KEY(id_doctor,id_especialidad),
    FOREIGN KEY (id_doctor) REFERENCES doctores(id_doctor),
    FOREIGN KEY (id_especialidad) REFERENCES especialidades(id_especialidad)
);

CREATE TABLE horario(
	id_horario int PRIMARY KEY AUTO_INCREMENT,
    fecha_hora datetime,
    habilitado boolean,
    costo float,
    id_usuario  varchar (30),
    id_doctor  varchar (30) not null,
    datos_receta varchar(500),
    FOREIGN KEY (id_doctor) REFERENCES doctores (id_doctor),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);