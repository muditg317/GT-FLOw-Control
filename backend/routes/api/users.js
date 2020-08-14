const router = require('express').Router()
const authController = require('../../controllers/authController');
const usersController = require('../../controllers/usersController');

router
  .route('/')
  .get(usersController.findAll)
  .post(usersController.create);

router
  .route('/:id')
  .get(usersController.findById)
  .put(usersController.update)
  .delete(usersController.remove);

router
  .route('/register')
  .post(authController.register);

router
  .route('/login')
  .post(authController.login);

module.exports = router;
