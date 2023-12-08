import React, { useContext, useEffect, useState } from "react";
import Input from "../components/Input";
import Label from "../components/Label";
import { Link } from "react-router-dom";
import { AuthLayout } from "../Layouts/AuthLayout";
import { useFormik } from "formik";
import { loginSchema } from "../validations/login";
import { loginUser } from "../services/api.services";

export const Login = ({ setToken }) => {
  const [error, setError] = useState(null);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const res = await loginUser(values);
      if (res?.status === 200 && res?.data?.token) {
        await setToken({ token: res?.data?.token, userInfo: res?.data?.user });
      } else {
        setError(res?.data?.message);
      }
    },
  });

  return (
    <AuthLayout>
      <div className="lg:w-[30%] md:w-[50%] w-full">
        <div className="flex flex-col p-10 mt-[20%]">
          <h1 className="text-[24px] font-semibold uppercase">Login</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit,
            consequuntur
          </p>
          <form onSubmit={formik.handleSubmit}>
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

            {error && <span className="text-red-500 text-[12px]">{error}</span>}
            <div className="mt-3 rounded-[1px]">
              <button
                className="w-full bg-blue-600 h-[32px] text-white"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>

          <Link to={"/sign-up"} className="text-[14px] mt-4 font-semibold">
            Create a Account ?
          </Link>
        </div>

        <p className="text-center mt-[20px] text-[12px]">
          Copyright &copy; {new Date().getFullYear()} SMA
        </p>
      </div>
    </AuthLayout>
  );
};
