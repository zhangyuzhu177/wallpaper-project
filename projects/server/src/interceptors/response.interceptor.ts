import { catchError, map } from 'rxjs'
import type { Observable } from 'rxjs'
import { Injectable } from '@nestjs/common'
import { responseSuccess } from 'src/utils'
import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        const req: FastifyRequest = context.switchToHttp().getRequest()

        // 如果是file路径，并且是GET请求直接返回，否则包装响应体
        if (req.url.match(/\/file\//) && req.method === 'GET')
          return data
        return responseSuccess(data)
      }),
      catchError(async (e) => {
        throw e
      }),
    )
  }
}
