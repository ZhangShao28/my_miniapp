// pages/parkdetail/parkdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      park_name:'东门1号停车位',
      begin_src:'../../images/parkdetail/Start-charging@3x.png',
      select_charge:'../../images/parkdetail/round-2@3x.png',
      charge: '../../images/parkdetail/The-vacancy@3x.png',
      colors:'#FFAF05',
      select_colors: '#36C417',
      state: 2,
      state_use: '空置',
      select_id:null,
      chargelist:[
        {
          num:'001'
        }, 
        {
          num: '002'
        },
        {
          num: '003'
        },
        {
          num: '003'
        },
        {
          num: '003'
        },
        {
          num: '003'
        },
        {
          num: '007'
        },
        {
          num: '008'
        },
        {
          num: '009'
        },
      ]
  },
  select_item:function(e){
    if (this.data.state == 1) {

    }else{
      this.setData({
        select_id: e.currentTarget.dataset.id
      })
    }
   
    // console.log(e.currentTarget.dataset.id, this.data.colors )
  },
  begin_btn:function(){
    wx.showModal({
      title: '',
      confirmText:'去充值',
      confirmColor:'#FFAC32',
      content: '当前您的余额为0元\r\n请先充值后继续开启充电',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../recharge/recharge',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if(this.data.state==1){
        this.setData({
          state_use:'充电中',
          colors: '#e5e5e5',
          charge: '../../images/parkdetail/In-the-charging@3x.png'
        })
      }
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