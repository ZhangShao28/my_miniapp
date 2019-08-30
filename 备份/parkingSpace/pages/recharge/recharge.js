// pages/recharge/recharge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      money:'0.00',
      recharge_src:'../../images/recharge/Recharge-and-start-charging@3x.png',
      recharge_id:null,
      num_color:'#FFAF05',
      is_no:1,
      recharge_list:[
        {
          name:'月卡',
          value:'30',
          checked:'checked'
        }, 
        {
          name: '季卡',
          value: '89'
        },
        {
          name: '半年卡',
          value: '116'
        },
        {
          name: '年卡',
          value: '356'
        },
        
      ],
      num_moneylist:[
        {
          num_money:'30'
        },
        {
          num_money: '50'
        },
        {
          num_money: '100'
        },
        {
          num_money: '200'
        },
        {
          num_money: '500'
        },
      ]
  },
  select_recharge:function(e){
    console.log(e.currentTarget.dataset.id)
    if(this.data.is_no==2){
      this.setData({
        recharge_id: e.currentTarget.dataset.id
      })
    }else{

    }
  
  },
  recharge_btn:function(){
    wx.reLaunch({
      url: '../electricize/electricize',
    })
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
  
  }
})