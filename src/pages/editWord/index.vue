<template>
  <div class="vist-userInfo">
      <view class="section" style="width:100%;">
        <textarea style="width:100%; border-bottom: 1px solid #ddd;padding:0px 5px;" maxlength=0 :value="getVisitFont" @input="textareaChange"/>
      </view>
      <div class="imgChange">
        <ul style="overflow:hidden">
          <li v-for="(item,index) in pics" :key="index">
            <img :src="item">
          </li>
          <li class="imgChange-add" @click="changeImg">
            <!--<img :src="pics.length<10 ? 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527964375804&di=c6f8ed52f6bfa5166c6c71db2958f113&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fbaike%2Fw%3D268%2Fsign%3D792273edf9edab6474724ac6cf36af81%2Fa08b87d6277f9e2fda25102e1d30e924b899f380.jpg':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528221941366&di=01024dc9a34dc6d5744b96f3beb72fff&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F7e3e6709c93d70cff1d171eeffdcd100baa12b2e.jpg'" />-->
            <i :class="pics.length<9 ? 'icon-tianjiajiahaowubiankuang iconfont':'icon-jian iconfont'"></i>
          </li>
        </ul>
      </div>
      <div class="visit-font">
        <i class="icon-dizhi iconfont iconvist"></i><span>{{locationNow}}</span>
      </div>
      <card :text="motto"></card>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      locationNow:''
    }
  },

  components: {
    card
  },

  methods: {
    textareaChange(e) {
      this.$store.state.board.visitFont =  e.target.value
    },
    changeImg(){
      // this.$store.state.board.isClickrule = true;
      // this.$store.state.board.isClickrulr = false;
      // this.$store.state.board.isClickruly = false;
      // this.$store.state.board.isClickrulo = false;
      // const url = '../insfuncction/main'
      // wx.redirectTo({ url })
      if(this.$store.state.board.goLinks.length>=9){
        const url = '../deleteImage/main'
        wx.redirectTo({ url })
      }else{
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success:(res)=> {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            this.$store.state.board.goLinks.push(res.tempFilePaths[0])
            this.$store.state.board.boards.push({key:res.tempFilePaths[0],checked:true})
          }
        })
      }
    },
  },
  computed: {
    pics(){
      return this.$store.state.board.goLinks
    },
    locations(){
      return this.$store.state.board.locations
    },
    getVisitFont(){
      return this.$store.state.board.visitFont
    }
  },
  mounted () {
    wx.setNavigationBarTitle({
      title: "编辑游记"
    })
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log(res)
      }
    })
    // wx.getUserInfo({
    //   success: function(res) {
    //     console.log(res.userInfo)
    //   }
    // })
    this.locationNow = this.$store.state.board.address
    console.log(this.locationNow )
    var pages = getCurrentPages()
    var currentPage = pages[pages.length-1]
    var url = currentPage.route
    if(url==="pages/showPages/main"){
      this.$store.state.board.isabled = false;
    }else{
      this.$store.state.board.isabled = true;
    }
  }
}
</script>

<style lang="scss" scoped>
 .vist-userInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  box-sizing: border-box;
  font-size: 14px;
  width: 100%;
  .imgChange{
    width: 100%;
    ul{
      overflow: hidden;
      padding: 10px 10px;
      li{
        width:70px;
        height:70px;
        box-sizing: border-box;
        margin: 8px 8px;
        float:left;
        img{
          width: 100%;
          height: 100%;
        }
      }
    .imgChange-add {
      border: 1px dashed #ddd;
      text-align:center;
     i {
            line-height: 70px;
            text-aline:center;
            color: #ddd;
            font-size: 20px;
          }
    }
    }
  }
  .visit-font{
    text-align: left;
    display: block;
    width: 100%;
    padding:0 10px;
    box-sizing: border-box;
    font-size: 14px;
    .iconvist {
      color: #ddd;
      margin-left:10px;
    }
    i{
      float: left;
      margin-top: 2px;
    }
    span{
      display: inline-block;
      float: left;
    }
  }
}
</style>
