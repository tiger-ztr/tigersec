// pages/questionnaire/questionnaire.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queslist: [],
    choosedlist: [],
    choosednum: 0,
    courseid: "null",
    usertea: false,
    userstu: false,
    temp: []
  },

  submit: function (e) {
    console.log('【提交，携带数据为：', e.detail.value, "】")
  },

  new_questionnaire: function (e) {
    for (var i = 0; i < this.data.choosednum; i++) {
      const db = wx.cloud.database()
      db.collection('question').where({
        _id: this.data.choosedlist[i]
      })
        .get({
          success: res => {
            console.log("【res.data为", res.data, "】")
            this.setData({
              temp: res.data
            })
            console.log("【this.data.temp为", this.data.temp, "】")
            db.collection('questionnaire').add({
              data: {
                questionnum: i,
                courseid: this.data.courseid,
                time: e.detail.value.time,
                question: this.data.temp[0].question,
                questionid: this.data.temp[0]._id,
                questiontype: this.data.temp[0].type,
                ifcs: this.data.temp[0].ifcs,
                iftf: this.data.temp[0].iftf,
                ifsa: this.data.temp[0].ifsa,
                A: this.data.temp[0].A,
                B: this.data.temp[0].B,
                C: this.data.temp[0].C,
                D: this.data.temp[0].D
              },
              success(res) {
                console.log("【成功】")
              }
            })
          },
          fail: err => { }
        })
    }
  },

  checkboxchange: function (e) {
    console.log("【checkbox发生change事件，携带e值为：", e, "】")
    console.log("【checkbox发生change事件，携带e.detail值为：", e.detail, "】")
    console.log("【checkbox发生change事件，携带value值为：", e.detail.value, "】")
    console.log("【checkbox发生change事件，携带e.detail.question值为：", e.detail.question, "】")
    console.log("【checkbox发生change事件，携带value长度为：", e.detail.value.length, "】")
    this.setData({
      choosedlist: e.detail.value,
      choosednum: e.detail.value.length
    })
    console.log("【选中问题表：", this.data.choosedlist, "】")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      usertea: app.globalData.usertea,
      userstu: app.globalData.userstu,
      courseid: options.courseid
    })
    if (this.data.usertea) {
      const db = wx.cloud.database()
      db.collection('question').where({
        questioner: app.globalData.username
      })
        .get({
          success: res => {
            this.setData({
              queslist: res.data
            })
            console.log("【搜索教师问卷成功】", res)
          },
          fail: err => {

          }
        })
    }
    else if (this.data.userstu) {
      const db = wx.cloud.database()
      db.collection('questionnaire').where({
        courseid: this.data.courseid
      })
        .get({
          success: res => {
            console.log("搜索学生问卷成功", res)
            this.setData({
              queslist: res.data
            })
          }
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