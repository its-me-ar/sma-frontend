import React, { Suspense, lazy, useContext, useEffect, useState } from "react";
import AppLayout from "../Layouts/AppLayout";
import { UserContext } from "../App";
import Label from "../components/Label";
import Input from "../components/Input";
import { uploadPofile } from "../services/api.services";
import profileIcon from "../assets/profile.jpg";

const UpdatePassword = lazy(() => import("../components/UpdatePassword"));


const ProfilePicUploadButton = lazy(() =>
  import("../components/ProfilePicUploadButton")
);

const Profile = ({ setToken }) => {
  const { userData, token } = useContext(UserContext);
  const [edit, setEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [forms, setFoms] = useState({});
  const updateLocaldata = (user) => {
    setToken({ token: token, userInfo: user });
    window.location.reload();
  };

  useEffect(() => {
    setFoms({
      name: userData?.name,
      bio: userData?.bio,
    });
  }, [userData]);

  const onChange = (name, value) => {
    setFoms({
      ...forms,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (forms?.bio || forms?.name) {
      const formdata = new FormData();
      if (forms.name) {
        formdata.append("name", forms?.name);
      }
      if (forms.bio) {
        formdata.append("bio", forms?.bio);
      }
      const res = await uploadPofile(formdata, userData?._id);
      if (res?.status === 201) {
        updateLocaldata(res?.data?.user);
        setShowLoader(false);
      } else {
        setShowLoader(false);
        alert("Something went wrong, Please try again");
      }
    }
  };

  return (
    <AppLayout>
      <div className="lg:p-10 p-5">
        <div className="bg-white  rounded-md lg:p-10 p-5">
          <div className={`flex flex-col  items-center  `}>
            <div className="mb-8">
              <img
                src={userData?.image ? userData?.image : profileIcon}
                className="w-[100px] h-[100px] rounded-full"
                alt={userData?.name}
              />
            </div>
            <Suspense>
              <ProfilePicUploadButton
                updateLocaldata={updateLocaldata}
                userData={userData}
              />
            </Suspense>
          </div>
          <div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="mt-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    placeholder="Enter your name "
                    type="text"
                    name="name"
                    onChange={(e) => onChange("name", e.target.value)}
                    value={forms?.name}
                    disabled={!edit}
                    required
                  />
                </div>
                <div className="mt-2">
                  <Label htmlFor="Email">Email</Label>
                  <div className="w-full ring-1 ring-slate-200 rounded-[1px] px-3 py-1 bg-gray-300 cursor-not-allowed outline-none p-2 my-1 text-[14px]">
                    {userData?.email}
                  </div>
                </div>
                <div className="mt-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    placeholder="Enter your bio "
                    type="text"
                    value={forms?.bio}
                    disabled={!edit}
                    onChange={(e) => onChange("bio", e.target.value)}
                    name="bio"
                  />
                </div>

                <div className="mt-2 flex justify-between">
                  {edit ? (
                    <>
                      <button
                        className="px-3 py-1 bg-gray-500 text-white hover:bg-gray-600 rounded-sm"
                        onClick={() => setEdit(!edit)}
                        type={"button"}
                      >
                        Cancel
                      </button>

                      <button
                        className="px-3 py-1 bg-blue-500 text-white hover:bg-blue-600 rounded-sm"
                        type={"submit"}
                      >
                        Save Profile
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="px-3 py-1 bg-blue-500 text-white hover:bg-blue-600 rounded-sm"
                        onClick={() => setEdit(!edit)}
                        type={"button"}
                      >
                        Edit Profile
                      </button>
                      <button
                        className="px-3 py-1 bg-blue-500 text-white hover:bg-blue-600 rounded-sm"
                        onClick={() => setIsOpen(true)}
                        type={"button"}
                      >
                        Update Password
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <Suspense>
          <UpdatePassword
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            id={userData?._id}
          />
        </Suspense>
      )}
    </AppLayout>
  );
};

export default Profile;
