import { BusinessMessage } from "./common/businessMessage"; 

const UserMessages: {
  Success: {
    SignIn: BusinessMessage
    SignUp: BusinessMessage
  },
  Error: {
    InvalidPassword: BusinessMessage
    NotFound: BusinessMessage
    Failed: BusinessMessage
    EmailConflict: BusinessMessage
  };
} = {
  Success: {

    // 200
    SignIn: {
      message: "Sign in successfully.",
      code: "USR20001",
      httpStatus: 200,
    },
    //204
    SignUp: {
        message: "Sign up successfully.",
        code: "USR20401",
        httpStatus: 204
    }
  },
  Error: {
    // 400
    InvalidPassword: {
      message: "Invalid password.",
      code: "USR40001",
      httpStatus: 400,
    },
    EmailConflict: {
      message: "This email already use.",
      code: "USR40002",
      httpStatus: 400,
    },
    // 404
    NotFound: {
      message: "User not found.",
      code: "USR40401",
      httpStatus: 404,
    },
    // 500
    Failed: {
      message: "User process failed.",
      code: "USR50001",
      httpStatus: 500,
    }
  },
};

export default UserMessages;
