import { z } from 'zod';

export const userSchema = z.object({
    id: z.string().uuid(),
    name: z.string().nullable().default("UNKNOWN"),
    surname: z.string().nullable().default("UNKNOWN"),
    email: z.string().email().nullable(),
    emailVerified: z.date().nullable(),
    phone: z.string().nullable(),
    phoneVerified: z.date().nullable(),
    image: z.string().nullable(),
    role: z.enum(["ADMIN", "USER", "EDITOR"]).default("USER"),
    //address: shippingAddressSchema.nullable(),
    paymentMethod: z.string(),
    createdAt: z.date(),
    modifiedAt: z.date().nullable(),
});
