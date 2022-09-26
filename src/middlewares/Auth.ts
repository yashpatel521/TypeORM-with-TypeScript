import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import userService from "../services/user.service";
import { message } from "../Errors/errorMessage";
import { BadRequest, InternalServerError } from "../Errors/errors";
import ApiResponse from "../Response/ApiResponse";
import { AuthRequest, roles, roleType } from "../types/types";

interface JWT_DECODE {
  id: number;
  iat: number;
  exp: number;
}

const TOKEN_SECRET = "yash",
  REFRESH_TOKEN_SECRET = "reyash";

export const Auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader
      ? authHeader.includes("Bearer")
        ? authHeader.split(" ")[1]
        : null
      : null;
    if (!token) {
      throw new BadRequest("Unauthorized / no token found", 400);
      // return ApiResponse.unAuthorizedResponse(
      //   res,
      //   "Unauthorized / no token found"
      // );
    } else {
      const data = jwt.verify(token, TOKEN_SECRET!) as JWT_DECODE;

      const user = await userService.findById(data.id);

      if (!user) {
        throw new BadRequest("Unauthorized !");
        // return ApiResponse.unAuthorizedResponse(res, message.unAuthorized);
      }

      req.user = user;

      next();
    }
  } catch (error) {
    next(error);
    // return ApiResponse.internalServerError(res, error);
  }
};

// export const checkStaffRole = (role: Role): boolean => {
//   return role.name === roles.employee || role.name === roles.manger;
// };

// export const isRole = (role: roleType) => {
//   return (req: AuthRequest, _res: Response, next: NextFunction) => {
//     if (
//       !req.user ||
//       !(req.user.role instanceof Role) ||
//       req.user.role.name !== role
//     ) {
//       throw new BadRequest("Unauthorized !");
//     }
//     next();
//   };
// };
// export const isRoles = (roles: roleType[]) => {
//   return (req: AuthRequest, _res: Response, next: NextFunction) => {
//     roles.forEach((role) => {
//       if (
//         !req.user ||
//         !(req.user.role instanceof Role) ||
//         req.user.role.name !== role
//       ) {
//         throw new BadRequest("Unauthorized !");
//       }
//     });
//     next();
//   };
// };
