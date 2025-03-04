import { useFavicon, useTitle } from '@vueuse/core'
import { useHead } from '@vueuse/head'

export function useApp() {
  /**
   * 修改 APP Head Logo
   */
  function updateAppHead(title?: string, description?: string) {
    useTitle(title)
    useHead({
      meta: [
        {
          name: 'description',
          content: description,
        },
      ],
    })
    useFavicon('/favicon.svg')
  }
  return {
    updateAppHead,
  }
}
