import { z } from "zod";

export const addressRequestSchema = z.object({
    userId: z
      .string({ required_error: "User ID is required" })
      .uuid({ message: "User ID must be a valid UUID" }),
    
    name: z
      .string({ required_error: "Name is required" })
      .min(2, { message: "Name must contain 2 - 30 characters" })
      .max(30, { message: "Name must contain 2 - 30 characters" }),
    
    surname: z
      .string({ required_error: "Surname is required" })
      .min(2, { message: "Surname must contain 2 - 30 characters" })
      .max(30, { message: "Surname must contain 2 - 30 characters" }),
    
    phone: z
      .string({ required_error: "Phone number is required" })
      .regex(/^\+?[0-9]*$/, {
        message: "Phone number must contain only digits",
      })
      .refine((val) => {
        const digitsOnly = val.replace(/\D/g, "");
        return digitsOnly.length >= 10;
      }, {
        message: "Phone number must be at least 10 digits",
      }),
    
    countryId: z
      .string({ required_error: "Country is required" })
      .uuid({ message: "Please make your choice" }),
    
    cityId: z
      .string({ required_error: "City is required" })
      .uuid({ message: "Please make your choice" }),
    
    districtId: z
      .string({ required_error: "District is required" })
      .uuid({ message: "Please make your choice" }),
    
    neighborhoodId: z
      .string({ required_error: "Neighborhood is required" })
      .uuid({ message: "Please make your choice" }),
    
    title: z
      .string({ required_error: "Title is required" })
      .min(2, { message: "Title must contain at least 2 characters" })
      .max(100, { message: "Title must contain at most 100 characters" }),
    
    detail: z
      .string({ required_error: "Detail is required" })
      .min(5, { message: "Detail must contain at least 5 characters" })
      .max(500, { message: "Detail must contain at most 500 characters" }),
    
    addressType: z
      .enum(["SHIPPING", "BILLING"], {
        errorMap: () => ({
          message: "Address type must be either 'SHIPPING' or 'BILLING'",
        }),
      }),
  });

export type AddressRequest = z.infer<typeof addressRequestSchema>; 