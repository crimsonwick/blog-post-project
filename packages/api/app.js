dotenv.config();
import express from 'express';
import User from './src/routes/User.js';
import Post from './src/routes/Post.js';
import Comment from './src/routes/Comment.js';
import db from './src/models/index.js';
import client from './src/config/elasticsearch.js';
import dotenv from 'dotenv';
import cors from 'cors';

class App {
  constructor(port, app) {
    this.port = port;
    this.app = app;
  }

  createServerFunction() {
    this.app.use(cors());
    this.app.use(express.json({ extended: true }));
    this.app.use('/users', User);
    this.app.use('/posts', Post);
    this.app.use('/comments', Comment);
    this.app.listen(process.env.PORT, () =>
      console.log(`Application is Running on Port:${process.env.PORT}`)
    );
  }
}

const server = new App(process.env.PORT, express());
client
  .info()
  .then(() => console.log('Application is Connected to ElasticSearch'))
  .catch((error) => console.error(error));
db.sequelize
  .authenticate()
  .then(() => console.log(`Application is Connected to ${process.env.DB_NAME}`))
  .catch((error) => console.log(error));

server.createServerFunction();
