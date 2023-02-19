import { ExceptionFilter, Catch, ArgumentsHost, HttpException, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // const status = exception.getStatus();

    console.log("HttpExceptionFilter:: exception:",exception)

    fail(response)(exception as any)
  }
}

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      // here return `index.html`

      console.log("-------- NotFoundExceptionFilter:: exception:", exception)

      response.status(404);
      response.json({
        status: 404,
        message: "Page not found",
      });
  }
}

const fail = (res: Response) => (error: Error & {error_code: number}) => {
  res.status(res.statusCode).json({ error_code: error.error_code || 500, message: error.message });
};
