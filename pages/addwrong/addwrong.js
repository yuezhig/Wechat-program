Page({
  data: {
    qType: 'camera',
    eType: 'text',
    questionImage: '',
    explainImage: '',
    title: '',
    explanation: ''
  },

  setQType(e) {
    this.setData({ qType: e.currentTarget.dataset.type })
  },

  setEType(e) {
    this.setData({ eType: e.currentTarget.dataset.type })
  },

  uploadQuestionImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({ questionImage: res.tempFiles[0].tempFilePath })
      }
    })
  },

  uploadExplainImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({ explainImage: res.tempFiles[0].tempFilePath })
      }
    })
  },

  inputTitle(e) {
    this.setData({ title: e.detail.value })
  },

  inputExplanation(e) {
    this.setData({ explanation: e.detail.value })
  },

  submitWrong() {
    const { qType, eType, questionImage, title, explainImage, explanation } = this.data
    
    if (qType === 'camera' && !questionImage) {
      wx.showToast({ title: '请上传题目图片', icon: 'none' })
      return
    }
    if (qType === 'text' && !title.trim()) {
      wx.showToast({ title: '请输入题目', icon: 'none' })
      return
    }

    const newWrong = {
      id: Date.now(),
      qType: qType,
      eType: eType,
      questionImage: qType === 'camera' ? questionImage : '',
      questionText: qType === 'text' ? title : '',
      explainImage: eType === 'camera' ? explainImage : '',
      explainText: eType === 'text' ? explanation : '',
      addDate: this.formatDate(new Date())
    }

    const userWrongs = wx.getStorageSync('userWrongs') || []
    userWrongs.unshift(newWrong)
    wx.setStorageSync('userWrongs', userWrongs)

    wx.showToast({ title: '保存成功', icon: 'success' })
    setTimeout(() => wx.navigateBack(), 1500)
  },

  formatDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
})