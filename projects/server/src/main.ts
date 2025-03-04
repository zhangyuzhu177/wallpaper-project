import * as path from 'node:path'

import fmp from '@fastify/multipart'
import * as dotenvFlow from 'dotenv-flow'
import { NestFactory } from '@nestjs/core'
import compression from '@fastify/compress'
import { ConfigService } from '@nestjs/config'
import { Logger, ValidationPipe } from '@nestjs/common'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import { parseBoolRaw, parseIntRaw, validatePath } from 'utils'
import type { NestFastifyApplication } from '@nestjs/platform-fastify'

import { AppModule } from './app.module'
import { exceptionFactory } from './utils'
import registerSwagger from './bootstrap/register-swagger'

async function bootstrap() {
  const logger = new Logger('Bootstrap')

  // 添加环境变量
  dotenvFlow.config({ path: '../shared' })

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const packageJson = await require(path.join(__dirname, '../package.json'))
  const cfgSrv = app.get(ConfigService)
  const globalPrefix = validatePath(cfgSrv.get('app.basePath'))
  app.setGlobalPrefix(globalPrefix)

  // 注册 Swagger
  if (parseBoolRaw(cfgSrv.get('SWAGGER_ENABLED')))
    await registerSwagger(app, cfgSrv, globalPrefix, packageJson.version)

  /** 启用 压缩 */
  app.register(compression)
  /** 文件 */
  app.register(fmp, {
    attachFieldsToBody: true,
    limits: {
      fileSize: 1024 * 1024 * 1024,
    },
  })

  /** 启用 validation */
  app.useGlobalPipes(
    new ValidationPipe({ exceptionFactory }),
  )

  // 全局 variables
  globalThis.prefix = globalPrefix
  globalThis.version = packageJson.version

  // 启动服务
  await app.listen(parseIntRaw(cfgSrv.get('SERVER_PORT'), 3000), '::')
  logger.verbose(`App is running on ${await app.getUrl()}${cfgSrv.get('SERVER_BASE_PATH')}/`)

  // 关闭应用及数据库连接
  async function close() {
    await app.close()
    process.exit(0)
  }
  process.on('SIGINT', close)
  process.on('SIGTERM', close)
}
bootstrap()
