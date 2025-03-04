import _smsError from './_sms.error'
import _authError from './_auth.error'
import _userError from './_user.error'
import _commonError from './_common.error'
import _noticeError from './_notice.error'
import _sysConfigError from './_sys-config.error'

export const errorMessages: ErrorMessageCollection = {
  ..._smsError,
  ..._authError,
  ..._userError,
  ..._commonError,
  ..._noticeError,
  ..._sysConfigError,
}
