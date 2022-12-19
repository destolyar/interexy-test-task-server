import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {type: String, requided: true},
  password: {type: String, required: true},
  bio: {type: String, required: false}
});

export interface UserInterface {
  email: string,
  password: string,
  bio: string | null
};

export default mongoose.model('User', UserSchema);
