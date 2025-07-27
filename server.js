const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

  // ✅ THIS is the default GET route that fixes "Cannot GET /"
  app.get('/', (req, res) => {
    res.json({ message: 'API is working!' });
    });

    // Optional: future route example
    // app.post('/validate-key', (req, res) => {
    //   res.json({ status: 'key valid' });
    // });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      });
