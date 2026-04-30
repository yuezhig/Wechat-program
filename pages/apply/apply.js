Page({
  data: {
    leaveTypes: ['病假', '事假', '公假', '其他'],
    leaveTypeIndex: 0,
    teachers: [
      { id: 1, name: '李浩然' },
      { id: 2, name: '岳智广' },
      { id: 3, name: '王建国' },
      { id: 4, name: '张伟' },
      { id: 5, name: '刘晓华' }
    ],
    teacherIndex: 0,
    startTimeStr: '',
    endTimeStr: '',
    leaveCampus: false,
    phone: '',
    reason: '',
    attachments: [],
    agreed: false,
    dateTimeRange: [[], [], []],
    startDateTime: null,
    endDateTime: null
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '我要请假' });
    this.initDateTimeRange();
  },

  initDateTimeRange() {
    let dates = [];
    let now = new Date();
    for (let i = 0; i < 30; i++) {
      let d = new Date(now.getTime() + i * 86400000);
      dates.push(`${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`);
    }
    let hours = Array.from({length: 24}, (_, i) => i + '时');
    let minutes = ['00分', '30分'];
    this.setData({
      'dateTimeRange[0]': dates,
      'dateTimeRange[1]': hours,
      'dateTimeRange[2]': minutes
    });
  },

  onTypeChange(e) {
    this.setData({ leaveTypeIndex: e.detail.value });
  },

  onTeacherChange(e) {
    this.setData({ teacherIndex: e.detail.value });
  },

  onStartColumnChange(e) {},
  onStartTimeChange(e) {
    let val = e.detail.value;
    let date = this.data.dateTimeRange[0][val[0]];
    let hour = this.data.dateTimeRange[1][val[1]].replace('时', '');
    let minute = this.data.dateTimeRange[2][val[2]].replace('分', '');
    let timeStr = `${date} ${hour}:${minute}`;
    this.setData({ startTimeStr: timeStr, startDateTime: new Date(`${date} ${hour}:${minute}`) });
  },

  onEndColumnChange(e) {},
  onEndTimeChange(e) {
    let val = e.detail.value;
    let date = this.data.dateTimeRange[0][val[0]];
    let hour = this.data.dateTimeRange[1][val[1]].replace('时', '');
    let minute = this.data.dateTimeRange[2][val[2]].replace('分', '');
    let timeStr = `${date} ${hour}:${minute}`;
    this.setData({ endTimeStr: timeStr, endDateTime: new Date(`${date} ${hour}:${minute}`) });
  },

  onLeaveCampusChange(e) {
    this.setData({ leaveCampus: e.detail.value });
  },

  onPhoneInput(e) {
    this.setData({ phone: e.detail.value });
  },

  onReasonInput(e) {
    this.setData({ reason: e.detail.value });
  },

  chooseImage() {
    let that = this;
    wx.chooseMedia({
      count: 4 - this.data.attachments.length,
      mediaType: ['image'],
      success(res) {
        let tempFiles = res.tempFiles.map(f => f.tempFilePath);
        that.setData({ attachments: that.data.attachments.concat(tempFiles) });
      }
    });
  },

  removeAttachment(e) {
    let idx = e.currentTarget.dataset.index;
    let newAttachments = [...this.data.attachments];
    newAttachments.splice(idx, 1);
    this.setData({ attachments: newAttachments });
  },

  previewImage(e) {
    wx.previewImage({ urls: [e.currentTarget.dataset.url] });
  },

  onAgreeChange(e) {
    this.setData({ agreed: e.detail.value.length > 0 });
  },

  submitLeave() {
    if (!this.data.agreed) {
      wx.showToast({ title: '请勾选承诺', icon: 'none' });
      return;
    }
    if (!this.data.startDateTime || !this.data.endDateTime) {
      wx.showToast({ title: '请选择时间', icon: 'none' });
      return;
    }
    if (this.data.endDateTime <= this.data.startDateTime) {
      wx.showToast({ title: '结束时间需晚于开始时间', icon: 'none' });
      return;
    }
    if (!this.data.phone.match(/^1[3-9]\d{9}$/)) {
      wx.showToast({ title: '手机号格式错误', icon: 'none' });
      return;
    }
    if (!this.data.reason) {
      wx.showToast({ title: '请填写请假原因', icon: 'none' });
      return;
    }

    let diffMs = this.data.endDateTime - this.data.startDateTime;
    let diffMin = Math.floor(diffMs / 60000);
    let hours = Math.floor(diffMin / 60);
    let mins = diffMin % 60;
    let duration = hours > 0 ? `${hours}小时${mins}分钟` : `${mins}分钟`;

    let teacher = this.data.teachers[this.data.teacherIndex];
    let leaveRecord = {
      id: Date.now(),
      type: this.data.leaveTypes[this.data.leaveTypeIndex],
      teacher: teacher.name,
      startTime: this.data.startTimeStr,
      endTime: this.data.endTimeStr,
      leaveCampus: this.data.leaveCampus,
      phone: this.data.phone,
      reason: this.data.reason,
      attachments: this.data.attachments,
      duration: duration,
      status: '已通过',
      applyTime: new Date().toLocaleString(),
      approvals: [
        { name: '我', action: '发起申请', time: new Date().toLocaleString(), opinion: '' },
        { name: teacher.name, action: '审批通过', time: new Date().toLocaleString(), opinion: '同意请假' }
      ]
    };

    let list = wx.getStorageSync('leaveList') || [];
    list.unshift(leaveRecord);
    wx.setStorageSync('leaveList', list);

    wx.showToast({ title: '提交成功', icon: 'success' });
    setTimeout(() => {
      wx.switchTab({ url: '/pages/list/list' });
    }, 1500);
  }
});