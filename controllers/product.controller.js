const Product = require('../models/product.model');

const createProduct = async (req, res) => {
  try {
    const { name, description, imageURL, location, userId, comments } = req.body;
    const newProduct = new Product({ name, description, image: imageURL, location, user: userId, comments });
    await newProduct.save(); // Save to MongoDB and trigger Firestore sync

    res.json({ message: 'Product uploaded successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Product upload failed!' });
  }
};

const getUserProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createProduct, getUserProducts };
