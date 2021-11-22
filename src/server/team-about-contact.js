import express from 'express';
import path from 'path';

const router = express.Router();

router.get('/team', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/team.html'));
});

router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/about.html'));
});

router.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/contact.html'));
});

module.exports = router;
