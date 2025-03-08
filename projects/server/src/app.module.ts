import { join } from 'node:path'

import { validatePath } from 'utils'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
import { Module, RequestMethod } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import type { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import type { MiddlewareConsumer, NestModule } from '@nestjs/common'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'

import allConfig from './config'
import { LogModule } from './modules/log/log.module'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { CodeModule } from './modules/code/code.module'
import { IpMiddleware } from './middleware/ip.middleware'
import { RedisModule } from './modules/redis/redis.module'
import { AdminModule } from './modules/admin/admin.module'
import { AuthMiddleware } from './middleware/auth.middleware'
import { NoticeModule } from './modules/notice/notice.module'
import { AccessMiddleware } from './middleware/access.middleware'
import { WallpaperModule } from './modules/wallpaper/wallpaper.module'
import { SysConfigModule } from './modules/sys-config/sys-config.module'
import { ResponseInterceptor } from './interceptors/response.interceptor'
import { ThrottlerExceptionFilter } from './filter/throttler-exception.filter'
import { JwtAuthModule } from './modules/jwt/jwt.module'
import { FileModule } from './modules/file/file.module'

@Module({
  imports: [
    // Internal Modules
    LogModule,
    UserModule,
    CodeModule,
    AuthModule,
    FileModule,
    AdminModule,
    RedisModule,
    NoticeModule,
    JwtAuthModule,
    SysConfigModule,
    WallpaperModule,

    // 定时任务
    ScheduleModule.forRoot(),
    // 请求限流
    ThrottlerModule.forRoot({ ttl: 10, limit: 30 }),

    // 环境配置
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.dev', '.env.staging', '.env.production', '.env'],
      isGlobal: true,
      cache: true,
      load: [...allConfig],
    }),
    // 数据库
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfgSrv: ConfigService) => cfgSrv.get<TypeOrmModuleOptions>('db'),
    }),
    // 静态资源服务
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfgSrv: ConfigService) => [
        {
          rootPath: join(__dirname, 'public'),
          serveRoot: validatePath(cfgSrv.get('app.basePath')),
        },
      ],
    }),
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_FILTER, useClass: ThrottlerExceptionFilter },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IpMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    })
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    })
    consumer.apply(AccessMiddleware)
      .exclude(
        { path: 'log/(.*)', method: RequestMethod.ALL },
      ).forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      })
  }
}
