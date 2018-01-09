// pages/recharge/recharge.js
var qcloud = require('../../vendor/wafer-client-sdk/index.js');
var app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      money:'0.00',
      recharge_src:'../../images/recharge/Recharge-and-start-charging@3x.png',
      recharge_id:null,
      num_color:'#FFAF05',
      is_no:1,
 
      num_moneylist:[
        {
          num_money:'30'
        },
        {
          num_money: '50'
        },
        {
          num_money: '100'
        },
        {
          num_money: '200'
        },
        {
          num_money: '500'
        },
      ]
  },
  radioChange:function(e){
    event.detail
  },
  select_recharge:function(e){
    console.log(e.currentTarget.dataset.id)
    if(this.data.is_no==2){
      this.setData({
        recharge_id: e.currentTarget.dataset.id
      })
    }else{

    }
  
  },
  recharge_btn:function(){
    // wx.navigateTo({
    //   url: '../electricize/electricize',
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.xqid,options.pid,options.deviceid,options.deviceno)
      if(options.id==1){//月卡充值
        that.setData({
          is_no:1
        })
        qcloud.request({
          url: app.config.service.hostUrl + 'xiaoqu/charging',
          data: {
            xqid: options.xqid
          },
          method: 'POST',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function (response) {
            console.log(response);
            var data = response.data.data;
            that.setData({
              recharge_list: data
            })
          },
          fail: function (err) {
            console.log(err);
          }
        });



      } else if (options.id == 2){//
        that.setData({
          is_no: 2
        })
      }
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