Page({
  data: {
    wrongQuestions: []
  },

  onShow() {
    this.loadWrongQuestions()
  },

  loadWrongQuestions() {
    const userWrongs = wx.getStorageSync('userWrongs') || []
    this.setData({
      wrongQuestions: userWrongs
    })
  },

  deleteQuestion(e) {
    const id = e.currentTarget.dataset.id
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这道错题吗？',
      success: (res) => {
        if (res.confirm) {
          const userWrongs = wx.getStorageSync('userWrongs') || []
          const newWrongs = userWrongs.filter(q => q.id !== id)
          wx.setStorageSync('userWrongs', newWrongs)
          
          this.setData({
            wrongQuestions: newWrongs
          })
          
          wx.showToast({ title: '删除成功' })
        }
      }
    })
  },

  goToAddWrong() {
    wx.navigateTo({
      url: '/pages/addwrong/addwrong'
    })
  },

  previewImage(e) {
    const src = e.currentTarget.dataset.src
    wx.previewImage({
      urls: [src]
    })
  }
})