// pages/login/login.js
const app = getApp()

const admins = [
    {
        id: 1,
        username: "lisi",
        password: "123456",
        nickname: "凌晨.ヾ",
        age: 20,
        number: "210405225",
        tel: "15524497402",
        sex: "男",
        avatar: "https://img0.baidu.com/it/u=530540642,263790536&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=667",
    },
    {
        id: 2,
        username: "zs",
        password: "123456",
        nickname: "张三ll",
        age: 20,
        number: "210405225",
        tel: 17729340454,
        sex: "男",
        avatar: "https://inews.gtimg.com/news_bt/OIPr9G8LrCpP4K3cdWrmvalN2p2YWWB3URkibvS38awOEAA/641",
    }
]

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isAgreed: false, // 初始状态为未同意
        isRegistering: false // 初始状态为登录
    },

    agreeTerms: function () {
        // 切换状态
        this.setData({
            isAgreed: !this.data.isAgreed
        });
    },

    switchToRegister() {
        // 切换登录/注册状态
        this.setData({
            isRegistering: !this.data.isRegistering
        });
    },

    formSubmit(e) {
        if (this.data.isRegistering) {
            // 如果当前是注册状态，则调用注册逻辑
            this.register(e);
        } else {
            // 如果当前是登录状态，则调用登录逻辑
            this.login(e);
        }
    },

    // 处理登录逻辑
    // 提交登录表单，发送登录请求
    login(e) {
        console.log('登录');
        // 账号密码
        let value = e.detail.value
        if (value.username.length === 0 || value.password.length === 0) {
            wx.showToast({
                title: "账户或密码不为空",
                icon: "none"
            })
            return
        }
        // 发送登录请求
        userLogin(value.username, value.password, function (success, msg) {
            if (success) {
                wx.showToast({
                    title: msg,
                    icon: "success",
                    success: () => {
                        // 跳转去首页
                        setTimeout(() => {
                            wx.navigateBack() // 返回上一页
                        }, 150)
                    },
                    fail: (error) => {
                        console.error('跳转失败', error);
                    }
                })
            } else {
                wx.showToast({
                    title: "账户或密码错误",
                    icon: "error"
                })
            }
        })
    },

    // 处理注册逻辑
    // 提交注册表单，发送注册请求
    register(e) {
        console.log('注册');
        // 账号密码
        let value = e.detail.value
        if (value.username.length === 0 || value.password.length === 0) {
            wx.showToast({
                title: "账户或密码不为空",
                icon: "none"
            })
            return
        }
        // 发送注册请求
        userRegister(value.username, value.password, function (success, msg) {
            if (success) {
                wx.showToast({
                    title: msg,
                    icon: "success",
                    success: () => {
                        // 跳转去首页
                        setTimeout(() => {
                            wx.navigateBack() // 返回上一页
                        }, 150)
                    },
                    fail: (error) => {
                        console.error('跳转失败', error);
                    }
                })
            } else {
                wx.showToast({
                    title: msg,
                    icon: "error"
                })
            }
        })
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

// 定义发送注册请求的函数
function userRegister(username, password, callback) {
    // 构建请求的URL
    const apiUrl = app.serverUrl + '/douyin/user/register/'
    // 发送HTTP POST请求
    wx.request({
        url: apiUrl,
        method: 'POST',
        data: {
            username: username,
            password: password
        },
        success: function (res) {
            // 请求成功的回调函数
            console.log('User registration successful:', res.data)
            // 处理注册成功的响应数据
            const statusCode = res.data.status_code
            if (statusCode === 0) {
                // 注册成功，可以获取用户id和鉴权token
                const userId = res.data.user_id
                const token = res.data.token
                // 在这里处理注册成功后的逻辑，比如保存用户信息到本地存储中
                wx.setStorageSync('userId', userId)
                wx.setStorageSync('token', token)
                callback(true, "注册成功")
            } else {
                // 注册失败，输出错误信息
                console.error('User registration failed:', res.data.status_msg)
                callback(false, res.data.status_msg)
            }
        },
        fail: function (error) {
            // 请求失败的回调函数
            console.error('Failed to send user registration request:', error)
            callback(false, error)
        }
    })
}

// 用户登录
function userLogin(username, password, callback) {
    const apiUrl = app.serverUrl + '/douyin/user/login/'
    wx.request({
        url: apiUrl,
        method: 'POST',
        data: {
            username: username,
            password: password
        },
        success: function (res) {
            // 登录成功的处理逻辑
            console.log('User login successful:', res.data)
            // 处理注册成功的响应数据
            const statusCode = res.data.status_code
            if (statusCode === 0) {
                // 注册成功，可以获取用户id和鉴权token
                const userId = res.data.user_id
                const token = res.data.token
                // 在这里处理注册成功后的逻辑，比如保存用户信息到本地存储中
                wx.setStorageSync('userId', userId)
                wx.setStorageSync('token', token)
                callback(true, "登录成功")
            } else {
                // 注册失败，输出错误信息
                console.error('User login failed:', res.data.status_msg)
                callback(false)
            }
        },
        fail: function (error) {
            // 请求失败的回调函数
            console.error('Failed to send user login request:', error)
            callback(false)
        }
    })
}
