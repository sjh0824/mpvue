<script>

  export default {
    onLaunch(option) {
      console.log(option)
      wx.setStorageSync('scenicSpotId', "")
      wx.setStorageSync('currentPages', "")
      wx.setStorageSync('sharedId', "")
      if (option.query.scenicSpotId) {
        wx.setStorageSync('scenicSpotId', option.query.scenicSpotId)
      }
      if (option.query.shareId) {
        wx.setStorageSync('sharedId', option.query.shareId)
      }
      if (option.path) {
        wx.setStorageSync('currentPages', option.path)
      }

    },
    onShow(option) {
      console.log(option)
      // var dd = wx.getStorageSync("scenicSpotId");
      // console.log(dd)
      wx.setStorageSync('scenicSpotId', "")
      wx.setStorageSync('currentPages', "")
      wx.setStorageSync('sharedId', "")
      if (option.query.scenicSpotId) {
        wx.setStorageSync('scenicSpotId', option.query.scenicSpotId)
      }
      if (option.query.shareId) {
        wx.setStorageSync('sharedId', option.query.shareId)
      }
      if (option.path) {
        wx.setStorageSync('currentPages', option.path)
      }
      if (option.path && option.path == "pages/showPages/main") {
        this.$store.state.board.isClickrulr = false;
        this.$store.state.board.isClickrule = false;
        this.$store.state.board.isClickruly = false;
        this.$store.state.board.isClickrulo = true;
      }
      var that = this;
      // // 查看是否授权
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.login({
              success: function (res) {
                var code = res.code;
                wx.setStorageSync('code', res.code)
                wx.getUserInfo({
                  lang: "zh_CN",
                  success: function (res) {
                    console.log(res)
                    var key = {};
                    key.encryptedData = res.encryptedData
                    key.iv = res.iv
                    wx.setStorageSync('recipient',key)
                    that.$store.state.board.nickName = res.userInfo.nickName;
                    that.$store.state.board.avatarUrl = res.userInfo.avatarUrl;
                    // if (res.success) {
                    // var url = 'http://10.29.74.237:8888/wechatapi/service/login?appid=wx961c52a1d78d5c01&secret=18baa3b45594258825f338503ffc1f59&code=' + code;
                    var url = 'https://www.hejinkai.com/wechatapi/service/login?appid=wx6f8fab67827259b0&secret=ed71f12d39b999ee6c47d0b77a6f2c8c&code=' + code;
                    console.log(url);
                    wx.request({
                      url: url,
                      success: function (res) {
                        // 回到原来的地方放
                        // wx.navigateBack();
                        console.log(res)
                        if (res.data.success) {
                          wx.setStorageSync('sessionID', res.data.sessionID)
                          // var sysUrl = 'http://10.29.74.237:8888/wechatapi/service/syncUser?encryptedData=' + encodeURIComponent(keys.encryptedData) + '&iv=' + encodeURIComponent(keys.iv) + '&sessionID=' + res.data.sessionID;
                          var sysUrl = 'https://www.hejinkai.com/wechatapi/service/syncUser?encryptedData=' + encodeURIComponent(key.encryptedData) + '&iv=' + encodeURIComponent(key.iv) + '&sessionID=' + res.data.sessionID;
                          console.log(sysUrl)
                          wx.request({
                            url: sysUrl,
                            success: function (res) {
                              // 回到原来的地方放
                              // wx.navigateBack();
                              console.log(res)
                              if (res.data.success) {
                                var currentPages = wx.getStorageSync('currentPages')
                                if(currentPages =="pages/showPages/main" ){
                                  var path = currentPages;
                                }else{
                                  var path =  "pages/index/main";
                                }
                                console.log(444444)
                                console.log(path)
                                wx.redirectTo({
                                  url: "/" + path
                                  // url: "/pages/index/main?scenicSpotId=" + that.scenicSpotId
                                })
                              }
                            }
                          })
                        }
                      }
                    })
                    // }
                  }
                })
                console.log(res)



              }
            })
          } else {
            setTimeout(function () {
              var path = "/pages/authorize/main" ;
              wx.redirectTo({
                url: path
              })
            }, 500)
            // return
          }
        }
      })
    },
    created() {

    }
  }
</script>

<style>
  page {
    height: 100%;
    width: 100%;
  }

  .container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 200 rpx 0;
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }

  /* this rule will be remove */
  * {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
  }
</style>
