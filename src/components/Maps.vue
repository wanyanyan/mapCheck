<template>
<div class="data">
  <mdl-snackbar display-on="mailSent"></mdl-snackbar>
  <foxgis-layout>
    <div class="content">
      <h5><i class="material-icons">map</i><span>在线审图</span></h5>

      <div class="map-content">
        <div class="search">
          <foxgis-search :placeholder="'输入搜索关键字'" :value="searchKeyWords" :search-key-words.sync="searchKeyWords"></foxgis-search>
        </div>
        <foxgis-data-cards-map :dataset="displayDataset" ></foxgis-data-cards-map>
      </div>
    </div>
  </foxgis-layout>

</div>
</template>


<script>
import _ from 'lodash'
import Cookies from 'js-cookie'
import util from '../components/util.js'
export default {
  methods: {
    
  },
  computed:{
    displayDataset:function(){
      var temp = this.dataset;
      var t=[];
      if(this.searchKeyWords.trim().length===0){
        return temp;
      }else{        
        var keyWords = this.searchKeyWords.trim().split(' ');
        keyWords = _.uniq(keyWords);
        for(let u=0;u<temp.length;u++){
          var tileset = temp[u];
          var num = 0;
          for(let w=0;w<keyWords.length;w++){
            var keyWord = keyWords[w];
            if(keyWord.indexOf(' ')==-1){
              if(tileset.name&&tileset.name.indexOf(keyWord)!=-1){
                  num++;
              }
            }else{
              num++;
            }
          }
          if(num == keyWords.length){
            t.push(tileset);
          }
        }
        return t;
      }
    }
  },
  attached() {
    var username = Cookies.get('username');
    if(username === undefined){
      return;
    }
    var access_token = Cookies.get('access_token');
    var url = SERVER_API.styles+'/' + username;

    this.$http({url:url,method:'GET',headers:{'x-access-token':access_token}})
    .then(function(response){
      if(response.data.length>0){
        this.dataset = response.data.map(function(d){
          d.updatedAt = util.dateFormat(new Date(d.updatedAt));
          d.createdAt = util.dateFormat(new Date(d.createdAt));
          return d;
        })
      }
    },function(response){
      this.$broadcast('mailSent', { message: '地图列表获取失败！',timeout:3000 });
    })

  },
  data() {
    return {
      dataset: [],
      searchKeyWords: ''
    }
  }
}

</script>


<style scoped>
.content{
  width: 1000px;
  margin: 20px auto 0 auto;
}

h5 {
  background-color: white;
  margin: 0;
  font-family: inherit;
  font-size: 16px;
  padding: 10px;
  color: #2f80bc;
}

h5 .material-icons {
  font-size: 20px;
  margin-right: 5px;
  vertical-align: middle;
  color: #2f80bc;
}

span {
  vertical-align: middle;
}

.map-content {
  margin-top: 10px;
  width: 100%;
}

.search {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e4e4e4;
  background-color: white;
}

.search-button {
  position: relative;
  cursor: pointer;
  text-align: center;
  overflow: hidden;
  width: 100px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  vertical-align: middle;
  left: 50px;
}

.search-button:hover {
  background-color:#dedede;
  border-radius: 4px;
}

.search-button .material-icons {
  font-size: 20px;
  margin-right: 5px;
  vertical-align: middle;
  color: #2f80bc;
}

.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.foxgis-search + .mdl-button {
  height: 30px;
}

.foxgis-search {
  width: 400px;
}
</style>
