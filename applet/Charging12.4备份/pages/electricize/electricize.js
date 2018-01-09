// pages/electricize/electricize.js
var qcloud = require('../../vendor/wafer-client-sdk/index.js');
var app = getApp().globalData;

var interval;
var varName;


Page({

  /**
   * 页面的初始数据
   */
  data: {
        car_name:'车辆1',
        park_locat:'东门1号停车位',
        num:'003',
        phone:'0592-3569235',
        connet_state:0,//0为正在连接，1为连接成功，2为连接失败，3为次数用完,4为服务器维护中,5为扫码充电
        pre:100,
        src1:'../../images/parkdetail/loads.gif'
  },
  // inputchange:function(e){
  //   console.log(e.detail)
  //   if (e.detail.cursor==6){
  //       console.log("成功")
  //     }
  // },
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
    var ctx = wx.createCanvasContext('canvasArcCir');



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
    // console.log( options.pid, options.deviceid, options.deviceno)
    var that = this


    // 进度条
    var ctx = wx.createCanvasContext('myCanvas')
    //range控件信息
    var rangeValue = 50;
    var nowRange = 0; //用于做一个临时的range

    //画布属性
    var mW = ctx.width = 250;
    var mH = ctx.height = 250;
    var lineWidth = 1;

    //圆属性
    var r = mH / 2; //圆心
    var cR = r - 16 * lineWidth; //圆半径

    //Sin 曲线属性
    var sX = 0;
    var sY = mH / 2;
    var axisLength = mW; //轴长
    var waveWidth = 0.03; //波浪宽度,数越小越宽 
    var waveHeight = 5; //波浪高度,数越大越高
    var speed = 0.5; //波浪速度，数越大速度越快
    var xOffset = 0; //波浪x偏移量

    //画圈函数
    var IsdrawCircled = false;
    var drawCircle = function () {

      ctx.beginPath();
      ctx.setLineWidth(4)
      ctx.setStrokeStyle('#4dd82f');
      ctx.arc(r, r, cR + 5, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(r, r, cR, 0, 2 * Math.PI);
      ctx.clip();
    }

    //画sin 曲线函数
    var drawSin = function (xOffset) {
      ctx.save();

      var points = []; //用于存放绘制Sin曲线的点

      ctx.beginPath();
      //在整个轴长上取点
      for (var x = sX; x < sX + axisLength; x += 20 / axisLength) {
        //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
        var y = -Math.sin((sX + x) * waveWidth + xOffset);

        var dY = mH * (1 - nowRange / 100);
        points.push([x, dY + y * waveHeight]);
        ctx.lineTo(x, dY + y * waveHeight);
      }
      console.log(x, sY)
      //封闭路径
      ctx.lineTo(axisLength, mH);
      ctx.lineTo(sX, mH);
      ctx.lineTo(points[0][0], points[0][1]);
      ctx.setFillStyle('#4dd82f');
      ctx.fill();
      ctx.restore();
    };

    //写百分比文本函数
    var drawText = function () {
      ctx.save();
      ctx.setFontSize(40);
      ctx.setTextAlign('center')
      ctx.setFillStyle("red");
      ctx.fillText(~~nowRange + '%', r+2, r+30);
      ctx.restore();
      ctx.setFontSize(20);
      ctx.setTextAlign('center')
      ctx.setFillStyle("red");
      ctx.fillText('正在充电中', r + 5, r-30 );
    };

    var render = function () {
      ctx.clearRect(0, 0, mW, mH);

      if (IsdrawCircled == false) {
        drawCircle();
      }

      if (nowRange <= rangeValue) {
        var tmp = 1;
        nowRange += tmp;
      }

      if (nowRange > rangeValue) {
        var tmp = 1;
        nowRange -= tmp;
      }

      drawSin(xOffset);
      drawText();

      xOffset += speed;
    }

    //连接状态
    if (that.data.connet_state==0){
      var ctx = wx.createCanvasContext('canvasArcCir');
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

      setInterval(function () {
        render();
        ctx.draw()
      }, 1000 / 6)

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