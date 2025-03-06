<script lang="ts" setup>
import { ref } from 'vue'

import { useSidebar } from '../../composables/sidebar'
import ZIconBtn from '../../../../components/btn/ZIconBtn.vue'
import type { AdminItemProps } from '../../composables/sidebar'
import logoutIcon from '../../../../assets/icons/logout.svg?raw'
import ZLogoutDialog from '../../../../components/dialog/ZLogoutDialog.vue'

withDefaults(defineProps<AdminItemProps>(), {
  role: '无',
})

const { isExpand } = useSidebar()

/** 退出登录对话框 */
const dialog = ref(false)
</script>

<template>
  <div
    class="admin-item"
    :px="isExpand ? 4 : 0"
  >
    <div
      v-if="isExpand"
      overflow-hidden
      p4 rounded-2 bg-grey-2
      flex="~ items-start justify-between gap2"
    >
      <div flex="~ gap2">
        <div
          subtitle-2 max-w-25 truncate
          v-text="name"
        />
        <div
          flex="~ col items-start gap1"
          max-w-30 subtitle-4
        >
          <div
            p="y3px x2" rounded-10 bg-primary-4
            text-primary-1 max-w-full truncate
            v-text="role"
          />
          <div
            v-if="phone"
            text-grey-7 max-w-full truncate
            v-text="phone"
          />
        </div>
      </div>
      <ZIconBtn
        text-grey-9
        :svg="logoutIcon"
        @click="dialog = true"
      />
    </div>

    <div
      v-else
      flex="~ col"
    >
      <div h12 flex-center>
        <div
          subtitle-3
          rounded-10 w30px h30px
          flex-center b="1 primary-1"
          text-primary-1 cursor-pointer
        >
          <div v-if="name" v-text="name.substring(0, 1)" />
          <div v-else i-mingcute:user-2-line />

          <q-popup-proxy
            anchor="bottom right"
            self="bottom left"
            :offset="[4, 0]"
            :breakpoint="0"
            rounded-2 b="1 grey-3" p4
            bg-grey-1
            style="box-shadow: 0px 5px 3px -2px #00000005, 0px 3px 2px -2px #0000000F"
          >
            <div flex="~ gap2">
              <div
                subtitle-2 max-w-25 truncate
                v-text="name"
              />
              <div
                flex="~ col items-start gap1"
                max-w-30 subtitle-4
              >
                <div
                  p="y3px x2" rounded-10 bg-primary-4
                  text-primary-1 max-w-full truncate
                  v-text="role"
                />
                <div
                  v-if="phone"
                  text-grey-7 max-w-full truncate
                  v-text="phone"
                />
              </div>
            </div>
          </q-popup-proxy>
        </div>
      </div>
      <div h12 flex-center>
        <ZIconBtn
          text-grey-9
          :svg="logoutIcon"
          @click="dialog = true"
        />
      </div>
    </div>

    <ZLogoutDialog v-model="dialog" @logout="logout" />
  </div>
</template>
