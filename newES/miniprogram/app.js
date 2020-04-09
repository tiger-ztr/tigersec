//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'test-81b066',
        traceUser: true,
      })
    }

    this.globalData = {
      useropenid: "null",
      userid: "null",
      username: "null",
      usertea: false,
      userstu: false
    }
  }
})
