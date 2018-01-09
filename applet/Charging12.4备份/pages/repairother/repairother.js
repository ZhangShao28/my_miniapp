// pages/repairother/repairother.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ctx = wx.createCanvasContext('myCanvas')
    //range控件信息
    var rangeValue = 50;
    var nowRange = 0; //用于做一个临时的range

    //画布属性
    var mW = ctx.width = 200;
    var mH = ctx.height = 200;
    var lineWidth = 1;

    //圆属性
    var r = mH / 2; //圆心
    var cR = r - 16 * lineWidth; //圆半径

    //Sin 曲线属性
    var sX = 0;
    var sY = 100;
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
      ctx.arc(r, r, cR+5 , 0, 2 * Math.PI);
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
      ctx.setFontSize(20);
      ctx.setTextAlign('center')
      ctx.setFillStyle("red");
      ctx.fillText(~~nowRange + '%', r, r);
      ctx.restore();
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

    setInterval(function () {
      render();
      ctx.draw()
    }, 1000 / 6)

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