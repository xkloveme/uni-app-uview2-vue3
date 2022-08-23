import MinRequest from './request'
const minRequest = new MinRequest()

// 请求拦截器
minRequest.interceptors.request((request: any) => {
  // request.header.Authorization = store.getters['commonModule/index/getOpenid'];
  // uni.showLoading({
  //   title: '加载中',
  // });
  return request
})

// 响应拦截器
minRequest.interceptors.response((response: any) => {
  // uni.hideLoading();
  if (response.data && response.data.code === 401) {
    // 保存登录信息
    uni.showModal({
      title: '接口异常',
      showCancel: false,
      content: response.data.msg,
      success: function () {
        uni.clearStorage()
        uni.clearStorageSync()
      },
    })
    return response.data
  } else if (response.data && response.data.code === 527) {
    uni.showModal({
      title: '提示',
      showCancel: false,
      content: response.msg,
      success: function () {
        uni.clearStorage()
        uni.clearStorageSync()
        uni.reLaunch({
          url: '/',
        })
      },
    })
  } else if (response.data && response.data.code >= 300) {
    if (response.msg) {
      uni.showToast({
        icon: 'none',
        title: response.msg,
      })
    }
    return response.data
  } else {
    return response.data
  }
})
export default minRequest
