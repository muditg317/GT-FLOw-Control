const User = require('../models/Users');

module.exports = {
  findAll: function(request, response) {
    User.find(request.query)
      .then(books => response.json(books))
      .catch(err => response.status(422).json(err));
  },
  findById: function(request, response) {
    User.findById(request.params.id)
      .then(book => response.json(book))
      .catch(err => response.status(422).json(err));
  },
  create: function(request, response) {
    User.create(request.body)
      .then(newUser => response.json(newUser))
      .catch(err => response.status(422).json(err));
  },
  update: function(request, response) {
    User.findOneAndUpdate({ _id: request.params.id }, request.body)
      .then(book => response.json(book))
      .catch(err => response.status(422).json(err));
  },
  remove: function(request, response) {
    User.findById({ _id: request.params.id })
      .then(book => book.remove())
      .then(allbooks => response.json(allbooks))
      .catch(err => response.status(422).json(err));
  }
};
