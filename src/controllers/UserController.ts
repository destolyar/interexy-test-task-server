import type { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator';
import ApiError from '../exceptions/api-error';
import UserService from '../services/UserService';
import type { UserInterface } from '../sсhemas/UserSchema';
import dotenv from "dotenv";

dotenv.config();

class UserContoller {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error while creating user"))
      }

      const { email, password }: UserInterface = req.body;

      const createdUser = await UserService.create({ email, password, bio: null });

      res.json({ message: `User ${email} succesfully registred`, user: createdUser, success: true });
    } catch (e) {
      next(e);
    };
  };

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      const user = await UserService.login({ email, password })

      res.json({ message: `User ${email} succesfully logined`, user, success: true });
    } catch (e) {
      next(e)
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      if (!userId) {
        return next(ApiError.BadRequest("User id is not defined"))
      }

      const user = await UserService.getOne(userId);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async rewriteInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, email, password, bio } = req.body;
      const newUserInfo = await UserService.rewrite(userId, email, password, bio)
      res.json({message: "User succesfully updated", newUserInfo, success: true})
    } catch (e) {
      next(e)
    }

  }
};

export default new UserContoller();