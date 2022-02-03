const routes = require('express').Router();
const controller = require('../controller');

const secret = 'tempsecret';

routes.get('/', async (req, res) => {
  const key = await controller.createMessage('gimme a double double with peppers');
  res.status(200).json({ key }).end();
});

routes.post('/decrypt', async (req, res) => {
  console.log(req.body);
  if (!req.body.key) res.status(400).json({ error: 'No key passed.' });
  const message = await controller.readMessage(req.body.key);
  console.log(message);
  res.status(200).end();
});

routes.get('/messages', async (req, res) => {
  // res.status(200).json({ data: controller.dosomething(1) });
  res.status(200).end();
});

routes.post('/messages/', async (req, res) => {
  res.status(200).end();
});

routes.delete('messages/', async (req, res) => {
  res.status(200).end();
});

module.exports = routes;
