import { z } from 'zod'
import cartItemSchema from './cartItemSchema';

const cartSchema = z.object({
  id: z.string().uuid(),
  cartItems: z.array(cartItemSchema)
}).transform(cart => {
  const totalQuantity = cart.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.cartItems.reduce((sum, item) => sum + item.quantity * (item.product.prices[0].value || 0), 0);
  const totalGroupedQuantity = cart.cartItems.length;
  
  return {
    id: cart.id,
    cartItems: cart.cartItems,
    totalPrice,
    totalQuantity,
    totalGroupedQuantity,
  };
});

export default cartSchema