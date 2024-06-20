import DonationForm from "@/components/DonationForm";
import DonationStatus from "@/components/DonationStatus";
import { connectToDB } from "@/lib/utils";
import { Donation, DonationModel } from "@/models/Donation";
import { ProfileInfo, ProfileInfoModel } from "@/models/ProfileInfo";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import Image from "next/image";

type Props = {
  params: {
    username: string;

  };
};

const SingleProfilePage = async ({params}: Props) => {
  const username = params.username;
  connectToDB()
  // await mongoose.connect(process.env.MONGODB_URI as string)
  // 不区分大小写的检索
  const profileInfoDoc : ProfileInfo | null = await ProfileInfoModel.findOne({username}).collation({ locale: 'en', strength: 2 })
  if (!profileInfoDoc) {
    return (
      <div>404 - profile not found</div>
    )
  }
  const donations: Donation[] = await DonationModel.find({paid: true, email: profileInfoDoc.email});
  return (
    <div>
      <DonationStatus />
      <div className="w-full h-48 bg-blue-400">
        <Image className="object-cover object-center h-48" width={2048} height={1024} src={profileInfoDoc.coverUrl} alt="cover img"/>
      </div>

      <div className="max-w-3xl px-2 mx-auto relative -mt-16">

        <div className="flex items-end gap-3">
        
          <div className="size-36 overflow-hidden bg-gray-100 rounded-xl border-2 border-white">
            <Image className="size-36 object-cover object-center rounded-xl" width={256} height={256} src={profileInfoDoc.avatarUrl} alt="avatar"/>
          </div>

          <div className="mb-1">
            <h1 className="text-3xl font-semibold">{profileInfoDoc.displayName}</h1>
            <h2 className="flex gap-1 items-center">
              <FontAwesomeIcon icon={faCoffee} height="1rem"/>
              <span>/</span>
              <span>{profileInfoDoc.username}</span>
            </h2>
          </div>

        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold">About {profileInfoDoc.username}</h3>

            {profileInfoDoc.bio}

            <hr className="my-4"/>

            <h3 className="font-semibold">Recent supporters</h3>
            
            {!donations.length && (
              <>
                <p>No recent donations</p>
              </>
              
            )}
            {donations.length && donations.length > 0 ? (
              <div className="mt-2">
                {donations.map((donation, idx) => (
                  <div className="py-2" key={idx}>
                    <h3>
                      <span className="font-semibold">{donation.name}</span>
                      {' '}
                      <span className="text-gray-400">
                        bought you {donation.amount > 1 ? donation.amount + ' coffees' : 'a coffee'}
                      </span>
                    </h3>
                    <p className="bg-gray-100 p-2 rounded-md">
                      {donation.message || 'No message left'}
                    </p>
                  </div>
                ))}
              </div>
            ): null}
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <DonationForm email={profileInfoDoc.email}/>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default SingleProfilePage;