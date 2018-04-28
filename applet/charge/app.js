//app.js
var qcloud = require('./vendor/wafer-client-sdk/index.js');
var config = require('./config.js');
var checkNetWork = require("./utils/CheckNetWork.js");
var gloabalFomIds = [];
App({
  onLaunch: function (options) {
    var that = this;
      that.login();

       var formIds = gloabalFomIds; // 获取gloabalFomIds
          if (formIds.length) {//gloabalFomIds存在的情况下 将数组转换为JSON字符串
            // formIds = JSON.stringify(formIds);
            gloabalFomIds = '';
          }
         gloabalFomIds = formIds;
  },
  login:function(){
    var that = this;
    // 登录
    qcloud.setLoginUrl(config.service.loginUrl);
    qcloud.login({
      success: function (userInfo) {
        console.log('登录成功', userInfo);
        that.globalData.userInfo = userInfo;
        // wx.setStorageSync('user', userInfo)
        var val = wx.getStorageSync('loc');
        if (val != '') {

        } else {
          wx.setStorageSync('loc', userInfo)
          that.getLocation();
        }
    
      },
      fail: function (err) {
        console.log('登录失败', err);
        // if (err.LoginError.message =='微信登录失败，请检查网络状态'){
        //   wx.showModal({
        //     title: '',
        //     content: '微信登录失败，请检查网络状态',
        //     showCancel: false,
        //     success: function (res) {
        //       if (res.confirm) {
           
        //       }
        //     }
        //   })
        // }else{
        wx.showModal({
          title: '授权提示',
          content: '小程序需要您的微信授权才能使用，点击确定去授权',
          showCancel:false,
          success: function (res) {
            if (res.confirm) {
              wx.openSetting({
                success: function (res) {
                  //尝试再次登录
                  that.login();
                }
              })
            }
          }
        })
        }
      // }
    });
  },
  getLocation:function(){
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        wx.reLaunch({
          url: './index',
        })
      },
      fail: function (err) {
        wx.hideLoading();
        // wx.showModal({
        //   title: '',
        //   content: '请打开手机的定位功能',
        //   showCancel: false,
        //   confirmText: '关闭'
        // })
        wx.showModal({
          title: '',
          content: '请允许小程序使用您的定位功能',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.openSetting({
                success: function (res) {
                  //尝试再次定位
                  that.getLocation();
                }
              })
            }
          }
        })
      }
    })
  },
  dealFormIds: function (formId) {
    var that = this;
    let formIds = that.globalData.gloabalFomIds;//获取全局数据中的推送码gloabalFomIds数组
    if (!formIds) formIds = [];
    let data = {
      formId: formId,
      expire: parseInt(new Date().getTime() / 1000) + 604800, //计算7天后的过期时间时间戳
      num: 1
    }
    formIds.push(data);//将data添加到数组的末尾
    that.globalData.gloabalFomIds = formIds; //保存推送码并赋值给全局变量
  },
  globalData: {
    userInfo: null,
    qcloud: qcloud,
    config: config,
    gloabalFomIds:[],
    checkNetWork: checkNetWork,
    sid:'weapp_session_F2C224D4-2BCE-4C64-AF9F-A6D872000D1A',
  }
})