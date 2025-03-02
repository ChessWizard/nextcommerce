import { extendedPriceSchema } from "@/lib/validators/price/extendedPriceSchema";
import { z } from "zod";

type PriceDTO = z.infer<typeof extendedPriceSchema>
    
export default PriceDTO