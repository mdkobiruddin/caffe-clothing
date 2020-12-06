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
      <clothesread-menu class="clothesread-app-menu pa-2" @open-compose="openCompose"></clothesread-menu>
    </v-navigation-drawer>

    <div class="d-flex flex-grow-1 flex-column">
      <v-toolbar class="hidden-lg-and-up flex-grow-0 mb-2">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <div class="title font-weight-bold">Clothes App</div>
      </v-toolbar>
      <router-view :key="$route.fullPath" class="flex-grow-1" @edit-clothesread="openCompose"></router-view>
    </div>

    <clothesread-compose ref="compose" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ClothesreadMenu from './components/ClothesreadMenu'
import ClothesreadCompose from './components/ClothesreadCompose'

/*
|---------------------------------------------------------------------
| clothesread Application Component
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
    ClothesreadMenu,
    ClothesreadCompose
  },
  data() {
    return {
      drawer: null,
      clothesread:[],
      allCategories:['i','b'],
      index:0,
      tempHolder:[]
    }
  },
   created() {
    var tempHolder=[]
    this.clearClothesread()
    this.fetch()
  },
  methods: {
    ...mapMutations('clothesread-app', ['updateClothesread', 'addClothesread', 'clearClothesread']),
    openCompose(clothesread) {
      this.$refs.compose.open(clothesread)
    },
    clothesreadAdding() {
      this.addClothesread(clothesread)
    },
  async fetch(){
  await db.collection(this.allCategories[this.index]).get()
    .then((querySnapshot) => {

      querySnapshot.forEach((doc) => {
        //console.log (doc.data())
          console.log (doc.data()['category']+doc.data()['code'])

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

                this.tempHolder.push(aTask)
      })
        //console.log(tempHolder)
        this.index++
        if (this.index < this.allCategories.length){
          console.log('do fetch')
          this.fetch()
        }else{
          this.allDone()
        }
    })

  },
  allDone(){

    this.tempHolder.sort((a, b) => (a.sortDate < b.sortDate) ? 1 : -1)
    for (var i=0; i<this.tempHolder.length; i++){
      this.addClothesread(this.tempHolder[i])
    }
  }

  }
}
</script>
