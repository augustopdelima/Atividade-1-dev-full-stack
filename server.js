const express = require('express');
const cors = require('cors');

const app = express();

const PORT = "3000";

const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
app.use(express.json());
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }, 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));
app.use('/products', productsRoutes);
app.use('/users', usersRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
