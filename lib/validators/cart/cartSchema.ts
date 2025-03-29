import { z } from 'zod'
import cartItemSchema from './cartItemSchema';

const cartSchema = z.object({
  id: z.string().uuid(),
  totalPrice: z.number(),
  totalQuantity: z.number().int(),
  totalGroupedQuantity: z.number().int(),
  cartItems: z.array(cartItemSchema)
});

export default cartSchema