
const africastalkingSms = require('../config/africastalking.config');
const transporter = require('../config/nodemailer.config');

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

async function sendSMSNotification(recipient, message) {
  try {
    const response = await africastalkingSms.SMS.send({
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

  try {
    // Send email notification
    await sendEmailNotification(recipientEmail, subject, message);

    // Send SMS notification
    await sendSMSNotification(recipientPhone, message);
  } catch (error) {
    console.error('Error sending notifications:', error);
  }
}

module.exports = sendNotifications;
