//index.js
//获取应用实例
const app = getApp()
var qcloud = require('../../vendor/wafer-client-sdk/index.js');
Page({
  data: {
    switch_btn: {
      btnsrc: '../../images/Turn-off@3x.png',
      roundsrc: '../../images/Round@3x.png',
      animationData: {}
    },
    charging_img:2,
    park_list:[
      {
        park_name:'东门1号停车位',
        num:'8',
        num_use:'3'
      },
      {
        park_name: '东门2号停车位',
        num: '0',
        num_use: '11'
      },
      {
        park_name: '东门3号停车位',
        num: '5',
        num_use: '6'
      },
    ],
    flag: true,
    xqname:'嘉禾园',
    rule:'月卡收费规则',
    bgImage:'../../images/bg@3x.png',
    srcjt:'../../images/triangle@3x.png',
    srcjts:'../../images/triangles@3x.png',
    srcjts_no:"../../images/1triangle@3x.png",

    is_no:1,
    // 附近没有充电设备
    no_src:'../../images/nosrc@3x.png',
    no_electry:'../../images/electricity@3x.png'
 
  },
  //点击switch切换状态
  clickSwitch: function (e) {
    var thiss = this
    // console.log(this)
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear',
    })
    this.animation = animation;
    if (this.flag) {
      thiss.flag = false;
      animation.translate(0).step();
      thiss.setData({
        'switch_btn.btnsrc': '../../images/Turn-off@3x.png',
        'switch_btn.animationData': animation.export()
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '确定开启短信提醒吗？',
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击确定')
            thiss.flag = true
            animation.translate(20).step();
            thiss.setData({
              'switch_btn.btnsrc': '../../images/button@3x.png',
              'switch_btn.animationData': animation.export()
            })
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      })

    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  ScanBtn:function(){
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  go_myinfo:function(){
    wx.navigateTo({
      url: '../myinfo/myinfo',
    })
  },
  changXiaoqu:function(){
    wx.navigateTo({
      url: '../plotselect/plotselect'
    })
  
  },
  selectPark:function(){
    wx.navigateTo({
      url: '../parkdetail/parkdetail'
    })
  },
  onLoad: function () {
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getPhoneNumber: function (e) {
    var a = e.detail.errMsg
    return
    // console.log(e.detail.errMsg)
    // console.log(e.detail.iv)
    // console.log(e.detail.encryptedData)
    console.log(1)
  },
  onReady: function () {
    // this.getPhoneNumber(e);
    wx.getStorageInfo({
      success: function (res) {
        wx.getStorage({
          key: res.keys[0],
          success: function (res_user) {
            console.log(res_user.data.skey)
            console.log(res_user.data.id)
           

          }
        })
      }
    })
    qcloud.request({
      url: 'https://cdz.tingnew.cn/user/mobilecode',
      data:{
        mobilephone:'15129043343'
      },
      success: function (response) {
        console.log(response);
      },
      fail: function (err) {
        console.log(err);
      }
    });
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
