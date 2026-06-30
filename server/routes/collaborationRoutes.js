const express = require("express");

const router = express.Router();

const {
  createGroup,
  getGroups,
  joinGroup,
  leaveGroup,
  deleteGroup,
} = require("../controllers/collaborationController");

router.post("/", createGroup);

router.get("/", getGroups);

router.post("/:id/join", joinGroup);

router.post("/:id/leave", leaveGroup);

router.delete("/:id", deleteGroup);

module.exports = router;