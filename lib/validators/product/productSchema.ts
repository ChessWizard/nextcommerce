import { z } from 'zod'
import { extendedPriceSchema } from '../price/extendedPriceSchema'

export const productSchema = z.object({
    name: z.string()
           .min(2, "Name must be at least 2 characters"),
    slug: z.string()
           .min(3, "Slug must be at least 3 characters"),
    category: z.string()
               .min(3, "Category must be at least 3 characters"),
    brand: z.string()
            .min(3, "Brand must be at least 3 characters"),
    description: z.string()
                  .refine(
                    (value) => value.length >= 10 && value.length <= 100,
                    {
                        message: "Description must be between 10 and 100 characters."
                    }
                  ),
    stock: z.coerce
            .number()
            .min(1, "Stock must be at least 1"),
    images: z.array(z.string())
             .refine(
                (value) => value.length >= 1 && value.length <= 10,
                {
                    message: "Images must be between 1 and 10"
                }
             ),
    isFeatured: z.boolean()
                 .default(false),
    banner: z.string()
             .nullable(),
    prices: z.array(extendedPriceSchema)
})