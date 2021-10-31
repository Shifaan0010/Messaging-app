const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/feedback', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/feedback.html'))
})

router.post('/feedback', (req, res) => {
    console.log(req.body);
    res.redirect('/');
})

module.exports = router;