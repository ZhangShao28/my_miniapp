//index.js
//获取应用实例
var app = getApp()
Page({
  data: 
  {
    motto1: '点击进入微博友圈', // 入口标题
    userInfo: {}
  },
  onLoad: function () 
  {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

    that.locationWb1();
  },

  // 点击进入登录日志
  bindLogs: function() 
  {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  // 点击进入微博友圈
  locationWb1:function() 
  {
    var that = this
    var Interval = setInterval(function(){
      that.bindLoding()
      if(app.userId != null)
      {
        clearInterval(Interval)
        that.locationWb()
      }
    },1000)
  },
  locationWb: function()
  {
    var userId = app.userId
    console.debug(userId)
    wx.navigateTo({
      url: '../main/main?state=0'+'&userId='+userId
    })
  },
  bindLoding:function(){ // LOADING加载
    wx.showToast({
      title: '跳转中',
      icon: 'loading'
    })
  },
})
