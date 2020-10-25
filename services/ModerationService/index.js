const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const { default: Axios } = require('axios');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const posts = {};

app.get('/posts', (req, res) => res.send(posts))

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  console.log('Event Recieved:', type);


  if (type === 'COMMENT_CREATED') {
    const { id, content, postId } = data;
    const status = content.includes('fuck') ? 'rejected' : 'approved';

    const event = {
      type: 'COMMENT_MODERATED',
      data: { id, content, postId, status }
    };

    await Axios.post('http://localhost:5000/events', event)
  };

  return res.send('OK')
})

app.listen(4003, _ => console.log('Listening on 4003'))