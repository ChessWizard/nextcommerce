"use client";

import CartItemDTO from "@/types/cart/cartItemDTO";
import Image from "next/image";
import GenericTooltip from "../shared/common/tooltip";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { useState, useTransition } from "react";
import { CardContent } from "../ui/card";
import { Loader, Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { updateCartItemAsync } from "@/lib/actions/cart.actions";
import ProductPrice from "../product/productPrice";
import { useCart } from "@/contexts/cartContext";

const CartItemCardContent = ({ data }: { data: CartItemDTO }) => {
  const cartItemId = data.id;
  const product = data.product;
  const productName = product.name;
  const brandName = product.brand;
  const productDescription = product.description;
  const productImages = product.images;
  const isSelected = data.isSelected;
  const slug = `/product/${product.slug}`;
  const cartItemQuantity = data.quantity;
  const price = product.prices[0];

  const { cart, updateCart } = useCart();
  const [isCartItemSelected, setIsCartItemSelected] = useState(isSelected);
  const [isQuantityPending, startQuantityTransition] = useTransition();
  const [quantity, setQuantity] = useState(cartItemQuantity);
  const [isSelectPending, startSelectQuantityTransition] = useTransition();

  const updateCartState = (newQuantity: number) => {
    if (!cart) return;

    const updatedCartItems = cart.cartItems.map(item => {
      if (item.id === cartItemId) {
        return {
          ...item,
          quantity: newQuantity
        };
      }
      return item;
    });

    const processableCartItems = updatedCartItems.filter(item => item.isSelected);
    const totalQuantity = processableCartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = processableCartItems.reduce((sum, item) => sum + item.quantity * (item.product.prices[0].value || 0), 0);
    const totalGroupedQuantity = processableCartItems.length;

    updateCart({
      ...cart,
      cartItems: updatedCartItems,
      totalPrice,
      totalQuantity,
      totalGroupedQuantity
    });
  };

  return (
    <>
      <CardContent className="flex items-center gap-3 py-10 px-3">
        {isSelectPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Checkbox
            id={`${productName}`}
            className="data-[state=checked]:bg-green-500 border-[bg-green-500]"
            checked={isCartItemSelected}
            onCheckedChange={async (checked) =>
              startSelectQuantityTransition(async () => {
                const checkStatus = checked.valueOf() as boolean;
                const result = await updateCartItemAsync(
                  cartItemId,
                  null!,
                  checkStatus
                );
                if (result.isSuccessful) {
                  setIsCartItemSelected(checkStatus);
                  if (cart) {
                    const updatedCartItems = cart.cartItems.map(item => {
                      if (item.id === cartItemId) {
                        return {
                          ...item,
                          isSelected: checkStatus
                        };
                      }
                      return item;
                    });

                    const processableCartItems = updatedCartItems.filter(item => item.isSelected);
                    const totalQuantity = processableCartItems.reduce((sum, item) => sum + item.quantity, 0);
                    const totalPrice = processableCartItems.reduce((sum, item) => sum + item.quantity * (item.product.prices[0].value || 0), 0);
                    const totalGroupedQuantity = processableCartItems.length;

                    updateCart({
                      ...cart,
                      cartItems: updatedCartItems,
                      totalPrice,
                      totalQuantity,
                      totalGroupedQuantity
                    });
                  }
                }
              })
            }
          />
        )}
        <Link href={slug}>
          <Image
            src={productImages[0]}
            priority={true}
            alt={productName}
            width={80}
            height={120}
            className="rounded-xl min-w-[70px] min-h-[100px] 
                                md:min-w-[80px] md:min-h-[120px]"
          />
        </Link>

        <div
          className="grid grid-cols-1 gap-5
                        lg:grid-cols-2"
        >
          <Link href={slug}>
            <div className="card-details">
              <div
                className="grid grid-cols-1 items-center gap-2
                                    md:[grid-template-columns:auto_1fr]"
              >
                <span
                  className="text-xs font-bold
                                         md:text-sm"
                >
                  {brandName}{" "}
                </span>
                <GenericTooltip content={productDescription} side="bottom">
                  <p
                    className="text-xs font-medium h-auto overflow-hidden text-ellipsis whitespace-nowrap max-w-[350px]
                                          md:max-w-[600px] md:text-sm
                                          lg:max-w-[500px] "
                  >
                    {productDescription}
                  </p>
                </GenericTooltip>
              </div>
            </div>
          </Link>

          <div className="plusMinusButtons">
            <div className="flex items-center justify-center gap-2">
              <Button
                disabled={isQuantityPending || quantity == 1}
                variant="outline"
                type="button"
                className="w-6 h-6 md:w-8 md:h-8"
                onClick={() =>
                  startQuantityTransition(async () => {
                    const result = await updateCartItemAsync(
                      cartItemId,
                      quantity - 1
                    );
                    if (result.isSuccessful) {
                      setQuantity(quantity - 1);
                      updateCartState(quantity - 1);
                    }
                  })
                }
              >
                {isQuantityPending ? (
                  <Loader className="w-3 h-3 md:w-4 md:h-4 animate-spin" />
                ) : (
                  <Minus className="w-3 h-3 md:w-4 md:h-4" />
                )}
              </Button>
              <span className="px-2 md:px-3 text-sm md:text-base">{quantity}</span>
              <Button
                disabled={isQuantityPending}
                variant="outline"
                type="button"
                className="w-6 h-6 md:w-8 md:h-8"
                onClick={() =>
                  startQuantityTransition(async () => {
                    const result = await updateCartItemAsync(
                      cartItemId,
                      quantity + 1
                    );
                    if (result.isSuccessful) {
                      setQuantity(quantity + 1);
                      updateCartState(quantity + 1);
                    }
                  })
                }
              >
                {isQuantityPending ? (
                  <Loader className="w-3 h-3 md:w-4 md:h-4 animate-spin" />
                ) : (
                  <Plus className="w-3 h-3 md:w-4 md:h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
        <div className="ml-auto">
          <div className="flex items-center gap-3 mb-5">
            <Trash className="m-auto" size={20} />
            <span className="text-xs hidden md:block">Remove</span>
          </div>
          <ProductPrice value={price.value * quantity}
                        currency={price.currency}
                        className="text-sm text-seagreen 
                                  md:text-lg"  />
        </div>
      </CardContent>
      <hr className="border shadow-black shadow-lg" />
    </>
  );
};

export default CartItemCardContent;
