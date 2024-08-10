import React from "react";
import Otp from "./otp";

const Verify = () => {
  return (
    <div className=" flex flex-col items-center justify-center text-center max-w-[50%]  p-10 ">
      <h1 className="font-bold text-4xl p-5">Verify Email</h1>
      <p className="text-center text-gray-700 text-lg my-6">
        We've sent a verification code to the email address you provided. To
        complete the verification process, please enter the code here.
      </p>
      <Otp />
      <div className="text-center py-6 my-3">
        <p>
          You can request to{" "}
          <span className="text-slate-500"> Resend code</span> in{" "}
        </p>
        <p className="text-slate-500">0:30</p>
      </div>

      <button  className="bg-indigo-600 w-full p-2 px-4 my-4 text-2xl text-white rounded-full">
        Continue
      </button>
    </div>
  );
};

export default Verify;