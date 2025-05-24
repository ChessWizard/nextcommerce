import { BusinessMessage } from "./common/businessMessage"; 

const DistrictMessages: {
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
      message: "Districts found.",
      code: "DST20001",
      httpStatus: 200,
    },

  },
  Error: {

    // 404
    NotFoundPlural: {
      message: "Districts not found.",
      code: "DST40401",
      httpStatus: 404,
    },
    
    // 500
    Failed: {
        message: "District process failed.",
        code: "DST50001",
        httpStatus: 500,
    }
  },
};

export default DistrictMessages;
