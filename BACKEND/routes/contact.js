const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  console.log('Received contact form:', { name, email, message }); // Log incoming data

  // Configure your transporter (use your real email and app password)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vidhuvishwak2004@gmail.com', // TODO: Replace with your email
      pass: 'bdjl quyq gyeh qkpz'     // TODO: Replace with your app password
    }
  });

  const mailOptions = {
    from: 'vidhuvishwak2004@gmail.com',
    to: 'vidhuvishwak2004@gmail.com',
    subject: `Contact Form Submission from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    replyTo: email
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info); // Log success
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error); // Log error
    res.status(500).json({ message: 'Failed to send message', error: error.toString() });
  }
});

module.exports = router; 