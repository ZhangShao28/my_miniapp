//index.js
//获取应用实例
var app = getApp().globalData;
var apps = getApp();
Page({
  data: {
    netWork_state:'',
    park_place:'选择停车场',
    p_city:'',
    is_no:'0',//附近是否有停车场
    bind:'',//是否绑定
    msg_tit: '',
    msg_btn:'',
    msg_src:'',
    num:'0',
    my_dot:0,
    pid:'',
    my_info:'',
    lon:'',
    lat:'',
    map_lat: '',//停车场经纬度
    map_lon: '',
    time_tit_state:false,
    li_item: [
      {
        title: '剩余车位',
        state: '0',
        flag: false,
        chewei:true
      },
      {
        title: '开放时间',
        time_tit:'暂未开放',
        state: '1',
        flag: false,
        border:true
      },
      {
        title: '收费规则',
        state: '2',
        flag: false
      }
    ],
    rule_list:[],
    list_len:'',
    open_time:''
  },
  formSubmit:function(e){
    console.log(e)
    let formId = e.detail.formId;
    if (formId == "the formId is a mock one") {

    } else {
      apps.dealFormIds(formId);
      app.config.up_formid(formId)
    }
  },
  view_Submit:function(e){
    console.log(e)
    let formId = e.detail.formId;
    if (formId == "the formId is a mock one") {
    } else {
      apps.dealFormIds(formId);
      app.config.up_formid(formId)
    }
  },
  // dealFormIds: function (formId) {
  //   let formIds = app.gloabalFomIds;//获取全局数据中的推送码gloabalFomIds数组
  //   if (!formIds) formIds = [];
  //   let data = {
  //     formId: formId,
  //     expire: parseInt(new Date().getTime() / 1000) + 604800, //计算7天后的过期时间时间戳
  //     num:1
  //   }
  //   formIds.push(data);//将data添加到数组的末尾
  //   app.gloabalFomIds = formIds; //保存推送码并赋值给全局变量
  // },
 
  select_item: function (e) {
    var that = this, id = e.currentTarget.dataset.id, list = this.data.li_item;
    // console.log(id, list)
    for (var i = 0; i < list.length; i++) {
      if (id == i) {
        list[i].flag = !list[i].flag
        list[i].state = i
        // console.log(i, list[i].flag)
      } else {
        list[i].flag = false
      }
    }
    that.setData({
      li_item: list
    })
  }, 
  go_myinfo:function(){
    if (this.data.netWork_state == 0) {
      wx.showModal({
        title: '',
        content: '请求超时，请检查网络是否正常！',
        showCancel: false,
        confirmText: '关闭'
      })
    } else {
      if (wx.getStorageSync(app.sid) && wx.getStorageSync('loc')) {//判断是否授权
        if (this.data.my_info == 0) {
          wx.navigateTo({
            url: '../bindCarinfo/bindCarinfo',
          })
        } else {
          wx.navigateTo({
            url: '../myinfo/myinfo',
          })
        }
      } else {
        wx.showModal({
          title: '授权提示',
          content: '停牛需要您的微信授权才能使用，点击确定去授权',
          success: function (res) {
            if (res.confirm) {
              wx.openSetting({
                success: function (res) {
                  //尝试再次登录
                  apps.login();
                  wx.redirectTo({
                    url: 'index',
                  })
                }
              })
            } else {

            }
          }
        })
      }
    }

 
  },
  go_park:function(e){
    if (this.data.netWork_state==0) {
      wx.showModal({
        title: '',
        content: '请求超时，请检查网络是否正常！',
        showCancel: false,
        confirmText: '关闭'
      })
    } else {

      if (wx.getStorageSync(app.sid) && wx.getStorageSync('loc')) {//判断是否授权
        var pid = e.currentTarget.id;
        wx.navigateTo({
          url: '../selectPark/selectPark?pid=' + pid,
        })
      } else {
        wx.showModal({
          title: '授权提示',
          content: '停牛需要您的微信授权才能使用，点击确定去授权',
          success: function (res) {
            if (res.confirm) {
              wx.openSetting({
                success: function (res) {
                  //尝试再次登录
                  apps.login();
                  wx.redirectTo({
                    url: 'index',
                  })
                }
              })
            } else {

            }
          }
        })
      } 
     }
  
  },
  go_helpinfo:function(){
    wx.navigateTo({
      url: '../helpinfo/helpinfo?pid='+this.data.pid,
    })
  },
  go_map:function(){
    console.log(this.data.park_place, this.data.map_lat, this.data.map_lon)
    wx.openLocation({
      latitude: this.data.map_lat,
      longitude: this.data.map_lon,
      // scale: 28,
      name: this.data.park_place
    })
  },
  //事件处理函数
  

  onLoad: function (options) {
    var that = this;
    console.log("xqid",options.pid)
    wx.getSystemInfo({
      success: function(res) {
        if (res.version < '6.5.8') {//微信版本过低
          wx.showModal({
            title: '',
            content: '微信版本过低，无法正常使用小程序，请升级微信到最新版本',
            showCancel: false,
            confirmText: '确定'
          })
        }else{
          //服务号跳转类型
          // console.log("type",options.ftype,options.fid)
          if (options.ftype == 1) {
            wx.navigateTo({
              url: '../parkingCar/parkingCar?id=' + options.fid,
            })
          } else if (options.ftype == 2) {
            wx.navigateTo({
              url: '../payment/payment?id=' + options.fid,
            })
          } else if (options.ftype == 3) {
            wx.navigateTo({
              url: '../parkingDetail/parkingDetail?id=' + options.fid,
            })
          } else if (options.ftype == 5) {
            wx.navigateTo({
              url: '../wallet/wallet',
            })
          }
          that.loadshow(options.pid);
        }
      },
    })
    
     
  },
  loadshow:function(x_pid){
    wx.showLoading({
      title: '加载中',
    })
    var that = this, flag;
    if (wx.getStorageSync('loc')) {//判断是否授权
      // console.log(wx.getStorageSync('key'))
      // 获取经纬度
      if (wx.getStorageSync(app.sid)){
          flag = 0
      }else{
          flag =1
      }
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          var latitude = res.latitude
          var longitude = res.longitude
          var speed = res.speed
          var accuracy = res.accuracy
          that.setData({
            lon: res.longitude,
            lat: res.latitude,
          })
          //获取位置及附近停车场
          app.qcloud.request({
            url: app.config.service.hostUrl + 'parking/index',
            data: {
              // lon: '118.17391204833984',
              // lat: '24.48859977722168',
              lon: res.longitude,
              lat: res.latitude,
              pid: x_pid
            },
            login: flag,
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (response) {
              console.log("denglu")
              wx.hideLoading();
              that.setData({
                netWork_state: 1
              })
              console.log(response);
              var list = response.data.data, bind_car = '', time_tit = false, msg_tit = '', msg_btn = '', msg_src = '', is_no = '', my_dot = '', my_info = '';
              that.setData({//停车场经纬度
                map_lat: list.lat,
                map_lon: list.lon
              })

              // pid = list;
              if (list.parking.is_park == 'y') {
                var park_id = list.parking.park_id
                bind_car = 1;
                msg_tit = '您有正在停的车辆';
                msg_btn = '查看';
                msg_src = '../parkingCar/parkingCar?id=' + park_id
                // wx.navigateTo({
                //   url: '../parkingCar/parkingCar?id=' + park_id,
                // })
                my_dot = 1
              }
              if (response.data.err == '1') {
                is_no = 1
              } else {
                is_no = 0
              }
              if (list.is_mobilephone == 'n') {
                my_info = 0
                if (list.is_binding == 'n') {
                  bind_car = 1;
                  msg_tit = '完善信息后，开始智能停车';
                  msg_btn = '去完善';
                  msg_src = '../bindCarinfo/bindCarinfo'
                }
              } else if (list.is_mobilephone == 'y') {
                my_info = 1
                if (list.is_binding == 'n') {
                  bind_car = 1;
                  msg_tit = '您还未绑定车牌';
                  msg_btn = '绑定车牌';
                  msg_src = '../myCar/myCar'
                }
              }
              if (list.open_status == 'n') {
                time_tit = true
              }
              var list_len = list.charge_rules.length - 1;
              that.setData({
                time_tit_state: time_tit,
                p_city: list.p_city,
                park_place: list.p_name,
                num: list.p_number,
                pid: list.pid,
                bind: bind_car,
                msg_tit: msg_tit,
                msg_btn: msg_btn,
                msg_src: msg_src,
                is_no: is_no,
                my_dot: my_dot,
                open_time: list.p_remark,
                rule_list: list.charge_rules,
                my_info: my_info,
                list_len: list_len//收费规则长度
              })
            },
            fail: function (err) {
              wx.hideLoading();
              that.setData({
                netWork_state: 0
              })
              wx.showModal({
                title: '',
                content: '请求超时，请检查网络是否正常！',
                showCancel: false,
                confirmText: '关闭'
              })
            }
          });
        }
      });
    } else {
      console.log("授权失败")
    }
  },
  getPhoneNumber: function (e) {

  },
  onReady: function (options) {
    
 
  },
  onShow: function (options){
  
  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    // wx.showLoading({
    //   title: '加载中',
    // })
    var x_pid='';
    this.loadshow(x_pid)
    wx.stopPullDownRefresh();
  },
  onShareAppMessage: function (res) {
    // return {
    //   title: '停牛共享停车',
    //   path: '/page/index/index',
    //   success: function (res) {
    //     // 转发成功
    //   },
    //   fail: function (res) {
    //     // 转发失败
    //   }
    // }
  }
})
