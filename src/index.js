const app = require('./config/server');
require('./app/rutas/users')(app);
require('./app/rutas/doctors')(app);
require('./app/rutas/muni-dep')(app);
require('./app/rutas/especialties')(app);
require('./app/rutas/allergies')(app);
require('./app/rutas/dates')(app);

app.listen(app.get("PORT"), () => console.log("Servidor corriendo "))