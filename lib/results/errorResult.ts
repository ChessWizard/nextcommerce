export class ErrorResult {
    errors: string | string[];
    isShow: boolean;
  
    constructor(errors: string | string[], isShow: boolean = false) {
      if (typeof errors === "string") {
        this.errors = [errors];
        this.isShow = isShow;
      } else if (Array.isArray(errors)) {
        this.errors = errors;
        this.isShow = isShow;
      } else {
        this.errors = [];
        this.isShow = isShow;
      }
    }

    toJSON() {
      return {
        errors: this.errors,
        isShow: this.isShow
      };
    }
  }
  