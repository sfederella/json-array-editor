const express = require('express');
const fs = require('fs');
const api = express.Router();
const cors = require('cors');
api.use(cors());

const jsonarrayFile = 'recipes.json'
const jsonarray = require(`../data/${jsonarrayFile}`);

api.get('/', (req, res) => {
  res.send({message: 'Hello from the API.'});
});

api.get('/size', (req, res) => {
  res.send({
    size: jsonarray.length,
  });
});

api.get('/jsonarray/:index', (req, res) => {
  const i = parseInt(req.params.index);
  if (i >= jsonarray.length || i < 0) {
    res.send({error: `No item in at index ${i}.`});
  } else {
    res.send(jsonarray[i]);
  }
});

api.put('/jsonarray/:index', (req, res) => {
  console.log('Updating jsonarray.');
  const i = parseInt(req.params.index);
  const item = req.body;
  jsonarray[i] = item;
  fs.writeFile(`data/${jsonarrayFile}`, JSON.stringify(jsonarray), (err) => {
    if (err) throw err;
    console.log('The jsonarray has been updated.');
    res.send({success: 'The jsonarray has been updated.'})
  });
});

api.get('/jsonarray', (req, res) => {
  res.send(jsonarray);
});

module.exports = api;