import { z } from "zod";
import { extendedProductSchema } from "@/lib/validators/product/extendedProductSchema";

type ProductDTO = z.infer<typeof extendedProductSchema> 

export default ProductDTO