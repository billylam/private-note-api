const database = require('../model');
const crypto = require('crypto');

const SECRET = "tempsecret";

const post = () => {
  database.post();
};

/**
 * Unique key for decrypting database primary key, encrypted message.
 * Never stored.
 * @returns Key as base 64
 */
const generateBase64Key = () => crypto.randomBytes(32).toString('base64');

/**
 * Encrypts a unique key with sha256.
 * Result used for database lookup of primary keys.
 * @returns Key (database primary key)
 */
const encryptKey = (base64Key) => crypto.createHmac('sha256', SECRET).update(base64Key).digest('base64');

const encryptMessage = (message, base64key) => {
  const initVector = crypto.randomBytes(16).toString('base64');
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(base64key, 'base64'), Buffer.from(initVector, 'base64'));
  let encryptedData = cipher.update(message, 'utf-8', 'hex');
  encryptedData += cipher.final('hex');
  return { encryptedMessage: encryptedData, initVector };
};

const decryptMessage = (base64key, encryptedMessage, initVector) => {
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(base64key, 'base64'), Buffer.from(initVector, 'base64'));
  let decryptedData = decipher.update(encryptedMessage, 'hex', 'utf-8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
};

const create = (message) => {

}

const destroy = (key) => {

}

module.exports = {
  post,
  generateBase64Key,
  encryptKey,
  encryptMessage,
  decryptMessage,
};
