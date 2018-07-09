<template>
  <view class="visite-bottom-style">
    <div class="visite-bottom-style-card">
     <div class="icon-21 iconfont iconWidth" :class="isClickrule ? 'blueColor':''" @click="phoneto"></div>
     <div class="icon-T iconfont iconWidth iconWidthft" :class="isClickrulr ? 'blueColor':''" @click="edite"></div>
     <div class="icon-bianji iconfont iconWidth" :class="isClickruly ? 'blueColor':''" @click="place"></div>
     <div class="icon-chakan iconfont lastIcon " :class="isClickrulo ? 'blueColor':''" @click="lookSee"></div>
     <button open-type="share" :disabled="isabled" :class="isabled ? 'grayButton':'blueButton'">分享</button>
    </div>
  </view>
</template>

<script>
export default {
  props: ['text']
}
</script>

<style lang="scss">
  .visite-bottom-style {
    position: fixed;
    height: 6.5%;
    z-index: 10000;
    width:100%;
    bottom: 0;
    left: 0px;
    .visite-bottom-style-card {
      background-color: #000;
      color: #fff;
      width: 100%;
      height: 50px;
      line-height: 50px;
      .iconfont{
        line-height: 41px;
        display: block;
        font-size: 20px;
        box-sizing: border-box;
        float:left;
      }
      .iconWidth {
        width: 20%;
        height: 100%;
        text-align: center;
      }
      .iconWidthft {
        font-size: 18px;
      }
      .lastIcon{
        width: 20%;
        height: 100%;
        text-align: center;
      }
      .blueColor {
        color: #0099ff;
      }
      button {
        color: #fff;
        font-size: 14px;
        width: 20%;
        height:100%;
        line-height: 41px;
        display:block;
        float:right;
        border-radius: 0;
      }
      .blueButton{
        background-color: #0099ff;
      }
      .grayButton{
        background-color: #ccc;
      }
    }
  }


</style>
<script>
  export default {
    name: '',
    props: [],
    data() {
      return {
      }
    },
    computed: {
      isClickrule(){
        return this.$store.state.board.isClickrule
      },
      isClickrulr(){
        return this.$store.state.board.isClickrulr
      },
      isClickruly(){
        return this.$store.state.board.isClickruly
      },
      isClickrulo(){
        return this.$store.state.board.isClickrulo
      },
      isabled(){
        return this.$store.state.board.isabled
      }
    },
    methods: {
      shareVist(){

      },
      phoneto(){
        this.$store.state.board.isClickrule = true;
        this.$store.state.board.isClickrulr = false;
        this.$store.state.board.isClickruly = false;
        this.$store.state.board.isClickrulo = false;
        var pages = getCurrentPages()
        var currentPage = pages[pages.length-1]
        var urls = currentPage.route
        console.log(urls)
        if(urls != "pages/insfuncction/main"){
          const url = '../insfuncction/main'
          wx.redirectTo({ url })
        }

      },
      edite() {
        this.$store.state.board.isClickrulr = true;
        this.$store.state.board.isClickrule = false;
        this.$store.state.board.isClickruly = false;
        this.$store.state.board.isClickrulo = false;
        // const url = '../changeWord/main'
        // const url = '../insfuncction/main'
        // wx.redirectTo({ url })
        var pages = getCurrentPages()
        var currentPage = pages[pages.length-1]
        var urls = currentPage.route
        wx.setNavigationBarTitle({
          title: "选择游记模板"
        })
        if(urls != "pages/insfuncction/main"){
          const url = '../insfuncction/main'
          wx.redirectTo({ url })
        }
      },
      place() {
        this.$store.state.board.isClickrulr = false;
        this.$store.state.board.isClickrule = false;
        this.$store.state.board.isClickruly = true;
        this.$store.state.board.isClickrulo = false;
        const url = '../editWord/main'
        wx.redirectTo({ url })
      },
      lookSee() {
        this.$store.state.board.isClickrulr = false;
        this.$store.state.board.isClickrule = false;
        this.$store.state.board.isClickruly = false;
        this.$store.state.board.isClickrulo = true;
        const url = '../showPages/main'
        wx.redirectTo({ url })
      }
    },
    created() {
    },
    mounted() {
console.log(this.$store.state.board.isClickrulr)
console.log(this.$store.state.board.isClickrule)
console.log(this.$store.state.board.isClickruly)
console.log(this.$store.state.board.isClickrulo)

    },
    components: {

    }
  }
</script>
