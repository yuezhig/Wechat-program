App({
  onLaunch() {
    // 初始化数据
    if (!wx.getStorageSync('leaveList')) {
      wx.setStorageSync('leaveList', []);
    }
  }
});