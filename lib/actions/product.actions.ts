'use server'

import { extendedProductSchema } from '../validators/product/extendedProductSchema';
import ProductDTO from '@/types/product/productDTO';
import database from '@/prisma/adapter';

export async function getPopularProductsAsync(): Promise<ProductDTO[] | []> {
    const data = await database.product.findMany({
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

    if(!data) return []

    const parseResult = extendedProductSchema.array()
                                        .safeParse(data)
    if(!parseResult.success) return []
    
    return parseResult.data
}

export async function getProductDetailsBySlugAsync(slug: string): Promise<ProductDTO | null> {
    const data = await database.product.findFirst({
        where: {
            slug: slug
        },
        include: {
            prices: {
                select: {
                    id: true,
                    value: true,
                    currency: true,
                },
            },
        },
    })

    if (!data) return null

    const parseResult = extendedProductSchema.safeParse(data)
    if (!parseResult.success) return null

    return parseResult.data;
}
