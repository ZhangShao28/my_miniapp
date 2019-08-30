// pages/selectPark/selectPark.js
var app = getApp().globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    city_list: [],
    index:0,
    park_name: '选择停车场',
    pid: '',
    arrylist: [],
    inputShowed: false,
    inputVal: ""
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  go_index: function (e) {

    var pid = e.currentTarget.dataset.id
    console.log(e, pid);
    wx.reLaunch({
      url: '../index/index?pid=' + pid,
    })
  },
  select_city: function (e) {
    // console.log('picker发送选择改变，携带值为', this.data.city_list[e.detail.value])
    var that = this;
    var value = that.data.city_list[e.detail.value];
    this.setData({
      index: e.detail.value
    })
    app.qcloud.request({
      url: app.config.service.hostUrl + 'parking/placenames',
      data: {
        city: value
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (response) {
        console.log(response);
        var data = response.data.data;
        that.setData({
          arrylist: data.parking_lots,
          park_name: data.p_name,
        })
      },
      fail: function (err) {
        console.log(err);
      }
    });
  },
  searchinput: function (e) {
    var value = e.detail.value, that = this;
    var city_name = that.data.city_list[that.data.index]
    app.qcloud.request({
      url: app.config.service.hostUrl + 'parking/placenames',
      data: {
        search: value,
        city: city_name
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (response) {
        console.log(response);
        var data = response.data.data;
        if (data.parking_lots.length==0){
            wx.showToast({
              title: '该城市暂无停车场',
              image:'../../images/cuo@2x.png'
            })
        }
        that.setData({
          arrylist: data.parking_lots,
          park_name: data.p_name,
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
    var that = this
    app.qcloud.request({
      url: app.config.service.hostUrl + 'parking/placenames',
      data: {
        pid: options.pid,
        search: ''
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (response) {
      
        var data = response.data.data;
        console.log(response, data.city );
        if (data.p_name == null || data.p_name==''){
          var pname ='选择停车场'
          that.setData({
            arrylist: data.parking_lots,
            city_list: data.city,
            index: data.city_follow,
            park_name: pname,
            pid: options.pid
          })
        }else{
          that.setData({
            arrylist: data.parking_lots,
            park_name: data.p_name,
            city_list: data.city,
            index: data.city_follow,
            pid: options.pid
          })
        }
        
      },
      fail: function (err) {
        console.log(err);
      }
    });
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