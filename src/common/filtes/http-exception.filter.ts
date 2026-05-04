import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppError } from '../errors/app.error';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    console.log(exception);

    const status =
      exception instanceof AppError
        ? exception.getStatus()
        : exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof AppError
        ? exception.message
        : exception instanceof HttpException
          ? exception.message
          : 'Internal server error';

    const meta: Record<string, unknown> = {
      statusCode: status,
      method: req.method,
      path: req.url,
    };

    if (exception instanceof AppError && exception.meta) {
      Object.assign(meta, exception.meta);
    }

    if (exception instanceof Error && exception.stack && status >= 500) {
      meta.stack = exception.stack;
    }

    res.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: req.url,
    });
  }
}
