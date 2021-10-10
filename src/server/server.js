const express = require('express');
const path = require('path');

const app = express();
const port = 8000;

app.use('/images', express.static(path.join(__dirname, '../client/images')));
app.use('/stylesheets', express.static(path.join(__dirname, '../client/stylesheets')));
app.use('/javascript', express.static(path.join(__dirname, '../client/javascript')));
app.use('/libraries', express.static(path.join(__dirname, '../client/libraries')));

app.use(express.json())

app.get(['/', '/app'], (req, res) => {
    res.sendFile(path.join(__dirname, '../client/app.html'));
});

app.get('/contacts/:username', (req, res) => {
    res.send(['everyone', 'xyz', 'pqr']);
});

const messages_everyone = [{ username: 'A', text: 'Hello World' }];

const users = {
    abc: {
        messages: {
            everyone: messages_everyone,
        },
    },
    pqr: {
        messages: {
            everyone: messages_everyone,
        },
    },
    xyz: {
        messages: {
            everyone: messages_everyone,
        },
    }
};

app.get('/messages/:username_1/:username_2', (req, res) => {
    res.send(
        users[req.params.username_1].messages[req.params.username_2] ?? []
    );
});

app.post('/messages/', (req, res) => {
    console.log(req.body);

    if (req.body.to === 'everyone') {
        messages_everyone.unshift({
            username: req.body.from,
            text: req.body.message
        })
    }

    res.send('Message Recieved');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
