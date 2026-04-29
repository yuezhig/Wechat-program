Page({
  data: {
    tab: 'all',
    questions: []
  },

  onShow() {
    this.loadHistory()
  },

  loadHistory() {
    const mockData = [
      { id: 1, date: '2024-01-15', title: '求极限 lim(x→0) (sinx - x)/x³', done: true, correct: true },
      { id: 2, date: '2024-01-14', title: '若 f(x) 在 x=0 处二阶可导，求 a, b', done: true, correct: false },
      { id: 3, date: '2024-01-13', title: '计算定积分 ∫₀¹ x²dx', done: false, correct: false },
      { id: 4, date: '2024-01-12', title: '求函数 y=ln(x+1) 的导数', done: true, correct: true },
      { id: 5, date: '2024-01-11', title: '判断级数 ∑1/n 的敛散性', done: true, correct: true }
    ]
    
    this.setData({
      questions: mockData
    })
  },

  switchTab(e) {
    this.setData({
      tab: e.currentTarget.dataset.tab
    })
  },

  viewQuestion(e) {
    wx.navigateTo({
      url: '/pages/question/question?id=' + e.currentTarget.dataset.id
    })
  }
})