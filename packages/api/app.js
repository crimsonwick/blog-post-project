dotenv.config();
import express from 'express';
import User from './src/routes/User.js';
import Post from './src/routes/Post.js';
import Comment from './src/routes/Comment.js';
import Pagination from './src/routes/Pagination.js';
import db from './src/models/index.js';
import client from './src/config/elasticsearch.js';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json({ extended: true }));
app.use('/user', User);
app.use('/post', Post);
app.use('/comment', Comment);
app.use('/pagination', Pagination);
module.exports = app;
client
  .info()
  .then(() => console.log('Application is Connected to ElasticSearch'))
  .catch((error) => console.error(error));
db.sequelize
  .authenticate()
  .then(() => console.log(`Application is Connected to ${process.env.DB_NAME}`))
  .catch((error) => console.log(error));
app.listen(process.env.PORT, () =>
  console.log(`Application is Running on Port:${process.env.PORT}`)
);
