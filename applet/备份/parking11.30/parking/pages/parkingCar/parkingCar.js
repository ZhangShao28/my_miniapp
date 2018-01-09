// pages/parkingCar/parkingCar.js
var app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pay_state:0,
    parking_time:'00:00:00',
    in_time:'',
    count_seconds:0,
    minute:0,
    money:0.00,//停车费用
    wallet_money:0,//钱包余额
    car_num:'',
    car_total_num:'',//是否有多辆车 1为是
    itemList:[],
    timers:0,
    car_id:'',
    pid:'',
    telephone:'',
    tit_state: 0,
    park_tit:'',
    zhifu_money: '',
    over_btn:'免费结束停车',
    is_overtime: 0,//是否超时停车
    timers:null,//定时器
  },
  call_phone:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.telephone
    })
  },
  go_rule:function(){
    wx.navigateTo({
      url: '../chargeRule/chargeRule?pid='+this.data.pid,
    })
  },
  over_notime:function(){
    var that = this;
    wx.showModal({
      title:'是否为您结束订单',
      content: '不会产生任何费用',
      success: function (res) {
        if (res.confirm) {
          console.log('确定')
          app.qcloud.request({
            url: app.config.service.hostUrl + 'parking/endorder',
            data: {
              id: that.data.car_id
            },
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (response) {
              console.log("s", response);
              wx.showToast({
                title: response.data.msg,
                success:function(){
                  setTimeout(function () {
                    wx.reLaunch({
                      url: '../index/index',
                    })
                  }, 2000)
                }
              })
           
            },
            fail: function (err) {
              wx.showToast({
                title: err
              })
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });

  },
  over_car:function(){
    var that = this;
      console.log(that.data.car_id,that.data.over_btn)
      // wx.redirectTo({
      //   url: '../payment/payment?id=' + that.data.car_id,
      // })

      if (that.data.over_btn =='免费结束停车'){//15分钟内免费结束停车
        app.qcloud.request({
          url: app.config.service.hostUrl + 'parking/endorder',
          data: {
            id: that.data.car_id,
            free:1
          },
          method: 'POST',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function (response) {
            console.log("s", response);
            var con = "";
            if (that.data.minute == 1) {
              con = "(请在15分钟内离开，否则将可能产生停车费用)"
            } else {
              con = "(请尽快离场，否则将可能产生停车费用)"
            }
            if (response.data.err == 1) {
              wx.showModal({
                title: '结束成功',
                content: con,
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.reLaunch({
                      url: '../index/index',
                    })
                  }
                }
              })
            } else {
              wx.showToast({
                title: response.data.msg,
                image: '../../images/cuo@2x.png',
                duration: 2000,
                complete:function(){
                  that.onPullDownRefresh();
                }
              })
            }
         
          },
          fail: function (err) {
            wx.showToast({
              title: err
            })
          }
        });
    }else{
        if (that.data.wallet_money > 0) {

          if (that.data.zhifu_money <= that.data.wallet_money) {//余额全抵
            var payable = 0, Deductible = that.data.zhifu_money
            wx.showModal({
              title: '0.00元',
              content: '（已使用钱包余额抵扣' + Deductible + '元）',
              success: function (res) {
                if (res.confirm) {
                  app.qcloud.request({
                    url: app.config.service.hostUrl + 'recharge/index',
                    data: {
                      id: that.data.car_id,
                      money: that.data.money
                    },
                    method: 'POST',
                    header: { 'content-type': 'application/x-www-form-urlencoded' },
                    success: function (response) {
                      console.log("ss", response);
                      var data = response.data.data;
                      if (response.data.err == 2) {
                        wx.redirectTo({
                          url: '../payment/payment?id=' + that.data.car_id,
                        })
                      } else {
                        wx.showToast({
                          title: response.data.msg,
                        })
                      }

                    },
                    fail: function (err) {
                      console.log(err);
                    }
                  });
                } else if (res.cancel) {

                }
              }
            })
          } else if (that.data.zhifu_money > that.data.wallet_money) {
            var payable = (that.data.zhifu_money - that.data.wallet_money).toFixed(2), Deductible = that.data.wallet_money
            console.log(payable)
            wx.showModal({
              title: '应付'+payable + '元',
              content: '（已使用钱包余额抵扣' + Deductible + '元）',
              success: function (res) {
                if (res.confirm) {
                  app.qcloud.request({
                    url: app.config.service.hostUrl + 'recharge/index',
                    data: {
                      id: that.data.car_id,
                      money: that.data.wallet_money
                    },
                    method: 'POST',
                    header: { 'content-type': 'application/x-www-form-urlencoded' },
                    success: function (response) {
                      console.log("ss", response);
                      var data = response.data.data;
                      if (response.data.err == 1) {
                        wx.requestPayment({
                          'timeStamp': data.timeStamp,
                          'nonceStr': data.nonceStr,
                          'package': data.package,
                          'signType': 'MD5',
                          'paySign': data.paySign,
                          'success': function (res) {
                            console.log("支付", res)
                            wx.redirectTo({
                              url: '../payment/payment?id=' + that.data.car_id,
                            })
                          },
                          'fail': function (res) {
                            console.log(res.errMsg)
                            // wx.showToast({
                            //   title: 1,
                            // })
                          }
                        })
                      } else {
                        wx.showToast({
                          title: response.data.msg,
                        })
                      }

                    },
                    fail: function (err) {
                      console.log(err);
                    }
                  });
                } else if (res.cancel) {

                }
              }
            })
          }

         
        }else{
          app.qcloud.request({
            url: app.config.service.hostUrl + 'recharge/index',
            data: {
              id: that.data.car_id
            },
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (response) {
              console.log("ss", response);
              var data = response.data.data;
              // var timeStamp = new String(data.timeStamp)
              wx.requestPayment({
                'timeStamp': data.timeStamp,
                'nonceStr': data.nonceStr,
                'package': data.package,
                'signType': 'MD5',
                'paySign': data.paySign,
                'success': function (res) {
                  console.log("支付", res)
                  wx.redirectTo({
                    url: '../payment/payment?id=' + that.data.car_id,
                  })
                },
                'fail': function (res) {
                  console.log(res.errMsg)
                  // wx.showToast({
                  //   title: 1,
                  // })
                }
              })
            },
            fail: function (err) {
              console.log(err);
            }
          });
        }


    }

    
  },
  go_selectCar:function(){
    // console.log(this.data.itemList[0].plate_number)
    var that = this,list = this.data.itemList,
        car_nums=[],
        car_num_id=[];
    for(var i=0;i<list.length;i++){
       car_nums.push(list[i].plate_number);
       car_num_id.push(list[i].id)
    }
    console.log(car_nums)
    wx.showActionSheet({
      itemList: car_nums,
      success: function (res) {
        // console.log(res,res.tapIndex)
            console.log(car_num_id[res.tapIndex])
            // that.setData({
            //   car_id: car_num_id[res.tapIndex]
            // })
            wx.redirectTo({
              url: 'parkingCar?id=' + car_num_id[res.tapIndex],
            })
      },
      fail: function (res) {
        console.log(res.errMsg)
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('aaa', this.data.timers,options)
    console.log("id",options.id)
    this.setData({
      car_id: options.id
    })
    this.getData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    // clearInterval(this.data.timers)
    var that = this;
    var timers;
    clearInterval(this.data.timers)
    clearInterval(timers)
    app.qcloud.request({
      url: app.config.service.hostUrl + 'parking/detail',
      data: {
        id: that.data.car_id
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (response) {
        console.log("index", response);
        var data = response.data.data;
          var n = data.park.count_seconds, minute = 0, wallet_money = 0, tit_state = 0, tit_state_no = 0, total = 0, h = 0, m = 0, s = 0;
          if (data.park.pay_money > 0 && data.park.zhifu_money > 0) {
            tit_state = 1;
            tit_state_no = 1
          } else {
            tit_state = 0
          }
          that.setData({
            parking_time: '00:00:00',
            count_seconds: data.park.count_seconds,
            in_time: data.park.create_time,
            money: data.park.money,
            car_num: data.park.plate_number,
            pid: data.park.pid,
            telephone: data.telephone,
            tit_state: tit_state,
            tit_state_no: tit_state_no,
            zhifu_money: data.park.zhifu_money,
            wallet_money: data.wallet_money,
            is_overtime: data.park.is_overtime

          })
          if (data.total_number <= 1) {
            that.setData({
              car_total_num: 0
            })
          } else {
            that.setData({
              car_total_num: 1,
              itemList: data.all
            })
          }
          timers = setInterval(function () {
            times();
            that.setData({
              parking_time: total
            })

            if (n > 900 && data.wallet_money > 0 && data.park.money > 0) {
              that.setData({
                park_tit: '(优先使用钱包余额进行抵扣)',
                minute: 1
              })
            } else if (n > 900 && data.wallet_money == 0 && data.pay_money == 0) {
              that.setData({
                tit_state: 3,
                minute: 1
              })
            } else if (n < 900) {
              that.setData({
                park_tit: '(15分钟内驶出停车场, 不收取费用)'
              })
            }
            if (data.park.money > 0) {
              that.setData({
                over_btn: '结束停车,去缴费'
              })
            }

          }, 1000)
          function times() {
            n++;
            h = Math.floor(n / 3600) < 10 ? '0' + Math.floor(n / 3600) : Math.floor(n / 3600);
            m = Math.floor((n / 60 % 60)) < 10 ? '0' + Math.floor((n / 60 % 60)) : Math.floor((n / 60 % 60));
            s = Math.floor((n % 60)) < 10 ? '0' + Math.floor((n % 60)) : Math.floor((n % 60));
            total = h + ":" + m + ":" + s;
            return total;
          }
          that.setData({
            timers: timers
          })
        wx.stopPullDownRefresh();
      },
      fail: function (err) {
        console.log(err);
      }
    });
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
  getData:function(){
    var that = this;
    var timers;
    clearInterval(this.data.timers)
    clearInterval(timers)
    app.qcloud.request({
      url: app.config.service.hostUrl + 'parking/detail',
      data: {
        id: that.data.car_id
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (response) {
        console.log("index", response);
        var data = response.data.data;
        if (data.park.order_status == '1') {//正在停车

          var n = data.park.count_seconds, minute = 0, wallet_money = 0, tit_state = 0, tit_state_no = 0, total = 0, h = 0, m = 0, s = 0;
          if (data.park.pay_money > 0 && data.park.zhifu_money > 0) {
            tit_state = 1;
            tit_state_no = 1
          } else {
            tit_state = 0
          }
          that.setData({
            parking_time: '00:00:00',
            count_seconds: data.park.count_seconds,
            in_time: data.park.create_time,
            money: data.park.money,
            car_num: data.park.plate_number,
            pid: data.park.pid,
            telephone: data.telephone,
            tit_state: tit_state,
            tit_state_no: tit_state_no,
            zhifu_money: data.park.zhifu_money,
            wallet_money: data.wallet_money,
            is_overtime: data.park.is_overtime

          })
          if (data.total_number <= 1) {
            that.setData({
              car_total_num: 0
            })
          } else {
            that.setData({
              car_total_num: 1,
              itemList: data.all
            })
          }
          // clearInterval(timers)
          timers = setInterval(function () {
            times();
            that.setData({
              parking_time: total
            })

            if (n > 900 && data.wallet_money > 0 && data.park.money > 0) {
              that.setData({
                park_tit: '(优先使用钱包余额进行抵扣)',
                minute: 1
              })
            } else if (n > 900 && data.wallet_money == 0 && data.pay_money == 0) {
              that.setData({
                tit_state: 3,
                minute: 1
              })
            } else if (n < 900) {
              that.setData({
                park_tit: '(15分钟内驶出停车场, 不收取费用)'
              })
            }
            if (data.park.money > 0) {
              that.setData({
                over_btn: '结束停车,去缴费'
              })
            }

          }, 1000)
          function times() {
            n++;
            h = Math.floor(n / 3600) < 10 ? '0' + Math.floor(n / 3600) : Math.floor(n / 3600);
            m = Math.floor((n / 60 % 60)) < 10 ? '0' + Math.floor((n / 60 % 60)) : Math.floor((n / 60 % 60));
            s = Math.floor((n % 60)) < 10 ? '0' + Math.floor((n % 60)) : Math.floor((n % 60));
            total = h + ":" + m + ":" + s;
            return total;
          }
          that.setData({
            timers: timers
          })
          // }

        } else {//否则跳回首页
          console.log("跳转首页")
          wx.reLaunch({
            url: '../index/index',
          })
        }
        wx.stopPullDownRefresh();
      },
      fail: function (err) {
        console.log(err);
      }
    });

  },
  onPullDownRefresh: function () {
      this.getData()
    // console.log("刷新",this.data.xx,this.data.timers)
   
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