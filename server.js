const express = require('express');
const bodyParser = require('body-parser');
const api = require('./src/api')

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', api);

app.get('/', (req, res) => {
  res.send("Hello!");
});

app.listen(port, () => console.log(`Listening on port ${port}`));