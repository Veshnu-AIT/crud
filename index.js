const express = require('express');
const app = express();
const port = 3000;


const products = [
  { id: 1, 
    name: 'Case', 
    createdAt: '2024-01-01',
    stock: 10 },

  { id: 2, 
    name: 'Headphone',
    createdAt: '2024-06-15', 
    stock: 0 },

  { id: 3,
    name: 'Pendrive', 
    createdAt: '2024-03-21', 
    stock: 5 },

  { id: 4, 
    name: 'Charger',
    createdAt: '2023-12-01',
    stock: 20 }
];


function strToDate(dateStr) {
  return new Date(dateStr);
}

app.get('/products', (req, res) => {
  let filteredProducts = products;

  const name = req.query.name;
  if (name) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  const createdAt = req.query.createdAt;
  if (createdAt) {
    const filterDate = strToDate(createdAt);
    if (filterDate instanceof Date && !isNaN(filterDate)) {
      filteredProducts = filteredProducts.filter(
        product => strToDate(product.createdAt).toDateString() === filterDate.toDateString()
      );
    } else {
      return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
    }
  }

  const stock = req.query.stock;
  if (stock !== undefined) {
    const stockInt = parseInt(stock, 10);
    if (!isNaN(stockInt)) {
      filteredProducts = filteredProducts.filter(product => product.stock === stockInt);
    } else {
      return res.status(400).json({ error: 'Stock should be an integer.' });
    }
  }

  return res.json(filteredProducts);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
