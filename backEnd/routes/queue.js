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

    res.send(`Creating the queue ${name} with the desctiption: ${description}`);  
});

router.get('/join', (req, res) => {
    res.status(200);
    res.send('QUEUE JOIN WINDOW');
});


router.post('/join', (req, res) => {
    res.status(200);
    let queueToken = req.body.queueToken;

    res.send(`JOINED QUEUE WITH THE TOKEN: ${queueToken}`);

});

router.get('/:idQueue', (req, res) => {
    res.status(200);
    let idQueue = req.params.idQueue;
    res.send({
        name: 'QUEUE NAME',
        description: 'QUEUE DESCRIPTION',
        token: queueToken,
        songs:[{
            name: 'Song 1',
            artist: 'Artist 1'
        },
        {
            name: 'Song 2',
            artist: 'Artist 2'
        },
        {
            name: 'Song 3',
            artist: 'Artist 3'
        }]
    });
});

module.exports = router;