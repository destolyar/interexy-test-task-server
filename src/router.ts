import { Router } from "express";
import { body } from "express-validator/src/middlewares/validation-chain-builders";
import UserController from "./controllers/UserController";

const router = Router();
router.post('/user/create',
  body('email').isEmail().notEmpty(),
  body('password').isLength({ min: 6, max: 32 }).notEmpty(),
  UserController.create);
router.post('/user/login',
  body('email').isEmail().notEmpty(),
  body('password').isLength({ min: 6, max: 32 }).notEmpty(),
  UserController.login)
router.post('/user/change', UserController.rewriteInfo) 
router.get('/user/:userId', UserController.getOne);

export default router;