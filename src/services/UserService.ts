import { isValidObjectId } from "mongoose";
import type { UserInterface } from "../sсhemas/UserSchema";
import UserSchema from "../sсhemas/UserSchema";
import bcrypt from 'bcrypt'
import ApiError from "../exceptions/api-error";


class UserService {
  async create(userData: UserInterface) {
    const { email, password } = userData;

    const candidate = await UserSchema.findOne({ email })

    if (candidate) {
      throw ApiError.Conflict(`User with ${email} email already exists`)
    }

    const hashedPassword = bcrypt.hashSync(password, 6)

    const createdUser = await UserSchema.create({ email, password: hashedPassword, bio: null });
    return createdUser;
  }

  async login({ email, password }: { email: string, password: string }) {
    const candidate = await UserSchema.findOne({ email })

    if (!candidate) {
      throw ApiError.NotFound(`User with ${email} not exists`)
    }

    const isPasswordCorrect = bcrypt.compareSync(password, candidate.password)
    if(!isPasswordCorrect) {
      throw ApiError.Forbidden("Password is incorrect")
    }

    return candidate
  }

  async rewrite(userId: string, email: string, password: string, bio: string = "Bio!!!") {
    const isObjectId = isValidObjectId(userId)

    if(!isObjectId) {
      throw ApiError.BadRequest("Not valid ObjectId")
    }

    const findedUser = await UserSchema.findById(userId);
    if(!findedUser) {
      throw ApiError.NotFound("User not found")
    }

    const isEmailFree = await UserSchema.findOne({email})
    if(!isEmailFree) {
      throw ApiError.NotFound(`User with email ${email} already exists`)
    }

    const hashedPassword = bcrypt.hashSync(password, 6)

    const updatedUser = UserSchema.findByIdAndUpdate(userId, {
      email: email,
      password: hashedPassword,
      bio: bio
    })

    return updatedUser
  }

  async getOne(userId: string) {
    const isObjectId = isValidObjectId(userId)
    if(!isObjectId) {
      throw ApiError.BadRequest("Not valid ObjectId")
    }

    const findedUser = await UserSchema.findById(userId);
    if(!findedUser) {
      throw ApiError.NotFound("User not found")
    }

    return findedUser;
  }
}

export default new UserService;