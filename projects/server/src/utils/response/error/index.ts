import _smsError from './_sms.error'
import _authError from './_auth.error'
import _userError from './_user.error'
import _fileErrors from './_file.error'
import _adminError from './_admin.error'
import _commonError from './_common.error'
import _noticeError from './_notice.error'
import _weixinError from './_weixin.error'
import _sysConfigError from './_sys-config.error'
import _adminRoleErrors from './_admin-role.error'

export const errorMessages: ErrorMessageCollection = {
  ..._smsError,
  ..._authError,
  ..._userError,
  ..._fileErrors,
  ..._adminError,
  ..._commonError,
  ..._noticeError,
  ..._weixinError,
  ..._sysConfigError,
  ..._adminRoleErrors,
}
