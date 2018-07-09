<template>
    <div class="instructor-toueist">
      <div class="instructor-text-pic" v-for="(item,index) in intrctList" :key="item">
        <img :src="item.imgUrl">
        <p class="intrstor-text">{{item.text}}</p>
      </div>
      <button @click="touristLink">分享足迹</button>
    </div>
</template>

<style lang="scss">
  .instructor-toueist {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 20px;
    width: 100%;
    box-sizing: border-box;
    font-size: 14px;
    .instructor-text-pic {
    img {
      margin: 0 auto;
      vertical-align: middle;
      padding: 5px 0;
      width: 335px;
      /*height:335px;*/
    }
      .intrstor-text {
        font-size: 14px;
        padding: 10px 0;
      }
    }
  button {
    width: 100px;
    background-color: #0099ff;
    color: #fff;
    font-size: 14px;
    margin-top:5px;
  }
  }
</style>

<script>
    export default {
        name: '',
        props: [],
        data() {
            return {
              intrctList:[
                {text:'佛香阁是北京市颐和园的主体建筑，建筑在万寿山前山高20米的方形台基上，面对昆明湖，' +
                '背靠智慧海，以它为中心的各建筑群严整而对称地向两翼展开，形成重心捧月之势，气派相当宏伟。佛香阁高41米，' +
                '8面3层4重瞻，阁内有8根巨大铁梨木擎天柱，结构相当复杂，为古典建筑精品。',
                id:'1',
                imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528648397176&di=ab7020301ebdb94d00fef168bbfb0d8c&imgtype=0&src=http%3A%2F%2Fimg.liketrip.cn%2Fjqphoto%2F2008-06-02%2F200806020856405.jpg'},
                {
                text:'在清朝乾隆时期（1736-1795）在此建九层延寿塔，至第八层“奉旨停修”，改建佛香阁。1860年（咸丰十年）毁于' +
                '英法联军，光绪时（1875-1908）在原址依样重建，供奉佛像。1860年(咸丰十年)毁于八国联军，光绪时（1870-1908）在原址' +
                '依样重建，供奉佛像。',
                id:'2',
                imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528648397177&di=c200ee3317a885cc0c22bdc646190468&imgtype=0&src=http%3A%2F%2Fpic10.nipic.com%2F20101024%2F3510519_133641009589_2.jpg'
                }
              ]
            }
        },
        computed: {


        },
        methods: {
          touristLink(){
            this.$store.state.board.isClickrule = true;
            this.$store.state.board.isClickrulr = false;
            this.$store.state.board.isClickruly = false;
            this.$store.state.board.isClickrulo = false;
            const url = '../insfuncction/main'
            wx.redirectTo({ url })
          }

        },
        created() {
        },
        mounted() {
          var that = this;
          var scenicSpotId = wx.getStorageSync("scenicSpotId")
          wx.request({
            url:"https://hejinkai.com/tourism/scenery/findSceneryListJson?scenicSpotId="+scenicSpotId,
            method:"POST",
            success: function (res) {
              if(res.data.success){
                if(res.data.intrctList.length){
                  that.intrctList = res.data.intrctList
                }
              }
            }
          })
          this.$store.state.board.isClickrule = true;
          this.$store.state.board.isClickrulr = false;
          this.$store.state.board.isClickruly = false;
          this.$store.state.board.isClickrulo = false;

        },
        components: {}
    }
</script>
