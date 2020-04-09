// pages/data/data.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseid: "null",
    userstu: false,
    usertea: false
  },

  uploadfile: function () {
    wx.navigateTo({
      url: '../uploaddata/uploaddata?courseid=' + this.data.courseid,
    })
    console.log("【前往上传资料页面】")
  },

  todetail: function (e) {
    var id = e.target.id
    wx.navigateTo({
      url: '../datadetail/datadetail?data_id=' + id,
    })
    console.log("【查看资料", id, "详情】")
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
    const db = wx.cloud.database()
    db.collection('datalist').where({
      courseid: this.data.courseid
    })
      .get({
        success: res => {
          console.log("【返回数据为】：", res)
          this.setData({
            datalist: res.data
          })
        }
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