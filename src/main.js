require('material-design-lite/material.min.js')
require('material-design-lite/material.min.css')
require('material-design-icons/iconfont/material-icons.css')


import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import VueMdl from 'vue-mdl'
import App from './components/App'
import MapCard from './components/DataCards-Map'
import Layout from './components/Layout'
/*import Dialog from './components/Dialog'*/
import Login from './components/Login'
import Maps from './components/Maps'
import Search from './components/Search'
import Pagination from './components/Pagination'
import MapCheck from './components/MapCheck'
import MapCheckView from './components/MapCheckView'

Vue.config.debug = true
Vue.use(Router)
Vue.use(VueMdl)
Vue.use(Resource)

Vue.component('foxgis-layout', Layout)
Vue.component('foxgis-data-cards-map',MapCard)
Vue.component('foxgis-search', Search)
Vue.component('foxgis-pagination', Pagination)
Vue.component('foxgis-map-view', MapCheckView)

let router = new Router({
  history: false
})

router.map({
  '/': {
    component: function (resolve) {
      require(['./components/Login.vue'], resolve)
    }
  },
  '/login': {
    component: function (resolve) {
      require(['./components/Login.vue'], resolve)
    }
  },
  '/maps': {
    component: function (resolve) {
      require(['./components/Maps.vue'], resolve)
    }
  },
  '/mapcheck/*any': {
    component: function (resolve) {
      require(['./components/MapCheck.vue'], resolve)
    }
  },
})


router.start(App, '#app')
