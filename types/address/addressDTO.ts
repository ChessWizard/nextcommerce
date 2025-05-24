import { z } from "zod";

export const addressSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    name: z.string(),
    surname: z.string(),
    phone: z.string(),
    countryId: z.string().uuid(),
    cityId: z.string().uuid(),
    districtId: z.string().uuid(),
    neighborhoodId: z.string().uuid(),
    title: z.string(),
    detail: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    zip: z.string(),
    addressType: z.enum(["SHIPPING", "BILLING"]),
    createdAt: z.date(),
    modifiedAt: z.date().nullable()
});

export type AddressDTO = z.infer<typeof addressSchema>; 