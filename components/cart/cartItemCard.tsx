"use client"

import CartItemDTO from "@/types/cart/cartItemDTO";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import GenericTooltip from "../shared/common/tooltip";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { useState } from "react";

const CartItemCard = ({ data }: { data: CartItemDTO }) => {
  const product = data.product;
  const productName = product.name;
  const brandName = product.brand;
  const productDescription = product.description;
  const productImages = product.images;
  const isSelected = data.isSelected;
  const slug = `/product/${data.product.slug}` ;

  const [isCartItemSelected, setIsCartItemSelected] = useState(isSelected)

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Checkbox
              id={`${productName}-${brandName}`}
              className="data-[state=checked]:bg-green-500 border-[bg-green-500]"
              checked={isCartItemSelected}
              onCheckedChange={(checked) => {
                setIsCartItemSelected(checked.valueOf() as boolean)
              }}
            />
            <label
              htmlFor={productName}
              className="text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70 leading-none"
            >
              <span className="font-medium opacity-60">Sales Brand:{"  "}</span>
              <span className="font-bold">{brandName}</span>
            </label>
          </CardTitle>
        </CardHeader>
        <hr className="border border-spacing-0 shadow-black shadow-lg" />
        <CardContent className="flex items-center gap-3 py-10">
          <Checkbox
            id={`${productName}`}
            className="data-[state=checked]:bg-green-500 border-[bg-green-500]"
            checked={isCartItemSelected}
            onCheckedChange={(checked) => {
                setIsCartItemSelected(checked.valueOf() as boolean)
              }}
          />
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

          <Link href={slug}>
            <div className="card-details">
              <div
                className="grid grid-cols-1 items-center gap-2
                                    md:grid-cols-2 md:[grid-template-columns:auto_1fr]"
              >
                <span
                  className="text-xs font-bold
                                         md:text-sm"
                >
                  {brandName}{" "}
                </span>
                <GenericTooltip content={productDescription} side="bottom">
                  <p
                    className="text-xs font-medium h-auto overflow-hidden text-ellipsis max-w-[150px]
                                          md:max-w-[400px] md:text-sm
                                          lg:max-w-[500px] "
                  >
                    {productDescription}
                  </p>
                </GenericTooltip>
              </div>
            </div>
          </Link>
        </CardContent>
      </Card>
    </>
  );
};

export default CartItemCard;
