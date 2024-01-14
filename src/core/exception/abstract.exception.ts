class AbstractException extends Error {
  status: number;

  constructor(message: string = "Internal Server Error", status: number = 500) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
  }
}

export default AbstractException;
