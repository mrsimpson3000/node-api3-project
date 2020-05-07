const express = require("express");

const router = express.Router();

const Users = require("./userDb");
const Posts = require("../posts/postDb");

router.post("/", validateUser, (req, res) => {
  Users.insert(req.body)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json({
        error: "There was an error while saving the user to the database.",
      });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  Posts.insert({
    ...req.body,
    user_id: req.params.id,
  })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "They was an error while saving the post to the database.",
      });
    });
});

// Gets all users (array)
router.get("/", (req, res) => {
  Users.get()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The users information could not be returned from the database.",
      });
    });
});

// Gets a single user by their id
router.get("/:id", validateUserId, (req, res) => {
  Users.getById(req.params.id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The user information could not be returned from the database.",
      });
    });
});

// Returns all the posts for the user identified by the id
router.get("/:id/posts", validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json({
        error:
          "The posts for the user specicified could not be returned from the database.",
      });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  Users.remove(req.params.id)
    .then((response) => {
      res.status(200).json({ message: "The specified user was deleted." });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The specified user could not be deleted." });
    });
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
// validate body on request to make a new post
function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
