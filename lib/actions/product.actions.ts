import { PrismaClient } from '@prisma/client';
import { extendedProductSchema } from '../validators/product/extendedProductSchema';
import ProductDTO from '@/types/product/productDTO';

const prisma = new PrismaClient();

export async function getPopularProducts(): Promise<ProductDTO[]> {
    const data = await prisma.product.findMany({
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
    await prisma.$disconnect(); 

    return result;
}
