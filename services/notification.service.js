const nodemailer = require('nodemailer');
const africastalking = require('africastalking');

// Configure email transporter (replace with your credentials)
const transporter = nodemailer.createTransport({
  host: 'smtp.your-email-provider.com',
  port: 587,
  secure: false, // Adjust based on your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Call this function after adding a comment to notify the product owner
async function sendEmailNotification(recipient, subject, message) {
  try {
    const mailOptions = {
      from: 'Shuaibu Muhammad <devshuaib@gmail.com>',
      to: recipient,
      subject,
      text: message,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('Email notification sent:', info.response);
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
};

// Call this function after adding a comment to notify the product owner
async function sendSMSNotification(recipient, message) {
  try {
    const response = await africastalking.SMS.send({
      to: recipient,
      message,
    });
    console.log('SMS notification sent:', response);
  } catch (error) {
    console.error('Error sending SMS notification:', error);
  }
};

async function sendNotifications(recipientPhone, recipientEmail, commentContent, replyMessage = '') {
  const subject = replyMessage ? 'Reply to your comment!' : 'New comment on your product!';
  const message = `A new comment has been added to your product: ${commentContent}. ${replyMessage}`;

  // Send email notification
  await sendEmailNotification(recipientEmail, subject, message);

  // Send SMS notification (uncomment and configure if needed)
  await sendSMSNotification(recipientPhone, message);
}

module.exports = sendNotifications;
