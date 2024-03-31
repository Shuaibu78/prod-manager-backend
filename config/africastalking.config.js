const africastalking = require('africastalking');

// Initialize Africa's Talking SDK
const apiKey = process.env.AFRICASTALKING_API_KEY;
const username = process.env.AFRICASTALKING_USERNAME;
const africastalkingSms = require('africastalking')({
  apiKey,
  username
});

module.exports = africastalkingSms;