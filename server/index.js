require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Basic health
app.get('/api/health', (req, res) => res.json({ ok: true }));

app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body || {};

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const userId = process.env.EMAILJS_USER_ID || process.env.EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY; // optional; some setups use a private key

    if (!serviceId || !templateId || !userId) {
      return res.status(500).json({ error: 'EmailJS not configured on server' });
    }

    const payload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: userId,
      template_params: {
        from_name: name,
        from_email: email,
        phone: phone || '-',
        subject,
        message,
      },
    };

    const headers = { 'Content-Type': 'application/json' };
    if (privateKey) {
      headers['Authorization'] = `Bearer ${privateKey}`;
    }

    // EmailJS REST API
    await axios.post('https://api.emailjs.com/api/v1.0/email/send', payload, { headers });

    return res.json({ ok: true });
  } catch (err) {
    console.error('Error sending email via EmailJS', err?.response?.data || err.message || err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
