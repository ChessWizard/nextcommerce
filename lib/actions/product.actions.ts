import { extendedProductSchema } from '../validators/product/extendedProductSchema';
import ProductDTO from '@/types/product/productDTO';
import Database from '@/prisma/adapter';

export async function getPopularProducts(): Promise<ProductDTO[]> {
    const data = await Database.product.findMany({
        where:{
            isFeatured: true
        },
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
            prices: {
                select: {
                    id: true,
                    value: true,
                    currency: true
                }
            }
        }
    });

    const result = extendedProductSchema.array()
                                        .safeParse(data)
                                        .data ?? []
    return result;
}
