import { CartItemStatus } from '@prisma/client';
import { z } from 'zod';
import { extendedProductSchema } from '../product/extendedProductSchema';

const cartItemSchema = z.object({
  id: z.string().uuid(),
  quantity: z.number().int(),
  cartItemStatus: z.nativeEnum(CartItemStatus),
  isSelected: z.boolean(),
  product: extendedProductSchema
});

export default cartItemSchema