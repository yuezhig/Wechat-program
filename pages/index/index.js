const app = getApp()

Page({
  data: {
    date: '',
    todayWrong: {},
    totalCount: 0,
    wrongQuestions: []
  },

  onShow() {
    this.setData({ date: this.formatDate(new Date()) })
    this.loadTodayWrong()
  },

  formatDate(date) {
    return `${date.getFullYear()}年${String(date.getMonth() + 1).padStart(2, '0')}月${String(date.getDate()).padStart(2, '0')}日`
  },

  loadTodayWrong() {
    const userWrongs = wx.getStorageSync('userWrongs') || []
    const todayWrong = userWrongs.length > 0 
      ? userWrongs[Math.floor(Date.now() / 86400000) % userWrongs.length]
      : null
    this.setData({ todayWrong, totalCount: userWrongs.length, wrongQuestions: userWrongs })
  },

  goToWrongBook() {
    wx.navigateTo({ url: '/pages/wrongbook/wrongbook' })
  },

  goToAddWrong() {
    wx.navigateTo({ url: '/pages/addwrong/addwrong' })
  },

  previewImage(e) {
    const src = e.currentTarget.dataset.src
    wx.previewImage({ urls: [src] })
  },

  stopPropagation() {}
})