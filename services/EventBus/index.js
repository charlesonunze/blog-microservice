const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { default: Axios } = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/events', (req, res) => {
  const event = req.body;

  Axios.post('http://localhost:4000/events', event)
  Axios.post('http://localhost:4001/events', event)
  Axios.post('http://localhost:4002/events', event)

  return res.send({ status: 'OK' })
})


app.listen(5000, _ => console.log('Listening on 5000'))