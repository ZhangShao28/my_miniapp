// pages/myinfo/myinfo.js
var qcloud = require('../../vendor/wafer-client-sdk/index.js');
var app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'13855256852',
    tx_img:'../../images/myinfo/touxiang@3x.png',
    money:'23',
    is_charging:'',
  },
  go_recharge:function(){
    wx.navigateTo({
      url: '../recharge/recharge',
    })
  },
  go_myrechargelog:function(){
    wx.navigateTo({
      url: '../myrechargelog/myrechargelog',
    })
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this
    qcloud.request({
      url: app.config.service.hostUrl+'user/index',
      success: function (response) {
        console.log(response);
        var data = response.data.data
        if (data.is_charging=='y'){
          that.setData({
            is_charging: '充电中'
          })
        }else{
          that.setData({
            is_charging: ''
          })
        }
        that.setData({
          money: data.u_balance_money,
          xq_list: data.month_card
        })
      },
      fail: function (err) {
        console.log(err);
      }
    });


    var phone = this.data.phone;
    var img = app.userInfo.avatarUrl
    phone = phone.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")
      this.setData({
        phone: phone,
        tx_img: img
      })

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