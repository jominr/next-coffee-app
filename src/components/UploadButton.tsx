import { faPencil, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent } from "react";
import { uploadToS3 } from "@/app/actions/uploadAction";

type Props = {
  onUploadComplete: (url: string) => void;
}
const UploadButton = ({onUploadComplete} : Props) => {

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    if (target.files?.length) {
      console.log('upload this file');
      const file = target.files[0];
      const formData = new FormData;
      formData.set('file', file);
      const res = await uploadToS3(formData);
      onUploadComplete(res.url as string);
    }
  }

  return (
    <label className="bg-white shadow-sm shadow-black/30 p-2 cursor-pointer rounded-lg flex gap-1 items-center">
      <FontAwesomeIcon icon={faPencil} />
      <input name="" type="file" className="hidden" onChange={(e)=>upload(e)}/>
    </label>
  );
};

export default UploadButton;