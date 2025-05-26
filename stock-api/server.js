const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Route to fetch stock data
app.get('/api/stocks', async (req, res) => {
  try {
    const authResponse = await axios.post('https://20.244.56.144/evaluation-service/auth', {
      email: 'knikithagoud06@gmail.com',
      name: 'k.nikitha',
      rollNo: '22q61a6616',
      accessCode: 'dJFufE',
      clientID: '9a287687-3668-4a6b-a2d9-d3a9fef63741',
      clientSecret: 'bVxBPGWTbFgduPNJ',
    });

    const token = authResponse.data.access_token;

    const stockResponse = await axios.get('https://20.244.56.144/evaluation-service/stocks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    res.json(stockResponse.data);
  } catch (err) {
    console.error('❌ Error fetching data:', err.message);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
