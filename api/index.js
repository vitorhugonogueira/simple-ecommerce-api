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
  const parts = cleanPath.split('/');

  const resource = parts[2]; // (ex: 'products', 'categories')

  if (cleanPath === '/api') {
    res.status(200).json({ message: 'Welcome to the Simple Ecommerce API!' });
    return;
  }

  res.status(404).send('Test.');

  // if (resource && data[resource]) {
  //   res.status(200).json(data[resource]);
  //   return;
  // }

  // res.status(404).send('Not found by Simple Eccomerce API.');
};