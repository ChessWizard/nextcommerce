import { BusinessMessage } from "./messages/common/businessMessage";
import { ErrorResult } from "./errorResult";

export class BaseResult<TData> {
  data: TData | null;
  message: BusinessMessage;
  errorDto?: ErrorResult;
  isSuccessful: boolean;

  constructor(
    data: TData | null,
    message: BusinessMessage,
    isSuccessful: boolean,
    errorDto?: ErrorResult
  ) {
    this.data = data;
    this.message = message;
    this.isSuccessful = isSuccessful;
    this.errorDto = errorDto;
  }

  toJSON() {
    return {
      data: this.data,
      message: this.message,
      isSuccessful: this.isSuccessful,
      errorDto: this.errorDto?.toJSON(),
    };
  }
}
