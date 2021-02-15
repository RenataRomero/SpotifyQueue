const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const request = require('request');
const db = require('../bd/queuesController');

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

router.get('/tokens', (req, res) => {
    res.json({
        access_token:req.session.access_token?req.session.access_token:"",
        refresh_token:req.session.refresh_token?req.session.refresh_token:"",
        user_id:req.session.user_id?req.session.user_id:""
      })
});


router.get('/login', (req, res) => {
    let state = generateRandomString(16);
    res.cookie(state_key, state);

    let scope = scopes.join(" ");

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));

    res.status(200).send();
});

router.get('/callback', (req, res) => {
    const {
        code,
        state
    } = req.query;
    const storedState = req.cookies ? req.cookies[state_key] : null;
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

                //GET the profile of the user
                let options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    },
                    json: true
                };

                request.get(options, (error, response, body) => {

                    user_id = body.id;
                    req.session.user_id=user_id;
                    req.session.save();
                    db.QUEUE.findOne({user_id:user_id}).then((queue)=>{

                        console.log(queue);
                        let new_tokens = {
                            access_token: access_token,
                            refresh_token: refresh_token,
                            user_id: queue.user_id,
                            queueUrl: queue.queueUrl,
                            playlistUrl: queue.playlistUrl,
                            playlist_id: queue.playlist_id
                        }


                        console.log('new_tokens',new_tokens);

                        db.QUEUE.findOneAndReplace({
                            user_id:user_id
                        }, new_tokens).then((new_queue)=>{
                            console.log(new_queue);
                        });
                    });


                });

                //Almacenar mientra usuario esta logeado
                req.session.access_token= access_token,
                req.session.refresh_token= refresh_token
                res.redirect("/")
            } else {
                // res.redirect('/#' +
                //     querystring.stringify({
                //         error: 'invalid_token'
                //     }));
                res.status(400).send({error: 'invalid_token'});
            }
        });
    }
});

router.get('/refresh_token', function (req, res) {

    // requesting access token from refresh token
    let refresh_token = req.query.refresh_token;
    let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let access_token = body.access_token;
            res.send({
                body
            });
        }
    });
});

module.exports = router;
