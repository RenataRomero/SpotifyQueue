const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

//Routes
app.use('/', require('./routes/index'));
app.use('/queue', require('./routes/queue'));
app.use('/song', require('./routes/song'));
app.use('/user', require('./routes/user'));

app.listen(PORT, console.log(`Server started on port ${PORT}`));