const express = require('express');
const env = require('dotenv')
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

app.use(cors());
//app.use(express.json());
app.use(express.json({ limit: '2000kb' }));
app.use(bodyParser.json());

env.config();

app.use('/api/demo', require('./rutas/rutas'));

app.use(cors({
    origin: process.env.FRONTEND_URL
}));


app.listen(3000, function(){
    console.log('Servidor corriendo en puerto 3000');
});