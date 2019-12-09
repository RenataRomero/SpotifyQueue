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
        refresh_token: joi.required(),
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

    request.post(options, (error, response, body) => {
        if(response.statusCode == 200 || response.statusCode == 201){

            let newQueue = {
                user_id: body.owner.id,
                playlistUrl: body.external_urls.spotify,
                queueUrl: body.id,
                playlist_id: body.id,
                access_token: queue.value.access_token,
                refresh_token: queue.value.refresh_token
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
    db.QUEUE.find({queueUrl: req.body.queueUrl}).then(function(queue){
        let foundQueue = {
            spotifyUrl: queue[0].playlistUrl
        }
        res.send(foundQueue);
    });
});



router.get('/:queueToken', (req, res) => {
    res.status(200);
    let queueToken = req.params.queueToken;
    res.status(200);
    db.QUEUE.find({queueUrl: queueToken}).then(function(queue){
        let foundQueue = {
            playlist_id: queue[0].playlist_id,
            user_id: queue[0].user_id,
            access_token: queue[0].access_token,
            refresh_token: queue[0].refresh_token
        }
        res.send(foundQueue);
    });
});

router.post('/refreshToken', (req, res) =>{

    let queue_id = req.body.queue_id;

    console.log(queue_id);

    db.QUEUE.findOne({queueUrl: queue_id}).then((queue) => {

        console.log(queue);
        res.status(200);
        res.send({
            refresh_token: queue.refresh_token
        });
    });
});

router.post('/accessToken', (req, res) =>{

    db.QUEUE.findOne({queueUrl: req.body.queue_id}).then((queue)=>{

        console.log(queue);
        let new_tokens = {
            access_token: req.body.access_token,
            refresh_token: queue.refresh_token,
            user_id: queue.user_id,
            queueUrl: queue.queueUrl,
            playlistUrl: queue.playlistUrl,
            playlist_id: queue.playlist_id
        }

        console.log('new_tokens',new_tokens);

        db.QUEUE.findOneAndUpdate({queueUrl: req.body.queue_id}, new_tokens).then((queue) =>{
            console.log(queue);
            res.status(200);
            res.send('Saved');
        });
    });

    
});

module.exports = router;