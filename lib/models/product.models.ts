import { Currency } from "@/constants/enums/currency";

export type PriceDTO = {
    id: string;
    value: number;
    currency: Currency;
};

export type ProductDTO = {
    id: string;
    name: string;
    slug: string;
    category: string;
    images: string[];
    brand: string;
    description: string;
    stock: number;
    prices: PriceDTO[];
    rating: number;
    numberOfReviews: number;
    isFeatured: boolean;
    banner?: string;       
    createdAt: Date;
    modifiedAt?: Date; 
};