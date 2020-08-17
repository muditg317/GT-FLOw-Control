const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const app = express();
require('./database');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

require('./config/passport')(passport);

const routes = require('./routes');
app.use(routes);

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '../frontend/build'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
