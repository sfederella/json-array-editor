const express = require('express');
const bodyParser = require('body-parser');
const api = require('./src/api')
const path = require('path');
const favicon = require('express-favicon');

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(__dirname + '/client/build/favicon.ico'));
app.use('/api', api);
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));