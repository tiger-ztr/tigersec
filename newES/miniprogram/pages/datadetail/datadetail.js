// pages/datadetail/datadetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data_id: "null",
    userstu: false,
    usertea: false,
    file: [],
    fileID: "null",
    tempurl: ""
  },

  downfile: function () {
    wx.cloud.downloadFile({
      fileID: this.data.fileID,
      success: res => {
        console.log("【下载成功：】", res)
      }
    })
  },

  deletefile: function () {
    wx.cloud.deleteFile({
      fileID: [this.data.fileID],
      success: res => {
        console.log("【删除成功：】", res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      data_id: options.data_id,
      userstu: app.globalData.userstu,
      usertea: app.globalData.usertea
    })
    const db = wx.cloud.database()
    db.collection('datalist').where({
      _id: this.data.data_id
    })
      .get({
        success: res => {
          this.setData({
            file: res.data[0],
            fileID: res.data[0].dataurl
          })
          wx.cloud.getTempFileURL({
            fileList: [this.data.file.dataurl],
            success: res => {
              console.log("获取临时链接数组", res.fileList[0])
              this.setData({
                tempurl: res.fileList[0].tempFileURL
              })
            }
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