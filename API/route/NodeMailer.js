const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Define your email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ggwpfax@gmail.com',
        pass: 'krei nxwv ctyq fvkj'
    }
});

// Define your email sending endpoint
router.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    // Create the email message
    const mailOptions = {
        from: 'ggwpfax@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'An error occurred while sending the email' });
    }
});

module.exports = router;
