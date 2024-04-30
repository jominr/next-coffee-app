import ProfileInfoForm from "@/components/ProfileInfoForm";
import { auth } from "@/lib/auth";
import { ProfileInfoModel } from "@/models/ProfileInfo";
import mongoose from "mongoose";

const ProfilePage = async () => {
  const session = await auth();
  if (!session || !session.user?.email) {
    return "Not logged in"
  }
  const email = session.user.email;
  await mongoose.connect(process.env.MONGODB_URI as string);
  const profileInfoDoc = JSON.parse(JSON.stringify(await ProfileInfoModel.findOne({email})));
  return (
    <div className="max-w-2xl mx-auto px-4">
      <ProfileInfoForm profileInfo={profileInfoDoc}/>
      <div>donations list</div>
    </div>
  );
};

export default ProfilePage;