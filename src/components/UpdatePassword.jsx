import React from "react";
import { useFormik } from "formik";
import Label from "./Label";
import Input from "./Input";
import { passwordSchema } from "../validations/password";
import { uploadPofile } from "../services/api.services";
import { logoutUser } from "../hooks/useToken";
import { useNavigate } from "react-router-dom";

const UpdatePassword = ({ isOpen, setIsOpen, id }) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
      cpassword: "",
    },
    validationSchema: passwordSchema,
    onSubmit: async (values) => {
      const formdata = new FormData();
      formdata.append("password", values?.password);
      const res = await uploadPofile(formdata, id);
      if (res?.status === 201) {
        logoutUser();
        alert("Password Changed, Please login");
        navigate("/");
      } else {
        alert("Something went wrong, Please try again");
      }
    },
  });

  return (
    <div
      className={`fixed inset-0 ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center`}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="z-10 w-96 p-6 bg-white rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Update your Password</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-2">
            <Label htmlFor="Password">Password</Label>
            <Input
              placeholder="Enter your password"
              type="password"
              required
              name="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <span className="text-red-500 text-[12px]">
                {formik.errors.password}
              </span>
            ) : null}
          </div>

          <div className="mt-2">
            <Label htmlFor="Password">Confirm Password</Label>
            <Input
              placeholder="Enter your password"
              type="password"
              required
              name="cpassword"
              {...formik.getFieldProps("cpassword")}
            />
            {formik.touched.cpassword && formik.errors.cpassword ? (
              <span className="text-red-500 text-[12px]">
                {formik.errors.cpassword}
              </span>
            ) : null}
          </div>

          <div className="mt-3 rounded-[1px] flex justify-between">
            <button
              className="px-3 py-1 bg-gray-600  text-white"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              Discard
            </button>
            <button className="px-3 py-1 bg-blue-600  text-white" type="submit">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
