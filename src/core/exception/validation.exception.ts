import AbstractException from "./abstract.exception";

class ValidationException extends AbstractException {
  constructor(
    name = "",
    httpCode = 400,
    description = "internal server error"
  ) {
    super(name, httpCode, description);
  }
}

export default ValidationException;
