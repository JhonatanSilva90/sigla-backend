import { Request, Response, NextFunction } from "express";
import { verifyToken, TokenPayload } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Token not provided" });
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer") {
      return res.status(401).json({ error: "Invalid token scheme" });
    }

    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    const decoded = verifyToken(token);
    req.user = decoded;

    next();
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
};
