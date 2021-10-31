const express = require('express');
const path = require('path');

const app = express();
const port = 8000;

app.use((req, res, next) => {
    if (req.method == 'GET' && req.url.length > 1 && req.url.substr(-1) == '/') {
        res.redirect(req.url.slice(0, -1));
    } else {
        next();
    }
});

app.use('/images', express.static(path.join(__dirname, '../client/images')));
app.use(
    '/stylesheets',
    express.static(path.join(__dirname, '../client/stylesheets'))
);
app.use(
    '/javascript',
    express.static(path.join(__dirname, '../client/javascript'))
);
app.use(
    '/libraries',
    express.static(path.join(__dirname, '../client/libraries'))
);

app.use(require('./app-login'));
app.use(require('./messages-contacts'));
app.use(require('./team-about-contact.js'));
app.use(require('./create-account.js'));
app.use(require('./profile.js'))
app.use(require('./feedback.js'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
