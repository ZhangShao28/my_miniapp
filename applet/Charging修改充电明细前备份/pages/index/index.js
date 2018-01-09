//index.js
//获取应用实例
var app = getApp().globalData;
Page({
  data: {
    switch_btn: {
      btnsrc: '../../images/Turn-off@3x.png',
      roundsrc: '../../images/Round@3x.png',
      animationData: {}
    },
    charging_img:2,
    flag: true,
    xqname:'请选择小区',
    rule_state:'',
    rule_money:'',
    bgImage:'../../images/bg@3x.png',
    srcjt:'../../images/triangle@2x.png',
    srcjts:'../../images/1triangle@3x.png',
    srcjts_no:"../../images/1triangle@3x.png",
    is_bind_mobile:'',//是否绑定手机号
    is_no:1,
    // 附近没有充电设备
    no_src:'../../images/nosrc@3x.png',
    no_electry:'../../images/electricity@3x.png',
    xq_id:'',
    deviceid:'',
    q:''
  },
  //点击switch切换状态
  clickSwitch: function (e) {
    var thiss = this
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
  ScanBtn:function(){
    var that = this;
    wx.scanCode({
      success: (res) => {
        var scan_id = res.result.split('/')[4]
        console.log("内部扫码", res, scan_id)
        that.setData({
          deviceid: scan_id
        })
          wx.navigateTo({
            url: '../electricize/electricize?state=55&deviceid=' + that.data.deviceid,
          })
      }
    })
  },
  go_myinfo:function(){
    if (!app.checkNetWork.checkNetWorkStatu()) {
      console.log('网络错误')
    } else {
      if (this.data.is_bind_mobile == 'y') {
        wx.navigateTo({
          url: '../myinfo/myinfo',
        })
      } else {
        wx.navigateTo({
          url: '../bindinfo/bindinfo?xqid=' + this.data.xq_id
        })
      }
    }

  },
  go_chargelog:function(){
    wx.navigateTo({
      url: '../myrechargelog/myrechargelog',
    })
  },
  go_parkdetail:function(e){
    if (e.currentTarget.dataset.use==0){
      wx.showToast({
        title: '暂无可用设备',
        image:'../../images/cuo@2x.png'
      })
    }else{
      wx.navigateTo({
        url: '../parkdetail/parkdetail?id=' + e.currentTarget.dataset.id,
      })
    }
  },
  go_rule:function(){
    wx.navigateTo({
      url: '../rule/rule?num=' + this.data.xq_card_times,
    })
  },
  changXiaoqu:function(){
    wx.navigateTo({
      url: '../plotselect/plotselect?xqid=' + this.data.xq_id
    })
  },
  // go_parkdetail:function(e){
  //   var pid = e.currentTarget.dataset.pid
  //   wx.navigateTo({
  //     url: '../parkdetail/parkdetail?id=' + pid
  //   })
  // },
  onLoad: function (options) {
    var that = this, pid = pid, xqid = options.xqid;
    var q = decodeURIComponent(options.q)
    var scan_id = q.split('/')[4]
    if (!app.checkNetWork.checkNetWorkStatu()) {
      console.log('网络错误')
    }else{
      that.setData({
        deviceid: scan_id,
        xq_id: xqid,
        q: q
      })
      this.loadshow(xqid, q, scan_id)
    }
   
 
  },
  loadshow: function (xq_id, q, scan_id){
    var that = this;
    // 获取经纬度
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        // console.log(res)
        //获取小区及小区充电桩
        app.qcloud.request({
          url: app.config.service.hostUrl + 'xiaoqu/index',
          data: {
            // lon: '118.173797',
            // lat: '24.488718',
            lon: res.longitude,
            lat: res.latitude,
            xqid: xq_id
          },
          method: 'POST',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function (response) {
       
            var list = response.data.data;
            console.log(response, "xq_id", list.xqid);
            if (q != 'undefined'&& list.is_bind_mobile != 'n') {//微信扫码充电跳转充电确认页面
              that.setData({
                is_bind_mobile: list.is_bind_mobile
              })
              if (response.data.err == 2) {//未定位到
                that.setData({
                  is_no: 2
                })

              } else {
                that.setData({
                  xqname: list.xq_name,
                  park_list: list.xq_place,
                  xq_id: list.xqid,
                  rule_state: list.card_type,
                  xq_card_times: list.xq_card_times,
                  rule_money: list.charge_money
                })
              }
              wx.navigateTo({
                url: '../electricize/electricize?state=5&deviceid=' + scan_id,
              })
            } else {//直接进入首页
              if (list.is_charging=="y"){
                  that.setData({
                    charging_img: 1
                  })
                }else{
                  that.setData({
                    charging_img: 2
                  })
                }
              that.setData({
                is_bind_mobile: list.is_bind_mobile
              })
              if (response.data.err == 2) {//未定位到
                that.setData({
                  is_no: 2
                })

              } else {
                that.setData({
                  xqname: list.xq_name,
                  park_list: list.xq_place,
                  xq_id: list.xqid,
                  rule_state: list.card_type,
                  xq_card_times: list.xq_card_times,
                  rule_money: list.charge_money
                })
              }
            }

          },
          fail: function (err) {
            console.log(err);
          }
        });
      }
    })
  },
  onReady: function () {

  },
  onShow:function(){
    var q = 'undefined', scan_id = '';
    if (!app.checkNetWork.checkNetWorkStatu()) {
      console.log('网络错误')
    }else{
      this.loadshow(this.data.xq_id, q, scan_id);
    }
  },
  onPullDownRefresh:function(){
    var q = 'undefined', scan_id='';
    if (!app.checkNetWork.checkNetWorkStatu()) {
      console.log('网络错误')
    } else {
      this.loadshow(this.data.xq_id, q, scan_id);
    }

    wx.stopPullDownRefresh();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '小码充电',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
