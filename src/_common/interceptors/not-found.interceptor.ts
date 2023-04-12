import { CallHandler, Injectable, NestInterceptor, ExecutionContext, NotFoundException } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {

  constructor(private condition: boolean) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle()
      .pipe(tap(data => {
        if (!this.condition) throw new NotFoundException();
      }));
  }
}