import { StatusCodes } from "http-status-codes";
import { ApiError } from "../error/ApiError";
import { verifyAccessToken } from "../helper/jwtHelper";
import { NextFunction, Request, Response } from "express";

const auth =
  (...allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized access');
      }

      const token = authHeader.split(' ')[1];
      const decodedUser = verifyAccessToken(token);
        // @ts-ignore
      req.user = decodedUser;
      console.log(decodedUser)

      if (allowedRoles.length && !allowedRoles.includes(decodedUser.role)) {
        throw new ApiError(StatusCodes.FORBIDDEN, 'Forbidden: Access denied');
      }

      next();
    } catch (err) {
      next(err);
    }
  };

export default auth;