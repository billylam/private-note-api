const routes = require('express').Router();
const controller = require('../controller');

routes.get('/', (req, res) => {
  controller.post();
  res.status(200).end();
});

routes.get('/messages', async (req, res) => {
  // res.status(200).json({ data: controller.dosomething(1) });
  res.status(200).end();
});

routes.post('/messages/', async (req, res) => {
  // if () res.status(200).end();
  // else res.status(400).json({ error: 'No rows updated' });
  res.status(200).end();
});

routes.delete('messages/', async (req, res) => {
  res.status(200).end();
});

module.exports = routes;
