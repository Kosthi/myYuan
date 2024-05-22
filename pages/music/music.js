// pages/banner/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bannerList: [],
        list: []
    },

    getBanner() {
        wx.request({
            url: 'http://114.116.29.103:3000/banner',
            method: "GET",
            data: {
                type: 1
            },
            success: res => {
                this.setData({
                    bannerList: res.data.banners
                })
            },
            fail: err => {
            }
        })
    },
    //获取歌单
    getList() {
        wx.request({
            url: 'http://114.116.29.103:3000/top/playlist/highquality',
            method: "GET",
            data: {
                cat: "华语",
                limit: 21
            },
            success: res => {
                console.log(res, '请求歌单')
                this.setData({
                    list: res.data.playlists
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //页面加载执行
        this.getBanner()
        this.getList()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        let count = 123
        let result = count / 100000000 > 1 ? (count / 100000000).toFixed(2) + '亿'
            : count / 10000 > 1 ? (count / 10000).toFixed(2) + '万' : count

        console.log(result)
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