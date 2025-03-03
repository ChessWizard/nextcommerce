import { getProductDetailsBySlugAsync } from "@/lib/actions/product.actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { notFound } from "next/navigation";
import ProductPrice from "@/components/product/productPrice";
import ProductImages from "@/components/product/productImages";

const ProductDetailsPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await props.params;
  const productDetails = await getProductDetailsBySlugAsync(slug);
  if (!productDetails) notFound();

  return (
    <>
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-5">
          <div className="col-span-2">
            <ProductImages images={productDetails.images} />
          </div>
          <div className="col-span-2 p-5">
            <div className="flex flex-col gap-6">
              <p>
                {productDetails.brand} {productDetails.category}
              </p>
              <h3 className="h3-bold">{productDetails.name}</h3>
              <p>
                {productDetails.rating} of {productDetails.numberOfReviews}{" "}
                Reviews
              </p>
              <div
                className="flex flex-col gap-3 
                                            sm:flex-row sm:items-center"
              >
                <ProductPrice
                  value={productDetails.prices[0].value}
                  currency={productDetails.prices[0].currency}
                  className="w-32 
                            rounded-full 
                            bg-seagreenextralight 
                            text-green-800
                            px-5 py-2
                            text-center"
                />
              </div>
            </div>
            <div className="mt-10">
              <p className="font-semibold">Description</p>
              <p>{productDetails.description}</p>
            </div>
          </div>
          <div className="col-span-1">
            <Card className="h-max">
              <CardContent className="p-4">
                <div className="mb-3 flex justify-between">
                  <div>Price</div>
                  <div>
                    <ProductPrice
                      value={productDetails.prices[0].value}
                      currency={productDetails.prices[0].currency}
                    />
                  </div>
                </div>
                <div className="mb-2 flex justify-between pb-5">
                    <div>Status</div>
                    {productDetails.stock > 0 ? (
                        <Badge variant="outline">In Stock</Badge>
                    ) : (
                        <Badge variant="destructive">Out of Stock</Badge>
                    )}
                </div>
                {productDetails.stock > 0 && (
                    <div className="flex justify-center items-center">
                        <Button className="w-full">Add to Cart</Button>
                    </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailsPage;
