require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

// Allow requests from your frontend
app.use(require('cors')());

app.get('/getProfilePic', async (req, res) => {
  const phone = req.query.phone;
  if (!phone) return res.status(400).send('Phone number is required');

  const url = `https://whatsapp-profile-pic.p.rapidapi.com/wspic/png?phone=${phone}`;

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'whatsapp-profile-pic.p.rapidapi.com',
      'x-rapidapi-key': process.env.API_KEY // 👈 Secure here
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error('Failed to fetch image');
    const imageBuffer = await response.buffer();
    res.set('Content-Type', 'image/png');
    res.send(imageBuffer);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


