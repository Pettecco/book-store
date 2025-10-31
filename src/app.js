import express from 'express';
import connectDatabase from './config/dbConnect.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import routes from './routes/index.js';
import dotenv from 'dotenv';

dotenv.config();
const connection = await connectDatabase();

connection.on('error', console.log.bind(console, 'Connection error'));
connection.once('open', () => {
  console.log('Connected to the database successfully');
});

const app = express();
app.use(express.json());
routes(app);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
