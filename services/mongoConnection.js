import { MongoClient } from 'mongodb';
import { config } from '../config/config.js';

const mongoClient = new MongoClient(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

export const connectToMongoDB = async () => {
  try {
    if (!db) {
      await mongoClient.connect();
      db = mongoClient.db('takeHomeDB');
      console.log("Connected to DB");
    }
    return db;
  } catch (error) {
    console.error('Error with DB', error);
  }
};
