import { validatePath } from 'utils'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import type { ConfigService } from '@nestjs/config'
import type { INestApplication } from '@nestjs/common'
import type { SwaggerCustomOptions } from '@nestjs/swagger'

/**
 * 注册
 */
export default async function registerSwagger(
  app: INestApplication,
  cfgSrv: ConfigService,
  globalPrefix: string,
  version: string,
) {
  const title = cfgSrv.get('SWAGGER_TITLE') || 'API'

  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setVersion(version)
    .setTitle(title)
    .setDescription(cfgSrv.get('SWAGGER_DESC') || 'API DOCS')
    .addServer('/')
    .build()

  const cssUrl = validatePath(`${globalPrefix}/assets/swagger.css`)
  const jsRaw = validatePath(`${globalPrefix}/assets/swagger.js`)

  const opt: SwaggerCustomOptions = {
    swaggerOptions: {
      filter: true,
      persistAuthorization: true,
      showCommonExtensions: true,
      displayRequestDuration: true,
      syntaxHighlight: { activate: true, theme: 'arta' },
      defaultModelsExpandDepth: -1,
      tagsSorter: 'alpha',
    },
    customCssUrl: cssUrl,
    customJs: jsRaw,
    useGlobalPrefix: true,
    customSiteTitle: title,
  }
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup(cfgSrv.get('SWAGGER_PATH') || '/docs', app, document, opt)
}
