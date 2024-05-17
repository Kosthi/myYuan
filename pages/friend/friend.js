// pages/friend/friend.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tag: [
            {
                img: "../../assets/image/friend/地图.png",
                url: "/pages/chitchat/chitchat",
                username: "你在哪里"
            },
            {
                img: "../../assets/image/friend/更多.png",
                url: "/pages/chitchat/chitchat",
                username: "添加标签"
            },
            {
                img: "../../assets/image/friend/公开.png",
                url: "/pages/chitchat/chitchat",
                username: "公开·所有人可见"
            },
            {
                img: "../../assets/image/friend/设置.png",
                url: "/pages/chitchat/chitchat",
                username: "高级设置"
            }],

        chooseVideo() {
            wx.chooseVideo({
                sourceType: ['album'], // 从相册选择视频
                maxDuration: 60, // 视频最长拍摄时间，单位秒
                camera: 'back', // 使用后置摄像头
                success(res) {
                    console.log('选择视频成功', res.tempFilePath);
                    // 在这里可以处理选择视频成功后的逻辑，例如上传视频等
                },
                fail(err) {
                    console.error('选择视频失败', err);
                }
            })
        },
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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