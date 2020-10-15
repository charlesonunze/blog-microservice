const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const posts = {};

app.get('/posts', (req, res) => res.send(posts))

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'POST_CREATED') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] }

    console.log('posts', posts);
  };

  if (type === 'COMMENT_CREATED') {
    const { id, content, postId } = data;
    const post = posts[postId];

    post.comments.push({ id, content })

    console.log('posts', posts);
  };
})

app.listen(4002, _ => console.log('Listening on 4002'))