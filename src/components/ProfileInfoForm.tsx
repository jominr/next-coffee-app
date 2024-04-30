"use client";

import { saveProfile } from "@/app/actions/profileInfoActions";
import { faSave, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UploadButton from "./UploadButton";
import { useState } from "react";
import { ProfileInfo } from "@/models/ProfileInfo";
import Image from "next/image";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";

type Props = {
  profileInfo: ProfileInfo | null;
}
const ProfileInfoForm = ({profileInfo} : Props) => {
  const [coverUrl, setCoverUrl] = useState(profileInfo?.coverUrl || '');
  const [avatarUrl, setAvatarUrl] = useState(profileInfo?.avatarUrl || '');

  async function handleFormAction(formData: FormData) {
    await saveProfile(formData);
    toast.success('Profile saved!')

    /**
      const savePromise = new Promise<void>(async (resolve, reject)=>{
        await saveProfile(formData);
        resolve();
      })
      await toast.promise(
        savePromise, 
        {
          loading: 'Saving',
          success: <b>Profile saved!</b>,
          error: <b>Could not save</b>,
        }
      )
     */
    
  }
  
  return (
    <form action={handleFormAction}>
      <div className="relative border bg-blue-500 h-48 rounded-lg mb-4">
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

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="input-label">username:</label>
          <input defaultValue={profileInfo?.username} name="username" id="usernameIn" type="text" placeholder="username"/>
        </div>
        <div>
          <label className="input-label">display name:</label>
          <input defaultValue={profileInfo?.displayName} name="displayName" id="displayNameIn" type="text" placeholder="display name"/>
        </div>
      </div>
      
      <div>
        <label className="input-label" htmlFor="bioIn">bio:</label>
        <textarea defaultValue={profileInfo?.bio} name="bio" id="bioIn" placeholder="bio" />
      </div>

      <div className="flex justify-between">
        <button className="bg-yellow-300 px-4 py-2 rounded-lg mt-4 flex gap-2 items-center">
          <FontAwesomeIcon icon={faSave}/>
          Save profile
        </button>

        <button
          className="bg-gray-300 border border-gray-300 px-4 py-2 rounded-lg mt-4"
          onClick={() => signOut()}
          type="button"
        >
          Logout
        </button>
        
      </div>
    </form>
  );
};

export default ProfileInfoForm;