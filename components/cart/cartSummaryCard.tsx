"use client";

import { formatPrice } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
const CartSummaryCard = ({ totalPrice }: { totalPrice: number }) => {
  const CARGO_PRICE = 39.99;
  const router = useRouter();

  return (
    <Card className="w-full md:w-64 lg:w-72 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Cart Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex text-sm mb-2">
          <div className="text-gray-500 mr-2">Total Price:</div>
          <div className="font-bold ml-auto">{formatPrice(totalPrice)}</div>
        </div>
        <div className="flex text-sm mb-2">
          {/* Kargo bedeli şimdilik statik olarak 500 tl üzerine bedava */}
          <div className="text-gray-500 mr-2">Cargo Price:</div>
          <div className="font-bold ml-auto">{formatPrice(39.99)}</div>
        </div>
        <div className="flex text-sm mb-2">
          <div className="text-gray-500 mr-2 w-max">
            Free Shipping:
            <br />
            (Over 300 TL purchases)
          </div>
          <div className="font-bold ml-auto min-w-max text-seagreen">{`-${formatPrice(
            CARGO_PRICE
          )}`}</div>
        </div>
        <hr className="border border-spacing-0 shadow-black shadow-lg mb-5" />
        <div className="flex text-md mb-3">
          <div className="text-gray-500 mr-2 w-max">Total:</div>
          <div className="font-bold ml-auto min-w-max text-seagreen">
            {totalPrice >= 300 
              ? formatPrice(totalPrice) 
              : formatPrice(totalPrice + CARGO_PRICE)}
          </div>
        </div>
        <Button
          className="w-full
                  bg-seagreen
                  font-bold 
                  disabled:bg-black
                  disabled:opacity-80
                  disabled:cursor-not-allowed
                  hover:bg-seagreen/80"

          onClick={() => {
            router.push("/shipping-address");
          }}
        >
            Confirm Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default CartSummaryCard;
