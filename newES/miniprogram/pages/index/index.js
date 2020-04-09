
const app = getApp()

Page({

  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {}
  },

  onLoad: function (options) {

    wx.getUserInfo({
      success: res => {
        console.log("【成功获取用户信息", res.userInfo, "】")
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo
        })
      }
    })

    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('【云函数调用成功，用户openid: ', res.result.openid, "】")
        app.globalData.useropenid = res.result.openid

        //查询数据库是否已注册
        const db = wx.cloud.database()
        db.collection('user').where({
          _openid: res.result.openid
        })
          .get({
            success: res => {//验证成功
              this.setData({
                queryResult: JSON.stringify(res.data, null, 2)
              })
              console.log('【查询user表成功', res.data, "】")

              if (res.data.length != 0) {
                //验证成功
                console.log('【user表中存在用户openid', res.data.length != 0, "】")
                app.globalData.useropenid = res.data[0]._openid
                if (res.data[0].identify == "student") {
                  console.log("【用户身份为学生】")
                  app.globalData.userid = res.data[0].stu_id
                  app.globalData.username = res.data[0].stu_name
                  app.globalData.usertea = false
                  app.globalData.userstu = true
                  console.log("【已设置全局变量】")
                }
                else if (res.data[0].identify == "teacher") {
                  console.log("【用户身份为教师】")
                  app.globalData.userid = res.data[0].teaid
                  app.globalData.username = res.data[0].teaname
                  app.globalData.usertea = true
                  app.globalData.userstu = false
                }
                var a = app.globalData.useropenid
                var b = app.globalData.userid
                var c = app.globalData.username
                var d = app.globalData.usertea
                var e = app.globalData.userstu
                console.log("【全局变量设置成功openid=", a, "id=", b, "name=", c, "tea?", d, "stu?", e, "】")
                wx.navigateTo({
                  url: '../list/list',
                })
              }
              else {
                console.log('【user表中不存在用户openid，即将跳转至注册页】')
                wx.navigateTo({
                  url: '../register/register',
                })
              }
              console.log('【学生教师用户身份判断完成】')
            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '数据库查询失败'
              })
              console.log('【查询失败】', err)
            }
          })

      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../fail/fail',
        })
      },

    })

  },

  onReady: function () {
    
  },

  onShow: function () {
    
  },

  onHide: function () {
    
  },

  onUnload: function () {
    
  },

  onPullDownRefresh: function () {
    
  },

  onReachBottom: function () {
    
  },

  onShareAppMessage: function () {
    
  }
})