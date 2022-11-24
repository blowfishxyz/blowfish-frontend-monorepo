import { Request, Response } from "express";

export const healthHandler = async (req: Request, res: Response) => {
  res.status(200).json({ status: "I'm gucci" });
};
