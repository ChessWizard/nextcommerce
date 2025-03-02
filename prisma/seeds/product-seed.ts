import { randomUUID } from "node:crypto";

const productSeed = {
  products: [
    {
      name: 'Amazing Shirt',
      slug: 'polo-sporting-stretch-shirt',
      category: "Men's Dress Shirts",
      description: 'Classic Polo style with modern comfort',
      images: [
        '/images/sample-products/p1-1.webp'
      ],
      prices: [
        { id: randomUUID(), value: 2000.90, currency: 'TRY' },
        { id: randomUUID(), value: 75.00, currency: 'USD' }
      ],
      brand: 'Polo',
      rating: 4.5,
      numberOfReviews: 10,
      stock: 5,
      isFeatured: true,
      banner: 'banner-1.webp',
    },
    {
      name: 'Sporty Jacket',
      slug: 'sporty-jacket-windproof',
      category: "Men's Jackets",
      description: 'Windproof and stylish for all seasons',
      images: [
        '/images/sample-products/p2-1.webp'
      ],
      prices: [
        { id: randomUUID(), value: 3500.50, currency: 'TRY' },
        { id: randomUUID(), value: 60.00, currency: 'USD' }
      ],
      brand: 'Jacket Pro',
      rating: 4.8,
      numberOfReviews: 23,
      stock: 10,
      isFeatured: false,
      banner: 'banner-2.webp',
    },
    {
      name: 'Elegant Dress',
      slug: 'elegant-evening-dress',
      category: "Women's Dresses",
      description: 'Perfect for evening events',
      images: [
        '/images/sample-products/p3-1.webp'
      ],
      prices: [
        { id: randomUUID(), value: 5000.00, currency: 'TRY' },
        { id: randomUUID(), value: 90.00, currency: 'USD' }
      ],
      brand: 'Cuggi',
      rating: 4.9,
      numberOfReviews: 15,
      stock: 3,
      isFeatured: true,
      banner: 'banner-3.jpg',
    },
    {
      name: 'Casual T-Shirt',
      slug: 'casual-tshirt-comfy',
      category: "Men's T-Shirts",
      description: 'Soft cotton for everyday wear',
      images: [
        '/images/sample-products/p4-1.jpg'
      ],
      prices: [
        { id: randomUUID(), value: 1000.00, currency: 'TRY' },
        { id: randomUUID(), value: 35.00, currency: 'USD' }
      ],
      brand: 'Always',
      rating: 4.3,
      numberOfReviews: 8,
      stock: 20,
      isFeatured: false,
      banner: 'banner-4.jpg',
    },
    {
      name: 'Running Shoes',
      slug: 'lightweight-running-shoes',
      category: "Men's Shoes",
      description: 'Perfect grip and lightweight',
      images: [
        '/images/sample-products/p5-1.jpg'
      ],
      prices: [
        { id: randomUUID(), value: 5500.00, currency: 'TRY' },
        { id: randomUUID(), value: 75.00, currency: 'USD' }
      ],
      brand: 'Shoe Shop',
      rating: 4.6,
      numberOfReviews: 18,
      stock: 12,
      isFeatured: true,
      banner: 'banner-5.jpg',
    },
    {
      name: 'Formal Pants',
      slug: 'formal-office-pants',
      category: "Men's Pants",
      description: 'Stretchable and breathable',
      images: [
        '/images/sample-products/p6-1.jpg'
      ],
      prices: [
        { id: randomUUID(), value: 2000.00, currency: 'TRY' },
        { id: randomUUID(), value: 75.00, currency: 'USD' }
      ],
      brand: 'Boss',
      rating: 4.2,
      numberOfReviews: 5,
      stock: 7,
      isFeatured: false,
      banner: 'banner-6.jpg',
    },
    {
      name: 'Winter Coat',
      slug: 'winter-coat-thermal',
      category: "Men's Coats",
      description: 'Thermal insulation for extreme cold',
      images: [
        '/images/sample-products/p7-1.jpg'
      ],
      prices: [
        { id: randomUUID(), value: 1500.50, currency: 'TRY' },
        { id: randomUUID(), value: 55.50, currency: 'USD' }
      ],
      brand: 'South Face',
      rating: 4.7,
      numberOfReviews: 25,
      stock: 4,
      isFeatured: true,
      banner: 'banner-7.jpg',
    },
    {
      name: 'Classic Watch',
      slug: 'classic-luxury-watch',
      category: "Accessories",
      description: 'Timeless design for professionals',
      images: [
        '/images/sample-products/p8-1.jpg'
      ],
      prices: [
        { id: randomUUID(), value: 6000.00, currency: 'TRY' },
        { id: randomUUID(), value: 105.00, currency: 'USD' }
      ],
      brand: 'Rolexe',
      rating: 4.9,
      numberOfReviews: 30,
      stock: 2,
      isFeatured: true,
      banner: 'banner-8.jpg',
    },
    {
      name: 'Leather Belt',
      slug: 'genuine-leather-belt',
      category: "Accessories",
      description: 'Premium leather with a stylish buckle',
      images: [
        '/images/sample-products/p9-1.jpg'
      ],
      prices: [
        { id: randomUUID(), value: 500.00, currency: 'TRY' },
        { id: randomUUID(), value: 15.00, currency: 'USD' }
      ],
      brand: 'Levi',
      rating: 4.4,
      numberOfReviews: 12,
      stock: 15,
      isFeatured: false,
      banner: 'banner-9.jpg',
    },
    {
      name: 'Sunglasses',
      slug: 'polarized-sunglasses',
      category: "Accessories",
      description: 'UV protection with style',
      images: [
        '/images/sample-products/p10-1.jpg'
      ],
      prices: [
        { id: randomUUID(), value: 800.90, currency: 'TRY' },
        { id: randomUUID(), value: 20.00, currency: 'USD' }
      ],
      brand: 'Ray-Fun',
      rating: 4.8,
      numberOfReviews: 40,
      stock: 8,
      isFeatured: true,
      banner: 'banner-10.jpg',
    },
  ],
};

export default productSeed
