import minRequest from '@/utils/request/index'
const files = import.meta.globEager('../api/**/*.ts')
let apiAll: any = {}
const excludeFileNames = 'api/index.ts'
Object.keys(files).forEach(c => {
  if (!c.endsWith(excludeFileNames)) {
    apiAll = { ...apiAll, ...files[c] }
  }
})

// 设置默认配置
minRequest.setConfig((config: any) => {
  config.baseURL = import.meta.env.VITE_APP_BASE_API
  return config
})
for (const apis in apiAll) {
  for (const api in apiAll[apis]) {
    let newUrl = apiAll[apis][api]
    if (newUrl.toString().indexOf(':') !== -1) {
      let method: any = newUrl.split(':')[0]
      let URL: string = newUrl.split(':')[1]
      switch (method) {
        case 'get':
          apiAll[api] = (data: any, key: any) => {
            let isObj = Object.prototype.toString.call(data) === '[object Object]'
            let isStr = typeof data === 'string' || typeof data === 'number'
            if (isObj) {
              return minRequest.get(key ? URL + key : URL, data)
            } else if (isStr) {
              return minRequest.get(data ? URL + data : URL)
            } else {
              return minRequest.get(key ? URL + key : data ? URL + data : URL, data)
            }
          }
          break
        case 'post':
          apiAll[api] = (data: any, key: any) => {
            let isObj = Object.prototype.toString.call(data) === '[object Object]'
            let isStr = typeof data === 'string' || typeof data === 'number'
            if (isObj) {
              return minRequest.post(key ? URL + key : URL, data)
            } else if (isStr) {
              return minRequest.post(data ? URL + data : URL, null)
            } else {
              return minRequest.post(key ? URL + key : data ? URL + data : URL, data)
            }
          }
          break
        case 'put':
          apiAll[api] = (data: any, key: any) => {
            return minRequest.put(key ? URL + key : URL, data)
          }
          break
        case 'del':
          apiAll[api] = (data: any, key: any) => {
            return minRequest.del(key ? URL + key : URL, data)
          }
          break
        default:
          break
      }
    } else {
      apiAll[api] = (data: any, key: any) => {
        return minRequest.get(key ? URL + key : URL, data)
      }
    }
  }
}

export default apiAll

declare global {
  interface App {
    apiAll: typeof apiAll
  }
}
