import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const LogIn = () => {
  const theme = useTheme();
  const navigate = useNavigate(); // For redirecting
  const [error, setError] = useState(""); // For error messages

  const formik = useFormik({
    initialValues: {
      emailOrUsername: "",
      password: "",
    },
    onSubmit: (values) => {
      // Simulate login without backend
      if (values.emailOrUsername && values.password) {
        console.log("Logging in with:", values);
        navigate("/home"); // Redirect to home
      } else {
        setError("Please fill in all fields.");
      }
    },
  });

  return (
    <div
      className="h-screen w-full flex flex-col justify-center items-center font-poppins"
      style={{ backgroundColor: theme.palette.background }}
    >
      <div
        className="mt-8 flex flex-col justify-center items-center"
        style={{ color: theme.palette.primary.main }}
      >
        <h1 className="text-5xl p-1 font-medium">Welcome Back!</h1>
        <h2 className="text-3xl p-1">Log In to continue</h2>
      </div>
      <div className="h-[50%] flex justify-center items-center">
        <div className="p-5 rounded-xl w-full flex mx-5 gap-6">
          <div className="w-full flex gap-6 flex-col justify-center items-center">
            <form
              className="flex w-full flex-col justify-center"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex w-full flex-col">
                <label
                  className="m-2 text-lg"
                  htmlFor="emailOrUsername"
                  style={{ color: theme.palette.primary.main }}
                >
                  Email or Username
                </label>
                <input
                  className="p-2 w-full border-solid border-[1.5px] rounded-md placeholder:text-sm focus:outline-none"
                  style={{
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.text.primary,
                  }}
                  type="text"
                  id="emailOrUsername"
                  name="emailOrUsername"
                  placeholder="Enter your email or username"
                  onChange={formik.handleChange}
                  value={formik.values.emailOrUsername}
                />
              </div>

              <div className="flex flex-col">
                <label
                  className="m-2 text-lg"
                  htmlFor="password"
                  style={{ color: theme.palette.primary.main }}
                >
                  Password
                </label>
                <input
                  className="p-2 w-full border-solid border-[1.5px] rounded-md placeholder:text-sm focus:outline-none"
                  style={{
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.text.primary,
                  }}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </div>
              <div className="mt-4 flex w-full">
                <Link
                  to="/home"
                  className="font-medium flex justify-center w-full p-2 rounded-md transition-colors"
                  style={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                  }}
                >
                  LOG IN
                </Link>
              </div>
            </form>
            <div>
              <p className="text-md" style={{ color: theme.palette.text.secondary }}>
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  style={{
                    color: theme.palette.primary.main,
                  }}
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default LogIn;