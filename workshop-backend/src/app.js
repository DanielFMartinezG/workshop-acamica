const express = require('express');
const app = express();
const config = require('./config/index');
const eventsRoutes = require('./routes/events');
const registerRoutes = require('./routes/register');
const participantsRoutes = require('./routes/participants');
const loginRoutes = require('./routes/login');
//es necesario instalar la librería npm i cors  para poder consumir la api entre dos urls diferentes (cruzados) 3000 y 5500
var cors = require('cors');
const port = config.port;

app.use(cors());
app.use(express.json());

app.use("/events", eventsRoutes);
app.use("/events", registerRoutes);
app.use("/events", participantsRoutes);
app.use("/login", loginRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})