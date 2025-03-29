import { BusinessMessage } from "./common/businessMessage"; 

const ProductMessages: {
  Success: {
    Created: BusinessMessage
  },
  Error: {
    NotFound: BusinessMessage,
    OutOfStock: BusinessMessage
  };
} = {
  Success: {

    // 201
    Created: {
      message: "Create product successfully.",
      code: "PRO20101",
      httpStatus: 201,
    },
  },
  Error: {

    // 400
    OutOfStock: {
      message: "This product out of stock",
      code: "PRO40001",
      httpStatus: 400,
    },
    
    // 404
    NotFound: {
      message: "Product not found.",
      code: "PRO40401",
      httpStatus: 404,
    },
  },
};

export default ProductMessages;
