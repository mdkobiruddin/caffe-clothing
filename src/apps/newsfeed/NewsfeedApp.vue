<template>
  <div class="d-flex flex-grow-1 flex-row mt-2 ml-4">
    <v-navigation-drawer
      v-model="drawer"
      :app="$vuetify.breakpoint.mdAndDown"
      :permanent="$vuetify.breakpoint.lgAndUp"
      floating
      class="elevation-1 rounded flex-shrink-0"
      :right="$vuetify.rtl"
      :class="[$vuetify.rtl ? 'ml-3' : 'mr-3']"
      width="340"
    >
      <newsfeed-menu class="newsfeed-app-menu pa-2" @open-compose="openCompose"></newsfeed-menu>
    </v-navigation-drawer>

    <div class="d-flex flex-grow-1 flex-column">
      <v-toolbar class="hidden-lg-and-up flex-grow-0 mb-2">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <div class="title font-weight-bold">Newsfeed App</div>
      </v-toolbar>
      <router-view :key="$route.fullPath" class="flex-grow-1" @edit-newsfeed="openCompose"></router-view>
    </div>

    <newsfeed-compose ref="compose" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import NewsfeedMenu from './components/NewsfeedMenu'
import NewsfeedCompose from './components/NewsfeedCompose'

/*
|---------------------------------------------------------------------
| NEWSFEED Application Component
|---------------------------------------------------------------------
|
| Application layout
|
*/
import { mapState, mapMutations } from 'vuex'
import { db } from '../../main'
import moment from 'moment'

export default {
  components: {
    NewsfeedMenu,
    NewsfeedCompose
  },
  data() {
    return {
      drawer: null,
      newsfeed:[],
      allCategories:['i','b','g','w','m'],
      index:0,
      tempHolder:[]
    }
  },
   created() {
    var tempHolder=[]
    this.clearNewsfeed()
    this.fetch()
  },
  methods: {
    ...mapMutations('newsfeed-app', ['updateNewsfeed', 'addNewsfeed', 'clearNewsfeed', 'deleteNewsfeed']),
    openCompose(newsfeed) {
      this.$refs.compose.open(newsfeed)
    },
    newsfeedAdding() {
      this.addNewsfeed(newsfeed)
    },
  async fetch(){

    let allTheItems = [
      db.collection('i'),
      db.collection('b'),
      db.collection('g'),
      db.collection('w'),
      db.collection('m'),
      ]

  for (var a=0; a<allTheItems.length; a++){

   allTheItems[a].onSnapshot((snapshot) => {

  snapshot.docChanges().forEach((change) => {

        let doc = change.doc

        //console.log (doc.data())


        if (change.type=='removed'){

          const dTask = {
            id: doc.id,
            codePrefix: doc.data()['codePrefix']
          }

          this.deleteNewsfeed(dTask)

          }else if (change.type=='modified') {

                const aTask = {
                  id: doc.id,
                  title: doc.data()['title'],
                  age: doc.data()['age'],
                  size: doc.data()['size'],
                  code: doc.data()['code'],
                  fullCode: doc.data()['codePrefix']+doc.data()['code'],
                  category: doc.data()['category'],
                  codePrefix: doc.data()['codePrefix'],
                  colour: doc.data()['colour'],
                  completed: doc.data()['completed'],
                  material: doc.data()['material'],
                  price: doc.data()['price'],
                  label: [doc.data()['label']],
                  images: doc.data()['images'],
                  user: doc.data()['user'],
                  qty: doc.data()['qty'],
                  sortDate: doc.data()['sortDate'],
                }

                this.updateNewsfeed(aTask)

          }else{

                const aTask = {
                  id: doc.id,
                  title: doc.data()['title'],
                  age: doc.data()['age'],
                  size: doc.data()['size'],
                  code: doc.data()['code'],
                  fullCode: doc.data()['codePrefix']+doc.data()['code'],
                  category: doc.data()['category'],
                  codePrefix: doc.data()['codePrefix'],
                  colour: doc.data()['colour'],
                  completed: doc.data()['completed'],
                  material: doc.data()['material'],
                  price: doc.data()['price'],
                  label: [doc.data()['label']],
                  images: doc.data()['images'],
                  user: doc.data()['user'],
                  qty: doc.data()['qty'],
                  sortDate: doc.data()['sortDate'],
                }

                this.addNewsfeed(aTask)

          }

                //this.tempHolder.push(aTask)

      })
        //console.log(tempHolder)

    })
  }
  },
  allDone(){

    this.tempHolder.sort((a, b) => (a.sortDate < b.sortDate) ? 1 : -1)
    for (var i=0; i<this.tempHolder.length; i++){
      this.addNewsfeed(this.tempHolder[i])
    }
  }

  }
}
</script>
