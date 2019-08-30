// pages/myinfo/myinfo.js
var app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    tx_img:'../../images/myinfo/touxiang@3x.png',
    money:'0.00',
    is_charging:'',
    server_phone:'',
    phone_switch:''
  },
  go_recharge:function(e){
    console.log(e.currentTarget.dataset.id)
    if (e.currentTarget.dataset.id==1){
      wx.navigateTo({
        url: '../recharge/recharge?id=1' + '&xqid=' + e.currentTarget.dataset.xqid + '&phone_id=1',
      })

    } else if (e.currentTarget.dataset.id==2){
      wx.navigateTo({
        url: '../recharge/recharge?id=2&phone_id=1',
      })
    }
    
  },
  go_myrechargelog:function(){
    wx.navigateTo({
      url: '../myrechargelog/myrechargelog',
    })
  
  },
  go_wallet_detail:function(){
    wx.navigateTo({
      url: '../wallet/wallet',
    })
  },
  go_server_phone:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.server_phone,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
      var that = this
    app.qcloud.request({
      url: app.config.service.hostUrl+'user/index',
      success: function (response) {
        wx.hideLoading()
        console.log(response);
        var data = response.data.data;
        var phone = data.u_mobilephone.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
        var img = app.userInfo.avatarUrl;
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
          xq_list: data.month_card,
          phone: phone,
          tx_img: img,
          server_phone: data.server_phone,
          phone_switch: data.phone_switch
        })
      },
      fail: function (err) {
        wx.hideLoading()
        wx.showModal({
          title: '',
          content: '请求超时，请检查网络是否正常！',
          showCancel: false,
          confirmText: '关闭'
        })
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
      this.onLoad()
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