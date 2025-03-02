import { z } from "zod";
import { productSchema } from "./productSchema";

export const extendedProductSchema = productSchema.extend({
    id: z.string(),
    rating: z.coerce.number(),
    numberOfReviews: z.number(),
    createdAt: z.date(),
    modifiedAt: z.date()
                 .optional()
});