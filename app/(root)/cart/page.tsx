import { Metadata } from "next";
import { getCartAsync } from "@/lib/actions/cart.actions";
import { auth } from "@/auth/auth";
import CartDTO from "@/types/cart/cartDTO";
import CartTable from "@/components/cart/cartTable";
import CartSummaryCard from "@/components/cart/cartSummaryCard";
import { CartProvider } from "@/contexts/cartContext";
import { redirect } from "next/navigation";

const CartPage = async () => {
  const session = await auth();
  if(!session) redirect('/sign-in')

  const userCart = await getCartAsync(session.user.id);

  if (!userCart.isSuccessful) {
    return (
      <>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Cart</h1>
          <p className="text-red-500">{userCart.message.message}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <CartProvider initialCart={userCart.data as CartDTO}>
          <div className="grid grid-cols-1 md:grid-cols-6 md:gap-4">
            <CartTable />
            <div className="cartSummary mt-5 col-span-1 md:col-span-2 lg:col-span-2">
              <div className="sticky top-4">
                <CartSummaryCard />
              </div>
            </div>
          </div>
        </CartProvider>
      </div>
    </>
  );
};

export default CartPage;

export const metadata: Metadata = {
  title: "Shopping Cart",
};

