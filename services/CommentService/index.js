const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const { default: Axios } = require('axios');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const commentsByPostId = {};

app.route('/posts/:id/comments')

  .get((req, res) => res.send(commentsByPostId[req.params.id] || []))

  .post(async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const postId = req.params.id;

    const comments = commentsByPostId[postId] || [];

    comments.push({ id: commentId, content, status: 'pending' })

    commentsByPostId[postId] = comments

    const event = {
      type: 'COMMENT_CREATED',
      data: { id: commentId, content, postId, status: 'pending' }
    };

    await Axios.post('http://localhost:5000/events', event)

    return res.status(201).send(comments)
  })

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  console.log('Event Recieved:', type);

  if (type === 'COMMENT_MODERATED') {
    const { id, content, postId, status } = data;
    const comments = commentsByPostId[postId] || [];

    const comment = comments.find((c) => c.id === id)
    comment.status = status

    const event = {
      type: 'COMMENT_UPDATED',
      data: { id, content, postId, status }
    };

    await Axios.post('http://localhost:5000/events', event)
  }

  return res.send('ok')
})

app.listen(4001, _ => console.log('Listening on 4001'))