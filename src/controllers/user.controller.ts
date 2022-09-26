import { NextFunction, Request, Response } from "express";
import roleService from "../services/role.service";
import { User } from "../entity/user.entity";
import ApiResponse from "../Response/ApiResponse";
import userService from "../services/user.service";
import { BadRequest } from "../Errors/errors";
import jwt from "jsonwebtoken";
import { DeepPartial } from "typeorm";
import Middleware from "../middlewares/Middleware";

const TOKEN_SECRET = "yash",
  REFRESH_TOKEN_SECRET = "reyash";

function getJwt(user: User) {
  const data = {
    id: user.id,
  };

  const accessToken = jwt.sign(data, TOKEN_SECRET!, {
    expiresIn: "10d",
  });

  const refreshToken = jwt.sign(data, REFRESH_TOKEN_SECRET!, {
    expiresIn: "30d",
  });

  return { accessToken, refreshToken };
}

class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName, roleType, email } = req.body;

      let role = await roleService.getRoleByType(roleType);

      let checkEmailExists = await userService.findByEmail(email);

      if (checkEmailExists) {
        const message = Middleware.setColor(
          `Email already exists ${email}`,
          Middleware.FgRed
        );
        console.log(message);

        throw new BadRequest(`Email already exists ${email}`, 401);
      }

      let user = User.create({
        firstName,
        lastName,
        role,
        email,
      });

      user = await userService.create(user);

      return ApiResponse.successResponse(res, user);
    } catch (error) {
      return next(error);
    }
  }

  async viewAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await User.find();

      return ApiResponse.successResponse(res, data);
    } catch (error) {
      return next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const user = await userService.findByEmail(email);
      if (!user) {
        throw new BadRequest("Invalid credentias", 401);
      }
      const jwt = getJwt(user);
      const filteredData: DeepPartial<User> = user;

      const data = {
        ...jwt,
        user: filteredData,
      };
      // return res.status(200).json({ success: true, data });

      return ApiResponse.successResponse(res, data);
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserController();
