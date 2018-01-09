// pages/parkingDetail/parkingDetail.js
var app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      // carnum:'闽D503H2',
      // parkplace:'厦门嘉禾园停车场',
      // starttime:'2017-10-31 20: 00: 00',
      // endtime:'2017-10-31 20: 09: 00',
      // money:'5.00',
      // ordernum:'DG877359732M'       
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options.id)
      var that = this
      app.qcloud.request({
        url: app.config.service.hostUrl + 'personal/parkingdetail',
        data: {
          id: options.id
        },
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (response) {
          console.log(response);
          var data = response.data.data;
          that.setData({
            carnum: data.plate_number,
            parkplace: data.place_name ,
            starttime: data.create_time ,
            endtime: data.end_time ,
            money: data.pay_money ,
            ordernum: data.order_no ,
            leave_time: data.leave_time
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