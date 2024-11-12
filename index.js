require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const apiKey = process.env.GROK_API_KEY;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// /chat endpoint'i
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      'https://api.x.ai/v1/chat/completions',
      {
        model: 'grok-beta', // Model adı
        messages: [{ role: 'user', content: userMessage }]
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const messageContent = response.data.choices[0].message.content;
    res.json({ reply: messageContent });
  } catch (error) {
    console.error('Hata:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});
