// Create web server
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;

// Parse request body
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// GET /comments
app.get('/comments', (req, res) => {
  fs.readFile('./comments.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred on the server. Please try again later.');
    } else {
      res.send(data);
    }
  });
});

// POST /comments
app.post('/comments', (req, res) => {
  fs.readFile('./comments.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred on the server. Please try again later.');
    } else {
      const comments = JSON.parse(data);
      const newComment = req.body;
      newComment.id = comments.length + 1;
      comments.push(newComment);
      fs.writeFile('./comments.json', JSON.stringify(comments, null, 2), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('An error occurred on the server. Please try again later.');
        } else {
          res.status(201).send(newComment);
        }
      });
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});