// pages/myrechargelog/myrechargelog.js
var qcloud = require('../../vendor/wafer-client-sdk/index.js');
var app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
 
      hour:'0',
      minute:'0'
  },
  go_rechargedetail:function(){
    wx.navigateTo({
      url: '../electricize/electricize',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    qcloud.request({
      url: app.config.service.hostUrl + 'user/chargelog',
      success: function (response) {
        console.log(response);
        var data = response.data.data
        that.setData({
          hour: data.hour,
          minute: data.minute,
          rechargelog: data.charge_log
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