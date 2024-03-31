const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken.middleware');
const productRouter = require('./product.route');
const commentRouter = require('./comment.route');

// Import controllers
const usersController = require('../controllers/user.controller');

router.use('/products', verifyToken, productRouter);
router.use('/comments', verifyToken, commentRouter);

router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);

module.exports = router;
