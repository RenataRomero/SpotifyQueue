const express = require("express");
const app = express();
const PORT = 3000;

//Routes
app.use('/', require('./routes/index'));
app.use('/queue', require('./routes/queue'));
app.use('/song', require('./routes/song'));

app.listen(PORT, console.log(`Server started on port ${PORT}`));