// parking.js
var checkNetWork = require("../../utils/CheckNetWork.js")
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parkingNum:'',
    parkingSite:'',
    freDate: util.formatTime(new Date())
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    if (!checkNetWork.checkNetWorkStatu()) {
      console.log('网络错误')
    } else {
      wx.request({
        url: 'https://parkinglot.qqdayu.com/parking/get_plat_park_info',
        method: 'post',
        data: {},
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data);
          var response = res.data.data;
          self.setData({
            parkingNum: response.leftPlace,
            parkingSite: response.name
          })
        },
        fail: function (err) {
          console.log(err)
        }
      })
    }
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
    var self = this;
    wx.showNavigationBarLoading()
    if (!checkNetWork.checkNetWorkStatu()) {
      console.log('网络错误')
    } else {
      wx.request({
        url: 'https://parkinglot.qqdayu.com/parking/get_plat_park_info',
        method: 'post',
        data: {},
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          wx.stopPullDownRefresh() //停止下拉刷新
          wx.hideNavigationBarLoading() //完成停止加载
          var response = res.data.data;
          self.setData({
            parkingNum: response.leftPlace,
            freDate: util.formatTime(new Date())
          })
          
        },
        fail: function (err) {
          console.log(err)
        }
      })
    }
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
    return {
      desc: '我刚刚发现了一个停车场,分享给大家看看吧', // 分享描述
      path: 'pages/keyboard/keyboard' // 分享路径
    }
  }
})