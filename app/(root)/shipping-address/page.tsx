import { auth } from "@/auth/auth";
import { getCartAsync } from "@/lib/actions/cart.actions";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import ShippingAddressForm from "./shipping-address-form";
import { AddressDTO } from "@/types/address/addressDTO";
import { getUserAddressByTypeAsync } from "@/lib/actions/address.actions";
import { AddressType } from "@prisma/client";
import CartSummaryCard from "@/components/cart/cartSummaryCard";
import CartDTO from "@/types/cart/cartDTO";
import { CartProvider } from "@/contexts/cartContext";
import { ButtonDTO, LinkTargetType } from "@/types/components/button";
import { UUID } from "crypto";

const ShippingAddressPage = async () => {
  const currentSessionUser = await auth();
  const userId = currentSessionUser?.user?.id as UUID;

  const userCart = await getCartAsync(userId);
  if (!userCart || userCart.data?.cartItems?.length === 0) redirect("/cart");

  const userAddressResult = await getUserAddressByTypeAsync(
    userId,
    AddressType.SHIPPING
  );
  if (!userAddressResult.isSuccessful) redirect("/");

  const paymentNavigationButton: ButtonDTO = {
    title: "Save and continue",
    link: "/payment",
    target: LinkTargetType.SELF
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-6 md:gap-4">
        {userAddressResult.data as AddressDTO && (
            <ShippingAddressForm userId={userId} />
        )}
        <CartProvider initialCart={userCart.data as CartDTO}>
          <div className="cartSummary mt-5 col-span-1 md:col-span-2 lg:col-span-2">
            <div className="sticky top-4">
              <CartSummaryCard button={paymentNavigationButton} />
            </div>
          </div>
        </CartProvider>
      </div>
    </>
  );
};

export default ShippingAddressPage;

export const metadata: Metadata = {
  title: "Shipping Address",
};
