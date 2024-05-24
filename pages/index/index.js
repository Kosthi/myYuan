// about.js
//获取应用实例
import * as event from '../../utils/event.js'

const Http = require('../../utils/request.js')
const app = getApp()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        progress: 0,
        current: 0,
        autoplay: true,
        controls: false,
        showPlayBtn: false,
        showProgress: false,
        playState: true,
        animationShow: false,
        currentTranslateY: 0,
        // 触摸开始时间
        touchStartTime: 0,
        // 触摸结束时间
        touchEndTime: 0,
        // 最后一次单击事件点击发生时间
        lastTapTime: 0,
        // 单击事件点击后要触发的函数
        lastTapTimeoutFunc: null,
        touchStartingY: 0,
        nowPage: 1,
        pageNo: 1,
        videoid: 0,
        favoritecount: 0,
        rows: 9,
        videoList: [],
        videoIndex: 0,
        objectFit: "contain",
        conid: '',
        lecid: '',
        indexVideo: '',
        rewardNum: '',
        gold: '',
        // 评论
        commentList: [],
        commentnum: 0,
        inputValue: '',
        addingText: false,
        hasmoreData: false,
        loaderMore: true,
        hiddenloading: false,
        nodata: false,
        windowHeight: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    // tabBar只会加载一次
    onLoad: function () {
        // 滑动为触摸结束事件设置200ms时延，避免函数被多次调用影响性能
        this.videoChange = throttle(this.touchEndHandler, 200)
        console.log(this.videoChange, 'this.videoChange')
        // 绑定updateVideoIndex事件，更新当前播放视频index
        event.on('updateVideoIndex', this, function (index) {
            console.log('event updateVideoIndex:', index)
            // 设置一个定时器，延迟 600 毫秒后执行指定的回调函数
            setTimeout(() => {
                this.setData({
                    animationShow: false,
                    playState: true
                }, () => {
                    // 切换src后，video不能立即播放，settimeout一下
                    setTimeout(() => {
                        this.vvideo.play()
                    }, 100)
                })
            }, 600)
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let latestTime = wx.getStorageSync('nextTime') || 0
        let token = wx.getStorageSync('token') || ''
        getFeedPromise(latestTime, token)
            .then((videoList) => {
                console.log(videoList)
                // 只有返回有更新的视频时才需要更新
                if (videoList.length > 0) {
                    this.setData({
                        videoList: videoList
                    })
                }
            })
            .catch((error) => {
                console.error('Failed to get feed:', error)
            })
        this.setData({
            windowHeight: wx.getSystemInfoSync().windowHeight
        })
    },

    onReady: function () {
        // 创建了一个视频上下文对象，用于控制视频的播放、暂停、跳转等操作。
        // "kdvideo" 是视频组件的唯一标识符，它告诉小程序哪个视频组件是被操作的，而 this 则是视频上下文的作用域，它指向当前页面实例。
        this.vvideo = wx.createVideoContext("kdvideo", this)
        // 创建了一个动画对象，用于实现页面元素的动画效果。其中，duration 表示整个动画过程花费的时间
        this.animation = wx.createAnimation({
            duration: 500,// 整个动画过程花费的时间，单位为毫秒
            transformOrigin: '0 0 0'// 动画的变换原点
        })
        this.toast = this.selectComponent("#toast");
        // 评论组件弹出动画
        this.animationTwo = wx.createAnimation({
            duration: 400, // 整个动画过程花费的时间，单位为毫秒
            timingFunction: "ease", // 动画的类型
            delay: 0 // 动画延迟参数
        })
    },

    // 切换播放状态时，根据当前的播放状态执行相应的操作，并更新页面数据以反映播放状态的变化
    changePlayStatus() {
        console.log('changePlayStatus')
        if (this.data.animationShow) {

        } else {
            // 如果在播放则暂停
            var playState = this.data.playState
            if (playState) {
                this.vvideo.pause()
            } else {
                // 暂停则播放
                this.vvideo.play()
            }
            this.setData({
                playState: !playState
            })
        }
    },

    bindTimeUpdateHandler(e) {
        // 视频当前播放时间
        const currentTime = e.detail.currentTime;
        // 视频总时间
        const duration = e.detail.duration;
        // 百分比
        const progress = (currentTime / duration) * 100;
        // console.log(progress)
        // Update progress
        this.setData({
            progress: progress // Keep two decimal places
        })
    },

    // 触摸开始事件发生时，记录触摸的开始时间戳和 Y 坐标，并将 Y 坐标更新到页面数据中
    touchStart(e) {
        this.touchStartTime = e.timeStamp
        let touchStartingY = this.data.touchStartingY
        touchStartingY = e.touches[0].clientY
        console.log(touchStartingY)
        this.setData({
            touchStartingY: e.touches[0].clientY
        })
    },

    touchMove(e) {
        this.videoChange(e)
    },

    touchEndHandler(e) {
        let touchStartingY = this.data.touchStartingY
        // console.log(touchStartingY)
        // console.log(e.changedTouches[0].clientY)
        let deltaY = e.changedTouches[0].clientY - touchStartingY
        // console.log('deltaY ', deltaY)

        let index = this.data.videoIndex
        // console.log(index, 'index')

        // 往上滑动，前面要有视频
        if (deltaY > 100 && index !== 0) {
            // 更早地设置 animationShow
            this.setData({
                animationShow: true
            }, () => {
                // console.log('-1 切换')
                this.data.commentList = [] //滑动上一个视频清除评论列表
                this.createAnimation(-1, index).then((res) => {
                    console.log(res)
                    this.setData({
                        // animation: this.animation.export(),
                        videoIndex: res.index,
                        // currentTranslateY: res.currentTranslateY,
                        progress: 0
                    }, () => {
                        event.emit('updateVideoIndex', res.index)
                    })
                })
            })
        } else if (deltaY < -100 && index !== (this.data.videoList.length - 1)) {
            // 往下滑动，后面要有视频
            this.setData({
                animationShow: true
            }, () => {
                // console.log('+1 切换')
                this.createAnimation(1, index).then((res) => {
                    this.setData({
                        // animation: this.animation.export(),
                        videoIndex: res.index,
                        // currentTranslateY: res.currentTranslateY,
                        progress: 0
                    }, () => {
                        event.emit('updateVideoIndex', res.index)
                    })
                })
            })
        }
    },

    touchEnd(e) {
        console.log('------touchEnd------')
        console.log(e)
        this.touchEndTime = e.timeStamp
        this.videoChange(e)
    },

    touchCancel(e) {
        console.log('------touchCancel------')
        console.log(e)
    },

    // direction为-1，向上滑动，animationImage1为(index)的poster，animationImage2为(index+1)的poster
    // direction为1，向下滑动，animationImage1为(index-1)的poster，animationImage2为(index)的poster
    createAnimation(direction, index) {
        // let videoList = this.data.videoList
        // let currentTranslateY = this.data.currentTranslateY
        // console.log('direction ', direction)
        // console.log('index ', index)
        // 更新 videoIndex
        index += direction
        // currentTranslateY += -direction * this.data.windowHeight
        // console.log('currentTranslateY: ', currentTranslateY)
        // this.animation.translateY(currentTranslateY).step()

        return Promise.resolve({
            index: index,
            // currentTranslateY: currentTranslateY
        })
    },

    showComments: function (e) {
        let token = wx.getStorageSync('token')
        let videoId = e.currentTarget.dataset.videoid
        // 加载数据
        this.setData({
            // 清空输入文本框
            inputValue: '',
            videoid: e.currentTarget.dataset.videoid,
            // commentnum: e.currentTarget.dataset.commentnum
        })

        var that = this
        getCommentList(token, videoId, function (success, msg) {
            if (success) {
                console.log('获取评论列表成功')
                let commentList = wx.getStorageSync('commentList') || []
                that.setData({
                    commentList: commentList.reverse()
                })
            } else {
                console.log(msg)
            }
        })

        // 设置动画内容为：使用绝对定位显示区域，高度变为100%
        this.animationTwo.bottom("0rpx").height("100%").step()
        this.setData({
            talksAnimationData: this.animationTwo.export(),
            animationShow: true
        })
    },

    hideComments: function () {
        // 设置动画内容为：使用绝对定位隐藏整个区域，高度变为0
        this.animationTwo.bottom("-100%").height("0rpx").step()
        this.setData({
            commentList: [],
            talksAnimationData: this.animationTwo.export(),
            animationShow: false,
        })
        this.vvideo.play()
    },

    // 双击
    doubleTap: function (e) {
        let token = wx.getStorageSync('token') || ''
        if (!token) {
            wx.navigateTo({
                url: '/pages/login/login',
            })
            return
        }

        // 控制点击事件在350ms内触发，加这层判断是为了防止长按时会触发点击事件
        if (e.currentTarget.dataset.isfavorite === true) {
            this.videoLikeAction(e, token, 2)
            let videoIndex = e.currentTarget.dataset.index
            let videoList = this.data.videoList
            // 更新视频对象的属性
            videoList[videoIndex].is_favorite = false
            videoList[videoIndex].favorite_count -= 1
            // 使用 setData 更新 videoList
            this.setData({
                videoList: videoList
            })
        } else {
            this.videoLikeAction(e, token, 1)
            let videoIndex = e.currentTarget.dataset.index
            let videoList = this.data.videoList
            // 更新视频对象的属性
            videoList[videoIndex].is_favorite = true
            videoList[videoIndex].favorite_count += 1
            // 使用 setData 更新 videoList
            this.setData({
                videoList: videoList
            })
        }
    },

    // 1点赞 2取消
    videoLikeAction: function (e, token, actionType) { // 点赞视频
        let videoId = e.currentTarget.dataset.videoid
        sendFavoriteAction(token, videoId, actionType, function (success, msg) {
            if (success) {
                if (actionType === 1) {
                    console.log('点赞成功')
                } else if (actionType === 2) {
                    console.log('取消点赞成功')
                } else {
                    console.log('未知错误')
                }
            } else {
                if (actionType === 1) {
                    console.log('点赞失败')
                } else if (actionType === 2) {
                    console.log('取消点赞失败')
                } else {
                    console.log('未知错误')
                }
            }
        })

    },

    /**
     * 获取用户信息
     */
    // getOwnInfo: function () {
    //     var params = {
    //         accessToken: app.globalData.token
    //     }
    //     Http.HttpRequst(false, '/api/lecture/getOwnInfo', false, '', params, 'get', false, function (res) {
    //         if (res.code === 102) {
    //             app.globalData.userId = res.dataObject.lecturerId
    //         } else if (res.code === 1001) {
    //
    //         }
    //     })
    // },

    contentInput: function (e) {
        this.setData({
            inputValue: e.detail.value
        })
    },

    /**
     * 点击评论视频
     */
    addComment: function (e) {
        let token = wx.getStorageSync('token') || ''
        if (!token) {
            wx.redirectTo({
                url: '/pages/login/login',
            })
            return
        }

        let videoId = this.data.videoid
        let comment_text = this.data.inputValue
        var that = this

        // 1-发布评论，2-删除评论
        // comment_text 用户填写的评论内容，在 action_type=1 的时候使用
        // comment_id 要删除的评论id，在 action_type=2 的时候使用
        sendCommentAction(token, videoId, 1, comment_text, -1, function (success, comment, msg) {
            if (success) {
                let commentList = that.data.commentList || []
                let videoIndex = that.data.videoIndex
                let videoList = that.data.videoList
                // 更新视频对象的属性
                videoList[videoIndex].comment_count += 1
                // 使用 unshift 方法将 comment 添加到 commentList 的尾部
                commentList.unshift(comment)
                that.setData({
                    inputValue: '',
                    videoList: videoList,
                    commentList: commentList
                })
            } else {
                console.log(msg)
            }
        })
        // sendCommentAction(token, videoId, 2, '', comment_id)
    },

    /**
     * 点击头像关注
     */
    addLecturerFans: function (e) {
    },
    //粉丝取消关注
    delLecturerFans: function (e) {
    },

    // /**
    //  * 悬赏弹框组件
    //  */
    // onShowModal: function (e) {
    //     // 显示弹框
    //     this.setData({
    //         addingText: true,
    //         conid: e.currentTarget.dataset.conid,
    //         lecid: e.currentTarget.dataset.lecid,
    //         indexVideo: e.currentTarget.dataset.index,
    //         rewardNum: e.currentTarget.dataset.rewardnum
    //     })
    // },

    // onInputCancel: function () {
    //     // 隐藏弹框
    //     console.log(55566)
    //     this.setData({
    //         addingText: false
    //     })
    // }
})

// 使用节流的方式来处理 touchEndHandler 函数的调用。
// 在实际应用中，如果在短时间内频繁调用 touchEndHandler，节流函数将确保只有在两次调用之间的时间间隔超过 200 毫秒时才会实际执行 touchEndHandler 函数。
// 这样可以避免在滑动等连续操作中触发过多的函数调用，提高性能和用户体验。
function throttle(fn, delay) {
    var timer = null;
    return function () {
        var context = this, args = arguments;
        // 清除之前设置的定时器，确保只有一个定时器在运行
        clearTimeout(timer);
        // 设置一个新的定时器，在延迟时间后执行指定的函数fn，并指定上下文为 context，参数为 args。
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    }
}

// 无论是否登录都会获取视频流
function getFeed(latestTime, token, callback) {
    const apiUrl = app.serverUrl + '/douyin/feed/'
    wx.request({
        url: apiUrl,
        method: 'GET',
        data: {
            latest_time: latestTime || 0, // 当前时间戳，精确到秒
            token: token || ''
        },
        success: function (res) {
            // 获取用户信息成功的处理逻辑
            console.log('Get feed successful:', res.data)
            // 处理注册成功的响应数据
            const statusCode = res.data.status_code
            if (statusCode === 0) {
                wx.setStorageSync('videoList', res.data.video_list)
                wx.setStorageSync('nextTime', res.data.next_time)
                callback(true, "获取视频流成功")
            } else {
                // 注册失败，输出错误信息
                console.error('Get feed failed:', res.data.status_msg)
                callback(false, res.data.status_msg)
            }
        },
        fail: function (error) {
            // 获取用户信息失败的处理逻辑
            console.error('Failed to get feed:', error)
            callback(false, error)
        }
    })
}

function getFeedPromise(latestTime, token) {
    return new Promise((resolve, reject) => {
        getFeed(latestTime, token, function (success, msg) {
            if (success) {
                const videoList = wx.getStorageSync('videoList')
                resolve(videoList)
            } else {
                reject(msg)
            }
        })
    })
}

// 定义发送点赞操作请求的函数
function sendFavoriteAction(token, videoId, actionType, callback) {
    // 构建请求的URL 需要生成查询字符串在URL中
    const apiUrl = app.serverUrl + '/douyin/favorite/action/'
    console.log('token', token)
    const queryString = toQueryString({
        token: token,
        video_id: videoId,
        action_type: actionType
    })
    // 发送HTTP POST请求
    wx.request({
        url: apiUrl + '?' + queryString,
        method: 'POST',
        // header: {
        //     'Content-Type': 'application/x-www-form-urlencoded' // 确保使用正确的 Content-Type
        // },
        // 调用函数发送点赞操作请求，假设点赞视频ID为123，点赞操作类型为1（点赞）2（取消点赞）
        success: function (res) {
            // 请求成功的回调函数
            console.log('Favorite action request successful:', res.data)
            const statusCode = res.data.status_code
            if (statusCode === 0) {
                callback(true, '点赞请求发送成功')
            } else {
                // 注册失败，输出错误信息
                console.error('Favorite action request failed:', res.data.status_msg)
                callback(false, res.data.status_msg)
            }
        },
        fail: function (error) {
            // 请求失败的回调函数
            console.error('Failed to send favorite action request:', error)
            callback(false, error)
        }
    })
}

function toQueryString(params) {
    return Object.keys(params)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        .join('&');
}

/**
 * 获取视频评论数据
 */
function getCommentList(token, videoId, callback) {
    wx.showNavigationBarLoading()
    const apiUrl = app.serverUrl + '/douyin/comment/list/'
    wx.request({
        url: apiUrl,
        method: 'GET',
        data: {
            token: token || '',
            video_id: videoId
        },
        success: function (res) {
            // 获取用户信息成功的处理逻辑
            console.log('Get comment list successful:', res.data)
            // 处理注册成功的响应数据
            const statusCode = res.data.status_code
            if (statusCode === 0) {
                wx.setStorageSync('commentList', res.data.comment_list)
                callback(true, "获取评论成功")
            } else {
                // 注册失败，输出错误信息
                console.error('Get comment list failed:', res.data.status_msg)
                callback(false, res.data.status_msg)
            }
        },
        fail: function (error) {
            // 获取用户信息失败的处理逻辑
            console.error('Failed to get comment list:', error)
            callback(false, error)
        }
    })
}

// 定义发送点赞操作请求的函数
function sendCommentAction(token, videoId, actionType, comment_text, comment_id, callback) {
    // 构建请求的URL 需要生成查询字符串在URL中
    const apiUrl = app.serverUrl + '/douyin/comment/action/'
    const queryString = toQueryString({
        token: token,
        video_id: videoId,
        action_type: actionType,
        comment_text: comment_text,
        comment_id: comment_id
    })
    // 发送HTTP POST请求
    wx.request({
        url: apiUrl + '?' + queryString,
        method: 'POST',
        // 调用函数发送点赞操作请求，假设点赞视频ID为123，点赞操作类型为1（点赞）2（取消点赞）
        success: function (res) {
            // 请求成功的回调函数
            console.log('Comment action request successful:', res.data)
            const statusCode = res.data.status_code
            if (statusCode === 0) {
                callback(true, res.data.comment, '评论请求发送成功')
            } else {
                // 注册失败，输出错误信息
                console.error('Comment action request failed:', res.data.status_msg)
                callback(false, '', res.data.status_msg)
            }
        },
        fail: function (error) {
            // 请求失败的回调函数
            console.error('Failed to send comment action request:', error)
            callback(false, '', error)
        }
    })
}
