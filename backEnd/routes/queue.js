const express = require("express");
const router = express.Router();
const request = require('request');
const mw = require("./middleware");
const joi = require('joi');
const db = require('../bd/queuesController');

router.get('/', (req, res) => {
    res.status(200);
    res.send('QUEUE MENU WINDOW');
});

router.get('/create', (req, res) => {
    res.status(200);
    res.send('QUEUE CREATED');   
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
        if(response.statusCode == 200 || response.statusCode == 201){
            console.log('THIS IS RESPONSE', response);

            let newQueue = {
                user_id: body.owner.id,
                playlistUrl: body.external_urls.spotify,
                queueUrl: body.id
            }

            let queueDocument = db.QUEUE(newQueue);

            queueDocument.save().then(function(queue){

                res.status(201).send(newQueue);
                return;
            });
            
        } else if (response.statusCode == 403){
            res.status(403).send("Not authorized");
        } else {
            res.status(response.statusCode).send({
                status: response.statusCode,
                error: response.statusMessage
            });
        }
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