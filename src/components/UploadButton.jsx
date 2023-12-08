import React from "react";

const UploadButton = ({ onChange, setSelectedFileName, selectedFileName,fileInputRef }) => {


  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const validateFile = (file) => {
    const maxSizeImage = 5 * 1024 * 1024;
    const maxSizeVideo = 20 * 1024 * 1024;

    if (file.size > maxSizeImage && file.type.startsWith("image/")) {
      alert("Please select a valid image file (max size: 5MB).");
      return false;
    }

    if (file.size > maxSizeVideo && file.type.startsWith("video/")) {
      alert("Please select a valid video file (max size: 20MB).");
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
      setSelectedFileName(null);
      return;
    }

    if (onChange) {
      onChange(selectedFiles);
    }

    setSelectedFileName(file.name);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleButtonClick}
        className=" px-3 py-1   outline outline-2 outline-slate-300 rounded-lg"
      >
        {selectedFileName ? "Change File" : "Upload File"}
      </button>
      <span className="ml-2">{selectedFileName}</span>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*,video/*"
        className="hidden"
      />
    </div>
  );
};

export default UploadButton;
