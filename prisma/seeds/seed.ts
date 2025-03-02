import { Currency, PrismaClient } from "@prisma/client"
import productSeed from "./product-seed"
import { randomUUID } from "node:crypto"

async function initialize(){
    const prisma = new PrismaClient()

    for (const product of productSeed.products) {

        const productId = randomUUID()

        await prisma.product.create({
          data: {
            id: productId,
            name: product.name,
            slug: product.slug,
            category: product.category,
            description: product.description,
            images: product.images,
            brand: product.brand,
            rating: product.rating,
            numberOfReviews: product.numberOfReviews,
            stock: product.stock,
            isFeatured: product.isFeatured,
            banner: product.banner,
            prices: {
                create: product.prices.map((price) => ({
                  id: randomUUID(),
                  value: price.value,
                  currency: price.currency as Currency 
                }))
            }
          }
        })
    }
    console.log("Products seeded")
}

initialize()