const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
require('./database');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const usersAPI = require('./api/users');
app.use('/api/users', usersAPI);

app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '../build'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.get('/users', (request, response) => {
  userController.getUsers(response);
});
app.post('/users', (request, response) => {
  userController.addUsers(request.body, response);
});
