const express = require('express');
const commentRouter = express.Router();

// Import controllers
const commentController = require('../controllers/comment.controller');

// Define routes
commentRouter.post('/:productId/add', commentController.addComment);
commentRouter.post('/:productId/reply', commentController.replyToComment);

module.exports = commentRouter;
