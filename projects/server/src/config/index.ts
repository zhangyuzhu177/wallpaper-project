import _db from './_db.config'
import _app from './_app.config'
import _saConfig from './_sa.config'
import _jwtConfig from './_jwt.config'
import _ossConfig from './_oss.config'
import _redisConfig from './_redis.config'
import _weChartConfig from './_weChat.config'

export default [
  _db,
  _app,
  _saConfig,
  _ossConfig,
  _jwtConfig,
  _redisConfig,
  _weChartConfig,
]
