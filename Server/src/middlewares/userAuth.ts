import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors, JwtPayload } from "jsonwebtoken";
import { UserPayLoad } from "../types";

function userAuth(req: Request, res: Response, next: NextFunction) {
  const { authToken } = req.cookies;
  if (!authToken) {
    res.status(401).json({ message: "Access denied. Login required." });
    return;
  }
  jwt.verify(
    authToken,
    process.env.JWT_SECRET!,
    (error: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (error) {
        res.status(401).json({ message: "Access denied. Login required." });
        return;
      }
      req.user = decoded as UserPayLoad;
      next()
    }
  );
}

export default userAuth;
