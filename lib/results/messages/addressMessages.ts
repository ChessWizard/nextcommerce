import { BusinessMessage } from "./common/businessMessage"; 

const AddressMessages: {
  Success: {
    Found: BusinessMessage
  },
  Error: {
    NotFound: BusinessMessage,
    Failed: BusinessMessage
  };
} = {
  Success: {

    // 200
    Found: {
      message: "Address found.",
      code: "ADR20001",
      httpStatus: 200,
    },

  },
  Error: {

    // 404
    NotFound: {
      message: "Address not found.",
      code: "ADR40401",
      httpStatus: 404,
    },
    
    // 500
    Failed: {
        message: "Address process failed.",
        code: "USR50001",
        httpStatus: 500,
    }
  },
};

export default AddressMessages;
