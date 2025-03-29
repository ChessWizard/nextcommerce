import cartItemSchema from "@/lib/validators/cart/cartItemSchema";
import { z } from "zod";

type CartItemDTO = z.infer<typeof cartItemSchema> 

export default CartItemDTO