<template>
<div class="foxgis-layout">
  <div class="mdl-layout mdl-js-layout">
    <header class="mdl-layout__header mdl-layout__header--seamed">
      <div class="header-top">
        <div class="header">
          <div class="base-title">
            <span>在线地图审查系统</span>
          </div>
          <div class="contact-us">
            <a href="javascript:void(0);">关于我们 </a>|
            <a href="javascript:void(0);">意见反馈 </a>|
            <a href="javascript:void(0);">联系我们 </a>|
            <a href="javascript:void(0);" v-on:click="signout">注销</a>
          </div>
        </div>
      </div>
    </header>

    <div class="mdl-layout--content">
      <slot>Layout content</slot>
    </div>

  </div>
</div>
</template>


<script>
import Cookies from 'js-cookie'
export default {
  methods: {
    signout: function(){
      Cookies.remove('username');
      Cookies.remove('access_token');
      Cookies.remove('name');
      Cookies.remove('phone');
      Cookies.remove('email');
      Cookies.remove('location');
      Cookies.remove('organization');
      window.location.href = '/mapCheck';
    }
  },
  ready() {
    /*global componentHandler */
    componentHandler.upgradeElement(this.$el.firstElementChild);
  },
  attached: function() {
    //判断是否登陆
    var username = Cookies.get('username');
    if(username !== undefined){
      this.username = username;
    }
  },
  data: function(){
    return {
      username: undefined
    }
  }
}

</script>


<style scoped>
.mdl-layout__header {
  height: 25px;
  background-color: white;
  min-height: initial;
}

.header-top{
  background-color: #036BDE;
  height: 25px;
  width: 100%;
  background-image: url("../../static/images/header.jpg");
  background-repeat: no-repeat;
  background-position: 65px -10px;
}
.header-top .header{
  width: 1000px;
  height: 100%;
  margin:0 auto;
}
.base-title{
  float: left;
}
.base-title span{
  color: white;
  font-size: 20px;
}
.contact-us{
  color: #b1b1b1;
  float: right;
  margin-right: 10px;
}

.contact-us a{
  color: #b1b1b1;
  text-decoration: none;
  font-size: 14px;
}

.mdl-layout--content {
  height: 100%;
  position:relative;
  min-height: calc(100% - 100px);
  background-color: #e4e4e4;
  display: flex;
  flex-flow: column;
  overflow: auto;
}
</style>
