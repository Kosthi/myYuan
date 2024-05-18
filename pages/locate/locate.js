// pages/center/about.js
Page({

    /**
     * 页面的初始数据
     * 设置了一个变量
     */
    data: {
        list: [
            {
                place: "沈阳市",
                location: "中国辽宁省沈阳市"
            },
            {
                place: "沈阳师范大学",
                location: "辽宁省沈阳市沈北新区黄河北大街253号(沈北新区)"
            },
            {
                place: "沈阳农业大学",
                location: "辽宁省沈阳市沈河区沈阳农业大学"
            },
            {
                place: "沈阳师范大学",
                location: "辽宁省沈阳市沈北新区黄河北大街253号(沈北新区)"
            },
            {
                place: "沈阳工业大学中央校区",
                location: "辽宁省沈阳市铁西区沈阳经济开发区沈辽西路111号"
            },
            {
                place: "沈阳故宫",
                location: "辽宁省沈阳市沈河区沈阳路171号"
            },
            {
                place: "沈阳职业技术学院",
                location: "辽宁省沈阳市大东区劳动路32号"
            },
            {
                place: "沈阳桃仙国际机场",
                location: "辽宁省沈阳市浑南区桃仙镇机场路"
            },
            {
                place: "沈阳化工大学",
                location: "辽宁省沈阳市铁西区昆明湖街道十一号街11号"
            },
            {
                place: "沈阳航空航天大学",
                location: "辽宁省沈阳市沈北新区道义南大街37号"
            },
            {
                place: "沈阳体育学院",
                location: "辽宁省沈阳市苏家屯区金钱松东路36号"
            }
        ],
        newList: [{
            place: "沈阳市",
            location: "中国辽宁省沈阳市"
        },
            {
                place: "沈阳师范大学",
                location: "辽宁省沈阳市沈北新区黄河北大街253号(沈北新区)"
            },
            {
                place: "沈阳农业大学",
                location: "辽宁省沈阳市沈河区沈阳农业大学"
            },
            {
                place: "沈阳师范大学",
                location: "辽宁省沈阳市沈北新区黄河北大街253号(沈北新区)"
            },
            {
                place: "沈阳工业大学中央校区",
                location: "辽宁省沈阳市铁西区沈阳经济开发区沈辽西路111号"
            },
            {
                place: "沈阳故宫",
                location: "辽宁省沈阳市沈河区沈阳路171号"
            },
            {
                place: "沈阳职业技术学院",
                location: "辽宁省沈阳市大东区劳动路32号"
            },
            {
                place: "沈阳桃仙国际机场",
                location: "辽宁省沈阳市浑南区桃仙镇机场路"
            },
            {
                place: "沈阳化工大学",
                location: "辽宁省沈阳市铁西区昆明湖街道十一号街11号"
            },
            {
                place: "沈阳航空航天大学",
                location: "辽宁省沈阳市沈北新区道义南大街37号"
            },
            {
                place: "沈阳体育学院",
                location: "辽宁省沈阳市苏家屯区金钱松东路36号"
            }], // 用于存放搜索结果
        searchInput: '' // 用于存放搜索输入框的内容
    },

    // 输入框内容改变时触发的函数
    handleSearchInput(e) {
        const value = e.detail.value.trim(); // 获取输入框的值并去除首尾空格
        const {list} = this.data;

        // 如果输入框值为空，则将搜索结果置空
        if (!value) {
            this.setData({
                newList: list
            });
            return;
        }

        // 根据输入框的值进行搜索
        const results = list.filter(item => {
            return item.place.includes(value) || item.location.includes(value);
        });

        // 将搜索结果更新到页面数据中
        this.setData({
            newList: results
        });
    },

    add() {
        //console.log("函数执行了")
        //修改数据
        //console.log(this.data.navs,'navs')
        //结构赋值
        this.setData({
            navs: ['工大' + Date.now, ...this.data.navs]
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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