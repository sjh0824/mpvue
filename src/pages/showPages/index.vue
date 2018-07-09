<template>
  <div class="vist-userInfo">
    <!--<div>-->
    <!--<button bindtap="onShareAppMessage" open-type="share" class="share">转发</button>-->
    <!--</div>-->

    <div style='width:0px;height:0px;overflow:hidden;'>
      <canvas canvas-id="shareCanvas" :style="{ width : getWindowWidth + 'px', height : cavHeight + 'px' ,marginTop: -cavHeight+ 'px'  }">
      </canvas>
    </div>
    <!--<canvas canvas-id="shareCanvas"  :style="{ width : getWindowWidth + 'px', height : cavHeight + 'px' ,marginTop: -cavHeight + 'px'  }" >-->
    <!--<canvas canvas-id="shareCanvas" :style="{ width : getWindowWidth + 'px', height : cavHeight + 'px'  }">-->
    <!--</canvas>-->
    <scroll-view scroll-y style="height: 100%;padding-bottom: 10.3%;">
      <div class="content" :style="{ width : getWindowWidth + 'px' }">
        <div style="" class="logo">
          <img src="/static/images/logo.jpg" alt="">
          <span>途家</span>
        </div>
        <div class="containers" :style="{ width : (getWindowWidth-20) + 'px'}">
          <div class="nickname">
            <img :src="avatarUrl" alt="">
            <span>
            {{nickName}}
          </span>

          </div>
          <div class="showImg" style="position: relative;">
            <img v-for="(item,index) in getGoLink" :key="index" class="bigImg" :src="item" mode="widthFix">
            <!--<div style="position: absolute; top: 20px;font-size: 20px;color: blue;">-->
              <!--<span>这是测试</span>-->
            <!--</div>-->
          </div>

          <div class="contentText">
            <span>{{getVisitFont}}</span>
          </div>
          <div class="location">
            <!--<span>发布于：</span><img src="/static/images/location.jpg" alt=""> <span> {{getAddress}}</span>-->
            <span>发布于：</span><i class="icon-dizhi iconfont iconvist"></i> <span style="color: rgba(8, 0, 8, 0.69);"> {{getAddress}}</span>
          </div>
        </div>
        <div class="QR-code" style="">
          <img src="/static/images/code.jpg" alt="">
          <span>长按识别二维码</span>
          <span>关注公众号获得更多旅游资讯和优惠信息</span>
        </div>
      </div>
    </scroll-view>

    <card :text="motto"></card>
  </div>
</template>

<script>
  import card from '@/components/card'

  export default {
    data() {
      return {
        cavHeight: 1400,
        arrImage: [],
      }
    },

    components: {
      card
    },
    onLoad(){

    },
    onShareAppMessage(res) {
      var that = this;
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      var scenicSpotId = wx.getStorageSync("scenicSpotId")
      var shareingId =  wx.getStorageSync('shareingId')
      var path="/pages/showPages/main";

      if(scenicSpotId&&shareingId){
        path = path + "?scenicSpotId="+scenicSpotId+"&shareId="+shareingId
      }else{

      }
      console.log(333)
      console.log(path)
      return {
        title: '分享足迹',
        path: path,
        success: function (res) {
          var sessionID = wx.getStorageSync('sessionID')
          var shareingId = wx.getStorageSync('shareingId')
          // var sysUrl = 'http://10.29.74.237:8888/wechatapi/share/execuShare?sessionID=' + encodeURIComponent(sessionID)+"&shareId="+shareingId+"&content=dsdsdd";
          var sysUrl = 'https://www.hejinkai.com/wechatapi/share/execuShare?sessionID=' + encodeURIComponent(sessionID) + '&shareId='+encodeURIComponent(shareingId)+"&content=dsdsdd";
          console.log(sysUrl)
          wx.request({
            url: sysUrl,
            success: function (res) {
              // 回到原来的地方放
              // wx.navigateBack();
              console.log(123344)
              console.log(res)

            }
          })
          wx.canvasToTempFilePath({
            canvasId: 'shareCanvas',
            success: (res) => {
              console.log(3333333)

              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: (res) => {
                  wx.showToast({
                    title: '已保存到相册',
                    success: (res) => {

                    }
                  })
                },
                fail: (res) => {
                }
              })


            }
          })

        },
        fail: function (res) {
          // 转发失败
        }
      }

    },
    methods: {
      draw_long_text(longtext, ctx, begin_width, begin_height, maxWidth) {
        var linelenght = 20;
        var text = "";
        var count = 0;
        var begin_width = begin_width;
        var begin_height = begin_height;
        var stringLenght = longtext.length;
        var newtext = longtext.split("");
        ctx.setTextAlign('left')    // 文字居中
        ctx.setFillStyle('#101010')  // 文字颜色：黑色
        ctx.setFontSize(14)
        var maxFont = Math.floor(maxWidth / 14);
        for (let i = 0; i <= stringLenght-1; i++) {
          if (count == maxFont) {
            ctx.fillText(text, begin_width, begin_height, maxWidth);
            begin_height = begin_height + 30;
            text = "";
            count = 0;
          }
          if (i == stringLenght-1) {
            ctx.fillText(text, begin_width, begin_height, maxWidth);
          }
          var text = text + newtext[0];
          count++;
          newtext.shift();
        }
        ctx.draw(true)

        // ctx.setFillStyle('#fff')
        // ctx.fillRect(0, begin_height + 2, this.$store.state.board.windowWidth - 40, 40)
        ctx.setFillStyle('#ccc')
        ctx.setTextAlign('left')
        ctx.setFontSize(12)
        ctx.fillText('发布于:', 20, begin_height + 25);
        ctx.drawImage('/static/images/location.jpg', 68, begin_height+12 )

        ctx.setFillStyle('#544E54')
        ctx.setFontSize(12)
        ctx.fillText(this.getAddress, 83, begin_height + 25);
        // ctx.fillText("北京", 83, begin_height + 25);
        ctx.draw(true)
        ctx.setFillStyle('orange')
        ctx.fillRect(0, begin_height + 40, this.$store.state.board.windowWidth, 170)
        //画二维码
        ctx.save()
        ctx.beginPath()
        ctx.arc(this.$store.state.board.windowWidth / 2, begin_height + 100, 40, 0, Math.PI * 2, false);
        ctx.clip()
        ctx.drawImage('/static/images/code.jpg', this.$store.state.board.windowWidth / 2 - 40, begin_height + 60, 80, 80)
        ctx.restore()
        // ctx.drawImage('/static/images/code.jpg', this.$store.state.board.windowWidth / 2 - 40, begin_height + 60, 80, 80)
        ctx.draw(true)
        //二维码文字
        ctx.setFillStyle('#fff')
        ctx.setFontSize(12)
        ctx.setTextAlign('center')
        ctx.fillText('长按识别二维码', (this.$store.state.board.windowWidth / 2), begin_height + 160);
        ctx.fillText('关注公众号获得更多旅游资讯和优惠信息', (this.$store.state.board.windowWidth / 2), begin_height + 180);
        ctx.draw(true)
        wx.hideLoading()
      },
      saveImage() {
        wx.showLoading({
          title: '绘制中...',
        })
        let that = this;
        const ctx = wx.createCanvasContext('shareCanvas')
        ctx.setFillStyle('#fff')
        ctx.fillRect(0, 0, this.$store.state.board.windowWidth, this.cavHeight);
        ctx.draw()


        let getImageDraw = [];
        var totalHeight = 0;
        var flagIndex = 0;
        var arr = [];
        this.getGoLink.forEach((item, index) => {
          var list = {}
          wx.getImageInfo({
            src: item,
            success: (res) => {
              list.index = index;
              list.width = res.width;
              list.height = res.height;
              list.path = res.path;
              ctx.setFillStyle('orange')
              ctx.fillRect(0, 0, this.$store.state.board.windowWidth, 140)
              ctx.save()
              ctx.beginPath()
              ctx.arc(this.$store.state.board.windowWidth / 2, 50, 35, 0, Math.PI * 2, false);
              ctx.clip()
              ctx.drawImage('/static/images/logo.jpg', this.$store.state.board.windowWidth / 2 - 35, 15, 70, 70)
              ctx.restore()
              ctx.draw(true)
              ctx.setFillStyle('#fff')
              ctx.setFontSize(18)
              ctx.setTextAlign('center')
              ctx.fillText('途家', (this.$store.state.board.windowWidth / 2), 107);
              ctx.draw(true)
              ctx.setFillStyle('#fff')
              ctx.fillRect(10, 130, this.$store.state.board.windowWidth - 20, this.cavHeight - 140);
              ctx.draw(true)
              // if (this.avatarUrl) {
              //   wx.getImageInfo({
              //     src: this.avatarUrl,
              //     success: (res) => {
              //       ctx.save()
              //       ctx.beginPath()
              //       ctx.arc(35, 155, 15, 0, Math.PI * 2, false);
              //       ctx.clip()
              //       ctx.drawImage(res.path, 20, 140, 30, 30)
              //       ctx.restore()
              //       ctx.draw(true)
              //     }
              //   })
              // }
              ctx.save()
              ctx.beginPath()
              ctx.arc(35, 155, 15, 0, Math.PI * 2, false);
              ctx.clip()
              // ctx.drawImage('/static/images/img1.jpg', 20, 140, 30, 30)
              ctx.drawImage(this.avatarUrl, 20, 140, 30, 30)
              ctx.restore()
              ctx.draw(true)
              var name = this.$store.state.board.nickName
              ctx.setFillStyle('#ccc')
              ctx.setTextAlign('left')
              ctx.setFontSize(12)
              ctx.fillText(name, 55, 160);
              ctx.draw(true)
              flagIndex++;
              arr[index] = list
              if (flagIndex == this.getGoLink.length) {
                for (var i = 0; i < arr.length; i++) {
                  var heights = (this.$store.state.board.windowWidth - 40) * arr[i].height / arr[i].width;
                  ctx.drawImage(arr[i].path, 20, totalHeight + 180 + (i * 10), (this.$store.state.board.windowWidth - 40), heights)
                  totalHeight += heights;
                  ctx.draw(true)
                  if (i == this.getGoLink.length - 1) {
                    that.draw_long_text(that.getVisitFont, ctx, 20, totalHeight + 200 + (i * 10), (this.$store.state.board.windowWidth - 40))
                  }
                }
              }
            }
          })
        })
      }
    },
    async onPullDownRefresh() {
      // 停止下拉刷新
      wx.stopPullDownRefresh();
    },

    created() {
// TGQBZ-5BR3P-4Y7DJ-VW22G-3HYGF-JIFVF
    },
    computed: {
      nickName() {
        return this.$store.state.board.nickName
      },
      getGoLink() {
        return this.$store.state.board.goLinks
      },
      getAddress() {
        return this.$store.state.board.address
      },
      getVisitFont() {
        return this.$store.state.board.visitFont
      },
      getWindowWidth() {
        return this.$store.state.board.windowWidth
      },
      getWindowHeight() {
        return this.$store.state.board.windowHeight
      },
      avatarUrl() {
        return this.$store.state.board.avatarUrl;
      }
    },
    mounted() {
      var arrHeight = 0;
      var indexs = 0;
      this.getGoLink.forEach((item, index) => {
        var list = {};
        wx.getImageInfo({
          src: item,
          success: (res) => {
            list.index = index;
            list.width = res.width;
            list.height = res.height;
            list.path = res.path;
            this.arrImage[index] = list
            var heights = (this.$store.state.board.windowWidth - 20) * res.height / res.width;
            arrHeight += heights;
            indexs++;
            if (indexs == this.getGoLink.length) {
              var maxFont = Math.floor((this.$store.state.board.windowWidth - 20) / 14);
              this.cavHeight = arrHeight + (this.getVisitFont.length / maxFont + 3) * 30 + 270 + (this.getGoLink.length - 1) * 10
              this.saveImage()
            }
          }
        })
      });
      var pages = getCurrentPages()
      var currentPage = pages[pages.length - 1]
      var url = currentPage.route
      if (url === "pages/showPages/main") {
        this.$store.state.board.isabled = false;
      } else {
        this.$store.state.board.isabled = true;
      }

      wx.setNavigationBarTitle({
        title: "预览游记"
      })
      wx.showShareMenu({
        withShareTicket: true
      })
      var sessionID = wx.getStorageSync('sessionID')
      // var sessionID = wx.getStorageSync('sessionID')
      var sharedId = wx.getStorageSync('sharedId')
      if(sharedId){
        // var sysUrl = 'https://www.hejinkai.com/wechatapi/service/syncUser?encryptedData=' + encodeURIComponent(keys.encryptedData)+ '&iv=' + encodeURIComponent(keys.iv) + '&sessionID=' + res.data.sessionID;
        // var sysUrl = 'http://10.29.74.237:8888/wechatapi/share/clickShareUrl?sessionID=' + encodeURIComponent(sessionID) + '&shareId=' + encodeURIComponent(sharedId);
        var sysUrl = 'https://www.hejinkai.com/wechatapi/share/clickShareUrl?sessionID=' + encodeURIComponent(sessionID) + '&shareId=' + encodeURIComponent(sharedId);
        console.log(sysUrl)
        wx.request({
          url: sysUrl,
          success: function (res) {
            // 回到原来的地方放
            // wx.navigateBack();
            console.log(111111)
            console.log(res)

          }
        })
      }

      // var sysUrls = 'http://10.29.74.237:8888/wechatapi/share/getShareId?sessionID=' + encodeURIComponent(sessionID);
      var sysUrls = 'https://www.hejinkai.com/wechatapi/share/getShareId?sessionID=' + encodeURIComponent(sessionID);
      wx.request({
        url: sysUrls,
        success: function (res) {
          // 回到原来的地方放
          // wx.navigateBack();
          console.log(res)
          if (res.data.success) {
            console.log(res)
            wx.setStorageSync('shareingId', res.data.shareId)
          }

        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  .vist-userInfo {
    font-size: 22px;
    width: 100%;
    height: 100%;
    canvas {
      /*margin-bottom: 100px;*/
    }
    .share {
      font-size: 13px;
      color: #8488b3;
      position: fixed;
      top: 10px;
      right: 10px;

    }
    .content {
      /*padding-bottom: 10.3%;*/
      /*margin-bottom: 39px;*/
      .logo {
        width: 100%;
        height: 140px;
        background: orange;
        text-align: center;
        img {
          width: 75px;
          height: 75px;
          margin-top: 15px;
          border-radius: 50%;
        }
        span {
          display: block;
          /*margin-top: 9px;*/
          font-size: 18px;
          color: #fff;
        }
      }
    }
    .containers {
      margin: 0 auto;
      font-size: 16px;
      margin-top: -10px;
      background: #fff;
      border-radius: 5px;
      .nickname {
        float: left;
        margin-top: 10px;
        margin-bottom: 15px;
        img {
          /*float: left;*/
          width: 30px;
          height: 30px;
          border-radius: 50%;
          vertical-align: middle;
          margin-left: 10px;
        }
        span {
          display: inline-block;
          margin-left: 5px;
          vertical-align: middle;
          color: #ccc;
          font-size: 12px;
        }
      }
      .showImg {
        padding: 0 10px;
        img {
          width: 100%;
          margin-bottom: 10px;
        }
      }
      .contentText {
        line-height: 30px;
        font-size: 14px;
        padding: 0 10px;
        /*letter-spacing: 2px;*/
      }
      .location {
        color: #ccc;
        margin-top: 5px;
        margin-bottom: 7px;
        font-size: 12px;
        line-height: 17px;
        padding-left: 10px;
        img {
          width: 20px;
          height: 20px;
          vertical-align: middle;
          margin-left: 2px;
          margin-right: 2px;
        }
        .iconvist {
          color: #ddd;
          margin-left: 2px;
          margin-right: 5px;
        }
        i {
          display: inline-block;
          vertical-align: middle;
        }
        span {
          display: inline-block;
          vertical-align: middle;
        }
      }

    }
    .QR-code {
      width: 100%;
      height: 180px;
      background: orange;
      font-size: 12px;
      text-align: center;
      img {
        width: 80px;
        height: 80px;
        margin-top: 20px;
        border-radius: 50%;
      }
      span {
        display: block;
        margin-top: 10px;
        color: #fff;
      }
    }
  }
</style>
