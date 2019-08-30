// pages/cnavas/canvas.js


var interval;
var varName;
var ctx = wx.createCanvasContext('canvasArcCir');
Page({

  /**
   * 页面的初始数据
   */
  data: {
        num:11 ,//充电百分比
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    // setInterval(function () {
    //   var animation = wx.createAnimation({
    //     duration: 200,
    //     timingFunction: 'linear',
    //   })

    //   that.animation = animation

    //   animation.translateY(10).step()
    //   animation.translateY(0).step()
    //   that.setData({
    //     animationData1: animation.export()
    //   })
    // }, 800)


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
    var animation_interval = 100, n = that.data.num;
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