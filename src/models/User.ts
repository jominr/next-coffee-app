import mongoose from "mongoose";

export type User = {
  username: string;
  email: string;
  password?: string;
  img?: string,
};

const userSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
  },
  img: {
    type: String,

  },
}, {timestamps: true});


export const User = mongoose.models?.User || mongoose.model<User>("User", userSchema);