// pages/chitchat/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      containerHeight: '110vh',
    },
  
    onKeyboardHeightChange(res) {
      console.log('Keyboard height:', res.height);
      let height = res.height;
      if (height > 0) {
        // 键盘弹出时，计算合适的高度
        let containerHeight = `calc(100vh - ${height}px)`;
        this.setData({
          containerHeight: containerHeight
        });
      } else {
        // 键盘收起时，恢复默认高度
        this.setData({
          containerHeight: '100vh'
        });
      }
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      console.log('Initial container height:', this.data.containerHeight);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})