const router = require('express').Router();
const userRoutes = require('./users');

router.use('/api/users', userRoutes);

module.exports = router;
