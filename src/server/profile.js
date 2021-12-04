import express from 'express';
import path from 'path';

import cookieParser from 'cookie-parser';

const router = express.Router();
router.use(cookieParser());
router.use(express.urlencoded({ extended: false }));

import { setUser } from './database';

router.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/html/profile.html'));
})

router.post('/profile', (req, res) => {
    if (req.cookies['username']) {
        console.log(`Modified profile: ${setUser(req.cookies['username'], req.body)}`);
    }
    res.redirect('/');
})

module.exports = router;