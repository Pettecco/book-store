import mongoose from 'mongoose';

async function connectDatabase() {
  return mongoose.connect(process.env.DB_CONNECTION_STRING);
}

export default connectDatabase;
