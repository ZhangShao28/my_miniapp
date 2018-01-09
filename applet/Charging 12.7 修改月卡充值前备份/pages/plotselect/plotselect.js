// pages/plotselect/plotselect.js
var app = getApp().globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    xq_name:'选择小区',
    xqid:'',
    list_xqname:'嘉禾园',
    arrylist: ["嘉禾园", "五合园", "中俊南海", "雪湖园", "嘉禾园", "五合园", "嘉禾园", "五合园", "嘉禾园", "五合园", "嘉禾园", "五合园", "嘉禾园", "五合园"],
    inputShowed: false,
    inputVal: ""
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  go_index:function(e){
   
    var xq_id = e.currentTarget.dataset.id
    console.log(e,xq_id);
    wx.reLaunch({
      url: '../index/index?xqid='+xq_id,
    })
  },
  searchinput:function(e){
    var value = e.detail.value, that = this
    app.qcloud.request({
      url: app.config.service.hostUrl + 'xiaoqu/xqlist',
      data: {
        xqid: that.data.xqid,
        search: value
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (response) {
        console.log(response);
        var data = response.data.data;
        that.setData({
          arrylist: data.xq_list,
          xq_name: data.xq_name
        })
      },
      fail: function (err) {
        console.log(err);
      }
    });
 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    app.qcloud.request({
      url: app.config.service.hostUrl + 'xiaoqu/xqlist',
      data: {
        xqid: options.xqid,
        search:''
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (response) {
        console.log(response);
        var data = response.data.data;
        that.setData({
          arrylist: data.xq_list,
          xq_name:data.xq_name,
          xqid: options.xqid
        })
      },
      fail: function (err) {
        console.log(err);
      }
    });
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