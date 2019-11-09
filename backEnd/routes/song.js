const express = require("express");
const router = express.Router();

router.post('/add', (req, res) => {

    res.status(200);

    let songName = req.body.songName;

    res.send(`ADDED SONG ${songName} TO QUEUE`);

});

router.get('/search', (req, res) => {
    res.status(200);

    let songName = req.body.name;

    res.send([{
        name: songName,
        artist: "Artist 1"
    },
    {
        name: "Song 2",
        artist: "Artist 2"
    }]);
});


module.exports = router;