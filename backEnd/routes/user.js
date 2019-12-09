const express = require('express');
const router = express.Router();
const request = require('request');
const mw = require("./middleware");
const db = require('../bd/queuesController');

router.route("/")
    .get(mw.tokenValidator, (req, res) => {
        // console.log(req.body.access_token);
        let options = {
            url: 'https://api.spotify.com/v1/me',
            headers: {
                'Authorization': 'Bearer ' + req.body.access_token
            },
            json: true
        };

        // console.log(options);

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
            }
        });
    });

module.exports = router;