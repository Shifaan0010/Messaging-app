const express = require('express');
const path = require('path');

const app = express();
const port = 8000;

app.use('/images', express.static(path.join(__dirname, '../client/images')));
app.use('/stylesheets', express.static(path.join(__dirname, '../client/stylesheets')));
app.use('/javascript', express.static(path.join(__dirname, '../client/javascript')));
app.use('/libraries', express.static(path.join(__dirname, '../client/libraries')));

app.use(require('./app-login'))
app.use(require('./messages-contacts'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
