import { BaseResult } from "./baseResult";
import { ErrorResult } from "./errorResult";
import { BusinessMessage } from "./messages/common/businessMessage";

export class Result<TData> extends BaseResult<TData> {
  constructor(
    data: TData | null,
    message: BusinessMessage,
    isSuccessful: boolean,
    errorDto?: ErrorResult
  ) {
    super(data, message, isSuccessful, errorDto);
  }

  static Success<TData>(data: TData, message: BusinessMessage): Result<TData>;
  static Success<TData>(message: BusinessMessage): Result<TData>;
  static Success<TData = null>(
    dataOrMessage: TData | BusinessMessage,
    messageArg?: BusinessMessage
  ): Result<TData> {
    if (messageArg === undefined) {
      return new Result<TData>(
        null,
        dataOrMessage as BusinessMessage,
        true
      );
    } else {
      return new Result<TData>(dataOrMessage as TData, messageArg, true);
    }
  }

  static Error<TData>(message: BusinessMessage): Result<TData>;
  static Error<TData>(message: BusinessMessage, error: ErrorResult): Result<TData>;
  static Error<TData>(
    message: BusinessMessage,
    error?: ErrorResult
  ): Result<TData> {
    return new Result<TData>(null, message, false, error);
  }
}
