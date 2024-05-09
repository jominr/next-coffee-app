"use server";
import { auth } from "@/lib/auth";
import { connectToDB } from "@/lib/utils";
import { ProfileInfoModel } from "@/models/ProfileInfo";
import mongoose from "mongoose";

export async function saveProfile(formData: FormData) {
  // await mongoose.connect(process.env.MONGODB_URI as string);
  connectToDB();
  const session = await auth();
  if (!session) throw new Error("you need to be logged in");
  const email = session.user?.email;
  
  const {
    username, displayName, bio, avatarUrl, coverUrl
  } = Object.fromEntries(formData);
  
  // document
  const profileInfoDoc = await ProfileInfoModel.findOne({email});
  if (profileInfoDoc) {
    profileInfoDoc.set({ username, displayName, bio, coverUrl, avatarUrl });
    await profileInfoDoc.save();
  } else {
    await ProfileInfoModel.create({ username, displayName, bio, email, coverUrl, avatarUrl });
  }
  return true;
}