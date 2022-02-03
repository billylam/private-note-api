const routes = require('express').Router();
const controller = require('../controller');

const secret = 'tempsecret';

routes.get('/', (req, res) => {
  const key = controller.generateBase64Key();
  const { encryptedMessage, initVector } = controller.encryptMessage('gimme a double double with peppers', key);
  console.log(controller.decryptMessage(key, encryptedMessage, initVector));
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
