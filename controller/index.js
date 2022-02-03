const crypto = require('crypto');
const database = require('../model');

const { SECRET } = process.env;

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

const encryptMessage = (message, usersKey) => {
  const initVector = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(usersKey, 'base64'), initVector);
  let encryptedData = cipher.update(message, 'utf8', 'hex');
  encryptedData += cipher.final('hex');
  return { encryptedMessage: encryptedData, initVector };
};

const decryptMessage = (usersKey, encryptedMessage, initVector) => {
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(usersKey, 'base64'), initVector);
  let decryptedData = decipher.update(encryptedMessage, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
};

const createMessage = async (message) => {
  const usersKey = generateBase64Key();
  const primaryKey = encryptKey(usersKey);
  const { encryptedMessage, initVector } = encryptMessage(message, usersKey);
  await database.createMessage(primaryKey, encryptedMessage, initVector);
  return usersKey;
};

const readMessage = async (usersKey) => {
  const primaryKey = encryptKey(usersKey);
  const row = await database.getMessage(primaryKey);
  if (row) {
    // Note to self: pg lowercases everything anyway
    const {
      encryptedmessage, initvector, isread, readdate,
    } = row;
    if (isread) return { error: `This message was already read by a user on ${readdate}` };

    const decrypted = decryptMessage(usersKey, Buffer.from(encryptedmessage, 'hex'), initvector)
    return { message: decrypted };
  }
  return { error: 'Invalid key.' };
};

const deleteMessage = async (usersKey) => {
  const primaryKey = encryptKey(usersKey);
  await database.clearMessage(primaryKey);
};

const findMessage = async (usersKey) => {
  const primaryKey = encryptKey(usersKey);
  const row = await database.findMessage(primaryKey);
  if (row) {
    const {
      isread, isdestroyed, readdate,
    } = row;
    if (isread || isdestroyed) return { error: `This message was already read by a user on ${readdate}` };
    return { isValid: 'true' };
  }
  return { error: 'Invalid key.' };
};

module.exports = {
  createMessage,
  readMessage,
  deleteMessage,
  findMessage,
};
