import { Metadata } from "next";
import CartTable from "./cartTable";
import { getCartAsync } from "@/lib/actions/cart.actions";
import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";
import CartDTO from "@/types/cart/cartDTO";

const CartPage = async () => {

    const session = await auth()
    if(!session) redirect('/sign-in')

    const userCart = await getCartAsync(session?.user?.id as string)

    return ( 
        <>
            <CartTable 
                data={userCart.data as CartDTO}
                message={userCart.message.message} 
            />
        </>
     );
}
 
export default CartPage;

export const metadata: Metadata = {
    title: "Shopping Cart"
}