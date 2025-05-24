import { BusinessMessage } from "./common/businessMessage"; 

const CityMessages: {
  Success: {
    FoundPlural: BusinessMessage
  },
  Error: {
    NotFoundPlural: BusinessMessage,
    Failed: BusinessMessage
  };
} = {
  Success: {

    // 200
    FoundPlural: {
      message: "Cities found.",
      code: "CTY20001",
      httpStatus: 200,
    },

  },
  Error: {

    // 404
    NotFoundPlural: {
      message: "Cities not found.",
      code: "CTY40401",
      httpStatus: 404,
    },
    
    // 500
    Failed: {
        message: "City process failed.",
        code: "CTY50001",
        httpStatus: 500,
    }
  },
};

export default CityMessages;
