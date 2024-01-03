import { Response } from "express";
import AbstractResponse from "./abstract.response";

class ErrorResponse extends AbstractResponse {
  public data?: Record<string, unknown>;

  constructor(
    data?: Record<string, unknown>,
    message?: string,
    statusCode?: number
  ) {
    super(message || "Error", statusCode || 400);
    this.data = data;
  }

  send(res: Response<any, Record<string, any>>): void {
    res.status(this.statusCode).json({
      message: this.message,
      status: this.statusCode,
      data: this.data,
    });
  }
}

export default ErrorResponse;
