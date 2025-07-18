import { Request, Response, NextFunction } from "express";

function verifyUserRegistration(req: Request, res: Response, next: NextFunction) {
  const { firstName, lastName, userName, email, password } = req.body;
  if (!firstName || !lastName || !userName || !email || !password) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }
  next();
}

export default verifyUserRegistration;
