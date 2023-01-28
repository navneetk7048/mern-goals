import { Request, Response } from "express";

export const errorHandler = (err: any, _req: Request, res: Response) => {
  const statusCode = res.statusCode || 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
