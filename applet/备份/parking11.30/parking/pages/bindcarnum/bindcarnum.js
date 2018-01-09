// pages/bindcarnum/bindcarnum.js
var app = getApp().globalData;
var apps = getApp();
Page({

  /**
   * 页面的初始数据
   * keyboard1:首页键盘,显示省的简称
   * keyboard2:第二页键盘，显示数字和大写字母
   */
  data: {
    isKeyboard: false,//是否显示键盘
    specialBtn: true,
    tapNum: true,//数字键盘是否可以点击
    isFocus: false,//输入框聚焦
    flag: false,//防止多次点击的阀门
    keyboardNumber: '1234567890',
    keyboardAlph: 'QWERTYUIOPASDFGHJKL巛ZXCVBNM学港澳',
    keyboard1: '京津沪冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤川青藏琼宁渝',
    keyboard2: '',
    keyboard2For: ['完成'],
    keyboardValue: '',
    textArr: [],
    textValue: '',
    placeholder: '请输入车牌号',
    animationData: {},
    // province: ["京", "津", "沪", "渝", "蒙", "新", "藏", "宁", "桂", "黑", "吉", "辽", "晋", "冀", "青", "鲁", "豫", "苏", "皖", "浙", "闽", "赣", "湘", "鄂", "粤", "琼", "甘", "陕", "黔", "滇", "川", "港", "澳"],
    // accountIndex: 0,
    pro_tit:'',
    add_state:'',//从我的添加车辆为1，从主页为0
    color:'#FE970F',
    colors:'#ccc',
    tag:0,
    focus:0,
    verify_txt: '获取验证码',
    dis: '',
    dis_btn: 'disabled',
    srcimg:'../../images/adds@3x.png',
    upload_img:"",
    img_tag:false,
    carnum_use:'0',//是否存在车牌号，0不存在，1存在
    header_id:'',
    header_skey:'',
    verify_code:'',
    li_item:[
      {
        title:'继续绑定该车牌',
        state:'0',
        flag: false
      },
      {
        title:'我是车主，撤销他人绑定',
        state: '1',
        flag: false
      }
    ],
    car_num:[
      {
        id:0,
        max_len:'1',
        types:'text',
        values:''
      },
      {
        id: 1,
        max_len: '1',
        types: 'text',
        values: ''
      },
      {
        id: 2,
        max_len: '1',
        types: 'text',
        values: ''
      },
      {
        id: 3,
        max_len: '1',
        types: 'text',
        values: ''
      },
      {
        id: 4,
        max_len: '1',
        types: 'text',
        values: ''
      },
      {
        id: 5,
        max_len: '-1',
        types: 'text',
        values: ''
      }
    ],
    multiArray: [["京", "津", "沪", "渝", "蒙", "新", "藏", "宁", "桂", "黑", "吉", "辽", "晋", "冀", "青", "鲁", "豫", "苏", "皖", "浙", "闽", "赣", "湘", "鄂", "粤", "琼", "甘", "陕", "黔", "滇", "川", "港", "澳"], ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y','Z']],
    multiIndex: [20, 3],
    audit:[],
    carTotalNum:'',
    car_name:''
  },
  sub_btn:function(e){
    
    let formId = e.detail.formId;
    if (formId=="the formId is a mock one") {
    }else{
      apps.dealFormIds(formId);
      app.config.up_formid(formId)
    }
  },
  submit_btn:function(e){
    var that = this,
        // plate_name = e.currentTarget.dataset.value, //地区
        carnum = that.data.carTotalNum,
      plate_name = that.data.car_name
    // car_num = plate_name + carnum
    // console.log(plate_name+carnum ,that.data.upload_img)
    if (carnum.length<5){
        wx.showToast({
          title: '请输入正确车牌号！',
          image: '../../images/cuo@2x.png',
          duration: 2000
        })
    }else{
      app.qcloud.request({
        url: app.config.service.hostUrl + 'car/bindcar',
        data: {
          plate_arr: carnum,
          plate_name: plate_name,
          code: that.data.verify_code,
          img: that.data.upload_img
        },
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (response) {
          console.log(response);
          var data = response.data;
          if (data.err == 0) {//已绑定
            wx.showModal({
              title: data.msg,
              content: '',
              showCancel:false,
              confirmText:'关闭'
            })
            that.setData({
              carnum_use: 1
            })
          } else if (data.err == 1) {//绑定成功
            wx.showToast({
              title: data.msg,
              duration: 1000,
              image: '../../images/dui@2x.png',
              success:function(){
                if (that.data.add_state == 0) {
                  setTimeout(function(){
                    wx.reLaunch({
                      url: '../index/index?state=1',
                    })
                  },1000)
                } else {
                  setTimeout(function () {
                    wx.navigateBack({
                      delta: 1
                    })
                  }, 2000)
                }
              }
            })
        
          } else if (data.err == 3){//验证码错误
            wx.showToast({
              title: data.msg,
              image: '../../images/cuo@2x.png',
              duration: 2000
            })
          } else if (data.err == 4) {//重复提交审核
            // wx.showToast({
            //   title: data.msg,
            //   image: '../../images/cuo@2x.png',
            //   duration: 2000
            // })
            wx.showModal({
              title: '',
              content: data.msg,
              showCancel: false,
              confirmText: '关闭'
            })
          } else if (data.err == 5){//提交审核成功
            wx.showToast({
              title: data.msg,
              image: '../../images/dui@2x.png',
              duration: 2000
            })
            that.setData({
              audit:data.data,
              carnum_use:0,
              upload_img:'',
              verify_code:'' 
            })
          }
        },
        fail: function (err) {
          console.log(err);
        }
      });
    }

    
  },
  bindAccountChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    // multiArray[0][multiIndex[0]]
    // console.log('picker account 发生选择改变，携带值为', e.detail.value, data.multiArray[0][data.multiIndex[0]]+data.multiArray[1][data.multiIndex[1]]);
    this.setData({
      car_name: data.multiArray[0][data.multiIndex[0]] + data.multiArray[1][data.multiIndex[1]]
    })
 
  },
  input_code:function(e){
    this.setData({
      verify_code:e.detail.value
    })
  },
  access_verify: function (e) {
    var that = this,
      // plate_name = e.currentTarget.dataset.value, //地区
      carnum = that.data.carTotalNum,
      plate_name = that.data.car_name
    // console.log(plate_name, carnum)
    app.qcloud.request({
      url: app.config.service.hostUrl + 'car/sendcode',
      data: {
        plate_arr: carnum,
        plate_name: plate_name
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (response) {
        console.log(response);
      },
      fail: function (err) {
        console.log(err);
      }
    });


    that.data.tag = false
    if (this.data.tag) {

    } else {
      var num = 60
      var timer = setInterval(function () {
        num--;
        that.setData({
          dis: 'disabled',
          verify_txt: num + 's重新获取',
        })
        if (num == 0) {
          clearInterval(timer);
          that.setData({
            dis: '',
            verify_txt: '获取验证码',
          })
        }
      }, 1000)

    }
  },
  chooseimage:function(e){
    var that = this,
      // plate_name = e.currentTarget.dataset.value, //地区
      carnum = that.data.carTotalNum,
      plate_name = that.data.car_name
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        // console.log(tempFilePaths, that.data.header_id,that.data.header_skey)
        wx.uploadFile({
          url: app.config.service.hostUrl + 'fileupload/index', 
          filePath: tempFilePaths[0],
          name: 'file',
          method: 'POST',
          header: { 'content-type': 'multipart/form-data', 'X-WX-Id': that.data.header_id,'X-WX-Skey':that.data.header_skey},
          formData: {
            plate_arr: carnum,
            plate_name: plate_name
          },
          success: function (res) {
            
            that.setData({
              upload_img: res.data
            })
            console.log(res.data)
          }
        })
        // console.log('路径',tempFilePaths)
        if (res.tempFilePaths.length>0){
              that.setData({
                srcimg: tempFilePaths,
                img_tag:true
              })
        }
      }
    })
  },
  select_item:function(e){
    var that = this, id = e.currentTarget.dataset.id, list = this.data.li_item;
    // console.log(id,list)
      for(var i=0;i<list.length;i++){
          if(id == i){
            list[i].flag = !list[i].flag
            list[i].state=i
            // console.log(i, list[i].flag)
          }else{
            list[i].flag = false
          }
      }
      that.setData({
        li_item:list
      })
  },  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var add_carid = options.id;
        that.setData({
          add_state: options.id
        })
        this.setData({
          car_name: this.data.multiArray[0][this.data.multiIndex[0]] + this.data.multiArray[1][this.data.multiIndex[1]]
        })

    try {
      var session = wx.getStorageSync('weapp_session_F2C224D4-2BCE-4C64-AF9F-A6D872000D1A')
      that.setData({
        header_id: session.id,
        header_skey: session.skey
      })
      // var header= {};
      // if (session && session.id && session.skey) {
      //   header['X-WX-Id'] = session.id;
      //   header['X-WX-Skey'] = session.skey;
      // }
      //   that.setData({
      //     headers: header,
      //   })
    } catch (e) {
      // Do something when catch error
    }

    app.qcloud.request({
      url: app.config.service.hostUrl + 'car/index',
      data: {
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (response) {
        console.log(response);
        that.setData({
          audit: response.data.data
        })
      },
      fail: function (err) {
        console.log(err);
      }
    });
    //光标动画
    var animation = wx.createAnimation({
      duration: 600,
      timingFunction: "step-start",
    })

    that.animation = animation
    var n = 0;
    setInterval(function () {
      if(n==0){
        animation.opacity(1).step(); 
        n=1   
      }else{
        animation.opacity(0).step(); 
        n=0
      }
   
      that.setData({
        animationData: animation.export()
      })
    }, 600)
  },


// 键盘

  /**
   * 输入框显示键盘状态
   */
  showKeyboard: function () {
    var self = this;
    self.setData({
      isFocus: true,
      isKeyboard: true,
    })
  },
  /**
   * 点击页面隐藏键盘事件
   */
  hideKeyboard: function () {
    var self = this;
    if (self.data.isKeyboard) {
      //说明键盘是显示的，再次点击要隐藏键盘
      if (self.data.textValue) {
        self.setData({
          isKeyboard: false
        })
      } else {
        self.setData({
          isKeyboard: false,
          isFocus: false
        })
      }

    }
  },
  /**
   * 输入框聚焦触发，显示键盘
   */
  bindFocus: function () {
    var self = this;
    if (self.data.isKeyboard) {
      //说明键盘是显示的，再次点击要隐藏键盘
      self.setData({
        isKeyboard: false,
        isFocus: false,
      })
    } else {
      //说明键盘是隐藏的，再次点击显示键盘
      self.setData({
        isFocus: true,
        isKeyboard: true,
      })
    }
  },
  /**
   * 键盘事件
   */
  tapKeyboard: function (e) {
    var self = this;
    //获取键盘点击的内容，并将内容赋值到textarea框中
    var tapIndex = e.target.dataset.index;
    var tapVal = e.target.dataset.val;
    var keyboardValue;
    var specialBtn;
    var tapNum;
    if (tapVal == "巛") {
      //说明是删除
      self.data.textArr.pop();
      if (self.data.textArr.length == 0) {
        self.setData({
          isKeyboard: true,
          isFocus: true,
          textValue:''
        })
      }

      // if (self.data.textArr.length == 0) {
      //   //说明没有数据了，返回到省份选择键盘
      //   this.specialBtn = false;
      //   this.tapNum = false;
      //   this.keyboardValue = self.data.keyboard1;
      // } else if (self.data.textArr.length == 1) {
      //   //只能输入字母
      //   this.tapNum = false;
      //   this.specialBtn = true;
      //   this.keyboardValue = self.data.keyboard2;
      // } else {
      //   this.specialBtn = true;
      //   this.tapNum = true;
      //   this.keyboardValue = self.data.keyboard2;
      // }
        this.specialBtn = true;
        this.tapNum = true;
        this.keyboardValue = self.data.keyboard2;
      self.data.textValue = self.data.textArr.join("");
      self.setData({
        textValue: self.data.textValue,
        keyboardValue: this.keyboardValue,
        specialBtn: this.specialBtn,
        tapNum: this.tapNum,
      })
      return false
    }
    if (self.data.textArr.length >= 6) {
      return false;
    }
    self.data.textArr.push(tapVal);
    self.data.textValue = self.data.textArr.join("");
    self.setData({
      textValue: self.data.textValue,
      keyboardValue: self.data.keyboard2,
      specialBtn: true,
    })
    if (self.data.textArr.length > 0) {
      //展示数字键盘
      self.setData({
        tapNum: true
      })
    }
  },
  /**
   * 特殊键盘事件（删除和完成）
   */
  tapSpecBtn: function (e) {
    var self = this;
    // if (self.data.flag) {
    //   return false
    // }
    var btnIndex = e.target.dataset.index;
    if (btnIndex == 0) {
      //说明是完成事件
      if (self.data.textArr.length < 5) {
        wx.showToast({
          title: '请输入正确的车牌号',
          image: '../../images/cuo@2x.png',
          mask: true,
          image: '../../images/cuo@1x.png',
          duration: 2000
        })
      } else {
        // console.log(1, self.data.textValue)//获取输入内容

        self.setData({
          // flag: true,
          isKeyboard:false,
          carTotalNum: self.data.textValue
        })
      }
    }
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // var self = this;
    // //将keyboard1和keyboard2中的所有字符串拆分成一个一个字组成的数组
    // self.data.keyboard1 = self.data.keyboard1.split('')
    // self.data.keyboard2 = self.data.keyboard2.split('')
    // self.setData({
    //   keyboardValue: self.data.keyboard1
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var self = this;
    self.setData({
      flag: false
    })
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
  
  },


})
