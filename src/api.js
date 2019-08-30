const express = require('express');
const fs = require('fs');
const api = express.Router();
const cors = require('cors');
api.use(cors());

const jsonarrayFile = 'recipes-short.json'
const jsonarray = require(`../data/${jsonarrayFile}`);

fs.writeFile(`data/${jsonarrayFile}.bak`, JSON.stringify(jsonarray), (err) => {
  if (err) throw err;
  console.log('The backup has been saved!');
});

api.get('/', (req, res) => {
  res.send({message: 'Hello from the API.'});
});

api.get('/status', (req, res) => {
  fs.readFile('data/status.json', (err, status) => {
    if (err) {
      const initialStatus = {
        size: jsonarray.length,
        lastUpdated: -1
      };
      fs.writeFile('data/status.json', JSON.stringify(initialStatus), (err) => {
        if (err) throw err;
        console.log('The status has been updated.');
        res.send(initialStatus)
      });
    } else {
      res.send(JSON.parse(status));
    }
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
  const status = {
    size: jsonarray.length,
    lastUpdated: i
  };
  console.log(JSON.stringify(status));
  fs.writeFile('data/status.json', JSON.stringify(status), (err) => {
    if (err) throw err;
    console.log('The status has been updated.');
  });
});

module.exports = api;