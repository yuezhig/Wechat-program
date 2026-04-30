Page({
  data: {
    list: []
  },

  onShow() {
    let list = wx.getStorageSync('leaveList') || [];
    this.setData({ list });
  },

  goDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    });
  }
});