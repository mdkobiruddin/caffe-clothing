import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import user from './app/modules/user'
import queryuser from './app/modules/queryuser'

// Global vuex
import AppModule from './app'
import VueClipboard from 'vue-clipboard2'

import TodoModule from '../apps/todo/store'
import FeedbackModule from '../apps/feedback/store'
import ReportsModule from '../apps/reports/store'
import NewsfeedModule from '../apps/newsfeed/store'
import ClothesreadModule from '../apps/clothesread/store'

const vuexLocal = new VuexPersist({
  storage: window.localStorage
  //supportCircular: true,
})

Vue.use(Vuex)
Vue.use(VueClipboard)

/**
 * Main Vuex Store
 */
const store = new Vuex.Store({
  modules: {
    app: AppModule,
    'todo-app': TodoModule,
    'feedback-app': FeedbackModule,
    'reports-app': ReportsModule,
    'newsfeed-app': NewsfeedModule,
    'clothesread-app': ClothesreadModule,
    user,
    queryuser
  },
  plugins:[vuexLocal.plugin]
})

export default store
