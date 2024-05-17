Page({

    /**
     * 页面的初始数据
     * 设置了一个变量
     */
    data: {
        bannerList: []
    },

    getBannerList() {
        wx.request({
            url: 'http://114.116.29.103:3000/banner',
            method: "GET",
            data: {
                type: 2
            },
            //发请求成功之后的callback
            success: res => {
                console.log(res, '成功')
                this.setData({
                    bannerList: res.data.banners
                })
            },
            //http状态
            fail: (err) => {
                //访问失败
                console.log(err, rrr)
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getBannerList()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})