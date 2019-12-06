const express = require("express");
const router = express.Router();
const request = require('request');
const mw = require("./middleware");
const joi = require('joi');

router.get('/', (req, res) => {
    res.status(200);
    res.send('QUEUE MENU WINDOW');
});

router.get('/create', (req, res) => {
    res.status(200);
    res.send('QUEUE CREATE WINDOW');   
});

router.post('/create', mw.tokenValidator, (req, res) => {
    const queueSchema = {
        access_token: joi.required(),
        user_id: joi.required(),
        name: joi.required(),
        description: joi.optional()
    }

    let queue = joi.validate(req.body, queueSchema);

    if(queue.error){
        res.status(400).send(`Bad request ${queue.error.details[0].message}`);
        return;
    }

    let options = {
        url: `https://api.spotify.com/v1/users/${queue.value.user_id}/playlists`,
        headers: {
            'Authorization': 'Bearer ' + queue.value.access_token,
            'Content-Type': 'application/json'
        },
        body : {
            name: queue.value.name,
            public: false,
            collaborative: true,
            description: queue.value.description
        },
        json: true
    };

    // console.log(options);

    request.post(options, (error, response, body) => {
        res.send(body);
    });
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

router.get('/:queueToken', (req, res) => {
    res.status(200);
    let queueToken = req.params.queueToken;
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

router.delete('/:queueToken', (req, res) => {
    res.status(200);
    let queueToken = req.params.queueToken;
    res.send(`DELETED QUEUE WITH THE TOKEN: ${queueToken}`);
});

module.exports = router;