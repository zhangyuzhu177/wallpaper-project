import { CodeDto } from 'src/dto/code.dto'
import type { LoginByWeChatDto } from 'types'

export class LoginByWeChatBodyDto
  extends CodeDto
  implements LoginByWeChatDto { }
