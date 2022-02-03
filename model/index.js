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

  // post() {
  //   this.client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  //     if (err) throw err;
  //     for (let row of res.rows) {
  //       console.log(JSON.stringify(row));
  //     }
  //     this.client.end();
  //   });
  // }

  async createMessage(primaryKey, encryptedMessage, initVector) {
    const query = 'INSERT INTO messages(noteId, encryptedMessage, initVector) VALUES($1, $2, $3)';
    try {
      await this.client.query(query, [primaryKey, encryptedMessage, initVector]);
    } catch (e) {
      console.log('An error has occurred');
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
}

module.exports = new Database();
