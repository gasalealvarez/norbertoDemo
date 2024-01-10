const express = require('express');
const env = require('dotenv')
const bodyParser = require('body-parser');
//const cors = require('cors')

const app = express();

//app.use(cors());
//app.use(express.json());
app.use(express.json({ limit: '2000kb' }));
app.use(bodyParser.json());

env.config();
console.log("* " + process.env.FRONTEND_URL);
/* app.use(cors({  
    origin: process.env.FRONTEND_URL,
    credentials:true,
    optionSuccessStatus:200
})); */

app.use((req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      process.env.FRONTEND_URL
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
    //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
    res.setHeader("Access-Control-Max-Age", 7200);
  
    next();
  });

app.use('/api/demo', require('./rutas/rutas'));




app.listen(3000, function(){
    console.log('Servidor corriendo en puerto 3000');
});