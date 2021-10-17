const express = require('express');

const router = express.Router();
router.use(express.json());

const { getUsers, getMessages, sendMessage } = require('./database');

router.get('/contacts/:username', (req, res) => {
    res.send(getUsers().filter((name) => name !== req.params.username));
});

router.get('/messages/:username_1/:username_2', (req, res) => {
    res.send(getMessages(req.params.username_1, req.params.username_2));
});

router.post('/messages/', (req, res) => {
    console.log(`Message sent:`, req.body);

    sendMessage(req.body.message, req.body.from, req.body.to);

    // if (req.body.to === 'everyone') {
    //     messages_everyone.unshift({
    //         username: req.body.from,
    //         text: req.body.message,
    //     });
    // }

    res.send('Message Recieved');
});

module.exports = router;
