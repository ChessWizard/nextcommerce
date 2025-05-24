import { z } from "zod";

export const neighborhoodSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    districtId: z.string().uuid()
})

export type NeighborhoodDTO = z.infer<typeof neighborhoodSchema>

