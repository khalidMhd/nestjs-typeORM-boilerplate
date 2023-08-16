import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass, plainToInstance } from 'class-transformer';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        if (Array.isArray(data)) {            
          return plainToInstance(data[0].constructor, data, { excludeExtraneousValues: true });
        } else {
          return plainToInstance(data.constructor, data, { excludeExtraneousValues: true });
        }
      })
    );
  }
}
