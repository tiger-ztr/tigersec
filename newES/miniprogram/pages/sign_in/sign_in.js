var util = require('../../utils/util.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userstu: false,
    usertea: true,
    courseid: "null",
    signlist: [],
    changeid: "null"
  },

  sign: function (e) {
    var code = e.detail.value.code
    for (var i = 0; this.data.signlist[i]; i++) {
      if (this.data.signlist[i].sign_code == code) {    //判断条件需改
        const db = wx.cloud.database()
        db.collection('sign_in_list').add({
          data: {
            time: this.data.signlist[i].time,
            courseid: this.data.courseid,
            stuid: app.glabalData.userid,
            stuname: app.glabalData.username,
            row: e.detail.value.row,
            column: e.detail.value.column
          },
          success(res) {
            console.log("【添加成功】")
          }
        })
        console.log('【成功】')
      }
      else {
        console.log('【签到失败】')
      }
    }
  },

  new_record: function (e) {
    var time = e.detail.value.time
    var sign_code = e.detail.value.sign_code
    const db = wx.cloud.database()
    db.collection('sign_in_code').add({
      data: {
        courseid: this.data.courseid,
        time: e.detail.value.time,
        sign_code: e.detail.value.sign_code,
        state: 0
      },
      success(res) {
        console.log("【新建签到码成功】")
      }
    })
  },

  stateoff: function (e) {
    //在数据库中更改记录状态
    this.setData({
      changeid: e.target.id
    })
    const db = wx.cloud.database()
    db.collection('sign_in_code').doc(this.data.changeid).update({
      data: {
        state: 0
      },
      success(res) {
        console.log("【状态已关闭", res, "】")
      }
    })
    this.setData({

    })
  },

  stateon: function (e) {
    //在数据库中更改记录状态
    this.setData({
      changeid: e.target.id
    })
    const db = wx.cloud.database()
    db.collection('sign_in_code').doc(this.data.changeid).update({
      data: {
        state: 1
      },
      success(res) {
        console.log("【状态已开启", res, "】")
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      courseid: options.courseid,
      userstu: app.globalData.userstu,
      usertea: app.globalData.usertea
    })
    if (app.globalData.usertea) {
      const db = wx.cloud.database()
      console.log("【已连接", this.data.courseid, "】")
      db.collection('sign_in_code').where({
        courseid: this.data.courseid
      })
        .get({
          success: res => {
            console.log("【查询成功", res, "】")
            this.setData({
              signlist: res.data
            })
          },
          fail: err => { }
        })
    }
    else if (app.globalData.userstu) {
      const db = wx.cloud.database()
      db.collection('sign_in_code').where({
        state: 1,
        courseid: this.data.courseid
      })
        .get({
          success: res => {
            this.setData({
              signlist: res.data
            })
          },
          fail: err => { }
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