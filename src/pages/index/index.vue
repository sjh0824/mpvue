<template>
  <div class="vist-userInfo">
    <!--<button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" class="save-btn">授权登录</button>-->
    <div class="look-scenery" @click="bindViewTap">
      <!--<i class="icon-jieshao iconfont"></i>-->
      查看景区介绍
      <!--<span>查看景区介绍</span>-->
    </div>
    <div class="share-visit" @click="sharefoot">
      <!--<i class="icon-zuji-copy iconfont"></i>-->
      分享足迹
      <!--<span>分享足迹</span>-->
    </div>
  </div>
</template>

<script>
  import card from '@/components/card'
  import {login, getUserInfo} from '@/utils/wechat'

  export default {
    data() {
      return {}
    },

    components: {},
    onLoad(option){
      console.log(option)
      var that = this;
      // 查看是否授权
      // wx.getSetting({
      //   success: function (res) {
      //     if (res.authSetting['scope.userInfo']) {
      //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
      //       wx.getUserInfo({
      //         lang: "zh_CN",
      //         success: function (res) {
      //           console.log(res)
      //           that.$store.state.board.nickName = res.userInfo.nickName;
      //           that.$store.state.board.avatarUrl = res.userInfo.avatarUrl;
      //         }
      //       })
      //     } else {
      //       setTimeout(function () {
      //         // wx.redirectTo({
      //         //   url: "/pages/authorize/main"
      //         // })
      //         wx.navigateTo({
      //           url: "/pages/authorize/main"
      //         })
      //       }, 500)
      //       // return
      //     }
      //   }
      // })
    },
    methods: {
      bindViewTap(urls) {
        const url = '../instrustor/main'
        wx.navigateTo({url})

      },
      sharefoot() {
        this.$store.state.board.isClickrule = true;
        this.$store.state.board.isClickrulr = false;
        this.$store.state.board.isClickruly = false;
        this.$store.state.board.isClickrulo = false;
        const url = '../insfuncction/main'
        wx.navigateTo({url})
      },
      getUser() {
        getUserInfo().then((res) => {
          this.userInfo = res.userInfo
        })
      },
      bindGetUserInfo() {
        var that = this;
        wx.login({
          success: function (res) {
            wx.setStorageSync('code', res.code)
            wx.getUserInfo({
              lang: "zh_CN",
              success: function (res) {
                console.log(res)
                that.$store.state.board.nickName = res.userInfo.nickName;
                that.$store.state.board.avatarUrl = res.userInfo.avatarUrl;
              }
            })
          }
        })
      }
    },

    created() {
      // 调用应用实例的方法获取全局数据
      // login().then(res => {
      //   // console.log(res)
      //   this.getUser()
      // })
      // 调用API从本地缓存中获取数据
      const logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)
      wx.getSystemInfo({
        success: (res) => {
          console.log(99999999)
          this.$store.state.board.windowWidth = res.windowWidth
          this.$store.state.board.windowHeight = res.windowHeight
        }
      })

    },
    mounted() {
      var pagess = getCurrentPages()    //获取加载的页面

      var QQMapWX = require('../../../static/qqmap-wx-jssdk.min.js');
      var qqmapsdk;
      qqmapsdk = new QQMapWX({
        key: 'OISBZ-SUKW6-LJ7SS-MXQHI-GC5FF-CQBGM'
      });
      // let that = this;
      wx.getLocation({
        type: 'gcj02',
        altitude: true,
        success: (res) => {
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success: (addressRes) => {
              console.log(addressRes)
              // that.$store.state.board.address = addressRes.result.ad_info.city+'-'+addressRes.result.ad_info.diatrict
              // that.$store.state.board.address = addressRes.result.address_component.nation
              // this.$store.state.board.address = addressRes.result.address_component.province + '' + addressRes.result.address_component.district + '' + addressRes.result.address_component.street
              this.$store.state.board.address = addressRes.result.address_component.province + '' + addressRes.result.address_component.district;
            }
          })
        }
      })
      this.$store.state.board.isClickrule = true;
      this.$store.state.board.isClickrulr = false;
      this.$store.state.board.isClickruly = false;
      this.$store.state.board.isClickrulo = false;
      wx.getSystemInfo({
        success: (res) => {
          this.$store.state.board.windowWidth = res.windowWidth
        }
      })
      var that = this;
      var scenicSpotId = wx.getStorageSync("scenicSpotId")
      var sessionID = wx.getStorageSync("sessionID")

      wx.request({
        // url: "http://10.29.74.237:8888/wechatapi/travels-template/findTravelsTemplates?scenicSpotId="+scenicSpotId,
        url: "https://www.hejinkai.com/wechatapi/travels-template/findTravelsTemplates?scenicSpotId="+scenicSpotId+"&sessionID="+sessionID,
        method: "GET",
        success: function (res) {
          console.log(res)
          if (res.statusCode == 200) {
            if(res.data.words && res.data.words.length){
              that.$store.state.board.words = res.data.words;
              that.$store.state.board.visitFont=res.data.words[0]
            }
            if(res.data.boards&&res.data.boards.length){
              that.$store.state.board.goLinks = []
              that.$store.state.board.boards = [];
              that.$store.state.board.goLink = res.data.boards[0].key
              that.$store.state.board.goLinks.push(res.data.boards[0].key)
              var flag = false;

              for (var i = 0; i < res.data.boards.length; i++) {
                if (i == 0) {
                  flag = true;
                } else {
                  flag = false
                }
                that.$store.state.board.boards.push({checked: flag, key: res.data.boards[i].key})
              }
            }

          }
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  page{
    width: 100%;
    height: 100%;
  }
  .vist-userInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    /*font-size: 22px;*/
    width: 100%;
    height: 100%;
    font-size: 28px;
    color: rgba(8, 0, 8, 0.69);
    font-family: "Microsoft YaHei UI";
    font-weight: normal;
    .look-scenery {
      width: 100%;
      height: 50%;
      /*line-height: 50%;*/
      /*padding: 25% 0;*/
      /*text-align: center;*/
      display: flex;
      align-items: center;
      justify-content: center;
      background-color:rgba(87, 150, 203, 0.36);
      /*color: #647279;*/
      i {
        font-size: 18px;
      }
    }
    .share-visit {
      width: 100%;
      height: 50%;
      /*line-height: 50%;*/
      /*padding: 25% 0;*/
      /*text-align: center;*/
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
      /*color: #647279;*/
      background-color:rgba(87, 150, 203, 0.36);
      i {
        font-size: 18px;
      }
    }
  }
</style>
