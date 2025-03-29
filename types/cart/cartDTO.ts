import cartSchema from "@/lib/validators/cart/cartSchema";
import { z } from "zod";

type CartDTO = z.infer<typeof cartSchema> 

export default CartDTO