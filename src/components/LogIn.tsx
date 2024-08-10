'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';

type Formvalues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<Formvalues>();
  const [error, seterror] = useState<string>('');

  const onSubmit: SubmitHandler<Formvalues> = async (values) => {
    try {
      const response = await fetch('https://akil-backend.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        seterror('An error occurred');
        return;
      }

      const result = await response.json();
      const res = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      

      if (res?.ok) {
        console.log("logged in");
        router.push("/auth/welcome");
      } else {

        console.error('Sign in failed');
      }
    } catch (error) {
      console.error('An unexpected error occurred', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-12 rounded-lg w-full max-w-lg border border-dashed  border-gray-200">
        <h1 className="text-4xl font-bold mb-7 text-center">Welcome Back,</h1>

        <button
          className="flex items-center w-full justify-center py-4 mb-6 border border-gray-300 rounded-3xl"
        >
          <FcGoogle className="mr-5 text-3xl" />
          Sign Up with Google
        </button>

        <div className="flex items-center justify-center my-6">
          <span className="px-3 text-gray-500">Or Sign In with Email</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-lg p-2 text-gray-700">
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
              className="w-full px-6 py-4 border border-gray-300 rounded-3xl"
            />
            {errors.email && <p className="text-red-400 pl-10 text-sm mt-2">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-lg pb-2 text-gray-700">
              Password
            </label>
            <input
              {...register('password', { required: 'Password is required' })}
              type="password"
              className="w-full px-5 py-3 border border-gray-300 rounded-3xl"
              placeholder="Enter password"
            />
            {errors.password && <p className="text-red-400 text-lg mt-2">{errors.password.message}</p>}
          </div>

          {error && (
            <p className="text-red-400 pl-10 text-sm mt-2">
              {error}
            </p>
          )}

          <button type="submit" className="w-full py-3 mt-6 text-white bg-indigo-900 rounded-full">
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?
          <a href="/auth/register" className="text-indigo-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
