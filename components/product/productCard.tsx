import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import ProductPrice from "./productPrice";

const ProductCard = ({
    data,
    hasLazyLoad = true,
}: {data: any;
    hasLazyLoad: boolean;
}) => {

    const navigationUrl = `/product/${data.slug}`

    return ( 
        <Card className="w-full max-w-sm">
            <Link href={navigationUrl}>
                <CardHeader className="p-0 items-center">
                    <Image src={data.images[0]}
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
                            <ProductPrice value={data.price.value}
                                          currency={data.price.currency}
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