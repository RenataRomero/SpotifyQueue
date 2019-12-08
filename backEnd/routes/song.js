const express = require("express");
const router = express.Router();

const request = require('request');
const querystring = require('querystring');

const joi = require('joi');
const mw = require("./middleware");

router.post('/add', mw.tokenValidator, (req, res) => {
    
    let addTrackSchema = {
        access_token: joi.required(),
        uris: joi.required(),
        playlist_id: joi.required()
    }

    let addTrack = joi.validate(req.body, addTrackSchema);

    if(addTrack.error){
        res.status(400).send(`Bad request ${addTrack.error.details[0].message}`);
        return;
    }

    let options = {
        url: `https://api.spotify.com/v1/playlists/${addTrack.value.playlist_id}/tracks`,
        headers: {
            'Authorization': 'Bearer ' + addTrack.value.access_token,
            'Content-Type': 'application/json'
        },
        body:{
            uris: [addTrack.value.uris]
        },
        json: true
    };

    request.post(options, (error, response, body) => {
        if(response.statusCode == 201){
            res.status(200).send(body);
            return;
        } else if (response.statusCode == 403){
            res.status(403).send("Not authorized");
        } else {
            res.status(response.statusCode).send({
                status: response.statusCode,
                error: response.statusMessage
            });
        };
    });
});

router.get('/search', mw.tokenValidator, (req, res) => {
    
    let trackSchema = {
        access_token: joi.required(),
        q: joi.required()
    }

    let track = joi.validate(req.body, trackSchema);

    if(track.error){
        res.status(400).send(`Bad request ${queue.error.details[0].message}`);
        return;
    }

    let url = `https://api.spotify.com/v1/search?`+ 
        querystring.stringify({
            q: track.value.q,
            type: 'track',
            market: 'from_token',
            limit: 1,
        });

    // console.log(url);

    let options = {
        url: url,
        headers: {
            'Authorization': 'Bearer ' + track.value.access_token,
            'Content-Type': 'application/json'
        },
        json: true
    };

    request.get(options, (error, response, body) => {
        if(response.statusCode == 200){
            res.status(200).send(body);
            return;
        } else if (response.statusCode == 403){
            res.status(403).send("Not authorized");
        } else {
            res.status(response.statusCode).send({
                status: response.statusCode,
                error: response.statusMessage
            });
        };
    });
});


module.exports = router;