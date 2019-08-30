// pages/myinfo/myinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'13855256852',
    tx_img:'../../images/myinfo/touxiang@3x.png',
    money:'23',
    xq_list:[
      {
        xq_name:'嘉禾园月卡',
        num:'29'
      },
      {
        xq_name: '嘉禾园2月卡',
        num: '29'
      },
      {
        xq_name: '嘉禾园3月卡',
        num: '29'
      }
    ]
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
    var phone = this.data.phone;
    phone = phone.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")
      this.setData({
        phone: phone
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