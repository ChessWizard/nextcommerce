import { BusinessMessage } from "./common/businessMessage"; 

const CartMessages: {
  Success: {
    AddedToCart: BusinessMessage,
    ProductRetaked: BusinessMessage
  },
  Error: {
    NotFoundProductRetakeToCart: BusinessMessage,
    ProductAlreadyAdded: BusinessMessage
  };
} = {
  Success: {

    // 200
    ProductRetaked: {
      message: "Product retaked to cart.",
      code: "CRT20001",
      httpStatus: 200,
    },
    
    // 201
    AddedToCart: {
        message: "Product added to cart.",
        code: "CRT20101",
        httpStatus: 201,
    },
  },
  Error: {

    // 400
    ProductAlreadyAdded: {
      message: "Product already added cart.",
      code: "CRT40001",
      httpStatus: 400,
    },
    
    // 404
    NotFoundProductRetakeToCart: {
      message: "Product not found for retake to cart.",
      code: "CRT40401",
      httpStatus: 404,
    },
    
  },
};

export default CartMessages;
