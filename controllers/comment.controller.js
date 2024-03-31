const Comment = require('../models/comment.model');
const Product = require('../models/product.model');

// Add comment to a product
const addComment = async (req, res) => {
  try {
    const { productId, content } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found!' });

    const newComment = new Comment({ content, user: req.user._id, product: productId });
    await newComment.save();

    await sendNotifications(product.user.phone, product.user.email, content);

    res.json({ message: 'Comment added successfully!', comment: newComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add comment!' });
  }
};

// Reply to a comment
const replyToComment = async (req, res) => {
  try {
    const { commentId, content } = req.body;
    const parentComment = await Comment.findById(commentId);
    if (!parentComment) return res.status(404).json({ message: 'Comment not found!' });

    const newReply = new Comment({ content, user: req.user._id, product: parentComment.product, replyTo: parentComment._id });
    await newReply.save();

    const product = await Product.findById(parentComment.product);
    if (!product) return res.status(404).json({ message: 'Product not found!' });

    const productOwnerEmail = parentComment.product.user.email;
    await sendNotifications(product.user.phone, productOwnerEmail, content, `Reply to your comment on product: ${parentComment.product.name}`);

    res.json({ message: 'Reply added successfully!', reply: newReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add reply!' });
  }
};

module.exports = { addComment, replyToComment };