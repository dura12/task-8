"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = () => {
  const {register,handleSubmit, formState: { errors },watch,} = useForm<FormValues>();
  const [error, setError] = useState<string | null>(null);
  const route = useRouter()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
  ;
    setError(null);

    const response = await fetch("https://akil-backend.onrender.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: "user",
      }),
    });

    if (response.ok) {
    console.log("successful result")
    route.push(`/auth/verify?email=${data.email}`);
    const res = response.json
  
    } else {
      setError(" User already exist" );
    }
  };

  const password = watch("password");

  return (
    <div className="flex border border-indigo-400 items-center justify-center min-h-screen">
      <div className="p-10  border border-gray-200 rounded-lg w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-7 justify-center text-center">
          Sign Up Today!
        </h1>

        <button
          className="flex items-center w-full justify-center  py-4 mb-6 border border-gray-300 rounded-3xl "
        >
          <FcGoogle className=" size = {30} mr-5 " />
          Sign Up with Google
        </button>

        <div className="flex flex-col items-center justify-center my-6">
          
          <span className="px-4 text-gray-600">Or Sign Up with Email</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block p-2 text-lg"
            >
              Full Name
            </label>
            <input
              id="name"
              {...register("name", { required: "Full name is required" })}
              placeholder="Enter your name"
              type="text"
              className="w-full px-6  py-4 border border-gray-300 rounded-3xl"
            />
            {errors.name && (
              <p className="text-red-500 pl-10 text-sm ">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block p-2 text-lg"
            >
              Email
            </label>
            <input
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              placeholder="Enter email address"
              type="email"
                className="w-full px-6  py-4 border border-gray-300 rounded-3xl"
            />
            {errors.email && (
              <p className="text-red-500 pl-10 text-sm ">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
                 className="block p-2 text-lg"
            >
              Password
            </label>
            <input
              id="password"
              {...register("password", { required: "Password is required" })}
              type="password"
                className="w-full px-6  py-4 border border-gray-300 rounded-3xl"
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-red-500 pl-10 text-sm ">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
                className="p-2 block text-lg"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type="password"
               className="w-full px-6  py-4 border border-gray-300 rounded-3xl"
              placeholder="Confirm password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 pl-10 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full h-12 text-white bg-indigo-900 rounded-full"
          
          >
            Continue
          </button>
          {error && (
            <p className="text-red-400 text-sm text-center pl-6">{error}</p>
          )}
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/auth/login"
            className="text-indigo-700 pl-2 "
          >
            Login
          </a>
        </p>
        <p className="text-md text-gray-400">
          By clicking Continue , you acknowledge that you have read and
          accepted our <span className="text-indigo-800">Terms of Service</span>
          and <span className="text-indigo-800">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;