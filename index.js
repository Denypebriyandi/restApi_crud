require ('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const crud = require('./routes/r_crud');

const app = express();

app.use(bodyParser.json({limit: '250mb', extended: true}));
app.use(bodyParser.urlencoded( {limit: "250mb", extended: false, parameterLimit:50000 } ));

app.use('/denypebriyandi', crud);

const port = process.env.PORT;;
app.listen(port, () => console.log('run server on '+port));