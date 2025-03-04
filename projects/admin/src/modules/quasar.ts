import quasarLang from 'quasar/lang/zh-CN'
import { Dialog, Loading, Notify, Quasar } from 'quasar'
import quasarIconSet from 'quasar/icon-set/fontawesome-v6'
import type { UserModule } from '~/types'

// Import icon libraries
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

export const install: UserModule = ({ app, isClient }) => {
  if (!isClient)
    return
  app.use(Quasar, {
    plugins: {
      Notify,
      Dialog,
      Loading,
    },
    lang: quasarLang,
    iconSet: quasarIconSet,
    config: {
      dark: false,
    },
  })
}

Notify.registerType('success', {
  icon: 'fas fa-check',
  progress: true,
  color: 'alerts-success-1',
  position: 'top',
  timeout: 3000,
})
Notify.registerType('error', {
  icon: 'fas fa-bug',
  progress: true,
  color: 'alerts-error-1',
  position: 'top',
  timeout: 3000,
})
Notify.registerType('warning', {
  icon: 'fas fa-exclamation',
  progress: true,
  color: 'alerts-warning-1',
  position: 'top',
  timeout: 3000,
})
Notify.registerType('loading', {
  spinner: true,
  color: 'alerts-warning-1',
  position: 'top',
  timeout: 0,
  group: false,
})
