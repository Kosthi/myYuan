// pages/friend/friend.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        description: '',
        tempFilePath: '',
        tag: [
            {
                img: "../../assets/image/friend/地图.png",
                url: "/pages/locate/locate",
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
            }
        ]
    },

    handleInput: function (event) {
        this.setData({
            description: event.detail.value
        });
    },

    chooseVideo() {
        var that = this;
        wx.chooseVideo({
            sourceType: ['album'], // 从相册选择视频
            maxDuration: 60, // 视频最长拍摄时间，单位秒
            camera: 'back', // 使用后置摄像头
            success(res) {
                console.log('选择视频成功', res.tempFilePath);
                that.data.tempFilePath = res.tempFilePath;
                // that.uploadFile(res.tempFilePath);
            },
            fail(err) {
                console.error('选择视频失败', err);
            }
        })
    },

    uploadVideo() {
        if (this.data.tempFilePath === '' || this.data.description === '') {
            console.log('作品描述不能为空或未选择视频')
            return
        }

        const token = wx.getStorageSync('token')  // 用户鉴权token
        const title = this.data.description    // 视频标题
        const apiUrl = app.serverUrl + '/douyin/publish/action/'

        wx.uploadFile({
            url: apiUrl,
            filePath: this.data.tempFilePath,
            name: 'data', // 对应接口中的字段名
            formData: {
                token: token,
                title: title
            },
            success: (res) => {
                console.log('上传视频成功', res);
                wx.showToast({
                    title: '发布成功',
                    icon: 'success',
                    duration: 2000
                });
                // 这里处理上传成功后的逻辑
            },
            fail: (err) => {
                wx.showToast({
                    title: '发布失败',
                    icon: 'fail',
                    duration: 2000
                });
                console.error('上传视频失败', err);
            }
        })

        this.data.tempFilePath = ''
        this.data.description = ''
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
