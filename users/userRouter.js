const express = require("express");

const router = express.Router();

const Users = require("./userDb");
const Posts = require("../posts/postDb");

router.post("/", (req, res) => {
  // do your magic!
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  // do your magic!
});

router.get("/:id", (req, res) => {
  // do your magic!
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware
// validate user id
function validateUserId(req, res, next) {
  Users.getById(req.params.id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ message: "invalid user id" });
    });
}

// validate body of user as well as user name on request to create new user
function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
