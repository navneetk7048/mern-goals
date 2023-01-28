import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { HydratedDocument } from "mongoose";
import User, { IUser } from "../models/User.js";

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    ) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }

    try {
      const token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || ""
      ) as HydratedDocument<IUser, { createdAt: string }>;

      res.locals.user = (await User.findById(decoded._id).select(
        "-password"
      )) as HydratedDocument<IUser, { createdAt: string }>;

      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
);
