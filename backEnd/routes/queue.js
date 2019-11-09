const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200);
    res.send('QUEUE MENU WINDOW');
});

router.get('/create', (req, res) => {
    res.status(200);
    res.send('QUEUE CREATE WINDOW');   
});

router.post('/create', (req, res) => {
    res.status(200);

    let name = req.body.name;
    let description = req.body.description;

    res.send(req.body);  
});


router.get('/join/:queueToken', (req, res) => {
    res.status(200);
    res.send('QUEUE JOIN WINDOW OF QUEUE: ' + req.params.queueToken);
});

router.get('/join/', (req, res) => {
    res.status(200);
    res.send('QUEUE JOIN WINDOW');
});


router.post('/join', (req, res) => {
    res.status(200);
    //let token = req.body.name;

    res.send(req.body);

});

router.get('/:idQueue', (req, res) => {
    res.status(200);
    let idQueue = req.params.idQueue;
    res.send({
        idQueue: idQueue,
        token: "1232hghegy2g",
        name: "Lorem",
        description: "Ipsum"
    });
});

module.exports = router;