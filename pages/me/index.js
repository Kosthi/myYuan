Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 在数据中设置一个数组，用于记录每个项目的图片显示状态，默认为隐藏
    imageVisible: [false, false, false, false, false],
    user: {},
    menuList: [{
        img: "imagines/购物车空.png",
        title: "抖声商城",
        url: "/pages/shop/index"
      },
      {
        img: "imagines/观看历史.png",
        title: "观看历史",
        url: "/pages/history/index"
      },
      {
        img: "imagines/音乐.png",
        title: "抖声音乐",
        url: "/pages/music/index"
      },
      {
        img: "imagines/我的钱包.png",
        title: "我的钱包",
        url: "/pages/money/index"
      },
      {
        img: "imagines/常用_查看更多.png",
        title: "查看更多",
        url: "/pages/much/index"
      }
    ],
    production:[{
      img: "https://c-ssl.duitang.com/uploads/blog/202302/23/20230223233536_47c88.jpeg",
      url: "/pages/shop/index",
      like:"1090"
    },
    {
      img: "https://c-ssl.duitang.com/uploads/blog/202302/23/20230223233536_47c88.jpeg",
      url: "/pages/shop/index",
      like:"109"
    },
    {
      img: "https://c-ssl.duitang.com/uploads/blog/202302/23/20230223233536_47c88.jpeg",
      url: "/pages/shop/index",
      like:"1090"
    },
    {
      img: "https://c-ssl.duitang.com/uploads/blog/202302/23/20230223233536_47c88.jpeg",
      url: "/pages/shop/index",
      like:"1090"
    },
    {
      img: "https://c-ssl.duitang.com/uploads/blog/202302/23/20230223233536_47c88.jpeg",
      url: "/pages/shop/index",
      like:"1090"
    },
    {
      img: "https://c-ssl.duitang.com/uploads/blog/202302/23/20230223233536_47c88.jpeg",
      url: "/pages/shop/index",
      like:"1090"
    },
    {
      img: "https://c-ssl.duitang.com/uploads/blog/202302/23/20230223233536_47c88.jpeg",
      url: "/pages/shop/index",
      like:"1090"
    },
    {
      img: "https://c-ssl.duitang.com/uploads/blog/202302/23/20230223233536_47c88.jpeg",
      url: "/pages/shop/index",
      like:"1090"
    },
    {
      img: "https://c-ssl.duitang.com/uploads/blog/202302/23/20230223233536_47c88.jpeg",
      url: "/pages/shop/index",
      like:"1090"
    },
    {
      img: "https://c-ssl.duitang.com/uploads/blog/202302/23/20230223233536_47c88.jpeg",
      url: "/pages/shop/index",

    },
    {
      img: "https://c-ssl.duitang.com/uploads/blog/202302/23/20230223233536_47c88.jpeg",
      url: "/pages/shop/index",
      like:"1090"
    },
    {
      img: "https://c-ssl.duitang.com/uploads/blog/202302/23/20230223233536_47c88.jpeg",
      url: "/pages/shop/index",
      like:"1090"
    },
    {
      img: "https://c-ssl.duitang.com/uploads/blog/202302/23/20230223233536_47c88.jpeg",
      url: "/pages/shop/index",
      like:"1090"
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
    });
  },

  // 生命周期函数--监听页面加载
  onLoad(options) {},

  // 生命周期函数--监听页面初次渲染完成
  onReady() {},

  // 生命周期函数--监听页面显示
  onShow() {
    //加载页面可以获取信息并赋值
    this.setData({
      user: wx.getStorageSync('user') || {}
    })
  },

  // 生命周期函数--监听页面隐藏
  onHide() {},

  // 生命周期函数--监听页面卸载
  onUnload() {},

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh() {},

  // 页面上拉触底事件的处理函数
  onReachBottom() {},

  // 用户点击右上角分享
  onShareAppMessage() {}
})
