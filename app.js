const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db.config');
const router = require('./routes');

const app = express();
const port = process.env.PORT || 3003;

// Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(
  cors({
    origin: "*",
  }),
);

connectDB();

app.get("/status", (req, res) => {
  res.send("Okay");
});
app.use(router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
