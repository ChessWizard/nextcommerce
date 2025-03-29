"use client"

import { Card, CardContent } from "@/components/ui/card";
import CartDTO from "@/types/cart/cartDTO";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const CartTable = (
    { 
        data,
        message 
    }
: {
    data: CartDTO | null,
    message: string
}) => {
    return ( 
        <>
            {!data || data.cartItems.length == 0 ? (
                <>
                <Card className="p-5 w-100">
                    <CardContent className="flex items-center p-0 gap-3
                                            md:gap-4">
                        <ShoppingCart size={33} />
                        <div className="text-sm font-bold md:h3-bold ">
                            {message}
                        </div>
                        <Button className="ml-auto">
                            <Link href={'/'}>
                                Go Shopping
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
                    
                </>
            ) : (
                <>
                    <h1 className="py-4 h3-bold">Shopping Cart {`(${data.totalGroupedQuantity} Products)`}</h1>
                </>
            )}
        </>
     );
}
 
export default CartTable;