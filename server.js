const express = require('express');

const app = express();

const PORT = "3000";

const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
app.use(express.json());
app.use('/products', productsRoutes);
app.use('/users', usersRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
