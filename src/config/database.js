const db = require('mysql');
const conn = db.createConnection({
    host: 'localhost',
    user: 'root',
    password: '#@pyi@Ejg8T&N?6n',
    database: 'sagemedicinebd'
});

conn.connect((error) => {
    if(error){
        console.log("Error en el servidor");
    }else{
        console.log("Servidor corriendo en Mysql");
    }
});

module.exports = conn;