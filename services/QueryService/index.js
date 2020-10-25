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

  console.log('Event Recieved:', type);

  if (type === 'POST_CREATED') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] }
  };

  if (type === 'COMMENT_CREATED') {
    const { id, content, postId, status } = data;
    const post = posts[postId];

    post.comments.push({ id, content })
  };

  if (type === 'COMMENT_UPDATED') {
    const { id, content, postId, status } = data;
    const post = posts[postId];

    const comment = post.comments.find((c) => c.id === id)
    comment.status = status
    comment.content = content
  };

  return res.send('OK')
})

app.listen(4002, _ => console.log('Listening on 4002'))