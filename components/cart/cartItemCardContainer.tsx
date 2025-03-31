import CartItemDTO from "@/types/cart/cartItemDTO";
import { Card, CardHeader, CardTitle } from "../ui/card";
import CartItemCardContent from "./cartItemCardContent";

const CartItemCardContainer = (
    { 
        brand,
        items 
    }: 
    { 
        brand: string,
        items: CartItemDTO[] 
    }) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            {/* TODO: Marka gruplama yapısı kurulunca yapılacak */}
            {/* <Checkbox
              id={`${brand}`}
              className="data-[state=checked]:bg-green-500 border-[bg-green-500]"
              checked={isCartItemSelected}
              onCheckedChange={(checked) => {
                setIsCartItemSelected(checked.valueOf() as boolean);
              }}
            /> */}
            <label
              htmlFor={brand}
              className="text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70 leading-none"
            >
              <span className="font-medium opacity-60">Sales Brand:{"  "}</span>
              <span className="font-bold">{brand}</span>
            </label>
          </CardTitle>
        </CardHeader>
        <hr className="border border-spacing-0 shadow-black shadow-lg" />
        {items.map((item: CartItemDTO) => (
            <CartItemCardContent data={item} key={item.id} />
        ))}
      </Card>
    </>
  );
};

export default CartItemCardContainer;
