import { z } from "zod";

export const citySchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    countryId: z.string().uuid()
})

export type CityDTO = z.infer<typeof citySchema>

