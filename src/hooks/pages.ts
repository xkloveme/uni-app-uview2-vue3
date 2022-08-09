import { ToRefs } from 'vue'
import { PageParams } from '@/types'

type QueryDefaultData<T> = Omit<PageParams, 'data'> & { data: T & AObjectHasAnyKeys }
/**
 * 获得当前页面跳转携带的参数和信息
 * (依赖 app.to )
 * @param fn 函数时为回调函数,其他为默认返回值
 */
// export function useQuery<T>(fn: T): ToRefs<QueryDefaultData<T>>
// export function useQuery(fn?: (data: any) => void): ToRefs<PageParams>
export function useQuery<T>(fn?: (data: any) => void | T) {
  let options = getCurrentPages().pop()['$page']?.options
  const query = reactive<{ data?: any; uuid?: string; from?: string }>({
    data: options,
    uuid: null,
    from: null,
  })
  let uuid = options?.uuid
  query.data = { ...query.data, ...options }
  uni.$emit(uuid + '_query', pkg => Object.assign(query, pkg))
  return toRefs(query)
}

import { Mescroll } from '@/types'
export const ScrollSymbol = Symbol('mescroll')
export interface ScrollOptions {
  mescroll?: Mescroll
  enable: 'none' | 'up' | 'down' | 'all'
  fetch: (...arg: any[]) => void
}
/**
 * 上拉加载,下拉刷新
 *
 * @example
 * useScroll(onPageScroll)
 *   .onLoad((page) => {
 *     page.endSuccess()
 *   })
 */

export function useScroll(onPageScroll?: typeof import('@dcloudio/uni-app')['onPageScroll']) {
  const scrollOptions = reactive<ScrollOptions>({
    enable: 'all',
    mescroll: null,
    fetch: page => setTimeout(() => page.endSuccess(10, false), 1000),
  })
  let { mescroll, fetch, enable } = $(scrollOptions)
  provide(ScrollSymbol, scrollOptions)
  onPageScroll?.(e => mescroll && mescroll.onPageScroll(e))
  onReachBottom(() => mescroll && mescroll.onReachBottom())
  onPullDownRefresh(() => mescroll && mescroll.onPullDownRefresh())

  const o = {
    onLoad: (cb: (mescroll: Mescroll) => void) => ((fetch = cb), o),
    enable: (type: ScrollOptions['enable']) => ((enable = type), o),
    mescroll: $$(mescroll),
  }
  return o
}
