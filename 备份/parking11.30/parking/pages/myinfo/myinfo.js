// pages/myinfo/myinfo.js
var app = getApp().globalData;
var apps = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    tx_img:'',
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
    // config.up_formid(app.gloabalFomIds)
    // console.log(app.gloabalFomIds)
      var that = this
      app.qcloud.request({
        url: app.config.service.hostUrl + 'personal/index',
        data: {
       
        },
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (response) {
          console.log(response);
          var data = response.data.data;
          var is_parking = '';
         var phone = data.u_mobilephone.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
         var img = app.userInfo.avatarUrl;
          if (data.is_parking=='y'){
            is_parking ='正在停车中'
          }else{
            is_parking=''
          }
          that.setData({
            phone: phone,
            is_charging: is_parking,
            tx_img: img
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