import express from "express";

export const usersRouter = express.Router();

usersRouter.route("/users")
  .get((req, res) => {
    res.send("Get users route");
  })
  .post((req, res) => {
    res.send("Post users route");
  });

usersRouter.route("/users/:userId")
  .get((req, res) => {
    res.send(`Get user by Id route: ${req.params.userId}`);
  })
  .put((req, res) => {
    res.send(`Put user by Id route: ${req.params.userId}`);
  })
  .delete((req, res) => {
    res.send(`Delete user by Id route: ${req.params.userId}`);
  });