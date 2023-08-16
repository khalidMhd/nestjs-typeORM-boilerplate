import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = 'Database connection error.';

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
