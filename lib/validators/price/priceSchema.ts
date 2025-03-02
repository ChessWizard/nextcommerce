import { Currency } from '@prisma/client'
import { z } from 'zod'

export const priceSchema = z.object({
    value: z.coerce.number()
                   .min(0, "Price must be at least 0."),
    currency: z.nativeEnum(Currency)
})