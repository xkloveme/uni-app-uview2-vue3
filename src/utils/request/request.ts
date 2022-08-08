const config = Symbol('config')
const isCompleteURL = Symbol('isCompleteURL')
const requestBefore = Symbol('requestBefore')
const requestAfter = Symbol('requestAfter')

class Request {
  [config] = {
    baseURL: '',
    header: {
      Accept: '*/*',
      'content-type': 'application/json',
      // 'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
  }

  interceptors = {
    request: (func: any) => {
      if (func) {
        Request[requestBefore] = func
      } else {
        Request[requestBefore] = request => request
      }
    },
    response: (func: any) => {
      if (func) {
        Request[requestAfter] = func
      } else {
        Request[requestAfter] = response => response
      }
    },
  }

  static [requestBefore](config: any) {
    return config
  }

  static [requestAfter](response: any) {
    return response
  }

  static [isCompleteURL](url: any) {
    return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
  }

  setConfig(func: any) {
    this[config] = func(this[config])
  }

  request(options: any = {}) {
    options.baseURL = options.baseURL || this[config].baseURL
    options.dataType = options.dataType || this[config].dataType
    options.url = Request[isCompleteURL](options.url) ? options.url : options.baseURL + options.url
    // options.data = options?.data
    options.header = { ...options.header, ...this[config].header }
    options.method = options.method || this[config].method

    options = { ...options, ...Request[requestBefore](options) }

    return new Promise((resolve, reject) => {
      options.success = function (res: any) {
        resolve(Request[requestAfter](res))
      }
      options.fail = function (err: any) {
        reject(Request[requestAfter](err))
      }
      uni.request(options)
    })
  }

  get(url?: string, data?: any, options: any = {}) {
    options.url = url
    options.data = data
    options.method = 'GET'
    return this.request(options)
  }

  post(url: string, data: any, options: any = {}) {
    options.url = url
    options.data = data
    options.method = 'POST'
    return this.request(options)
  }
  put(url: string, data: any, options: any = {}) {
    options.url = url
    options.data = data
    options.method = 'PUT'
    return this.request(options)
  }
  del(url: string, data: any, options: any = {}) {
    options.url = url
    options.data = data
    options.method = 'DELETE'
    return this.request(options)
  }
}

export default Request
