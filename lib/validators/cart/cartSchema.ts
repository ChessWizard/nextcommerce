import { z } from 'zod'
import cartItemSchema from './cartItemSchema';

const cartSchema = z.object({
  id: z.string().uuid(),
  cartItems: z.array(cartItemSchema)
}).transform(cart => {

  const processableCartItems = cart.cartItems
                                   .filter(item => item.isSelected)

  const totalQuantity = processableCartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = processableCartItems.reduce((sum, item) => sum + item.quantity * (item.product.prices[0].value || 0), 0);
  const totalGroupedQuantity = processableCartItems.length;
  
  return {
    id: cart.id,
    cartItems: cart.cartItems,
    totalPrice,
    totalQuantity,
    totalGroupedQuantity,
  };
});

export default cartSchema