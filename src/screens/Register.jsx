import React, { useState } from "react";
import { AuthLayout } from "../Layouts/AuthLayout";
import Label from "../components/Label";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registerSchema } from "../validations/register";
import { registerUser } from "../services/api.services";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      cpassword: "",
      name:""
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      const res = await registerUser({
        email: values.email,
        password: values.password,
        name:values.name
      });
      if (res?.status === 201) {
        alert("Register successful, please login.");
        navigate("/");
      } else {
        setError(res?.data?.message);
      }
    },
  });
  return (
    <AuthLayout>
      <div className="lg:w-[30%] md:w-[50%] w-full">
        <div className="flex flex-col p-10 mt-[20%]">
          <h1 className="text-[24px] font-semibold uppercase">
            Create a new account
          </h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit,
            consequuntur
          </p>
          <form onSubmit={formik.handleSubmit}>
          <div className="mt-2">
              <Label htmlFor="name">Name</Label>
              <Input
                placeholder="Enter your name "
                type="name"
                required
                name="name"
                onClick={() => setError("")}
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <span className="text-red-500 text-[12px]">
                  {formik.errors.name}
                </span>
              ) : null}
            </div>
            <div className="mt-2">
              <Label htmlFor="Email">Email</Label>
              <Input
                placeholder="Enter your email "
                type="email"
                required
                name="email"
                onClick={() => setError("")}
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <span className="text-red-500 text-[12px]">
                  {formik.errors.email}
                </span>
              ) : null}
            </div>
            <div className="mt-2">
              <Label htmlFor="Password">Password</Label>
              <Input
                placeholder="Enter your password"
                type="password"
                required
                name="password"
                onClick={() => setError("")}
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
                onClick={() => setError("")}
                {...formik.getFieldProps("cpassword")}
              />
              {formik.touched.cpassword && formik.errors.cpassword ? (
                <span className="text-red-500 text-[12px]">
                  {formik.errors.cpassword}
                </span>
              ) : null}
            </div>
            {error && <span className="text-red-500 text-[12px]">{error}</span>}
            <div className="mt-3 rounded-[1px]">
              <button
                className="w-full bg-blue-600 h-[32px] text-white"
                type="submit"
              >
                Sign Up
              </button>
            </div>
            <Link to={"/"} className="text-[14px] mt-4 font-semibold">
              Already have account?
            </Link>
          </form>
        </div>

        <p className="text-center mt-[20px] text-[12px]">
          Copyright &copy; {new Date().getFullYear()} SMA
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;
