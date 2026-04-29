const app = getApp()

Page({
  data: {
    question: {},
    selected: null,
    showResult: false,
    isCorrect: false
  },

  onLoad() {
    this.loadQuestion()
  },

  loadQuestion() {
    const dayOfYear = this.getDayOfYear(new Date())
    const questions = this.getQuestions()
    const question = questions[dayOfYear % questions.length] || {}
    
    this.setData({
      question: question
    })
  },

  getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0)
    const diff = date - start
    return Math.floor(diff / (1000 * 60 * 60 * 24))
  },

  getQuestions() {
    return [
      {
        id: 1,
        title: '求极限 lim(x→0) (sinx - x)/x³',
        content: '求极限 lim(x→0) (sinx - x)/x³',
        options: ['A. 0', 'B. -1/6', 'C. 1/6', 'D. 不存在'],
        answer: 'B',
        explanation: '使用泰勒展开：sinx = x - x³/6 + o(x³)，所以 sinx - x = -x³/6 + o(x³)，则极限为 -1/6'
      },
      {
        id: 2,
        title: '若 f(x) 在 x=0 处二阶可导，求 a, b',
        content: '设 f(x) = {ax+b, x≥0; sinx, x<0}，若 f(x) 在 x=0 处二阶可导，求 a, b',
        options: ['A. a=1, b=0', 'B. a=0, b=1', 'C. a=1, b=1', 'D. a=0, b=0'],
        answer: 'A',
        explanation: '需要满足：1) 连续：b=0；2) 一阶导数连续：a=1'
      }
    ]
  },

  selectAnswer(e) {
    if (this.data.showResult) return
    
    this.setData({
      selected: e.currentTarget.dataset.index
    })
  },

  submitAnswer() {
    if (this.data.selected === null) {
      wx.showToast({
        title: '请选择一个答案',
        icon: 'none'
      })
      return
    }

    const options = this.data.question.options
    const selectedAnswer = options[this.data.selected].charAt(0)
    const isCorrect = selectedAnswer === this.data.question.answer

    this.setData({
      showResult: true,
      isCorrect: isCorrect
    })

    if (!isCorrect) {
      this.saveToWrongBook(selectedAnswer)
    }

    wx.showToast({
      title: isCorrect ? '正确！' : '错误',
      icon: isCorrect ? 'success' : 'none'
    })
  },

  saveToWrongBook(yourAnswer) {
    const wrongQuestions = wx.getStorageSync('wrongQuestions') || []
    const newWrong = {
      id: this.data.question.id,
      title: this.data.question.title,
      content: this.data.question.content,
      yourAnswer: yourAnswer,
      correctAnswer: this.data.question.answer,
      wrongDate: this.formatDate(new Date())
    }
    wrongQuestions.unshift(newWrong)
    wx.setStorageSync('wrongQuestions', wrongQuestions)
  },

  formatDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
})