"use client"

import { Button } from "../ui/button";
import { upsertCartAsync } from "@/lib/actions/cart.actions";
import upsertCartSchema from "@/lib/validators/cart/upsertCartSchema";
import UpsertCartRequest from "@/types/cart/upsertCartRequest";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { useTransition } from "react";
import { Loader } from "lucide-react";

const AddToCartButton = ({
    userId,
    productId
}: {
    userId: string | undefined,
    productId: string
}) => {

    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const handleAddToCartAsync = async () => {

        const upsertCartRequest = upsertCartSchema.safeParse({
            userId: userId,
            productId: productId
        })

        if(!upsertCartRequest.success){
            const firstErrorMessage = upsertCartRequest.error.errors[0].message
            toast.error(firstErrorMessage)
            return
        } 

        const request: UpsertCartRequest = upsertCartRequest.data
        const result = await upsertCartAsync(request)

        if(!result.isSuccessful){
            toast.error(result.message.message)
            return
        }

        toast.success(result.message.message, {
            action: {
                label: "Go to Cart" ,
                onClick: () => router.push('/cart')
            }
        })
    }

    return ( 
        <>
            <Button className="w-full"
                    onClick={() => {
                        startTransition(async () => {
                            await handleAddToCartAsync()
                        })
                    }}
            >
                {isPending ? (<Loader className="w-4 h-4 animate-spin" />)
                           : "Add to Cart" }
                
            </Button>
            <Toaster />
        </>
    );
}
 
export default AddToCartButton;