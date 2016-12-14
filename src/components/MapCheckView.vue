<template>
  <mdl-snackbar display-on="mailSent"></mdl-snackbar>
  <div id='map-editorview-container'></div>

  <!-- <foxgis-dialog-prompt id="save-dialog" class='modal' :dialog="dialogcontent" v-on:dialog-action="saveAction"></foxgis-dialog-prompt>
  
  <foxgis-dialog-prompt id="delete-dialog" class='modal' :dialog="deletecontent" @dialog-action="deleteAction"></foxgis-dialog-prompt> -->
</template>

<script>
import Cookies from 'js-cookie'
export default {
  methods: {
    mapInit: function(style){//地图初始化
      mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpbG10dnA3NzY3OTZ0dmtwejN2ZnUycjYifQ.1W5oTOnWXQ9R1w8u3Oo1yA';
      var map = new mapboxgl.Map({
        container: 'map-editorview-container',
        style: style,
        attributionControl: false
      });
      map.addControl(new mapboxgl.Navigation());
      this.map = map;
    }
  },
  events: {
    "map-init":function(style){
      this.mapInit(style);
    }
  },
  data: function(){
    return {
      map: {},//地图对象
      dialogcontent: {//保存对话框的内容
        title: '存在未保存的改动，是否保存？',
        textOk:'保存',
        textCancel:'不保存'
      },
      deletecontent: {//删除样式对话框的内容
        title: '确定删除该要素吗？',
        textOk:'确定',
        textCancel:'取消'
      }
    }
  }
}
</script>

<style scoped>
#map-editorview-container {
  flex:1;
  flex-grow:1;
  position: absolute;
  height: calc(100% - 25px);
  top: 25px;
  width: 100%;
  box-sizing: border-box;
}
</style>
