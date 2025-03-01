import ProductList from "@/components/product/productList";
import { Metadata } from "next";

const HomePage = () => {
  return (
    <>
      <ProductList 
        title="Popular Products"  
        data={[]}/>
    </>
  )
  
}

export const metadata: Metadata = {
  title: "HomePage"
}
 
export default HomePage;