const express = require("express");
const router = express.Router();

router.post('/add', (req, res) => {

    res.status(200);

    let songName = req.body.songName;

    res.send('ADD SONG ' + songName);

});

router.get('/search', (req, res) => {
    res.status(200);

    let songName = req.body.songName;

    res.send('SEARCH FOR ' + songName);
});


module.exports = router;