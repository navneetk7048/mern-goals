import asyncHandler from "express-async-handler";
import Goal from "../models/goalModel.js";

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
export const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
export const setGoal = asyncHandler(async (req, res) => {
  const text = req.body.text;

  if (!text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const goal = await Goal.create({ user: req.user.id, text });

  res.status(201).json(goal);
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
export const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Logged in user is same as goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(
    req.params.id,
    { text: req.body.text },
    { new: true }
  );

  res.status(200).json(updatedGoal);
});

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
export const deleteGoal = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const goal = await Goal.findById(id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Logged in user is same as goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await goal.remove();

  res.status(200).json({ id });
});
