// pages/myrechargelog/myrechargelog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      rechargelog:[
        {
          begin_time:'9月23日 18：00：03',
          end_time: '9月23日 20：00：03',
          car_name:'五合园东区001',
          state:1
        },
         {
          begin_time: '9月12日 18：00：03',
          end_time: '9月12日 20：00：03',
          car_name: '五合园东区002',
          state: 2
        }
      ]
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