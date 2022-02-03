const routes = require('express').Router();
const controller = require('../controller');

routes.post('/lookup', async (req, res) => {
  if (!req.body.key) res.status(400).json({ error: 'No key passed' }).end();
  const message = await controller.findMessage(req.body.key);
  if (message.error) res.status(400).json({ error: message.error }).end();
  else res.status(200).json({ isValid: message.isValid }).end();
});

routes.post('/encrypt', async (req, res) => {
  if (!req.body.message) res.status(400).json({ error: 'No message passed' }).end();
  const key = await controller.createMessage(req.body.message);
  res.status(200).json({ key }).end();
});

routes.post('/decrypt', async (req, res) => {
  if (!req.body.key) {
    res.status(400).json({ error: 'No key passed.' }).end();
    return;
  }

  const message = await controller.readMessage(req.body.key);
  if (message.error) res.status(400).json({ error: message.error }).end();
  else {
    await controller.deleteMessage(req.body.key);
    res.status(200).json({ message: message.message }).end();
  }
});

module.exports = routes;
