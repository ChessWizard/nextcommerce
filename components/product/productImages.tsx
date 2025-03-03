"use client";

import { useState } from "react";
import Image from "next/image";

const ProductImages = ({ images }: { images: string[] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <>
      <div className="space-y-4 border rounded-lg border-gray-200">
        <Image
          src={images[currentImageIndex]}
          alt="Product Big Image"
          width={1000}
          height={1000}
          className="h-[450px] py-2"
          priority={true}
          object-cover="true"
          object-center="true"
        />
      </div>
      <div className="flex py-7 gap-x-4">
        {images.map((image, index) => (
          <div key={index}
               onMouseEnter={() => setCurrentImageIndex(index)}
          >
            <Image
              src={image}
              alt="Product Small Image"
              className={`border rounded-lg cursor-pointer py-2  ${currentImageIndex == index ? "border-[3px] border-blue-400" : "border-gray-300"}` }
              width={70}
              height={70}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductImages;
