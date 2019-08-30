// pages/recharge/recharge.js
var app = getApp().globalData;
var apps = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      money:'0.00',
      recharge_selid:'1',
      recharge_src:'../../images/recharge/Recharge-and-start-charging@3x.png',
      recharge_id:0,
      recharge_cid:null,
      num_color:'#ffbe00',
      is_no:2,
      recharge_list:[],
      num_moneylist:[],
      mid:'',
      use_times:'',
      animationData: {},
      mask_show:true,
      pay_state:'1',
      remain_day:'0',
      use_day:false,
      pay_money:0,//购买月卡选择的类型金额
      u_balance_money:0,//账户余额
      payment_list:[
        {
          txt: '微信支付',
          img: '../../images/Select_round@3x.png',
          state:'1',
          pay_img: '../../images/weixin_icon.png'
        },
        {
          txt: '余额支付(余额0元)',
          img: '../../images/rounds@3x.png',
          state:'2',
          pay_img:'../../images/wallet.png'
        },
      ]
  },
  go_payment: function (e) {
    console.log(e)
    let formId = e.detail.formId;
    if (formId == "the formId is a mock one") {
    } else {
      apps.dealFormIds(formId);
      app.config.up_formid(formId)
    }
  },
  select_item:function(e){
      var that = this,
        list = that.data.payment_list,
        id = e.currentTarget.dataset.id, pay_state='';
   
      for (let i=0;i<list.length;i++){
        if (id == list[i].state) {
          if (list[i].state == 1) {
            pay_state = 1;
            list[i].img = '../../images/Select_round@3x.png'
          } else if (list[i].state == 2) {
            if (Number(that.data.u_balance_money) < Number(that.data.pay_money)) {
              wx.showToast({
                title: '余额不足',
                image: '../../images/cuo@2x.png'
              })
              pay_state = 1;
              list[0].img = '../../images/Select_round@3x.png'
              list[i].img = '../../images/rounds@3x.png'
            } else {
              pay_state = 2;
              list[i].img = '../../images/Select_round@3x.png'
            }
          }
        }else{
          list[i].img = '../../images/rounds@3x.png'
        }
      }
      that.setData({
        payment_list:list,
        pay_state: pay_state
      })
  },
  radioChange:function(e){
    this.setData({
      mid: e.detail.value,
      
    })
    console.log(e)
  },
  go_recharge:function(){
    wx.navigateTo({
      url: '../chargeRule/chargeRule',
    })
  },
  select_recharge:function(e){
    var that = this;
    console.log(e.currentTarget.dataset.id, e.currentTarget.dataset.pay_money, e.currentTarget.dataset.mid)
    if (that.data.is_no==2){
      that.setData({
        recharge_id: e.currentTarget.dataset.id,
        recharge_cid: e.currentTarget.dataset.cid,
        pay_money: e.currentTarget.dataset.pay_money
      })
    }else{
      that.setData({
        recharge_id: e.currentTarget.dataset.id,
        mid: e.currentTarget.dataset.mid,
        pay_money: e.currentTarget.dataset.pay_money
      })
    }
  },
  recharge_btns:function(){
    var that = this,no_use=false;
    if (Number(that.data.u_balance_money) < Number(that.data.pay_money)) {
      that.setData({
        no_use:true
      })
    } else {
      that.setData({
        no_use: false
      })
    }
    if (that.data.mid == '') {
      wx.showToast({
        title: '请选择购买项目',
        image: '../../images/cuo@2x.png'
      })
    } else {
      this.animation.translateY(-250).step();
      that.setData({
        mask_show: false,
        animationData: this.animation.export()
      })
    }
  },
  mask:function(){//点击隐藏遮罩层及弹出框
  this.animation.translateY(0).step();

  this.setData({
    mask_show: true,
    animationData: this.animation.export()
  })
  },
  recharge_btn:function(){//月卡充值
    var that = this;
    var phone_id = that.data.phone_id;
    console.log("leixing",that.data.pay_state)
    if (that.data.mid==''){
        wx.showToast({
          title: '请选择购买项目',
          image:'../../images/cuo@2x.png'
        })
      }else{
      app.qcloud.request({
        url: app.config.service.hostUrl + 'recharge/index',
        data: {
          mid: that.data.mid,
          cash_type: 1,
          use_payment: that.data.pay_state
        },
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (response) {
          console.log(response);
          var data = response.data.data;
          that.mask();
          if (response.data.err==1){//微信支付
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
                    if (phone_id == 1) {
                      setTimeout(function () {
                        wx.navigateBack({
                          delta: 1
                        })
                      }, 1000)
                    } else {
                      setTimeout(function () {
                        wx.reLaunch({
                          url: '../index/index',
                        })
                      }, 1000)
                    }

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
          } else if (response.data.err == 2){
            wx.showToast({
              title: response.data.msg, 
              image: '../../images/dui@2x.png',
              success: function () {
                if (phone_id == 1) {
                  setTimeout(function () {
                    wx.navigateBack({
                      delta: 1
                    })
                  }, 1000)
                } else {
                  setTimeout(function () {
                    wx.reLaunch({
                      url: '../index/index',
                    })
                  }, 1000)
                }

              }
            })
          } else if (response.data.err == 3){
            wx.showToast({
              title: response.data.msg,
            })
          }
          
        },
        fail: function (err) {
          console.log(err);
        }
      });
      }
    
  },
  recharge_cash_btn:function(){//现金充值
    var that = this;
    var phone_id = that.data.phone_id;
    console.log(that.data.recharge_cid)
    if (that.data.recharge_cid == '' || that.data.recharge_cid == null) {
      wx.showToast({
        title: '请选择购买项目',
        image: '../../images/cuo@2x.png'
      })
    } else {
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
                if (phone_id == 1) {
                  setTimeout(function () {
                   wx.navigateBack({
                     delta:1
                   })
                  }, 2000)
                } else {
                  setTimeout(function () {
                    wx.reLaunch({
                      url: '../index/index',
                    })
                  }, 2000)
                }
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
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.id, options.xqid, options.phone_id)
    var state_id = options.id
    that.setData({
      state_id: state_id,
      phone_id: options.phone_id
    })
    if (that.data.state_id==1){//月卡充值
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
            if (data.remain_day==0){
                that.setData({
                  use_day:false
                })
            }else{
              that.setData({
                use_day: true
              })
            }
            var list = data.recharge_list;
            for(let i=0;i<list.length;i++){
                  that.setData({
                    mid: list[0].mid
                  })
            }
            that.setData({
              recharge_list: data.recharge_list,
              use_times: data.use_times,
              remain_day: data.remain_day,
              u_balance_money: data.u_balance_money,
              'payment_list[1].txt': '余额支付(余额' + data.u_balance_money+'元)'
            })
          },
          fail: function (err) {
            console.log(err);
            wx.showToast({
              title: err,
            })
          }
        });

    } else if (that.data.state_id == 2){//现金充值
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
            var list = data.recharge;
            for (let i = 0; i < list.length; i++) {
              that.setData({
                recharge_cid: list[0].id
              })
            }
            that.setData({
              num_moneylist: data.recharge,
              money: data.u_balance_money
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
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })

    this.animation = animation


    // this.animation.translateY(-250).step();
    // this.setData({
    //   animationData: animation.export()
    // })
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