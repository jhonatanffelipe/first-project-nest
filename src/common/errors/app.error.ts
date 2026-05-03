import { HttpException, HttpStatus } from '@nestjs/common';

export class AppError extends HttpException {
  constructor(
    message: string,
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    public readonly context?: string,
    public readonly meta?: Record<string, unknown>,
  ) {
    super(message, statusCode);
  }
}
