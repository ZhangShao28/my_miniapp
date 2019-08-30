// pages/helpinfo/helpinfo.js
var app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
        tingnewphone:'',
        parkphone:'',
        parkphone_is:'',
        repair_state:0,
        pid:''
  },
  go_repair:function(){
    var that = this;
    app.qcloud.request({
      url: app.config.service.hostUrl + 'repair/index',
      data: {
        pid: that.data.pid
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (response) {
        console.log( response);
        var data = response.data.data;
        that.setData({
          repair_state: 1
        })
        wx.showModal({
          title: response.data.msg+'感谢您的反馈',
          content: '维修人员将去现场进行排查',
          confirmText: '关闭',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('关闭')
            }
          }
        })
      },
      fail: function (err) {
        console.log(err);
        wx.showToast({
          title: response.data.msg,
          image:'../../images/cuo@2x.png'
        })
      }
    });
  },
  call_tingnew:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.tingnewphone,
    })
  },
  call_park: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.parkphone,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      pid: options.pid
    })
    app.qcloud.request({
      url: app.config.service.hostUrl + 'helper/index',
      data: {
        pid: options.pid
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (response) {
        var data = response.data.data;
        var is_no=''
        if (data.parking_phone==''){
            is_no=0
        }else{
            is_no = 1
        }
        that.setData({
          tingnewphone: data.our_phone,
          parkphone: data.parking_phone,
          parkphone_is: is_no
          
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