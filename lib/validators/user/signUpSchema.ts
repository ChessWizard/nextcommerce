import { z } from "zod";

export const signUpFormSchema = z.object({
    name: z.string()
           .min(2, 'Name must ve at least 3 characters.'),
    surname: z.string()
              .min(2, 'Name must ve at least 3 characters.'),
    email: z.string()
            .email("Invalid email address"),
    password: z.string()
               .min(8, "Password must be at least 8 characters long.")
               .regex(
                   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
                   "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 special character."
               ),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match!",
    path: ['confirmPassword']
})