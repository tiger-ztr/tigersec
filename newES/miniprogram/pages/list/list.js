
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:"000",
    username:"null",
    userstu: false,
    usertea: false,
    courselist: [],
    courselist2: []
  },

  coursechoose: function (e) {
    var courseid = e.target.id
    console.log('【选中课程', courseid, "】")
    wx.navigateTo({
      url: '../detail/detail?courseid=' + courseid,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userid: app.globalData.userid,
      username: app.globalData.username,
      userstu: app.globalData.userstu,
      usertea: app.globalData.usertea
    })
    
    const db=wx.cloud.database()
    db.collection('user').where({
      _openid: app.globalData.useropenid
    })
      .get({
        success:res =>{
          console.log("【用户身份已确认",res.data,"】")
          if (app.globalData.userstu) {
            const db = wx.cloud.database()
            db.collection('course_selection').where({
              stuname: app.globalData.stuname
            })
              .get({
                success: res => {
                  console.log("【身份为学生，查询选课表成功】", res.data)
                  this.setData({
                    courselist: JSON.stringify(res.data, null, 2),
                    courselist2: res.data
                  })
                },
                fail: err => {
                  console.log("查询选课表失败", res)
                }
              })
          }
          else if (app.globalData.usertea) {
            const db = wx.cloud.database()
            db.collection('course').where({
              teacher: app.globalData.username
            })
              .get({
                success: res => {
                  console.log("【身份为教师，查询课程表成功】", res.data)
                  this.setData({
                    courselist: JSON.stringify(res.data, null, 2),
                    courselist2: res.data
                  })
                },
                fail: err => {
                  console.log("查询选课表失败", res)
                }
              })
          }
        },
        fail:err =>{

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