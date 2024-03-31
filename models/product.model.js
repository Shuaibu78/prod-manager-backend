const mongoose = require('mongoose');
const admin = require('firebase-admin');
const { firestore } = require('../config/firebase.config');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'], // 'location.type' must be 'Point'
    },
    coordinates: {
      type: [Number], // Array of [longitude, latitude]
      required: true,
      index: '2dsphere' // Index for geospatial queries
    }
  },
  radius: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: {
    type: Date,
    default: null
  }
});

productSchema.index({ location: '2dsphere' });

// Firestore synchronization middleware
productSchema.post('save', async (product, next) => {
  try {
    const firestoreDoc = firestore.collection('products').doc(product._id.toString());
    await firestoreDoc.set({
      name: product.name,
      description: product.description,
      image: product.image,
      location: new admin.firestore.GeoPoint(...product.location.coordinates),
      user: product.user.toString(),
      _id: product._id.toString(),
      comments: [],
    });
    next();
  } catch (error) {
    console.error('Error syncing product to Firestore:', error);
    next(error);
  }
});

module.exports = mongoose.model('Product', productSchema);
