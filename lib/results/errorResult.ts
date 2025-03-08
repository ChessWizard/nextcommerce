export class ErrorResult {
    errors: string[];
    isShow: boolean;
  
    constructor(errorOrErrors?: string | string[], isShow: boolean = false) {
      if (typeof errorOrErrors === "string") {
        this.errors = [errorOrErrors];
        this.isShow = isShow;
      } else if (Array.isArray(errorOrErrors)) {
        this.errors = errorOrErrors;
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
  