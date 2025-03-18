"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpUserAsync } from "@/lib/actions/user.actions";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast, Toaster } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import PasswordInput from "@/components/user/passwordInput";

const SignUpForm = () => {
  const router = useRouter();
  const [data, action] = useActionState(signUpUserAsync, undefined);
  const [errors, setErrors] = useState<string[]>([])
  const SignUpButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button
        disabled={pending}
        className="w-full bg-seagreen hover:bg-seagreenlight"
        variant="default"
      >
        <span className="text-black font-bold">
          {pending ? "Signing Up..." : "Sign Up"}
        </span>
      </Button>
    );
  };
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/sign-in";

  useEffect(() => {
    if (data) {

      const error = data.errorDto
      if(error){
        setErrors(error?.errors as string[])
        return
      }

      const message = data?.message?.message;
      if (!data.isSuccessful) toast.error(message);
      else {
        toast.success(message, {
            duration: 1000
        })
        setTimeout(() => {
            router.push(callbackUrl)
        }, 3000);
      }
    }
  }, [data, router]);

  return (
    <>
      <form action={action}>
        <div className="space-y-6">
          <div className="flex gap-3">
            <div className="w-full">
              <Label htmlFor="name" className="font-bold">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="surname" className="font-bold">
                Surname
              </Label>
              <Input
                id="surname"
                name="surname"
                type="text"
                required
                autoComplete="surname"
              />
            </div>
          </div>
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
            <PasswordInput name="password" />
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="font-bold">
              Confirm Password
            </Label>
            <PasswordInput name="confirmPassword" />
          </div>
          <div className="pt-5">
            <SignUpButton />
          </div>
          <div className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="sign-in"
              target="_self"
              className="link hover:text-black"
            >
              Sign In
            </Link>
          </div>
          <div>
            {errors.length > 0 && (
                <ul className="list-disc pl-4 pt-2">
                    {errors.map((error, index) => (
                        <>
                            <li key={index}>{error}</li>
                        </>
                    ))}
                </ul>
            )}
            
             
          </div>
        </div>
      </form>
      <Toaster />
    </>
  );
};

export default SignUpForm;
