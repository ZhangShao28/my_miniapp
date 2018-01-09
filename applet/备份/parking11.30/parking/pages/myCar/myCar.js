// pages/myCar/myCar.js
var config = require('../../config.js');
var app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mycar_list:[],
   is_no:1
  },
  //删除
  go_delete: function (e) {
    var id = e.currentTarget.dataset.id
    var that = this;
    wx.showModal({
      title: '确认删除此车牌号？',
      content: '',
      success:function(res){
        if (res.confirm) {
          app.qcloud.request({
            url: app.config.service.hostUrl + 'personal/delete',
            data: {
              id: id
            },
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (response) {
              console.log(response);
              var data = response.data.data;
              wx.showToast({
                title: response.data.msg,
              })
              that.setData({
                mycar_list: data
              })

            },
            fail: function (err) {
              console.log(err);
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }

     
      }
    })
  
   
  },
  go_addCarNumber:function(){
    wx.navigateTo({
      url: '../bindcarnum/bindcarnum?id=1',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // config.up_formid(app.gloabalFomIds)
    var that = this
    app.qcloud.request({
      url: app.config.service.hostUrl + 'personal/mycar',
      data: {
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (response) {
        console.log(response);
        var data = response.data.data;
        if(data.length==0){
          that.setData({
            is_no: 0
          })

        }else{
          that.setData({
            mycar_list: data,
            is_no: 1
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
      this.onLoad();
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