import ProductList from "@/components/product/productList";
import { getPopularProducts } from "@/lib/actions/product.actions";
import { Metadata } from "next";

const HomePage = async () => {

  const popularProducts = await getPopularProducts()

  return (
    <>
      <ProductList 
        title="Popular Products"  
        data={popularProducts}/>
    </>
  )
  
}

export const metadata: Metadata = {
  title: "HomePage"
}
 
export default HomePage;