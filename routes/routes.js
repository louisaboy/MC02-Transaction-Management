const express = require('express');
const controller = require('../controllers/controller.js');

const app = express();

// for get
app.get('/', controller.getIndex);
app.get('/add-movie', controller.getAdd);
app.get('/edit-movie/:id', controller.getEdit);
// app.get('/delete-movie', controller.getDelete);

// for post
app.post('/add-movie', controller.postAdd);
app.post('/search-movie', controller.postSearch);
app.post('/edit-movie/:id', controller.postEdit);
app.post('/delete-movie/:id', controller.postDelete);

module.exports = app;