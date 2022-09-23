import express from 'express';
import User from './src/routes/User.js';
import Post from './src/routes/Post.js';
import Comment from './src/routes/Comment.js';
import Pagination from './src/routes/Pagination.js';
import db from './src/models/index.js';
import client from './src/config/elasticsearch.js';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ extended: true }));
app.use('/user', User);
app.use('/post', Post);
app.use('/comment', Comment);
app.use('/pagination', Pagination);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../portal/src/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
app.post('/image', upload.single('file'), function (req, res) {
  res.json({ image: req.file.originalname });
});

client
  .info()
  .then(() => console.log('Application is Connected to ElasticSearch'))
  .catch((error) => console.error(error));
db.sequelize
  .authenticate()
  .then(() => console.log(`Connected to db`))
  .catch((error) => console.log(error));
app.listen(process.env.PORT, () =>
  console.log(`Application is running on Port:${process.env.PORT}`)
);
