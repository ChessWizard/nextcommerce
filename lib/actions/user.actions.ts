"use server";

import { signInSchema } from "../validators/user/signInSchema";
import { signIn, signOut } from "@/auth/auth";
import { Result } from "../results/result";
import UserMessages from "../results/messages/userMessages";
import { signUpFormSchema } from "../validators/user/signUpSchema";
import { hashSync } from "bcrypt-ts-edge";
import database from "@/prisma/adapter";
import { ErrorResult } from "../results/errorResult";

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

export async function signUpUserAsync(
    prevState: unknown,
    formData: FormData
) {

    const user = signUpFormSchema.safeParse({
        name: formData.get("name"),
        surname: formData.get("surname"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword")
    })

    if (user?.error) {
        const errors = Object.keys(user.error.errors)
                             .map((field => user.error.errors[parseInt(field)].message))
        return Result.Error(UserMessages.Error.Failed, new ErrorResult(errors)).toJSON();
    }

    const userData = user.data

    if (!userData) {
        return Result.Error(UserMessages.Error.Failed).toJSON();
    }

    const userFromMail = await database.user
                                       .findFirst({
                                           where: {
                                               email: userData.email
                                           }
                                       })
    
    if(userFromMail){
        return Result.Error(UserMessages.Error.EmailConflict).toJSON();
    }

    userData.password = hashSync(userData.password, 10)

    try {
        
        await database.user.create({
            data: {
                name: userData.name,
                surname: userData.surname,
                email: userData.email,
                password: userData.password,
                paymentMethod: "DEFAULT_PAYMENT"
            }
        })

        // TODO: Show confirm email pop-up -> Send verify email -> verify email and if successful -> sign in -> navigate to homepage

        return Result.Success(UserMessages.Success.SignUp).toJSON()

    } catch (error) {
        console.log(error)
        return Result.Error(UserMessages.Error.Failed).toJSON();
    }
}

export async function signOutAsync() {
  await signOut();
}
