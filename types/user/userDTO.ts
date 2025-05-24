import { z } from "zod"
import { userSchema } from "@/lib/validators/user/userSchema"

export type UserDTO = z.infer<typeof userSchema>; 
