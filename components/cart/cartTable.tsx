"use client";

import CartItemDTO from "@/types/cart/cartItemDTO";
import CartItemCardContainer from "./cartItemCardContainer";
import { useCart } from "@/contexts/cartContext";

const CartTable = () => {
  const { cart } = useCart();
  type BrandGroupedItems = Record<string, CartItemDTO[]>;

  const groupedCartItemsByBrand = cart?.cartItems?.reduce((acc, cartItem) => {
    const brandName = cartItem.product.brand;
    if (!acc[brandName]) {
      acc[brandName] = [];
    }
    acc[brandName].push(cartItem);
    return acc;
  }, {} as BrandGroupedItems) as Record<string, CartItemDTO[]>;

  let brandGroups;
  if (groupedCartItemsByBrand) {
    brandGroups = Object.entries(groupedCartItemsByBrand).map(
      ([brand, items]) => ({
        brand,
        items,
      })
    );
  }

  return (
    <>
      <div className="cartDetails col-span-1 md:col-span-4 lg:col-span-4">
        <h1 className="py-4 h3-bold">
          Shopping Cart {`(${cart?.totalGroupedQuantity || 0} Products)`}
        </h1>
        <div className="grid grid-cols-1 gap-4">
          {brandGroups &&
            brandGroups.map(({ brand, items }, index) => (
              <CartItemCardContainer brand={brand} items={items} key={index} />
            ))}
        </div>
      </div>
    </>
  );
};

export default CartTable;
