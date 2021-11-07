const express = require('express');
const path = require('path');

const router = express.Router();

router.use(express.urlencoded({ extended: false }));

const { createUser } = require('./database.js');

router.get('/create-account', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/create-account.html'));
});

router.post('/create-account', async(req, res) => {
    console.log(`Created new user: ${await createUser(req.body)}`);
    res.redirect('/');
});

module.exports = router;
