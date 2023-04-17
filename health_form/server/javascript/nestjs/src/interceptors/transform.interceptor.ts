import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";


export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof Error) {
            data = data as Error

            return {
                error_code: data.error_code || 500,
                message: data.message
            }
        }

        return data;
      }),
    );
  }
}
