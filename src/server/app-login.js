import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const router = express.Router();
router.use(cookieParser());
router.use(express.urlencoded({ extended: false }));

import { validateUser } from './database';

router.get(['/', '/app', '/login'], (req, res) => {
    console.log(`Logged in cookies:`, req.cookies);
    if (req.cookies['username']) {
        res.sendFile(path.join(__dirname, '../client/app.html'));
    } else {
        res.sendFile(path.join(__dirname, '../client/login.html'));
    }
});

router.post('/login', async(req, res) => {
    console.log(`Login request:`, req.body);
    if (await validateUser(req.body['username'], req.body['password'])) {
        res.cookie('username', req.body['username'], {
            maxAge: 3600000,
            httpOnly: false,
        });
    }
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    res.clearCookie('username');
    res.redirect('/');
});

module.exports = router;
