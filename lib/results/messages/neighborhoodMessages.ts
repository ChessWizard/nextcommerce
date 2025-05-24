import { BusinessMessage } from "./common/businessMessage"; 

const NeighborhoodMessages: {
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
      message: "Neighborhoods found.",
      code: "NGH20001",
      httpStatus: 200,
    },

  },
  Error: {

    // 404
    NotFoundPlural: {
      message: "Neighborhoods not found.",
      code: "NGH40401",
      httpStatus: 404,
    },
    
    // 500
    Failed: {
        message: "Neighborhood process failed.",
        code: "NGH50001",
        httpStatus: 500,
    }
  },
};

export default NeighborhoodMessages;
