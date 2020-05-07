const express = require("express");

const postRouter = require("./posts/postRouter");

const userRouter = require("./users/userRouter");

const server = express();

server.get("/", logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use("/api/users", logger, userRouter);

server.use("/api/posts", logger, postRouter);

//custom middleware

function logger(req, res, next) {
  console.log(`${Date()} ${req.method} to ${req.url}`);
}

module.exports = server;
