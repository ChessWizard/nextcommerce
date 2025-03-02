import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import ProductPrice from "./productPrice";
import ProductDTO from "@/types/product/productDTO";

const ProductCard = ({
    data,
    hasLazyLoad = true,
}: {data: ProductDTO;
    hasLazyLoad: boolean;
}) => {

    const navigationUrl = `/product/${data.slug}`

    return ( 
        <Card className="w-full max-w-sm">
            <Link href={navigationUrl}>
                <CardHeader className="p-0 items-center">
                    <Image className="w-full"
                           src={data.images[0]}
                           alt={data.name}
                           height={300}
                           width={300}
                           priority={!hasLazyLoad}
                             />
                </CardHeader>
                <CardContent className="p-4 grid gap-4">
                    <div className="text-xs">{data.brand}</div>
                    <h2 className="text-sm font-medium">{data.name}</h2>
                    <div className="flex-between gap-4">
                        <p>{data.rating}</p>
                        {data.stock > 0 ? (
                            // TODO: Current currency implementation will be added
                            <ProductPrice value={data.prices[0].value}
                                          currency={data.prices[0].currency}
                                          className="text-seagreen"  />
                        ) : (
                            <p className="text-destructive">Out of Stock</p>
                        )}
                    </div>
                </CardContent>
            </Link>
        </Card>
     );
}
 
export default ProductCard;