
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    coursename:"null",
    teacher:"null",
    place:"null",
    time:[],
    examtime:"尚未发布",
    ifhidden:false,
    temt_id:"null",
    usertea:"null"//发布考试时间用
  },

  release: function () {
    wx.navigateTo({
      url: '../examtime/examtime?courseid=' + this.data.courseid,
    })
    console.log("【前往考试时间发布页面】")
  },

  todatalist: function () {
    wx.navigateTo({
      url: '../data/data?courseid=' + this.data.courseid,
    })
    console.log("【前往资料页面】")
  },

  tosignin: function () {
    wx.navigateTo({
      url: '../sign_in/sign_in?courseid=' + this.data.courseid,
    })
    console.log("【前往签到页面】")
  },

  tocontent: function () {
    wx.navigateTo({
      url: '../content/content?courseid=' + this.data.courseid,
    })
    console.log("【前往授课内容页面】")
  },

  toquestionnaire: function () {
    wx.navigateTo({
      url: '../questionnaire/questionnaire?courseid=' + this.data.courseid,
    })
    console.log("【前往问卷页面】")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      courseid: options.courseid,
      usertea: app.globalData.usertea
    })
    const db = wx.cloud.database()
    db.collection('course').where({
      courseid:this.data.courseid
    })
      .get({
        success: res => {
          console.log("【课程信息查询成功，返回数据为：", res.data, "】")
          this.setData({
            coursename: res.data[0].coursename,
            teacher: res.data[0].teacher,
            place: res.data[0].place,
            time: res.data[0].time,
          })
        },
        fail:err =>{

        }
      })

    db.collection('examtime').where({
      courseid: this.data.courseid
    })
      .get({
        success: res => {
          console.log("【考试时间查询成功，返回数据为：", res.data, "】")
          this.setData({
            examtime: res.data[0].examtime
          })
        },
        fail: err => {

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