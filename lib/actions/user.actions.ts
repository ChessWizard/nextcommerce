"use server";

import { signInSchema } from "../validators/user/signInSchema";
import { signIn, signOut } from "@/auth/auth";
import { Result } from "../results/result";
import UserMessages from "../results/messages/userMessages";

export async function signInWithCredentialsAsync(
  prevState: unknown,
  formData: FormData
) {
  const user = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!user) {
    return Result.Error(UserMessages.Error.NotFound).toJSON();
  }

  try {
    await signIn("credentials", {
      ...user.data,
      redirect: false});
    const result = Result.Success(user.data, UserMessages.Success.SignIn);
    return result.toJSON();
  } catch (error) {
    const err = error as any;
    const message =
      err?.cause?.err?.message === "InvalidPassword"
        ? UserMessages.Error.InvalidPassword
        : UserMessages.Error.NotFound;
    const errorResult = Result.Error(message);
    return errorResult.toJSON();
  }
}

export async function signOutAsync() {
  await signOut();
}
