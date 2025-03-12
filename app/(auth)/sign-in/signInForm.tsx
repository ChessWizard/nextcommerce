"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithCredentialsAsync } from "@/lib/actions/user.actions";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast, Toaster } from "sonner";
import { useRouter, useSearchParams } from 'next/navigation';


const SignInForm = () => {
  
  const router = useRouter()
  const [data, action] = useActionState(signInWithCredentialsAsync, undefined);
  const SignInButton = () => {
    const { pending } = useFormStatus()

    return (
        <Button disabled={pending}
                className="w-full bg-seagreen hover:bg-seagreenlight"
                variant='default'
        >
            <span className="text-black font-bold">{ pending ? 'Signing In...' : 'Sign In' }</span>
        </Button>
    )
  }
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  
  useEffect(() => {
    if (data) {
      const message = data?.message?.message;
      if (!data.isSuccessful) toast.error(message);
      else {
        router.push(callbackUrl)
        toast.success(message)
      }
    }
  }, [data, router]);

  return (
    <>
      <form action={action}>
        <div className="space-y-6">
          <div>
            <Label htmlFor="email" className="font-bold">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <Label htmlFor="password" className="font-bold">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="password"
            />
          </div>
          <div className="pt-5">
            <SignInButton />
          </div>
          <div className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="sign-up"
              target="_self"
              className="link hover:text-black"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </form>
      <Toaster />
    </>
  );
};

export default SignInForm;
