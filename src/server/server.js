const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

app.use('/images', express.static(path.join(__dirname, '../client/images')));
app.use('/stylesheets', express.static(path.join(__dirname, '../client/stylesheets')));
app.use('/javascript', express.static(path.join(__dirname, '../client/javascript')));
app.use('/libraries', express.static(path.join(__dirname, '../client/libraries')));

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

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

app.get(['/', '/app', '/login'], (req, res) => {
    console.log(`Logged in cookies:`, req.cookies)
    if (req.cookies['username']) {
        res.sendFile(path.join(__dirname, '../client/app.html'));
    } else {
        res.sendFile(path.join(__dirname, '../client/login.html'))
    }
});

app.post('/login', (req, res) => {
    console.log(`Login request:`, req.body);
    if (Object.keys(users).includes(req.body['username'])) {
        res.cookie('username', req.body['username'], { maxAge: 3600, httpOnly: false });
    }
    res.redirect('/');
})

app.get('/logout', (req, res) => {
    res.clearCookie('username');
    res.redirect('/');
})

app.get('/contacts/:username', (req, res) => {
    res.send(['everyone', 'XXXX']);
});

app.get('/messages/:username_1/:username_2', (req, res) => {
    res.send(
        users[req.params.username_1].messages[req.params.username_2] ?? []
    );
});

app.post('/messages/', (req, res) => {
    console.log(`Message sent:`, req.body);

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
