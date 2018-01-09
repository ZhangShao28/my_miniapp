// pages/electricize/electricize.js
var app = getApp();

var interval;
var varName;
var ctx = wx.createCanvasContext('canvasArcCir');

Page({

  /**
   * 页面的初始数据
   */
  data: {
        car_name:'车辆1',
        park_locat:'东门1号停车位',
        num:'003',
        phone:'0592-3569235',
        connet_state:1,//0为正在连接，1为连接成功，2为连接失败，3为次数用完,4为服务器维护中,5为扫码充电
        pre:100,
        src1:'../../images/parkdetail/loads.gif'
  },
  go_kefu:function(){
    wx.makePhoneCall({
      phoneNumber: '13585254852',
    })
  },
  over_btn:function(){
    wx.navigateTo({
        url: '../myinfo/myinfo',
      })
  },
  go_repair:function(){
      wx.navigateTo({
        url: '../repair/repair',
      })
  },
  begin_connet:function(){




    clearInterval(varName);
    function drawArc(s, e) {
      ctx.setFillStyle('white');
      ctx.clearRect(0, 0, 180, 180);
      ctx.draw();
      var x = 85, y = 85, radius = 82;
      ctx.setLineWidth(5);
      ctx.setStrokeStyle('#FFAF05');
      ctx.setLineCap('round');
      ctx.beginPath();
      ctx.arc(x, y, radius, s, e, false);
      ctx.stroke()
      ctx.draw()
    }
    
    var step = 1, startAngle = 1.5 * Math.PI, endAngle = 0;
    var animation_interval = 100, n = 60;
    var animation = function () {
      if (step <= n) {
        endAngle = step * 2 * Math.PI / n + 1.5 * Math.PI;
        drawArc(startAngle, endAngle);
        step++;
      } else {
        clearInterval(varName);
      }
    };
    varName = setInterval(animation, animation_interval);
    console.log(1)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (that.data.connet_state==0){
      clearInterval(varName);
      function drawArc(s, e) {
        ctx.setFillStyle('white');
        ctx.clearRect(0, 0, 170, 170);
        ctx.draw();
        var x = 85, y = 85, radius = 82;
        ctx.setLineWidth(5);
        ctx.setStrokeStyle('#FFAF05');
        ctx.setLineCap('round');
        ctx.beginPath();
        ctx.arc(x, y, radius, s, e, false);
        ctx.stroke()
        ctx.draw()
      }

      var step = 1, startAngle = 1.5 * Math.PI, endAngle = 0;
      var animation_interval = 100, n = 60;
      var animation = function () {
        if (step <= n) {
          endAngle = step * 2 * Math.PI / n + 1.5 * Math.PI;
          drawArc(startAngle, endAngle);
          step++;
        } else {
          clearInterval(varName);
        }
      };
      varName = setInterval(animation, animation_interval);
    } else if (that.data.connet_state == 5){
    

        setInterval(function () {
          var animation = wx.createAnimation({
            duration: 200,
            timingFunction: 'linear',
          })

          that.animation = animation

          animation.translateY(10).step()
          animation.translateY(0).step()
          that.setData({
            animationData1: animation.export()
          })
        }, 800)
    } else if(that.data.connet_state == 1){
        clearInterval(varName);
        function drawArc(s, e) {
          ctx.setFillStyle('white');
          ctx.clearRect(0, 0, 248, 248);
          ctx.draw();
          var x = 124, y = 124, radius = 122;
          ctx.setLineWidth(5);
          ctx.setStrokeStyle('#4DD82F');
          ctx.setLineCap('round');
          ctx.beginPath();
          ctx.arc(x, y, radius, s, e, false);
          ctx.stroke()
          ctx.draw()
        }

        var step = 1, startAngle = 1.5 * Math.PI, endAngle = 0;
        var animation_interval = 100, n = that.data.pre;
        var animation = function () {
          if (step <= n) {
            endAngle = step / 50 * Math.PI + 1.5 * Math.PI;
            console.log(endAngle)
            drawArc(startAngle, endAngle);
            step++;
          } else {
            clearInterval(varName);
          }
        };
        varName = setInterval(animation, animation_interval);


      }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //创建并返回绘图上下文context对象。
    var cxt_arc = wx.createCanvasContext('canvasCircle');
    cxt_arc.setLineWidth(6);
    cxt_arc.setStrokeStyle('#eaeaea');
    cxt_arc.setLineCap('round');
    cxt_arc.beginPath();
    cxt_arc.arc(85, 85, 80, 0, 2 * Math.PI, false);
    cxt_arc.stroke();
    cxt_arc.draw();
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