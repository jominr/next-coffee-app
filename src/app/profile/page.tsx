import ProfileInfoForm from "@/components/ProfileInfoForm";
import { auth } from "@/lib/auth";
import { connectToDB } from "@/lib/utils";
import { Donation, DonationModel } from "@/models/Donation";
import { ProfileInfoModel } from "@/models/ProfileInfo";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";

const ProfilePage = async () => {
  const session = await auth();
  if (!session || !session.user?.email) {
    return "Not logged in"
  }
  const email = session.user.email;
  connectToDB()
  // await mongoose.connect(process.env.MONGODB_URI as string);
  const profileInfoDoc = JSON.parse(JSON.stringify(await ProfileInfoModel.findOne({email})));
  
  const donations:Donation[] = await DonationModel.find({paid:true, email});
  const total = donations.reduce((current, d) => current + d.amount * 5, 0);

  return (
    <div className="max-w-2xl mx-auto px-4 mt-4">
      <ProfileInfoForm profileInfo={profileInfoDoc}/>
      <div className="bg-yellow-300/20 border-2 border-yellow-300 p-4 rounded-xl flex items-center gap-2 my-4 justify-between">
        <div className="flex items-center gap-2">
          Total money received: <span className="text-2xl">${total}</span>
        </div>
        <a
          className="bg-yellow-300 px-4 py-2 rounded-lg flex items-center gap-2"
          href="mailto:payouts@bmac.io">
          Request a payout
          <FontAwesomeIcon icon={faArrowRight} height="1rem"/>
        </a>
      </div>
    </div>
  );
};

export default ProfilePage;