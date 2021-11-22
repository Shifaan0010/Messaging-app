import express from 'express';

const router = express.Router();
router.use(express.json());

import { getUsers, getMessages, sendMessage } from './database';

router.get('/contacts/:username', async (req, res) => {
    res.send((await getUsers()).filter((name) => name !== req.params.username));
});

router.get('/messages/:username_1/:username_2', async(req, res) => {
    res.send(await getMessages(req.params.username_1, req.params.username_2));
});

router.post('/messages/', async(req, res) => {
    console.log(`Message sent:`, req.body);

    await sendMessage(req.body.message, req.body.from, req.body.to);

    // if (req.body.to === 'everyone') {
    //     messages_everyone.unshift({
    //         username: req.body.from,
    //         text: req.body.message,
    //     });
    // }

    res.send('Message Recieved');
});

module.exports = router;
