import { useStorage } from '@vueuse/core'

import { AUTH_TOKEN_KEY } from '../constants/storage'

/** token */
export const authToken = useStorage(AUTH_TOKEN_KEY, '')
