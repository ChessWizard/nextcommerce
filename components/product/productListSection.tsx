import ProductDTO from "@/types/product/productDTO";
import ProductCard from "./productCard";
import { cn } from "@/lib/utils";

const ProductListSection = ({
    title,
    className,
    data
}: {title?: string;
    className?: string; 
    data: ProductDTO[]}) => {
    
    return ( 
        <div className= {cn(className)}>
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            {data.length > 0 ? 
                (
                    <div className="grid gap-4 place-items-center
                                         grid-cols-1
                                         md:grid-cols-2
                                         lg:grid-cols-5"
                    >
                        {data.map((product: ProductDTO) => (
                            <ProductCard 
                                key={product.slug}
                                data={product}
                                hasLazyLoad={false} 
                            />
                        ))}

                    </div>
                ) : 
                (
                   <div>
                    No product found... 
                   </div>  
                )}
        </div>
     );
}
 
export default ProductListSection;