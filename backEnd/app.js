const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use('/', require('./routes/index'));
app.use('/queue', require('./routes/queue'));
app.use('/song', require('./routes/song'));

app.listen(PORT, console.log(`Server started on port ${PORT}`));