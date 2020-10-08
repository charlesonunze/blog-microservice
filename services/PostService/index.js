const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const posts = {};

app.route('/posts')

  .get((req, res) => res.send(posts))

  .post((req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
      id,
      title
    }

    return res.status(201).send(posts[id])
  })

app.listen(4000, _ => console.log('Listening on 4000'))