const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_OR_KEY } = require('../config/env');
const { promiseTimeout, fieldsFromBody } = require('../util/Utils');

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const User = require('../models/User');

module.exports = {
  register: (request, response) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(request.body);
    // Check validation
    if (!isValid) {
      return response.status(400).json(errors);
    }
    promiseTimeout(User.findByEmail(request.body.email))
      .then(users => {
        if (users.length) {
          return response.status(400).json({ email: "Email already exists" });
        }

        const newUser = new User(fieldsFromBody(request.body, User.schema.requiredPaths()));
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            promiseTimeout(newUser.save())
              .then(user => response.json(user))
              .catch(error => {
                console.log(error);
                response.status(503);
              });
          });
        });
      })
      .catch(error => {
        console.log(error);
        response.status(503);
      });
  },
  login: (request, response) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(request.body);
    // Check validation
    if (!isValid) {
      return response.status(400).json(errors);
    }
    const email = request.body.email;
    const password = request.body.password;

    promiseTimeout(User.findOneByEmail(email))
      .then(user => {
        if (!user) {
          return response.status(404).json({ emailnotfound: "Email not found" });
        }

        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            return response.status(400).json({ passwordincorrect: "Password incorrect" });
          }
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name
          };
          // Sign token
          jwt.sign(
            payload,
            SECRET_OR_KEY,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              response.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        })
        .catch(error => {
          console.log(error);
          response.status(503);
        });
      })
      .catch(error => {
        console.log(error);
        response.status(503);
      });
  },
};
