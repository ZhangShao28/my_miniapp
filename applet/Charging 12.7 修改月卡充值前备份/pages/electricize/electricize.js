// pages/electricize/electricize.js
var app = getApp().globalData;
var timers =null;
var timer_charging = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
        // car_name:'车辆1',
        park_locat:'充电桩',
        num:'000',
        phone:'0000-0000000',
        connet_state:1,//0为正在连接，1为连接成功，2为连接失败，3为次数用完,4为服务器维护中,5为扫码充电
        pre:100,
        src1:'../../images/parkdetail/loads.gif',
        state2_img:'../../images/electricize/loading.png',//链接失败
        state2_txt:'车辆与设备连接失败',
        state2_btn:'请重试',
        order_no:'',
        pid: '',
        device_id: '',
        device_no: '',
        hour: '00',
        minute: '00',
        second: '00'
  },
  // inputchange:function(e){
  //   console.log(e.detail)
  //   if (e.detail.cursor==6){
  //       console.log("成功")
  //     }
  // },
  go_kefu:function(){
    wx.makePhoneCall({
      phoneNumber: '13585254852',
    })
  },
  over_btn:function(){
    var that = this; 
    console.log(that.data.order_no)
    // wx.navigateTo({
    //     url: '../myinfo/myinfo',
    //   })
    app.qcloud.request({
      url: app.config.service.hostUrl + 'charging/endorder',
      data: {
        // order_no:that.data.order_no,
        order_no: 'CD20171207105200200691'
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (response) {
        console.log(response)

        wx.redirectTo({
          // url: '../account/account?order_no=' + that.data.order_no,
          url: '../account/account?order_no=CD20171207105200200691',
        })
      },
      fail: function (err) {
        console.log(err);
      }
    });
  },
  go_repair:function(){
      wx.navigateTo({
        url: '../repair/repair',
      })
  },
  begin_connet:function(){
    var that =this;
    that.setData({
        state2_img:'../../images/electricize/loads.gif',
        state2_txt:'正在连接你的车辆',
        state2_btn:'正在连接',
        state2_btn_show: 2
      })
      that.chongshi();
    clearInterval(timers);
      var n = 1
      timers = setInterval(function () {
        console.log(n++)
        that.connect();
        if (n > 12) {
          clearInterval(timers);
          that.setData({
            connet_state: 2,
            state2_img: '../../images/electricize/loading.png',
            state2_txt: '车辆与设备连接失败',
            state2_btn: '请重试',
            state2_btn_show: 1
          })
          console.log(that.data.connet_state)
        }
      }, 5000)
  },
  begin_btn:function(){//确认扫码充电
  var that = this;
  that.setData({
    connet_state: 0,
  })
    that.chongshi();
    var n = 1
    timers = setInterval(function () {
      console.log(n++)
      that.connect();
      if (n > 12) {
        clearInterval(timers);
        that.setData({
          connet_state: 2,
          state2_btn_show: 1
        })
      }
    }, 5000)
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  chongshi:function(){
    var that = this;
    console.log("重试", that.data.order_no, that.data.pid, that.data.device_id, that.data.device_no)
    app.qcloud.request({
      url: app.config.service.hostUrl + 'xiaoqu/charge',
      data: {
        pid: that.data.pid,
        device_id: that.data.device_id,
        device_no: that.data.device_no
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (response) {
        console.log(response)
        that.setData({
          order_no: response.data.data.order_no
        })
      },
      fail: function (err) {
        console.log(err);
      }
    });
  },

  connect:function(){
    // console.log("订单号", this.data.order_no)
    clearInterval(timer_charging)
    var that =this;
    app.qcloud.request({
      url: app.config.service.hostUrl + 'charging/cding',
      data: {
        // order_no: that.data.order_no
        order_no: 'CD20171207114623851961'
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (response) {
        console.log(response,"返回",response.data.msg);
        var data = response.data;
          if(data.err==1){//连接成功
            clearInterval(timers);
            that.setData({
              connet_state: 1,
              num: data.data.device_no,
              park_locat: data.data.place_name,
              phone:data.data.tel_phone,
              // hour: data.data.hour,
              // minute: data.data.minute,
              // second: data.data.second,
            })
            var n = data.data.charge_time,h,m,s
            timer_charging = setInterval(function(){
              times();
              // console.log(h,m,s)
              that.setData({
                hour:h,
                minute:m,
                second:s
              })
            },1000)
            function times() {
              n++;
              h = Math.floor(n / 3600) < 10 ? '0' + Math.floor(n / 3600) : Math.floor(n / 3600);
              m = Math.floor((n / 60 % 60)) < 10 ? '0' + Math.floor((n / 60 % 60)) : Math.floor((n / 60 % 60));
              s = Math.floor((n % 60)) < 10 ? '0' + Math.floor((n % 60)) : Math.floor((n % 60));
              // total = h + ":" + m + ":" + s;
              return h,m,s;
            }
          }else{
            that.setData({
              connet_state: 2,
              state2_btn_show: 1
            })
          }
      },
      fail: function (err) {
        console.log(err);
      }
    });
  },
  onLoad: function (options) {
    clearInterval(timers);
    var that = this
    console.log("oder_no",options.order_no)
    that.setData({
      order_no: options.order_no,
      connet_state: options.state,
      pid: options.pid,
      device_id: options.deviceid,
      device_no: options.deviceno
    })
    if (options.state==5){//扫码进入

    } else if (options.state == 10){
      that.connect();
    }else{
      var n = 1
      timers = setInterval(function () {
        console.log(n++)
        that.connect();
        if (n > 12) {
          clearInterval(timers);
          that.setData({
            connet_state: 2,
            state2_btn_show: 1
          })
        }
      }, 5000)
    }
 


    // console.log( options.pid, options.deviceid, options.deviceno)
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