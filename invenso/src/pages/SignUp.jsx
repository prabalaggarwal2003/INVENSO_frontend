import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles"; // Import theme

const SignUp = () => {
  const theme = useTheme(); // Access theme
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      enrolmentNo: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      // Replace API call with console log or placeholder action
      console.log("Form submitted:", values);
      setTimeout(() => {
        alert("Account creation simulated!");
        navigate("/home"); // Navigate to /home
        setLoading(false);
      }, 1000); // Simulate a delay for user feedback
    },
  });

  const inputFields = [
    {
      id: "firstName",
      name: "firstName",
      placeholder: "First Name",
      type: "text",
    },
    {
      id: "lastName",
      name: "lastName",
      placeholder: "Last Name",
      type: "text",
    },
    {
      id: "email",
      name: "email",
      placeholder: "Enter your email address",
      type: "text",
    },
    {
      id: "phone",
      name: "phone",
      placeholder: "Enter your phone number",
      type: "text",
    },
    {
      id: "enrolmentNo",
      name: "enrolmentNo",
      placeholder: "Enter your Enrolment No./Teacher ID",
      type: "text",
    },
    {
      id: "password",
      name: "password",
      placeholder: "Enter your password",
      type: "password",
    },
    {
      id: "confirmPassword",
      name: "confirmPassword",
      placeholder: "Confirm your password",
      type: "password",
    },
  ];

  // const currentYear = new Date().getFullYear();
  // const passingYears = Array.from(
  //   { length: currentYear - 2010 },
  //   (_, i) => 2011 + i
  // );

  return (
    <div
      className="w-full flex flex-col justify-center items-center font-poppins"
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <div
        className="mt-10 flex flex-col justify-center items-center"
        style={{ color: theme.palette.primary.main }}
      >
        <h1 className="text-5xl p-1 font-medium">Sign Up to report!</h1>
      </div>
      <div className="h-full flex justify-center">
        <div
          className="h-1/2 flex m-5"
          
        >
          <div className="w-full flex flex-col justify-center items-center p-5">
            <form
              className="flex flex-col justify-center"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex flex-col">
                <label
                  className="m-2 text-lg"
                  htmlFor="Name"
                  style={{ color: theme.palette.primary.main }}
                >
                  Name
                </label>
                <div className="flex gap-2">
                  {inputFields.slice(0, 2).map((field) => (
                    <input
                      key={field.id}
                      className="p-2 border-solid border-[1.5px] rounded-md placeholder:text-sm focus:outline-none"
                      style={{
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.text.primary,
                      }}
                      type={field.type}
                      id={field.id}
                      name={field.name}
                      placeholder={field.placeholder}
                      onChange={formik.handleChange}
                      value={formik.values[field.name]}
                    />
                  ))}
                </div>
              </div>
              {inputFields.slice(2).map((field) => (
                <div key={field.id} className="flex flex-col">
                  <label
                    className="m-2 text-lg"
                    htmlFor={field.id}
                    style={{ color: theme.palette.primary.main }}
                  >
                    {field.placeholder}
                  </label>
                  <div className="flex gap-2">
                    <input
                      className="p-2 w-full border-solid border-[1.5px] rounded-md placeholder:text-sm focus:outline-none"
                      style={{
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.text.primary,
                      }}
                      type={field.type}
                      id={field.id}
                      name={field.name}
                      placeholder={field.placeholder}
                      onChange={formik.handleChange}
                      value={formik.values[field.name]}
                    />
                  </div>
                </div>
              ))}
              {/* <div className="flex flex-col">
                <label
                  className="m-2 text-lg"
                  htmlFor="passingYear"
                  style={{ color: theme.palette.primary.main }}
                >
                  Passing Year
                </label>
                <select
                  className="p-2 w-full border-solid border-[1.5px] rounded-md focus:outline-none"
                  style={{
                    borderColor: theme.palette.primary.main,
                    color: formik.values.passingYear
                      ? theme.palette.text.primary
                      : "#9CA3AF",
                  }}
                  id="passingYear"
                  name="passingYear"
                  onChange={formik.handleChange}
                  value={formik.values.passingYear}
                >
                  <option
                    value=""
                    disabled
                    hidden
                    style={{ color: "#9CA3AF" }}
                  >
                    Select your passing year
                  </option>
                  {passingYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div> */}
              <div className="mt-4 flex w-full">
                <button
                  type="submit"
                  className="font-medium flex justify-center w-full p-2 rounded-md transition-colors"
                  style={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SignUp;