

const express = require('express');
const app = express();
//añadir nombre del puerto en este caso es el Fly ----- o el localthost
require('dotenv').config();

const port = process.env.PORT;
//middlewars
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//router
app.use('/producto',require('./routers/index'));
app.use('/marca',require('./routers/indexM'));
app.use('/categoria',require('./routers/indexC'));
app.use('/usuario',require('./routers/indexU'));
app.use('/favoritos',require('./routers/indexF'));
app.use('/administracion',require('./routers/indexA'));

app.listen(port);
console.log('INICIO DE SERVER EXITOSO',port,'!!');