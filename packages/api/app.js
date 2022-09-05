import express from "express";
import Authorize from "./src/routes/Authorize.js";
import Authenticate from './src/routes/Authenticate.js';
import Post from './src/routes/Post.js';
import Comment from './src/routes/Comment.js';
import Pagination from './src/routes/Pagination.js';
import db from "./src/models/index.js";

const app = express();
app.use(express.json({ extended: true }));
app.use(express.json());
app.use("/user", Authorize);
app.use("/authenticate",Authenticate);
app.use("/post",Post);
app.use("/comment",Comment);
app.use("/paginate",Pagination);
const port = 5000;
db.sequelize.authenticate().then(() => console.log(`Connected to db`)).catch((error) => console.log(error));
app.listen(port,() => console.log(`App running on Port :  ${port}`));
