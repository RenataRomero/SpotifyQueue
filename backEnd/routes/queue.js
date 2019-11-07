const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200);
    res.send('QUEUE MENU');
});

router.get('/create', (req, res) => {
    res.status(200);
    res.send('QUEUE CREATE');   
});

router.post('/create', (req, res) => {
    res.status(200);
    res.send('QUEUE CREATE');  
});


router.get('/join', (req, res) => {
    res.status(200);
    res.send('QUEUE JOIN');
});

router.get('/:idQueue', (req, res) => {
    res.status(200);
    res.send('QUEUE VIEW');
});

module.exports = router;