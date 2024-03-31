const admin = require('firebase-admin');
const serviceAccount = require('../services/productsynchronization-firebase-adminsdk-logjt-c68d131b68.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount), // Replace this with your service account JSON
  databaseURL: 'https://productsynchronization.firebaseio.com'
});

const firestore = admin.firestore();

module.exports = { firestore };
