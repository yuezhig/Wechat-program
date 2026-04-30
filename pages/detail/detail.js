Page({
  data: {
    leave: null
  },

  onLoad(options) {
    wx.setNavigationBarTitle({ title: '请假详情' });
    let id = parseInt(options.id);
    let list = wx.getStorageSync('leaveList') || [];
    let leave = list.find(item => item.id === id) || null;
    this.setData({ leave });
  },

  previewImg(e) {
    wx.previewImage({ urls: [e.currentTarget.dataset.url] });
  },

  forwardLeave() {
    wx.showToast({ title: '已转发给审批人', icon: 'success' });
  }
});