import ProductListSection from "@/components/product/productListSection";
import { getPopularProducts } from "@/lib/actions/product.actions";
import { Metadata } from "next";

const HomePage = async () => {

  const popularProducts = await getPopularProducts()

  return (
    <>
      <ProductListSection 
        title="Popular Products"  
        data={popularProducts}
        className="bg-gray-200 px-5 py-5 rounded-md"
      />
    </>
  )
  
}

export const metadata: Metadata = {
  title: "HomePage"
}
 
export default HomePage;