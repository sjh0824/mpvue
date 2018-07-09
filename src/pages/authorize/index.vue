<template>
  <div class="vist-userInfo">
    <div :style="{'width':(getWindowWidth-40)+'px'}" class="container">
      <div class="logo" style="margin-top: 30px;">
        <img src="/static/images/logo.jpg" alt="">
        <p style="color: #000;font-size: 18px;">分享足迹</p>
        <p>分享足迹-更多人了解景点信息</p>
      </div>
      <p style="border-top:1px solid #ccc;width: 100%;margin: 60px 0 10px 0;"></p>
      <div class="info">
        <p>改程序将获得以下授权</p>
        <p><span class="dot">·</span><span>获得您的公开信息（头像、昵称等）</span></p>
        <p>(取消授权您可能错过很多功能哦～)</p>
      </div>
      <div class="btn">
        <!--<div>-->
        <!--<button @click="backHomePage" class="save-btn" type="default">返回首页</button>-->
        <!--</div>-->
        <div>
          <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" class="save-btn">立即授权</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  export default {
    data() {
      return {

      }
    },
    onLoad(option) {
      console.log(option)
      // var that = this;
      // // 查看是否授权
      // wx.getSetting({
      //   success: function (res) {
      //     if (res.authSetting['scope.userInfo']) {
      //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
      //       that.login();
      //     }
      //   }
      // })

    },
    components: {},
    computed: {
      getWindowWidth() {
        return this.$store.state.board.windowWidth
      }
    },
    methods: {
      bindGetUserInfo() {
        this.login();
      },
      backHomePage() {
        var path = this.currentPages + "?scenicSpotId=" + this.scenicSpotId;
        console.log(this.currentPages)
        console.log(path)
        wx.redirectTo({
          url: "/" + path
        })
        // wx.navigateBack({
        //   delta: 1
        // })
      },
      login(){
        var that = this;
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
      }

    },
    created() {

    }
    ,
    mounted() {
      wx.setNavigationBarTitle({
        title: "用户授权"
      })
    }
  }
</script>

<style lang="scss" scoped>
  .vist-userInfo {
    background-color: #fff;
    justify-content: initial;
    .container {
      margin: 0 auto;
      font-size: 14px;
      color: #ccc;
      .logo {
        img {
          display: block;
          width: 50px;
          height: 50px;
          margin: 0 auto;
        }
        p {
          text-align: center;
        }
      }
      .info {
        width: 100%;
        font-size: 12px;
        p {
          margin-top: 10px;
          span {
            display: inline-block;
            vertical-align: middle;
          }
          .dot {
            /*font-size: 12px;*/
            font-weight: bold;
            padding-right: 5px;
          }
        }
      }
      .btn {
        width: 100%;
        margin-top: 60px;
        div {
          width: 100%;
          display: inline-block;
          text-align: center;
          button {
            font-size: 14px;
            font-family: "Microsoft YaHei UI Light";
            border: 0;
            margin: 0 auto;
          }
          .save-btn {
            width: 100%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            margin-top: 15px;
            border-radius: 3px;
            box-sizing: border-box;
            background-color: #e64340;
            color: #fff;
          }
          button[type="default"] {
            background-color: #f1f1f1;
            color: #000;
          }
        }

      }

    }

  }
</style>
