const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('MAIN WINDOW');
});

module.exports = router;