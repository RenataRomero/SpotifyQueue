const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const request = require('request');

const client_id = "905cb524080444c99efb4d8c4aa8f01f";
const client_secret = "96352da348ae4011b548278224280854";
const redirect_uri = 'http://localhost:3000/callback';
const state_key = 'spotify_auth_state';
const scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public',
    'playlist-modify-private', 'playlist-read-private',
    'playlist-read-collaborative'
];

let generateRandomString = function (length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

router.get('/', (req, res) => {
    res.send('MAIN WINDOW');
});

router.get('/api/login', (req, res) => {
    let state = generateRandomString(16);
    res.cookie(state_key, state);

    let scope = 'user-read-private user-read-email';

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});

router.get('/callback', (req, res) => {
    // res.status(200);
    // res.send("I'm back");
    const {
        code,
        state
    } = req.query;
    const storedState = req.cookies ? req.cookies[state_key] : null;
    console.log("I'm back");
    console.log(state);
    console.log(storedState);
    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(state_key);
        let authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let access_token = body.access_token;
                let refresh_token = body.refresh_token;

                let options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    },
                    json: true
                };

                request.get(options, (error, response, body) => {
                    console.log(body);
                });

                res.redirect('/#' +
                    querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                    }));
            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });

        // res.status(200);
        // res.send(`Code = ${code} State = ${state}`);
    }
});

module.exports = router;