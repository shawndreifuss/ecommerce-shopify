"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa6";
import { signIn } from "next-auth/react";



export const Social = () => {

  const onClick = (provider: 'google' | 'apple') => {
    signIn(provider, {
      callbackUrl: '/',
    });
  }
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button size="lg" className="w-full" variant="outline" onClick={() => onClick('google')}>
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
        <FaApple className="h-5 w-5" />
      </Button>
    </div>
  );
};

