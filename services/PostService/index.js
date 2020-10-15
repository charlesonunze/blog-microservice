const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const posts = {};

app.route('/posts')

  .get((req, res) => res.send(posts))

  .post(async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
      id,
      title
    }

    const event = { type: 'POST_CREATED', data: { id, title } };
    await Axios.post('http://localhost:5000/events', event)

    return res.status(201).send(posts[id])
  })

app.listen(4000, _ => console.log('Listening on 4000'))