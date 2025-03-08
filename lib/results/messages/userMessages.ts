import { BusinessMessage } from "./common/businessMessage"; 

const UserMessages: {
  Success: {
    SignIn: BusinessMessage
  },
  Error: {
    InvalidPassword: BusinessMessage;
    NotFound: BusinessMessage;
  };
} = {
  Success: {

    // 200
    SignIn: {
      message: "Sign in successfully.",
      code: "USR20001",
      httpStatus: 200,
    }
  },
  Error: {
    InvalidPassword: {
      message: "Invalid password.",
      code: "USR40001",
      httpStatus: 400,
    },
    NotFound: {
      message: "User not found.",
      code: "USR40401",
      httpStatus: 404,
    },
  },
};

export default UserMessages;
