<template>
    <div class="public-num">
      <p class="public-gonglue">旅游攻略大全</p>
      <div class="public-vist-resouce">
        <div class="public-image"></div>
        <div class="public-total-introuce">
          <p>旅游攻略大全</p>
          <p class="public-weixin">微信号：lingzihua</p>
        </div>
      </div>
      <div class="public-information">
        账号信息
      </div>
      <button @click="jumpFirst">关注</button>
    </div>
</template>

<style lang="scss">
  .public-num{
    display: flex;
    flex-direction: column;
    /*padding: 20px 50px;*/
    font-size: 14px;
    .public-gonglue{
        height: 50px;
      line-height: 50px;
      background-color: #000;
      color:#fff;
      text-align:center;

    }
    .public-vist-resouce {
      height: 110px;
      line-height: 110px;
      border-bottom: 1px solid #ccc;
      clear: both;
      .public-image {
        width: 80px;
        height: 80px;
        background-color: #ddd;
        border-radius: 40px;
        float: left;
        margin: 10px 0;
      }
      .public-total-introuce {
        float: left;
       margin-top:20px;
        margin-left:20px;
        p{
          height: 20px;
          line-height: 20px;
        }
        .public-weixin{
          color: #ccc;
          font-size: 12px;
        }
      }
    }
  .public-information{
    height: 100px;
    line-height: 100px;
    border-bottom: 1px solid #ccc;
    text-align: center;
  }
  button {
    height: 50px;
    line-height: 50px;
    background-color: #2aff42;
    color: #fff;
    text-align: center;
    margin-top: 35%;
    width: 200px;
  }
  }
</style>

<script>
    export default {
        name: '',
        props: [],
        data() {
            return {}
        },
        computed: {},
        methods: {
          jumpFirst(){
            const url='../index/main';
            wx.redirectTo({url})
          }
        },
        created() {
        },
        mounted() {
        },
        components: {}
    }
</script>
