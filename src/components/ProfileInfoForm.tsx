"use client";

import { saveProfile } from "@/app/actions/profileInfoActions";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UploadButton from "./UploadButton";
import { useState } from "react";
import { ProfileInfo } from "@/models/ProfileInfo";
import Image from "next/image";

type Props = {
  profileInfo: ProfileInfo | null;
}
const ProfileInfoForm = ({profileInfo} : Props) => {
  const [coverUrl, setCoverUrl] = useState(profileInfo?.coverUrl || '');
  const [avatarUrl, setAvatarUrl] = useState(profileInfo?.avatarUrl || '');

  async function handleFormAction(formData: FormData) {
    const result = await saveProfile(formData);
    console.log(result);
  }
  
  return (
    <form action={handleFormAction}>
      <div className="relative border bg-gray-100 h-48 rounded-lg mb-8">
        <Image className="w-full h-48 object-cover object-center rounded-lg " width={1024} height={1024} src={coverUrl} alt="cover img"/>

        <div className="absolute -bottom-4 left-4 border bg-gray-100 size-24 rounded-lg">
          <div className="size-24 rounded-lg overflow-hidden">
            <Image width={120} height={120} src={avatarUrl} alt="avartar"/>
          </div>
          
          <div className="absolute -bottom-2 -right-2">
            <UploadButton onUploadComplete={setAvatarUrl}/>
          </div>
          
          <input type="hidden" name="avatarUrl" value={avatarUrl}/>
        </div>
        <div className="absolute right-2 bottom-2">
          <UploadButton onUploadComplete={setCoverUrl}/>
          <input type="hidden" name="coverUrl" value={coverUrl}/>
        </div>

      </div>
      
      <div>
        <label className="block mt-4" htmlFor="usernameIn">username:</label>
        <input defaultValue={profileInfo?.username} name="username" id="usernameIn" type="text" placeholder="username"/>
      </div>
      <div>
        <label className="block mt-4" htmlFor="displayNameIn">display name:</label>
        <input defaultValue={profileInfo?.displayName} name="displayName" id="displayNameIn" type="text" placeholder="display name"/>
      </div>
      <div>
        <label className="block mt-4" htmlFor="bioIn">bio:</label>
        <textarea defaultValue={profileInfo?.bio} name="bio" id="bioIn" placeholder="bio" />
      </div>
      <div>
        <button className="bg-yellow-300 px-4 py-2 rounded-lg mt-4">Save profile</button>
      </div>
    </form>
  );
};

export default ProfileInfoForm;