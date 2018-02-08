// pages/parkingRecord/parkingRecord.js
var app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parkRecord_list: [],
    parking_state:0,
    pages: 0,
    pagenum: 1,
    // count:10,
    Loading: false, //"上拉加载"的变量，默认false，隐藏  
    LoadingComplete: false  //“没有数据”的变量，默认false，隐藏  
  },
  go_parkdetail:function(e){
    var id = e.currentTarget.dataset.id, state = e.currentTarget.dataset.state
      if (state==1){
        wx.navigateTo({
          url: '../parkingCar/parkingCar?id=' + id,
        })
      }else{
        wx.navigateTo({
          url: '../parkingDetail/parkingDetail?id=' + id,
        })
      }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    app.qcloud.request({
      url: app.config.service.hostUrl + 'personal/parkingrecord',
      data: {

      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (response) {
        // console.log(response);
        var data = response.data.data, parking_state='';
        var list = data.park_record
        if (list == '' || list==null){
          parking_state=0
        }else{
          parking_state = 1
          that.setData({
            parkRecord_list: list,
            parking_state: parking_state,
            pages:data.pages,
            pagenum: data.current_page,
          })
        }
       

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
    var that = this, pagenum = that.data.pagenum + 1;
    console.log("页数",that.data.pagenum,pagenum, )
    if (pagenum > that.data.pages) {
      that.setData({
        LoadingComplete: true
      })
      wx.showToast({
        title: '没有更多了',
        icon: 'loading',
        duration: 600
      })
    } else {
      that.setData({
        Loading: true
      })
      wx.showLoading({
        title: '正在加载中',
        icon: 'loading'
      })
      app.qcloud.request({
        url: app.config.service.hostUrl + 'personal/parkingrecord',
        data: {
          page: pagenum
        },
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (response) {
          var data = response.data.data, parking_state = '';
          var list = that.data.parkRecord_list.concat(data.park_record);
          // console.log(list)
            parking_state = 1
            that.setData({
              parkRecord_list: list,
              parking_state: parking_state,
              pagenum: data.current_page,
              Loading: false
            })
          wx.hideToast()
        },
        fail: function (err) {
          console.log(err);
        }
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})