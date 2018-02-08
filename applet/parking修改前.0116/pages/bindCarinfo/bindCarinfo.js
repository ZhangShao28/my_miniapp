// pages/bindCarinfo/bindCarinfo.js
var app = getApp().globalData;
var apps = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
        userPhone:'',
        userCode:'',
        verify_txt:'获取验证码',
        tag:true,
        dis:'',
        // dis_btn:'disabled'
  },
  user_phone:function(e){
    this.setData({
      userPhone: e.detail.value
    })
  },
  user_code:function(e){
    this.setData({
      userCode: e.detail.value
    })
  },
  verify:function(){
    var that = this;
    var mobile = that.data.userPhone
    if (mobile.length == 0) {
      wx.showToast({
        title: '请输入手机号！',
        image: '../../images/cuo@2x.png',
        duration: 1500
      })
      return false;
    }
    if (mobile.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        image: '../../images/cuo@2x.png',
        duration: 1500
      })
      return false;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mobile)) {
      wx.showToast({
        title: '手机号有误！',
        image: '../../images/cuo@2x.png',
        duration: 1500
      })
      return false;
    }
    return false
  },
  next_btn:function(e){
    console.log(e)
    let formId = e.detail.formId;
    apps.dealFormIds(formId);
    app.config.up_formid(formId)
  },
  go_protocol:function(){//用户协议
    wx.navigateTo({
        url: '../protocol/protocol',
      })
  },
  access_verify:function(){
    var that = this, mobile = that.data.userPhone;
    console.log(mobile)
    that.verify();
    that.data.tag = false
    if (that.data.tag){

      }else{
          if (mobile.length<11){
              wx.showToast({
                title: '手机号有误！',
                image: '../../images/cuo@2x.png',
                duration: 1500
              })
            }else{
            app.qcloud.request({
              url: app.config.service.hostUrl + 'user/code',
              data: {
                mobile_phone: mobile,
              },
              method: 'POST',
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              success: function (response) {
                console.log(response);
                wx.showToast({
                  title: '发送成功',
                  image: '../../images/dui@2x.png',
                  duration: 1500
                })
              },
              fail: function (err) {
                console.log(err);
              }
            });

            var num = 60
            var timer = setInterval(function () {
              num--;
              that.setData({
                dis: 'disabled',
                verify_txt: num + 's重新获取',
              })
              if (num == 0) {
                clearInterval(timer);
                that.setData({
                  dis: '',
                  verify_txt: '获取验证码',
                })
              }
            }, 1000)
            }
        
    
      } 
  },
  checkinput:function(e){
    // var that = this
    // var query = wx.createSelectorQuery();
    // console.log(query.select(".input"))
    // if (e.detail.value!=""){
    //   that.setData({
    //     dis_btn: '',
    //   })
    // }
  },
  go_bindcarnum:function(){
    var that = this, userCode = that.data.userCode,mobile = that.data.userPhone;
    console.log(userCode, mobile)
    // that.verify();
    app.qcloud.request({
      url: app.config.service.hostUrl + 'user/checkcode',
      data: {
        mobile_phone: mobile,
        code: userCode
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (response) {
        console.log(response);
        // var data = response.data.data;
        if(response.data.err=='0'){
          wx.showToast({
            title: response.data.msg,
            image: '../../images/cuo@2x.png',
            duration: 1500
          })
        } else if (response.data.err == '1'){
          wx.showToast({
            title: response.data.msg,
            image: '../../images/dui@2x.png',
            duration: 1500,
            success:function(){
              setTimeout(function () {
                wx.navigateTo({
                  url: '../bindcarnum/bindcarnum?id=0',
                })
              }, 2000)
            }
          })
        } else if (response.data.err == '2'){
          wx.showToast({
            title: response.data.msg,
            image: '../../images/cuo@2x.png',
            duration: 1500
          })
        } else if (response.data.err == '3') {
          wx.showToast({
            title: response.data.msg,
            image: '../../images/cuo@2x.png',
            duration: 1500
          })
        }
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
    return{
      
    }
  }
})