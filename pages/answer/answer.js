Page({
  data: {
    isCorrect: false
  },

  onLoad(options) {
    if (options.correct) {
      this.setData({
        isCorrect: options.correct === 'true'
      })
    }
  },

  goHome() {
    wx.navigateTo({
      url: '/pages/index/index'
    })
  },

  shareResult() {
    wx.showShareMenu({
      withShareTicket: true
    })
  }
})