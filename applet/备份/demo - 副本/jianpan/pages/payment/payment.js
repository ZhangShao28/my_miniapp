// payment.js
var checkNetWork = require("../../utils/CheckNetWork.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carNum: '',
    payMoney: '',
    phoneNumber: '',
    isPay: false,
    userInfo: {},
    feeScale1:'9座以下（不含9座）车辆收费10元/次',
    feeScale2:'20座以上（不含20座）收费20元/次'
  },
  /**
   * 支付
   */
  recharge: function () {
    var self = this;
    if (self.data.isPay) {
      return false
    }
    self.setData({
      isPay: true
    })
    wx.login({
      success: function (res) {
        if (!checkNetWork.checkNetWorkStatu()) {
          console.log('网络错误')
          self.setData({
            isPay: null
          })
        } else {
          wx.request({
            url: 'https://parkinglot.qqdayu.com/parking/get_code',
            method: 'post',
            data: {
              code: res.code,
              plateNo: self.data.carNum,
              userInfo: self.data.userInfo
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              if (res.data.errorCode == 2){
                //说明多人并发支付
                wx.showModal({
                  title: res.data.errorTitle,
                  content: res.data.errorMessage,
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      self.setData({
                        isPay: false
                      })
                    }
                  }
                })
                return false;
              }
              if (res.data.errorCode == 1) {
                //说明支付错误
                wx.showModal({
                  title: res.data.errorTitle,
                  content: res.data.errorMessage,
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      self.setData({
                        isPay: false
                      })
                    }
                  }
                })
                return false;
              }
              
              var response = res.data.data;
              // var nowTime = new Date()
              // var timeStamp = Math.round((nowTime.getTime()) / 1000)
              var timeStamp = response.timeStamp
              var nonceStr = response.nonceStr
              var prepay_id = response.package
              var sign = response.paySign
              wx.requestPayment({
                //时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间
                timeStamp: timeStamp.toString(),
                //随机字符串，长度为32个字符以下。
                nonceStr: nonceStr,
                //统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*
                package: prepay_id,
                //签名算法，暂支持 MD5
                signType: 'MD5',
                //签名
                paySign: sign,
                success: function (res) {
                  // success
                  wx.redirectTo({
                    url: '../keyboard/keyboard'
                  })
                },
                fail: function (res) {
                  //fail (detail message)	调用支付失败，其中 detail message 为后台返回的详细失败原因
                  console.log(res)
                  wx.showToast({
                    title: '支付取消',
                    icon: 'success',
                    mask: true,
                    duration: 2000
                  })
                },
                complete: function () {
                  self.setData({
                    isPay: null
                  })
                }
              })
            },
            fail: function () {
              self.setData({
                isPay: null
              })
            }
          })
        }
      },
      fail:function(){
        self.setData({
          isPay: null
        })
      }
    });
  },
  /**
   * 拨打电话
   */
  phoneCall: function () {
    var self = this;
    wx.makePhoneCall({
      phoneNumber: self.data.phoneNumber
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    wx.getStorage({
      key: 'staticData',
      success: function (res) {
        self.setData({
          carNum: options.plateNo,
          payMoney: options.cost,
          phoneNumber: options.phoneNumber,
          feeScale1: res.data.feeScale1,
          feeScale2: res.data.feeScale2,
        })
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var self = this;
    app.getUserInfo(function (userInfo) {
      //获取用户信息
      userInfo = JSON.stringify(userInfo)
      self.setData({
        userInfo: userInfo
      })
    })
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
    return {
      desc: '我刚刚发现了一个停车场,分享给大家看看吧', // 分享描述
      path: 'pages/keyboard/keyboard' // 分享路径
    }
  }
})