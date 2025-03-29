import { z } from 'zod'

const upsertCartSchema = z.object({

    userId: z.string()
             .optional()
             .nullable(),
    productId: z.string()
                .nonempty('Product required')
})

export default upsertCartSchema