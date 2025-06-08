import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { type DecodedTokenT } from "../types/decodedToken.type";
import { type UserTokenT } from "../types/userToken";

export const handleAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ ok: false, message: "Unauthorized" });
    }

    const token = authorization?.split(" ")[1] || "";

    if (!token) {
      return res.status(401).json({ ok: false, message: "Unauthorized" });
    }

    const decoded = jwt.decode(token);

    if (!decoded || typeof decoded !== "object") {
      throw new Error("Invalid token");
    }

    const decodedToken = decoded as DecodedTokenT;

    if (!decodedToken.sub || !decodedToken.email) {
      return res.status(401).json({ ok: false, message: "Unauthorized" });
    }

    const requestWithUser = req as Request & {
      user: UserTokenT;
    };

    requestWithUser.user = {
      sub: decodedToken.sub,
      email: decodedToken.email,
    };

    next();
  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};
