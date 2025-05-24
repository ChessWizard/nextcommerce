"use client";

import { formatPrice } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useCart } from "@/contexts/cartContext";
import { ButtonDTO } from "@/types/components/button";
import { navigate } from "@/utils/routingUtils";

const CartSummaryCard = ({ button  }: { button: ButtonDTO }) => {
  const CARGO_PRICE = 39.99;
  const FREE_SHIPPING_THRESHOLD = 300;
  const { cart } = useCart();
  const totalPrice = cart?.totalPrice || 0;
  const isFreeShipping = totalPrice >= FREE_SHIPPING_THRESHOLD || totalPrice === 0;
  const finalPrice = isFreeShipping ? totalPrice : totalPrice + CARGO_PRICE;

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
          <div className="text-gray-500 mr-2">Cargo Price:</div>
          <div className="font-bold ml-auto">
            {isFreeShipping ? formatPrice(0) : formatPrice(CARGO_PRICE)}
          </div>
        </div>
        {totalPrice !== 0 && !isFreeShipping && (
          <div className="flex text-sm mb-2">
            <div className="text-gray-500 mr-2 w-max">
              Free Shipping:
              <br />
              (Over {FREE_SHIPPING_THRESHOLD}₺ purchases)
            </div>
            <div className="font-bold ml-auto min-w-max text-seagreen">{`-${formatPrice(CARGO_PRICE)}`}</div>
          </div>
        )}

        <hr className="border border-spacing-0 shadow-black shadow-lg mb-5" />
        <div className="flex text-md mb-3">
          <div className="text-gray-500 mr-2 w-max">Total:</div>
          <div className="font-bold ml-auto min-w-max text-seagreen">
            {formatPrice(finalPrice)}
          </div>
        </div>
        <Button
          className={`w-full
          bg-seagreen
          font-bold 
          disabled:bg-black
          disabled:opacity-80
          disabled:cursor-not-allowed
          hover:bg-seagreen/80
          ${button.additionalClasses ?? ""}`}
                  
          onClick={() => {
            navigate(button.link, {
              target: button.target
            })
          }}
          disabled={totalPrice === 0}
        >
          {button.title}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CartSummaryCard;
