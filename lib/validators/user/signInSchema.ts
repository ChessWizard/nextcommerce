import { z } from "zod";

export const signInSchema = z.object({
    email: z.string()
            .email('Invalid email address.'),
    password: z.string()
               .min(8, "Password must be at least 8 characters long.")
               .regex(
                   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
                   "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 special character."
               )
})