import { z } from "zod";

export const districtSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    cityId: z.string().uuid()
})

export type DistrictDTO = z.infer<typeof districtSchema>

