import { ref } from 'vue'
import type { UnwrapRef } from 'vue'
import type { Router } from 'vue-router'

/** 全局 router */
export const globalRouter = ref<UnwrapRef<Router>>()
