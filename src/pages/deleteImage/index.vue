<template>
  <view class="vist-deleteImage"
        :style="{ width : getWindowWidth + 'px' ,minHeight:getWindowHeight + 'px', height :'100%',overflow:'hidden' }">
    <!--<img v-for="(item,index) in getGoLinks" :key="index" class="bigImg" :src="item" @click="previewImage(item,index)">-->
    <swiper @animationfinish="finish" circular="true"  @change="swiperChange" :current="(current-1)">
      <swiper-item v-for="(item,index) in getGoLinks" :key="index" @click="previewImage(item,index)">
        <image :src="item" class="bigImg" mode="widthFix"/>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        total: 1,
        current: 1
      }
    },
    methods: {
      previewImage(item, index) {
        wx.showActionSheet({
          itemList: ['删除', '返回编辑'],
          itemColor: 'red',
          success: (res) => {
            if (res.tapIndex == 0) {
              if (this.$store.state.board.goLinks.length == 1) {
                wx.showToast({
                  title: '不能全删除了哦',
                  icon: 'none',
                  mask: true,
                  duration: 1500,
                  success: () => {
                    // const url = '../editWord/main'
                    const url = '../insfuncction/main'
                    wx.redirectTo({url})
                  }
                })
              } else {
                this.$store.state.board.boards.forEach((item2, index2) => {
                  if (item2.key === item) {
                    this.$store.state.board.boards.splice(index2, 1)
                  }
                })
                this.$store.state.board.goLinks.splice(index, 1)
                console.log(this.$store.state.board.goLinks)
                var total = this.$store.state.board.goLinks.length;
                if(index==total){
                  this.current = total;
                }
                this.total = total;
                wx.setNavigationBarTitle({
                  title: this.current+ '/'+total
                })
              }
            } else if (res.tapIndex == 1) {
              // const url = '../editWord/main'
              const url = '../insfuncction/main'
              wx.redirectTo({url})
            }
          },
          fail: function (res) {
          }
        })
      },
      finish(event){
        console.log(event.mp.detail.current)
        var current = event.mp.detail.current+1;
        console.log(this.total)
        this.current = current;
        // this.setData({
        //   current: current
        // })
        wx.setNavigationBarTitle({
          title: current+'/'+this.total
        })
      },
      swiperChange: function (e) {
        console.log('bindchange事件', e)
      }
    },
    computed: {
      getGoLinks() {
        return this.$store.state.board.goLinks
      },
      getWindowWidth() {
        return this.$store.state.board.windowWidth
      },
      getWindowHeight() {
        return this.$store.state.board.windowHeight
      }
    },
    mounted() {
      var total = this.$store.state.board.goLinks.length;
      // this.setData({
      //   total: total
      // })
      this.total = total;
      wx.setNavigationBarTitle({
        title: '1/'+total
      })
    }
  }
</script>

<style lang="scss" scoped>
  .vist-deleteImage {
    position: relative;
    /*padding: 10px 10px;*/
    box-sizing: border-box;
    font-size: 14px;
    width: 100%;
    background-color: #000;
    swiper {
      width: 100%;
      min-height: 560px;
      /*align-items:center;*/
      vertical-align:middle;
      swiper-item {
        position: absolute;
        width: 100%;
        height: 100%;
        /*align-items:center;*/
        vertical-align:middle;
        .bigImg {
          width: 100%;
          /*align-items:center;*/
          vertical-align:middle;
          /*margin-top: 120px;*/

        }
      }
    }
  }
</style>
