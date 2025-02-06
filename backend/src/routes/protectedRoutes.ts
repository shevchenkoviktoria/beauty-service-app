import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: {
    role: string;
    id: string;
  };
}

export const authenticateUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    res.status(401).json({ message: "Access Denied: No Token Provided" });
    return;
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as AuthenticatedRequest["user"];
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
    return;
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    if (!req.user || !req.user.role) {
      res.status(403).json({ message: "Access Denied: User Role Not Found" });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res
        .status(403)
        .json({ message: "Access Denied: Insufficient Permissions" });
      return;
    }

    next();
  };
};
