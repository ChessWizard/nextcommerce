"use client";

import { Card, CardContent } from "@/components/ui/card";
import CartDTO from "@/types/cart/cartDTO";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartItemDTO from "@/types/cart/cartItemDTO";
import CartItemCardContainer from "./cartItemCardContainer";
import CartSummaryCard from "./cartSummaryCard";

const CartTable = ({
  data,
  message,
}: {
  data: CartDTO | null;
  message: string;
}) => {
  type BrandGroupedItems = Record<string, CartItemDTO[]>;

  
  const groupedCartItemsByBrand = data?.cartItems?.reduce((acc, cartItem) => {
    const brandName = cartItem.product.brand;
    if (!acc[brandName]) {
      acc[brandName] = [];
    }
    acc[brandName].push(cartItem);
    return acc;
  }, {} as BrandGroupedItems) as Record<string, CartItemDTO[]>;

  let brandGroups
  if(groupedCartItemsByBrand) {
    brandGroups = Object.entries(groupedCartItemsByBrand).map(
      ([brand, items]) => ({
        brand,
        items,
      })
    );
  }

  return (
    <>
      {!data || data.cartItems.length == 0 ? (
        <>
          <Card className="p-5 w-100">
            <CardContent
              className="flex items-center p-0 gap-3
                                            md:gap-4"
            >
              <ShoppingCart size={33} />
              <div
                className="text-xs font-bold whitespace-nowrap
                                        sm:text-sm 
                                        md:h3-bold"
              >
                {message}
              </div>
              <Button className="ml-auto w-max">
                <Link href={"/"}>Go Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-6 md:gap-4">
            <div className="cartDetails col-span-1 md:col-span-4 lg:col-span-4">
              <h1 className="py-4 h3-bold">
                Shopping Cart {`(${data.totalGroupedQuantity} Products)`}
              </h1>
              <div className="grid grid-cols-1 gap-4">
                {brandGroups && brandGroups.map(({ brand, items }, index) => (
                  <CartItemCardContainer
                    brand={brand}
                    items={items}
                    key={index}
                  />
                ))}
              </div>
            </div>
            <div className="cartSummary shadow-md w-auto mt-5 col-span-1 md:col-span-2 lg:col-span-2">
              <div className="sticky top-4">
                <CartSummaryCard totalPrice={data.totalPrice} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CartTable;
