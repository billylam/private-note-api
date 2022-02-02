const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');

class Database {
  // TODO: Replace the following with your app's Firebase project configuration
  constructor() {
    const firebaseConfig = {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
    };
    const firebase = initializeApp(firebaseConfig);
    this.database = getDatabase();
  }

  post() {
    set(ref(this.database, 'messages/shaprimarykey'), {
      message: 'sha message',
    });
  }
}

module.exports = new Database();
