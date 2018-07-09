<template>
  <div class="vist-function">
    <div class="number" v-show="isClickrule">{{getGoLinks.length}}</div>
    <!-- <img v-for="(item,index) in getGoLinks" :key="index" class="bigImg" :src="item" @click="previewImage(item,index)"> -->
    <img class="bigImg" :src="getGoLink" @click="previewImage" v-if="isClickrule">
    <img class="bigImg" :src="getGoLink" v-else>
    <div class="imgChange" v-if="isClickrule">
      <scroll-view scroll-y style="height:100%" scroll-with-animation="true">
        <checkbox-group class="checkboxUl" @change="serviceValChange">
          <div>
            <label class="checkboxLi" @click="changeImg('',0)" style="background: #3F3F3F">
              <!--<img :src="item.key" :class="{is_checked:item.checked == true}">-->
              <i class="iconfont icon-wenjianjia firstIcon"></i>
            </label>
          </div>

          <!--<label class="checkboxLi" v-for="(item,index) in pics" :key="index" @click="changeImg(item,index)">-->
          <div v-for="(item,index) in pics" :key="index">
            <label class="checkboxLi">
              <checkbox :value="item.key" :checked="item.checked" hidden="false"/>
              <img :src="item.key" :class="{is_checked:item.checked == true}">
            </label>
          </div>

        </checkbox-group>
      </scroll-view>

    </div>
    <div class="wordChange" v-else>
      <scroll-view scroll-y style="height:100%" scroll-with-animation="true">
        <ul style="overflow:hidden">
          <li v-for="(item,index) in words" :key="index" @click="changeWord(item,index)">
            <!--<i :class="['not_icon',{style:index == selectedWords}]"></i>-->

            <i :class="['iconfont icon-xuanze1',{style:index == selectedWords}]"
               style="  display: flex;align-items: center;justify-content: center;"></i>

            <span class="visit-reduce">{{item}}</span>


          </li>
        </ul>
      </scroll-view>
    </div>
    <card :text="motto"></card>
  </div>
</template>


<style lang="scss">
  @import "../../iconfont/iconfont.css";

  page {
    height: 100%;
  }

  .vist-function {
    /*padding: 10px 0 10px 0;*/
    font-size: 14px;
    position: relative;
    width: 100%;
    height: 100%;
    /*padding-bottom: 35px;*/
    z-index: 20;
    .number {
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      line-height: 20px;
      text-align: center;
      color: #fff;
      background-color: #2cb7ff;
      font-weight: 900;
      right: 20px;
      top: 20px;
      z-index: 20;
    }
    .bigImg {
      /*padding: 10px 20px;*/
      /*padding: 10px 0;*/
      display: block;
      vertical-align: middle;
      margin: 0 auto;
      position: relative;
      width: 375px;
      height: 62.5%;
    }

    .imgChange {
      width: 100%;
      height: 31.8%;
      background: #262626;
      /*opacity:0.8;*/
      .checkboxUl {
        padding: 0 10px;
        padding-top: 13px;
        div {
          float: left;
          width: 25%;
          margin-bottom: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          .checkboxLi {
            /*width:70px;*/
            height: 75px;
            width: 75px;
            /*height: ;*/
            box-sizing: border-box;
            /*margin: 5px 5px;*/
            float: left;
            position: relative;
            margin: 0 auto;
            .firstIcon {
              line-height: 75px;
              font-size: 26px;
              color: #fff;
              text-align: center;
            }
            img {
              width: 100%;
              height: 100%;
              /*opacity: 0.6;*/
            }

            .is_checked {
              box-shadow: 0px 0px 1px 1px #2c9bff;
              /*border: 1px solid #2c9bff;*/
              opacity: 1;
            }
          }
        }
        /*overflow: hidden;*/
        /*padding: 5px 0 9px 5px;*/

      }
    }
    .wordChange {
      width: 100%;
      height: 31.8%;
      background: #262626;
      color: #fff;
      ul {
        overflow: hidden;
        padding: 10px 20px;
        li {
          margin-bottom: 8px;

          i {
            width: 18px;
            height: 18px;
            font-size: 23px;
            padding: 0;
            margin: 0;
            border-radius: 50%;
            background: #fff;
          }
          .visit-reduce {
            display: inline-block;
            margin-left: 29px;
            margin-top: -20px;
            line-height: 17px;
            font-size: 12px;
          }
          .not_icon {
            background: url('../../../static/images/icon4.png') no-repeat center center;
            background-size: 100% 100%;
          }
          .style {
            /*background: url('../../../static/images/icon3.png') no-repeat center center;*/
            /*background-size: 100% 100%;*/
            color: #0099ff;
            background: #fff;
          }

        }
      }
    }
  }
</style>

<script>
  import card from '@/components/card'

  export default {
    name: '',
    props: [],
    data() {
      return {
        state: 0,
        motto: '引入的组件',
        locationNow: '北京',
        selectedWords: 0,
        selectedLocations: 0,
        selectedPics: 1,
        canvas: null,
        canvasDraw: null,
        canvasShow: false
      }
    },
    computed: {
      words() {
        return this.$store.state.board.words
      },
      pics() {
        return this.$store.state.board.boards
      },
      isClickrule() {
        return this.$store.state.board.isClickrule
      },
      isClickrulr() {
        return this.$store.state.board.isClickrulr
      },
      isClickruly() {
        return this.$store.state.board.isClickruly
      },
      isClickrulo() {
        return this.$store.state.board.isClickrulo
      },
      getGoLinks() {
        return this.$store.state.board.goLinks
      },
      getGoLink() {
        return this.$store.state.board.goLink
      },
      getVisitFont() {
        return this.$store.state.board.visitFont
      }
    },
    methods: {
      serviceValChange(e) {
        let checkArr = e.target.value;
        if (e.target.value.length < 1) {
          wx.showToast({
            title: '最少选择一张',
            icon: 'none',
            mask: true,
            duration: 1500
          })
          return
        }
        else if (e.target.value.length > 9) {
          wx.showToast({
            title: '最多预览9张',
            icon: 'none',
            mask: true,
            duration: 1500
          })
          this.$store.state.board.goLinks.pop();
          this.$store.state.board.boards.pop();
          return
        }
        else {
          if (checkArr.join(',').indexOf('base64') != -1) {
            return
          }
          this.$store.state.board.boards.forEach(item => {
            if (checkArr.join(',').indexOf(item.key) != -1) {
              item.checked = true;
            } else {
              item.checked = false;
            }
          });
          this.$store.state.board.goLink = checkArr[0]
          this.$store.state.board.goLinks = checkArr
        }
      },
      changeImg(item, index) {
        if (index == 0) {
          wx.chooseImage({
            count: 9, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: (res) => {
              console.log(res)
              for (var i = 0; i < res.tempFilePaths.length; i++) {
                this.$store.state.board.goLinks.push(res.tempFilePaths[i])
                this.$store.state.board.boards.push({key: res.tempFilePaths[i], checked: true})
              }
              while (this.$store.state.board.boards.length > 9) {
                var e = {
                  target: {
                    value: this.$store.state.board.boards
                  }
                };
                this.serviceValChange(e)
              }
            }
          })
        }
      },
      changeWord(item, index) {
        this.$store.state.board.visitFont = item
        this.selectedWords = index
      },
      // changeLocation(item,index){
      //   this.locationNow = item
      //   this.selectedLocations = index
      // },
      previewImage() {
        const url = '../deleteImage/main'
        wx.navigateTo({url})
      }
    },
    created() {
    },
    mounted() {
      wx.setNavigationBarTitle({
        title: "选择图片"
      })

      this.$store.state.board.goLink = this.$store.state.board.goLinks[0]

      var pages = getCurrentPages()
      var currentPage = pages[pages.length - 1]
      var url = currentPage.route
      if (url === "pages/showPages/main") {
        this.$store.state.board.isabled = false;
      } else {
        this.$store.state.board.isabled = true;
      }
    },
    components: {
      card
    }
  }
</script>
