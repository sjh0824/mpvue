<template>
    <div class="vist-function">
      <img :src="getGoLink" class="bigImg">
      <div class="wordChange" v-show="isClickrulr">
        <scroll-view scroll-y style="height:100%" scroll-with-animation="true">
          <ul style="overflow:hidden">
            <li v-for="(item,index) in words" :key="index" @click="changeWord(item,index)">
              <i :class="['not_icon',{style:index == selectedWords}]"></i>
              <!--<i :class="['icon-xuanzhong1',{icon-xuanzhong:index == selectedWords}]"></i>-->
              <span class="visit-reduce">{{item}}</span>
            </li>
          </ul>
        </scroll-view>
      </div>
      <card :text="motto"></card>
    </div>
</template>

<style lang="scss">
  page{
    height: 100%;
  }
  .vist-function {
    /*padding: 0 0 60px 0;*/
    font-size: 14px;
    position:relative;
    width:100%;
    height:100%;
    z-index: 20;
    .bigImg{
      /*padding: 10px 20px;*/
      /*padding: 10px 0;*/
      display: block;
      vertical-align: middle;
      margin: 0 auto;
      position: relative;
      width: 375px;
      height: 62.5%;
    }
    .wordChange{
      width: 100%;
      height: 31.8%;
      ul{
        overflow: hidden;
        padding: 10px 20px;
        li{
          margin-top:5px;
          i {

            width: 20px;
            height: 20px;

          }
          .visit-reduce {
            display:inline-block;
            margin-left:25px;
            margin-top:-20px;

          }
          .not_icon {
            background: url('../../../static/images/icon1.png') no-repeat center center;
            background-size: 100% 100%;
          }
          .style {
            background: url('../../../static/images/icon2.png') no-repeat center center;
            background-size: 100% 100%;
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
              state:0,
              motto:'引入的组件',
              locationNow:'北京',
              selectedWords:0,
              selectedLocations:0,
              selectedPics:1,
              canvas:null,
              canvasDraw:null,
              canvasShow:false
            }
        },
        computed: {
          words(){
            return this.$store.state.board.words
          },
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
          getGoLink(){
            return this.$store.state.board.goLink
          },
        },
        methods: {
          changeWord(item,index){
            this.$store.state.board.visitFont = item
            this.selectedWords = index
          },
        },
        created() {
        },
        mounted() {
          wx.setNavigationBarTitle({
            title: "选择游记模板"
          })
          this.$store.state.board.goLink = this.$store.state.board.goLinks[0]
          var pages = getCurrentPages()
          var currentPage = pages[pages.length-1]
          var url = currentPage.route
          if(url==="pages/showPages/main"){
            this.$store.state.board.isabled = false;
          }else{
            this.$store.state.board.isabled = true;
          }
        },
        components: {
          card
        }
    }
</script>
