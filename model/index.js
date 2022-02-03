const { Client } = require('pg');

// Note to self: pg lowercases everything anyway
// CREATE TABLE messages(
//    noteId bytea NOT NULL,
//    encryptedMessage varchar(255),
//    initVector bytea,
//    readerIp varchar(16),
//    isRead boolean DEFAULT false,
//    isDestroyed boolean DEFAULT false,
//    createdDate date DEFAULT CURRENT_DATE,
//    readDate date,
//    PRIMARY KEY( noteId )
// );
class Database {
  constructor() {
    this.client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    this.client.connect();
  }

  async createMessage(primaryKey, encryptedMessage, initVector) {
    const query = 'INSERT INTO messages(noteId, encryptedMessage, initVector) VALUES($1, $2, $3)';
    try {
      await this.client.query(query, [primaryKey, encryptedMessage, initVector]);
    } catch (e) {
      console.log('An error has occurred');
      console.log(e);
    }
  }

  async clearMessage(primaryKey) {
    const query = 'UPDATE messages SET encryptedMessage = null, initVector = null, isRead = true, isDestroyed = true, readDate = CURRENT_DATE where noteId = $1';
    try {
      await this.client.query(query, [primaryKey]);
    } catch (e) {
      console.log('An error has occurred in clearMessage');
      console.log(e);
    }
  }

  async getMessage(primaryKey) {
    const query = 'SELECT * from messages where noteId = $1';
    let res;
    try {
      res = await this.client.query(query, [primaryKey]);
    } catch (e) {
      console.log('An error has occurred');
      console.log(e);
    }
    return res.rows[0];
  }

  async findMessage(primaryKey) {
    const query = 'SELECT noteId, isRead, isDestroyed, readDate from messages where noteId = $1';
    let res;
    try {
      res = await this.client.query(query, [primaryKey]);
    } catch (e) {
      console.log('An error has occurred');
      console.log(e);
    }
    return res.rows[0];
  }
}

module.exports = new Database();
