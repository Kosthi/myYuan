const app = getApp()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        // 在数据中设置一个数组，用于记录每个项目的图片显示状态，默认为隐藏
        imageVisible: [false, false, false, false, false],
        userInfo: {},
        publishList: [],
        menuList: [
            {
                img: "/assets/image/me/购物车空.png",
                title: "抖声商城",
                url: "/pages/shop/index"
            },
            {
                img: "/assets/image/me/观看历史.png",
                title: "观看历史",
                url: "/pages/history/index"
            },
            {
                img: "/assets/image/me/音乐.png",
                title: "抖声音乐",
                url: "/pages/music/index"
            },
            {
                img: "/assets/image/me/我的钱包.png",
                title: "抖声外卖",
                url: "/pages/money/index"
            },
            {
                img: "/assets/image/me/我的钱包.png",
                title: "我的钱包",
                url: "/pages/money/index"
            },
            {
                img: "/assets/image/me/常用_查看更多.png",
                title: "查看更多",
                url: "/pages/much/index"
            }
        ],
    },

    // 点击事件处理函数
    toggleImage(e) {
        // 获取点击的项目索引
        const index = e.currentTarget.dataset.index;
        // 获取当前图片显示状态数组
        let imageVisible = this.data.imageVisible;
        // 切换对应索引的图片显示状态
        imageVisible[index] = !imageVisible[index];
        // 更新数据
        this.setData({
            imageVisible: imageVisible
        })
    },

    // 生命周期函数--监听页面加载
    onLoad(options) {
        let token = wx.getStorageSync('token')
        let userId = wx.getStorageSync('userId')

        getUserInfoPromise(userId, token)
            .then((userInfo) => {
                console.log(userInfo)
                this.setData({
                    userInfo: userInfo
                })
            })
            .catch((error) => {
                console.error('Failed to get user info:', error)
            })

        // Use the Promise to handle the asynchronous operation
        getPublishListPromise(userId, token)
            .then((publishList) => {
                console.log(publishList);
                // Update the data property
                this.setData({
                    publishList: publishList
                })
            })
            .catch((error) => {
                console.error('Failed to get publish list:', error);
            })
    },

    // 生命周期函数--监听页面初次渲染完成
    onReady() {
    },

    // 生命周期函数--监听页面显示
    onShow() {
    },

    // 生命周期函数--监听页面隐藏
    onHide() {
    },

    // 生命周期函数--监听页面卸载
    onUnload() {
    },

    // 页面相关事件处理函数--监听用户下拉动作
    onPullDownRefresh() {
    },

    // 页面上拉触底事件的处理函数
    onReachBottom() {
    },

    // 用户点击右上角分享
    onShareAppMessage() {
    }
})

// 在注册或登录成功后会调用/douyin/user/接口拉取当前登录用户的全部信息，并存储到本地
function getPublishList(userId, token, callback) {
    const apiUrl = app.serverUrl + '/douyin/publish/list/'
    wx.request({
        url: apiUrl,
        method: 'GET',
        data: {
            user_id: userId,
            token: token
        },
        success: function (res) {
            // 获取用户信息成功的处理逻辑
            console.log('Get publish list successful:', res.data)
            // 处理注册成功的响应数据
            const statusCode = res.data.status_code
            if (statusCode === 0) {
                wx.setStorageSync('publishList', res.data.video_list || [])
                callback(true, "获取视频列表成功")
            } else {
                // 注册失败，输出错误信息
                console.error('Get publish list failed:', res.data.status_msg)
                callback(false, res.data.status_msg)
            }
        },
        fail: function (error) {
            // 获取用户信息失败的处理逻辑
            console.error('Failed to get publish list:', error);
            callback(false, error)
        }
    });
}

// Wrap the getPublishList function in a Promise
const getPublishListPromise = (userId, token) => {
    return new Promise((resolve, reject) => {
        getPublishList(userId, token, function (success, msg) {
            if (success) {
                const publishList = wx.getStorageSync('publishList');
                resolve(publishList);
            } else {
                reject(msg);
            }
        });
    });
}

// 在注册或登录成功后会调用/douyin/user/接口拉取当前登录用户的全部信息，并存储到本地
function getUserInfo(userId, token, callback) {
    const apiUrl = app.serverUrl + '/douyin/user/'
    wx.request({
        url: apiUrl,
        method: 'GET',
        data: {
            user_id: userId,
            token: token
        },
        success: function (res) {
            // 获取用户信息成功的处理逻辑
            console.log('Get user info successful:', res.data)
            // 处理注册成功的响应数据
            const statusCode = res.data.status_code
            if (statusCode === 0) {
                wx.setStorageSync('userInfo', res.data.user)
                callback(true, "获取用户信息成功")
            } else {
                // 注册失败，输出错误信息
                console.error('Get user info failed:', res.data.status_msg)
                callback(false, res.data.status_msg)
            }
        },
        fail: function (error) {
            // 获取用户信息失败的处理逻辑
            console.error('Failed to get user info:', error)
            callback(false, error)
        }
    })
}

function getUserInfoPromise(userId, token) {
    return new Promise((resolve, reject) => {
        getPublishList(userId, token, function (success, msg) {
            if (success) {
                const userInfo = wx.getStorageSync('userInfo')
                resolve(userInfo)
            } else {
                reject(msg)
            }
        })
    })
}
