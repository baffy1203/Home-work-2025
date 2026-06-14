import express from "express";
import bodyParser from "body-parser";

import { usersRouter } from "./src/routes/users.js";
import { articlesRouter } from "./src/routes/articles.js";
import { logger } from "./src/middlewares/logger.js";

const PORT = 3000;
const app = express();

app.use(logger);

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Get root route");
});

app.use(usersRouter);
app.use(articlesRouter);

app.listen(PORT, () => {
  console.log(
    "Server is started and listening port " + PORT
  );
});