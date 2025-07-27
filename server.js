const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

let tradeQueue = {};

app.post("/api/trade", (req, res) => {
  const { mentor_id, symbol, action, lot, price, sl, tp } = req.body;
  if (!mentor_id || !symbol || !action || !lot) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (!tradeQueue[mentor_id]) tradeQueue[mentor_id] = [];
  tradeQueue[mentor_id].push({ symbol, action, lot, price, sl, tp, time: Date.now() });
  res.json({ status: "received" });
});

app.get("/api/trades", (req, res) => {
  const mentor_id = req.query.mentor_id;
  if (!mentor_id) return res.status(400).json({ error: "mentor_id required" });
  const trades = tradeQueue[mentor_id] || [];
  res.json(trades);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
