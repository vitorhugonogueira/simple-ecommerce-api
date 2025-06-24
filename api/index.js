const data = require('../db.json');

module.exports = (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET', 'OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).send();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).send('Método não permitido. Esta API aceita somente requisições GET.');
    return;
  }

  const requestUrl = new URL(req.url, 'http://example.com');
  const cleanPath = requestUrl.pathname;

  if (cleanPath === '/api') {
    res.status(200).json({ message: 'Welcome to the Simple Ecommerce API!' });
    return;
  }

  if (cleanPath === '/api/products') {
    res.status(200).json({
      first: 1,
      prev: null,
      next: null,
      last: 1,
      pages: 1,
      items: 15,
      data: data.products
    });
    return;
  }

  const parts = cleanPath.split('/');

  if (cleanPath.includes('/api/products/')) {
    const id = parts[3];
    const prod = data.products.find(p => p.id === id);
    if (!prod) {
      res.status(404).send('Product not found.');
      return;
    }

    res.status(200).json(prod);
    return;
  }

  if (cleanPath.includes('/api/stock/')) {
    const id = parts[3];
    const prod = data.stock.find(p => p.id === id);
    if (!prod) {
      res.status(404).send('Stock not found.');
      return;
    }

    res.status(200).json(prod);
    return;
  }

  const resource = parts[2]; // (ex: 'categories')
  if (resource && data[resource]) {
    res.status(200).json(data[resource]);
    return;
  }

  res.status(404).send('Not found by Simple Eccomerce API.');
};