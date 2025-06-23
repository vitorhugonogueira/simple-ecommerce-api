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

  const { url } = req;

  const parts = url.split('/');
  const resource = parts[2]; // (ex: 'posts', 'users')

  if (resource && data[resource]) {
    res.status(200).json(data[resource]);
    return;
  }

  if (url === '/api') {
    res.status(200).json({ message: 'Welcome to the Simple Eccomerce API!' });
    return;
  }

  res.status(404).send('Recurso não encontrado. Tente /api/seu_recurso');
};