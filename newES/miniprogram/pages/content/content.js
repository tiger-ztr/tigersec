// pages/content/content.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentlist: [],//
    courseid: 'null',
    iftea: false
  },

  new_cont: function (e) {
    var time = e.detail.value.time
    var content = e.detail.value.content
    const db = wx.cloud.database()
    db.collection('contents').add({
      data: {
        courseid: this.data.courseid,
        time: e.detail.value.time,
        content: e.detail.value.content
      },
      success(res) {
        console.log("【新授课内容发布成功，返回数据：", res, "】")
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      courseid: options.courseid,
      iftea: app.globalData.usertea
    })
    const db = wx.cloud.database()
    console.log("【已连接数据库，courseid为", this.data.courseid, "】")
    db.collection('contents').where({
      courseid: this.data.courseid
    })
      .get({
        success: res => {
          console.log("【查询成功，返回数据为：", res, "】")
          this.setData({
            contentlist: res.data
          })
        },
        fail: err => { }
      })
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