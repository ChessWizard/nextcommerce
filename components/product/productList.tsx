import { ProductDTO } from "@/lib/models/product.models";
import ProductCard from "./productCard";

const ProductList = ({
    title,
    data
}: {title?: string; 
    data: ProductDTO[]}) => {
    
    return ( 
        <div className="bg-gray-200 px-5 py-5">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            {data.length > 0 ? 
                (
                    <div className="grid gap-4
                                         grid-cols-1 
                                         sm:grid-cols-2
                                         md:grid-cols-3
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
 
export default ProductList;