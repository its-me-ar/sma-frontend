import React, { useContext, useRef } from "react";
import { LodaerContext } from "../Layouts/AppLayout";
import { uploadPofile } from "../services/api.services";

const ProfilePicUploadButton = ({ updateLocaldata,userData }) => {
  const fileInputRef = useRef(null);
  const { setShowLoader } = useContext(LodaerContext);
  const onChange = async (file) => {
    if (file[0]) {
      setShowLoader(true);
      const formData = new FormData();
      formData.append("file", file[0]);
      const res = await uploadPofile(formData, userData?._id);
      if (res?.status === 201) {
        updateLocaldata(res?.data?.user);
        setShowLoader(false);
      } else {
        setShowLoader(false);
        alert("Something went wrong, Please try again");
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const validateFile = (file) => {
    const maxSizeImage = 1 * 1024 * 1024;
    if (file.size > maxSizeImage && file.type.startsWith("image/")) {
      alert("Please select a valid image file (max size: 1MB).");
      return false;
    }

    return true;
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;

    if (selectedFiles.length === 0) {
      return;
    }

    const file = selectedFiles[0];

    if (!validateFile(file)) {
      fileInputRef.current.value = "";
      return;
    }

    if (onChange) {
      onChange(selectedFiles);
    }
  };

  return (
    <div className="mt-[-20px]">
      <button
        type="button"
        onClick={handleButtonClick}
        className=" px-3 py-1   outline outline-1 outline-slate-300 rounded-md"
      >
        Upload Image
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default ProfilePicUploadButton;
