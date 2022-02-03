const { Client } = require('pg');

// Schema
// noteId_tx varchar(255) (primary key)
// encryptedMessage_tx varchar(255)
// initVector_tx varchar(255)
// readerIP_tx varchar(16)
// read_bt boolean
// destroyed_bt boolean
// timestamp created
// timestamp destroyed
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

  post() {
    this.client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
      if (err) throw err;
      for (let row of res.rows) {
        console.log(JSON.stringify(row));
      }
      this.client.end();
    });
  }
}

module.exports = new Database();
