<template>
  <v-card class="d-flex flex-grow-1 flex-column">
    <v-text-field
      v-model="filter"
      class="pa-1 py-2 newsfeed-filter elevation-1"
      placeholder="Search"
      prepend-inner-icon="mdi-magnify"
      hide-details
      block
      clearable
      solo
      flat
    ></v-text-field>

    <v-divider></v-divider>

    <div v-if="newsfeed.length === 0">
      <div class="px-1 py-6 text-center">Loading / No Clothes</div>
    </div>

    <v-slide-y-transition
      v-else
      group
      tag="div"
      class="flex-grow-0"
      dense
    >

      <div v-for="(task, i) in visiblenewsfeed" :key="i" @click="$emit('edit-newsfeed', task)" class="d-flex pa-2 task-item align-center" >
        <!-- @click="$emit('edit-task', task)" was in above line-->
        <!-- <v-checkbox
          :input-value="task.completed"
          class="mt-0 pt-0"
          hide-details
          off-icon="mdi-checkbox-blank-circle-outline"
          on-icon="mdi-checkbox-marked-circle"
          @click.stop="task.completed ? setIncomplete(task) : setComplete(task)"
        ></v-checkbox> -->

        <div class="task-item-content flex-grow-1" :class="{ 'complete': task.completed }">
          <div>
            <v-chip
              v-for="label in task.label"
              :key="label"
              :color="getLabelColor(label)"
              class="font-weight-bold mt-1 mr-1"
              outlined
              x-small
            >
              {{ getLabelTitle(label) }}
            </v-chip>
          </div>




          <v-row class="flex-grow-0" dense>
            <v-col cols="md-6 xs-12" class="">
              <div class="my-2">
                <p class="d-inline pa-2">Code: {{task.fullCode}}</p>
              </div>

              <div class="my-2 d-none d-sm-flex">
                <p class="d-inline pa-2">Age: {{task.age}}</p>
              </div>

              <div class="my-2 d-none d-sm-flex">
                <p class="d-inline pa-2">Qty: {{task.qty}}</p>
              </div>

              <div class="my-2 d-none d-sm-flex">
                <p class="d-inline pa-2">Material: {{task.material}}</p>
              </div>

            </v-col>



            <v-col cols="md-6 xs-12">
              <div class="my-2">
                <p class="d-inline pa-2">Title: {{task.title}}</p>
              </div>
              <div class="my-2 d-none d-sm-flex">
                <p class="d-inline pa-2">Size: {{task.size}}</p>
              </div>

              <div class="my-2 d-none d-sm-flex">
                <p class="d-inline pa-2">Colour: {{task.colour}}</p>
              </div>

              <div class="my-2 d-none d-sm-flex">
                <p class="d-inline pa-2">Price: {{task.price}}</p>
              </div>
            </v-col>

          </v-row>



          <!-- <div>
              <p class="d-inline pa-2">Code: {{task.completed}}</p><p class="d-inline pa-2">Title: {{task.title}}</p>
           </div>
           <div>
              <p class="d-inline pa-2">Age: {{task.age}}</p><p class="d-inline pa-2">Size: {{task.size}}</p>
          </div>
           <div>
              <p class="d-inline pa-2">Colour: {{task.colour}}</p><p class="d-inline pa-2">Material: {{task.material}}</p>
          </div>
           <div>
              <p class="d-inline pa-2">Qty: {{task.qty}}</p><p class="d-inline pa-2">Price: {{task.price}}</p>
          </div> -->

  <v-row class="flex-grow-0" dense>
    <v-col
      v-for="anImage in task.images" v-bind:key="anImage.id"
      class="d-flex child-flex"
      cols="4"
    >
      <v-img
        :src="anImage"
        aspect-ratio="1"
        class="grey lighten-2"
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-col>
  </v-row>

        </div>

        <div v-show="$store.state.user.isAdmin" class="d-flex align-center">
          <v-btn v-show="$store.state.user.isAdmin" icon @click.stop="beginDelete(task)">
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
        </div>
      </div>
    </v-slide-y-transition>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

/*
|---------------------------------------------------------------------
| ToDo List Component
|---------------------------------------------------------------------
|
| Task lister
|
*/
import moment from 'moment'
export default {
  props: {
    // task list
    newsfeed: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      filter: ''
    }
  },
  computed: {
    ...mapState('newsfeed-app', ['newsfeedlabels']),
    visiblenewsfeed() {
      if (!this.filter)
      return this.newsfeed.sort((a, b) => (a.sortDate < b.sortDate) ? 1 : -1)

      return this.newsfeed.filter((t) => {
        return Boolean(Object.values(t).filter((prop) => typeof prop === 'string').find((item) => item.toLowerCase().includes(this.filter.toLowerCase())))
      })
    }
  },
  methods: {
    ...mapMutations('newsfeed-app', {
      setComplete: 'newsfeedCompleted',
      setIncomplete: 'newsfeedIncomplete',
      deleteNewsfeed: 'deleteNewsfeed'
    }),
    readableTime(seconds){
      return moment(new Date(seconds)).format('Do MMM YY -- H:m')
    },
    getLabelColor(id) {
      const label = this.newsfeedlabels.find((l) => l.id === id)

      return label ? label.color : ''
    },
    getLabelTitle(id) {

      const label = this.newsfeedlabels.find((l) => l.id === id)

      return label ? label.title : ''
    },
    beginDelete(task){
      console.log(this.$store.state.user.isAdmin)
      if (this.$store.state.user.isAdmin){
        this.deleteNewsfeed(task)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.newsfeed-filter {
  position: sticky;
  background-color: var(--v-background-base) !important;
  z-index: 2;
  top: 0;
}

.task-item {
  cursor: pointer;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);

  &:hover {
    background-color: rgba(100, 100, 100, 0.1);
  }

  .task-item-content {
    &.complete {
      text-decoration: line-through;
    }
  }
}
</style>
