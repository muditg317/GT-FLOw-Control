const express = require('express');
const router = express.Router()

const User = require('../models/User');

router.get('/', async (request, response) => {
  try {
    const findResult = await User.find();
    response.json(findResult);
  } catch (err) {
    console.log(err);
  }
});

router.post('/', async (request, response) => {
  const { name, email } = request.body;
  const newUser = new User({ name, email });
  try {
    const savePromise = await newUser.save();
    response.json({
      message: "Created account successfully"
    });
  } catch (err) {
    response.status(400).json({
      "error": err,
      "message": "Error creating account"
    });
  }
});

module.exports = router;
