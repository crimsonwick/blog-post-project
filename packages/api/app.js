import express from "express";
import User from "./src/routes/User.js";
import db from "./src/models/index.js";

const app = express();

app.use(express.json({ extended: true }));
app.use(express.json());

app.use("/user", User);

try {
  db.sequelize.authenticate();
  console.log("'project_database' is connected to the Server");
} catch {
  (err) => console.log("Error" + err);
}

const port = 4001;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
