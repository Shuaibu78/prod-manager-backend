const express = require('express');
const productRouter = express.Router();

// Import controllers
const productsController = require('../controllers/product.controller');

// Define routes
productRouter.post('/create', productsController.createProduct);
productRouter.get('/', productsController.getUserProducts);

module.exports = productRouter;
