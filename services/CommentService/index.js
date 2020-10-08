const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const commentsByPostId = {};

app.route('/posts/:id/comments')

  .get((req, res) => res.send(commentsByPostId[req.params.id] || []))

  .post((req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content })

    commentsByPostId[req.params.id] = comments

    return res.status(201).send(comments)
  })


app.listen(4001, _ => console.log('Listening on 4001'))