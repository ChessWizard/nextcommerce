import ProductCard from "./productCard";

const ProductList = ({
    title,
    data
}: {title?: string; 
    data: any}) => {
    
    return ( 
        <div>
            <h2 className="h2-bold mb-4">{title}</h2>
            {data.length > 0 ? 
                (
                    <div className="grid gap-4 
                                         grid-cols-1 
                                         sm:grid-cols-2
                                         md:grid-cols-3
                                         lg:grid-cols-4"
                    >
                        {data.map((product: any) => (
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