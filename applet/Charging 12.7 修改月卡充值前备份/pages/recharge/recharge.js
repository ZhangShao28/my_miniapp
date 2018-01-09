// pages/recharge/recharge.js
var app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      money:'0.01',
      recharge_src:'../../images/recharge/Recharge-and-start-charging@3x.png',
      recharge_id:null,
      recharge_cid:null,
      num_color:'#FFAF05',
      is_no:2,
      recharge_list:[],
      num_moneylist:[],
      mid:''
  },
  radioChange:function(e){
    this.setData({
      mid: e.detail.value,
      
    })
    console.log(e)
  },
  select_recharge:function(e){
    console.log(e.currentTarget.dataset.id, e.currentTarget.dataset.cid)
    if(this.data.is_no==2){
      this.setData({
        recharge_id: e.currentTarget.dataset.id,
        recharge_cid: e.currentTarget.dataset.cid
      })
    }else{

    }
  
  },
  recharge_btn:function(){//月卡充值
    var that = this;
    console.log(that.data.mid)

    app.qcloud.request({
      url: app.config.service.hostUrl + 'recharge/index',
      data: {
        mid: that.data.mid,
        cash_type: 1
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (response) {
        console.log(response);
        var data = response.data.data;

        wx.requestPayment({
          'timeStamp': data.timeStamp,
          'nonceStr': data.nonceStr,
          'package': data.package,
          'signType': 'MD5',
          'paySign': data.paySign,
          'success': function (res) {
            console.log("支付", res)
            wx.showToast({
              title: '充值成功！',
              image:'../../images/dui@2x.png',
              success:function(){
                setTimeout(function(){
                  wx.reLaunch({
                    url: '../index/index',
                  })
                },2000)
              }
            })
          },
          'fail': function (res) {
            console.log(res.errMsg)
            wx.showToast({
              title: '取消支付',
              image: '../../images/cuo@2x.png'
            })
            setTimeout(function () {
              wx.reLaunch({
                url: '../index/index',
              })
            }, 2000)
          }
        })
      },
      fail: function (err) {
        console.log(err);
      }
    });
  },
  recharge_cash_btn:function(){//现金充值
    var that = this;
    console.log(that.data.recharge_cid)

    app.qcloud.request({
      url: app.config.service.hostUrl + 'recharge/index',
      data: {
        cash_id: that.data.recharge_cid,
        cash_type: 2
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (response) {
        console.log(response);
        var data = response.data.data;

        wx.requestPayment({
          'timeStamp': data.timeStamp,
          'nonceStr': data.nonceStr,
          'package': data.package,
          'signType': 'MD5',
          'paySign': data.paySign,
          'success': function (res) {
            console.log("支付", res)
            wx.showToast({
              title: '充值成功！',
              image: '../../images/dui@2x.png',
              success: function () {
                setTimeout(function () {
                  wx.reLaunch({
                    url: '../index/index',
                  })
                }, 2000)
              }
            })
          },
          'fail': function (res) {
            console.log(res.errMsg)
            wx.showToast({
              title: '取消支付',
              image: '../../images/cuo@2x.png'
            })
          }
        })
      },
      fail: function (err) {
        console.log(err);
      }
    });




  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.qcloud.request({
      url: app.config.service.hostUrl + 'xiaoqu/chargeyue',
      data: {

      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (response) {
        console.log(response);
        var data = response.data.data;
        that.setData({
          money: data.u_balance_money,
          num_moneylist:data.recharge
        })
      },
      fail: function (err) {
        console.log(err);
      }
    });
    console.log(options.xqid,options.pid,options.deviceid,options.deviceno)
      if(options.id==1){//月卡充值
        that.setData({
          is_no:1
        })
        app.qcloud.request({
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

      } else if (options.id == 2){//现金充值
        that.setData({
          is_no: 2
        })
        app.qcloud.request({
          url: app.config.service.hostUrl + 'xiaoqu/chargeyue',
          data: {
          
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