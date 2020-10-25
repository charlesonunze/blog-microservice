const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const { default: Axios } = require('axios');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const posts = {};

const handleEvents = (type, data) => {
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
};

app.get('/posts', (req, res) => res.send(posts))

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  console.log('Event Recieved:', type);

  handleEvents(type, data)

  return res.send('OK')
})

app.listen(4002, async () => {
  console.log('Listening on 4002')

  const { data: events } = await Axios.get('http://localhost:5000/events');

  events.forEach(({ type, data }) => {
    console.log('Processing Event:', type);
    handleEvents(type, data)
  });
})