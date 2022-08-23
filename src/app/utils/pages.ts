import { debounce, DebouncedFuncLeading } from 'lodash'
import { useQuery } from '@/hooks'

export function getPath(p: string, currentGroup: string) {
  let [group, path] = Array.from(p.match(/^(?:#(.*?)(?:\/|$))?(.*)$/)).slice(1)
  if (group === undefined) return path
  else return `/pages/${group || currentGroup}/${path || 'index'}`
}
function urlEncode(param, key = null, encode = true) {
  if (param == null) return ''
  let paramStr = ''
  let t = typeof param
  if (t == 'string' || t == 'number' || t == 'boolean') {
    paramStr += '&' + key + '=' + (encode == null || encode ? encodeURIComponent(param) : param)
  } else {
    for (let i in param) {
      let k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
      paramStr += urlEncode(param[i], k, encode)
    }
  }
  return paramStr
}

let to = debounce(
  (path: string, obj?: any) => {
    const currentPath = getCurrentPages().pop()['route']
    const currentGroup = currentPath.split('/')[1]
    const uuid = Math.random().toString(36).slice(-6) + new Date().getTime()

    const pkg = { data: obj, from: currentPath, uuid }
    uni.$on(uuid + '_query', cb => cb(pkg))
    let url = getPath(path, currentGroup)
    uni
      .navigateTo({ url: url + '?' + urlEncode({ uuid: uuid, ...obj }) })
      .then(() => app.info('页面切换', obj || '', '=>', path == url ? path : `${path} (${url})`))
      .catch(err => app.error('页面切换失败', '=>' + path, err))
    return new Promise<any>(
      (r, e) => (uni.$once(uuid + '_resolve', r), uni.$once(uuid + '_reject', e)),
    )
  },
  50,
  { leading: true, trailing: false },
)

const back = debounce(
  (data?: any, type: 'resolve' | 'reject' = 'resolve') => {
    if (data) console.log('回调:', data)
    const { uuid } = useQuery()
    uni.$emit(uuid.value + '_' + type, data)
    const url = '/pages/index/index'
    if (getCurrentPages().length > 1) uni.navigateBack()
    else uni.redirectTo({ url }).catch(() => uni.switchTab({ url }))
  },
  50,
  { leading: true, trailing: false },
) as DebouncedFuncLeading<(data?: any, type?: 'resolve' | 'reject') => void> & {
  resolve: (data?: any) => void
  reject: (data?: any) => void
}

back.resolve = (data?: any) => back(data, 'resolve')
back.reject = (data?: any) => back(data, 'reject')

const pageTools = {
  to,
  back,
}

export default function () {
  Object.assign(app, pageTools)
}

type pageType = typeof pageTools

declare global {
  interface App extends pageType {}
}
