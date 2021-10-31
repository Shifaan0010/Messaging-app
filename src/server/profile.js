const express = require('express');
const path = require('path');

const cookieParser = require('cookie-parser');

const router = express.Router();
router.use(cookieParser());
router.use(express.urlencoded({ extended: false }));

const { setUser } = require('./database')

router.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/profile.html'));
})

router.post('/profile', (req, res) => {
    if (req.cookies['username']) {
        console.log(`Modified profile: ${setUser(req.cookies['username'], req.body)}`);
    }
    res.redirect('/');
})

module.exports = router;