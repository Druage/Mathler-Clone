export class SolutionLengthError {
  public message: string;

  constructor() {
    this.message =
      "SolutionLengthError: The solution provided must be the same length as solution you are trying to find";
  }
}

export class ResultMathError {
  public message: string;

  constructor() {
    this.message =
      "ResultMathError: The solution provided does not equal the target result";
  }
}
