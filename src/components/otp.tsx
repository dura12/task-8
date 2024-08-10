"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


const Otp = () => {
  const router = useRouter();
  const [otp, otpset] = useState("");
  const queryemail =  useSearchParams();
  const email = queryemail.get('email');

  const handleotpchange = (notp: any) => {
    otpset(notp);
  };

  const validemail = async () => {
    try {
      const response = await fetch(
        `https://akil-backend.onrender.com/verify-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            otp,
            email,
          }),
        }
      );

      const { success, message } = await response.json();

      if (success) {
        router.push("/auth/login");
      } else {
        alert(message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (otp.length === 4) {
      validemail();
    }
  }, [otp]);
 

  return (
    <div className="flex flext-col  items-center justify-center rounded-3xl ">
      <InputOTP maxLength={4} value={otp} onChange={handleotpchange} className="border-3 border-indigo-600">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={1} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
};

export default Otp;
