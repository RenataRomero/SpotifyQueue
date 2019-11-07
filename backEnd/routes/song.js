const express = require("express");
const router = express.Router();

router.post('/add/:songName', (req, res) => {

    res.status(200);
    res.send('ADD SONG');

});

router.get('/search/:songName', (req, res) => {
    res.status(200);
    res.send('SEARCH SONG');
});


module.exports = router;