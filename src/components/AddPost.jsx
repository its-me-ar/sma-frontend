import React, { lazy, useContext, useRef, useState } from "react";
import { UserContext } from "../App";
import { IoMdSend } from "react-icons/io";
import { addPost } from "../services/api.services";
import { LodaerContext } from "../Layouts/AppLayout";
import profileIcon from "../assets/profile.jpg";

const UploadButton = lazy(()=>import("./UploadButton"))

const AddPost = ({ refreshData }) => {
  const { userData } = useContext(UserContext);
  const { setShowLoader } = useContext(LodaerContext);
  const [forms, setFoms] = useState({});
  const [selectedFileName, setSelectedFileName] = useState(null);
  const fileInputRef = useRef(null);
  const hanldeFile = (file) => {
    setFoms({
      ...forms,
      file: file[0],
    });
  };
  const handleInput = (e) => {
    setFoms({
      ...forms,
      data: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    setShowLoader(true);
    event.preventDefault();
    if (forms.file || forms.data) {
      const formdata = new FormData();
      if (forms?.data) {
        formdata.append("data", forms?.data);
      }
      if (forms?.file) {
        formdata.append("file", forms?.file);
      }
      const res = await addPost(formdata);
      if (res?.status === 201) {
        setShowLoader(false);
        resetForms();
        refreshData();
      } else {
        setShowLoader(false);
        alert("Something went wrong, Please try again");
      }
    } else {
      setShowLoader(false);
      alert("Please share your thoughts");
    }
  };

  const resetForms = () => {
    setFoms({
      data: "",
      file: null,
    });
    fileInputRef.current.value = "";
    setSelectedFileName(null);
  };
  return (
    <div className="bg-white  rounded-md lg:p-10 p-5">
      <div className="flex flex-row items-center">
        <div>
          <img
            src={userData?.image ? userData?.image : profileIcon}
            alt=""
            className="w-[50px] h-[50px] rounded-full"
          />
        </div>
        <div className="ml-5">
          <p className="text-[18px] font-semibold">
            What's on you mind {userData?.name} ?
          </p>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="m-2">
            <textarea
              className="outline-none w-full ring-1 ring-slate-300 rounded-lg p-4"
              rows={2}
              placeholder="Share your thoughts"
              onChange={handleInput}
              value={forms?.data}
            />
          </div>
          <div className="flex flex-row justify-between">
            <div className="m-2">
              <UploadButton
                onChange={hanldeFile}
                setSelectedFileName={setSelectedFileName}
                selectedFileName={selectedFileName}
                fileInputRef={fileInputRef}
              />
            </div>
            <div className="m-2 ">
              <button
                className={` px-3 py-1 rounded ${
                  forms?.file || forms?.data
                    ? " hover:bg-blue-600 bg-blue-500 text-white"
                    : "cursor-not-allowed bg-gray-100 text-black "
                }`}
                type="submit"
                disabled={forms?.file || forms?.data ? false : true}
              >
                <div className="inline-flex items-center">
                  <span>Share</span> <IoMdSend className="ml-2" />
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
