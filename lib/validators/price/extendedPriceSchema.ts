import { z } from "zod";
import { priceSchema } from "./priceSchema";

export const extendedPriceSchema = priceSchema.extend({
    id: z.string(),
    value: z.any().transform((v) => 
        (v instanceof Object && 'toNumber' in v) ? v.toNumber() : v
    )
});