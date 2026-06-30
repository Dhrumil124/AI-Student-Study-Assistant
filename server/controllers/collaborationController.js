const StudyGroup = require("../models/StudyGroup");

// Create Study Group
const createGroup = async (req, res) => {
  try {
    const { title, subject, description } = req.body;

    const group = await StudyGroup.create({
      title,
      subject,
      description,
      members: [],
    });

    res.status(201).json({
      message: "Study group created successfully.",
      data: group,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create study group.",
    });
  }
};

// Get All Study Groups
const getGroups = async (req, res) => {
  try {
    const groups = await StudyGroup.find().sort({
      createdAt: -1,
    });

    res.json(groups);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch study groups.",
    });
  }
};

// Join Study Group
const joinGroup = async (req, res) => {
  try {
    const { id } = req.params;

    const group = await StudyGroup.findById(id);

    if (!group) {
      return res.status(404).json({
        message: "Study group not found.",
      });
    }

    // Demo user (replace with logged-in user later)
    const username = "Student";

    if (!group.members.includes(username)) {
      group.members.push(username);
      await group.save();
    }

    res.json({
      message: "Joined study group successfully.",
      data: group,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to join study group.",
    });
  }
};

// Leave Study Group
const leaveGroup = async (req, res) => {
  try {
    const { id } = req.params;

    const group = await StudyGroup.findById(id);

    if (!group) {
      return res.status(404).json({
        message: "Study group not found.",
      });
    }

    const username = "Student";

    group.members = group.members.filter(
      (member) => member !== username
    );

    await group.save();

    res.json({
      message: "Left study group successfully.",
      data: group,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to leave study group.",
    });
  }
};

// Delete Study Group
const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;

    await StudyGroup.findByIdAndDelete(id);

    res.json({
      message: "Study group deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete study group.",
    });
  }
};

module.exports = {
  createGroup,
  getGroups,
  joinGroup,
  leaveGroup,
  deleteGroup,
};