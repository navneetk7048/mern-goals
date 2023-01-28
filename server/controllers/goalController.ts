import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Goal from "../models/Goal.js";

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
export const getGoals = asyncHandler(async (_req: Request, res: Response) => {
  const goals = await Goal.find({ user: res.locals.user.id });

  res.status(200).json(goals);
});

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
export const setGoal = asyncHandler(async (req: Request, res: Response) => {
  const { text } = req.body;

  if (!text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const goal = await Goal.create({ user: res.locals.user.id, text });

  res.status(201).json(goal);
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
export const updateGoal = asyncHandler(async (req: Request, res: Response) => {
  const goal = await Goal.findById(req.params.id);
  const { text } = req.body;

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  if (!res.locals.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Logged in user is same as goal user
  if (goal.user.toString() !== res.locals.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(
    req.params.id,
    { text },
    { new: true }
  );

  res.status(200).json(updatedGoal);
});

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
export const deleteGoal = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;

  const goal = await Goal.findById(id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  if (!res.locals.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Logged in user is same as goal user
  if (goal.user.toString() !== res.locals.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await goal.remove();

  res.status(200).json({ id });
});
