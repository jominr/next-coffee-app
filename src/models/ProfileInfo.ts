import { Schema, model, models } from "mongoose";

export type ProfileInfo = {
  email: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  coverUrl: string;
};

const profileInfoSchema = new Schema<ProfileInfo>({
  email: {type: String, unique: true, required: true},
  username: {type: String, unique: true, required: true},
  displayName: {type: String},
  bio: {type: String},
  avatarUrl: {type:String},
  coverUrl: {type: String}
}, {timestamps: true});

// models?.ProfileInfo 先判断是否已存在，ProfileInfo是后面定义的这个名字
export const ProfileInfoModel = models?.ProfileInfo || model<ProfileInfo>('ProfileInfo', profileInfoSchema);
