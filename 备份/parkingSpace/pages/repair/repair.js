// pages/repair/repair.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type_state:1,//1电动车充电故障、2计费故障、3硬件故障、4其他
    list: [
      {
        id: 'electrocar',
        name: '电动车充电故障',
        open: false,
        type_state: null
      },
      {
        id: 'charging',
        name: '计费故障',
        open: false,
        type_state:null
      },
      {
        id: 'hardware',
        name: '硬件故障',
        open: false,
        type_state:null
      },
      {
        id: 'other',
        name: '其他',
        open: false,
        type_state:null
      }
    ],
    charging:[
      {
        tit: '未成功充电，却进行扣费',
        flag: false,
        id:0
      },
      {
        tit: '重复扣费/扣次数',
        flag: false,
        id:1
      }
    ],
    electrocar: [
      {
        tit: '插入插座，没有电',
        flag: false,
        id: 0
      },
      {
        tit: '充电中途断电',
        flag: false,
        id: 1
      },
      {
        tit: '不能结束充电',
        flag: false,
        id: 2
      }
    ],
     hardware: [
      {
        tit: '编号不清晰',
        clas: "b1",
        flag: false,
        id: 0
      },
      {
        tit: 'USB损坏',
        clas: "b2",
        flag: false,
        id: 1
      },
      {
        tit: '插口损坏',
        clas: "b3",
        flag: false,
        id: 2
      },
      {
        tit: '整台设备损坏',
        clas: "b4",
        flag: false,
        id: 3
      },
      {
        tit: '指示灯故障',
        clas: "b5",
        flag: false,
        id: 4
      },
      {
        tit: '二维码损坏',
        clas: "b6",
        flag: false,
        id: 5
      },
    ]
  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    console.log(id)
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
        list[i].type_state =i
        console.log(i)
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },
   go_kefu: function () {
    wx.makePhoneCall({
      phoneNumber: '13585254852',
    })
  },
   select_charging:function(e){
     var id = e.currentTarget.dataset.id, list = this.data.charging;
     for (var i = 0, len = list.length; i < len; i++) {
       console.log(id, list[i].id)
       if (list[i].id == id) {
         if (list[i].flag) {
           list[i].flag = false
         } else {
           list[i].flag = true
         }
       }
     }
     this.setData({
       charging: list
     });
   },
   select_electrocar: function (e) {
    //  console.log(e.currentTarget.dataset.id)
     var id = e.currentTarget.dataset.id, list = this.data.electrocar;
     for(var i =0,len = list.length;i<len;i++){
       console.log(id, list[i].id)
        if(list[i].id == id){
          if (list[i].flag){
            list[i].flag = false
          }else{
            list[i].flag = true
          }
        }
     }
     this.setData({
       electrocar: list
     });
     
   },
   select_hardware: function (e) {
     var id = e.currentTarget.dataset.id, list = this.data.hardware;
     for (var i = 0, len = list.length; i < len; i++) {
       console.log(id, list[i].id)
       if (list[i].id == id) {
         if (list[i].flag) {
           list[i].flag = false
         } else {
           list[i].flag = true
         }
       }
     }
     this.setData({
       hardware: list
     });
   },
   submit_btn:function(){
    var list = this.data.hardware
      var  arry = {};
    for (var i = 0, len = list.length; i < len; i++) {
      if(list[i].flag){
       arry+=list[i].tit+','
      }
    }
    console.log(arry)
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