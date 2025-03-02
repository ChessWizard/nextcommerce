import { PrismaClient } from '@prisma/client';
import { ProductDTO } from '../models/product.models';
import { Currency } from '@/constants/enums/currency';

const prisma = new PrismaClient();

export async function getPopularProducts(): Promise<ProductDTO[]> {
    const data = await prisma.product.findMany({
        take: 5,
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

    const result = data.map(product => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        category: product.category,
        images: product.images,
        brand: product.brand,
        description: product.description,
        stock: product.stock,
        prices: product.prices.map(price => ({
            id: price.id,
            value: Number(price.value),         
            currency: price.currency as Currency 
        })),
        rating: Number(product.rating),         
        numberOfReviews: product.numberOfReviews,
        isFeatured: product.isFeatured,
        banner: product.banner ?? undefined,    
        createdAt: product.createdAt,
        modifiedAt: product.modifiedAt ?? undefined
    }));

    await prisma.$disconnect(); 

    return result;
}
