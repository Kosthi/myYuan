// pages/detail/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        index: 0,
        info: {},
        imgs: []
    },

    showfn() {
        this.setData({
            show: true
        })
    },
    hideFn() {
        this.setData({
            show: false
        })
    },

    changeIndex(e) {
        this.setData({
            index: e.detail.current
        })
    },

    /**
     * 生命周期函数--监听页面加载 获取接口来获取数据
     */
    onLoad(options) {
        console.log(options, '获取到参数')
        wx.request({
            url: 'http://121.89.205.189:3000/api/pro/detail/' + options.id,
            method: "GET",
            success: res => {
                console.log(res, '商品详情情数据')
                this.setData({
                    info: res.data.data,
                    imgs: [res.data.data.img1, res.data.data.img2, res.data.data.img3, res.data.data.img4]
                })
                //怎么去设置title
                wx.setNavigationBarTitle({
                    title: res.data.data.proname,
                })
            }
        })
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