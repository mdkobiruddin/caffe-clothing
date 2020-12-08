<template>
  <v-card class="min-w-0">
    <v-text-field
      v-model="filter"
      class="pa-1 py-2 clothesread-filter elevation-1"
      placeholder="Search"
      prepend-inner-icon="mdi-magnify"
      hide-details
      block
      clearable
      solo
      flat
    ></v-text-field>

    <v-divider></v-divider>

    <div v-if="clothesread.length === 0">
      <div class="px-1 py-6 text-center">Loading / No Clothes</div>
    </div>

    <v-slide-y-transition
      v-else
      group
      tag="div"
    >
      <div v-for="task in visibleclothesread" :key="task.id" @click="$emit('edit-clothesread', task)" class="d-flex pa-2 task-item align-center" >
        <!-- @click="$emit('edit-task', task)" was in above line-->
        <v-checkbox
          :input-value="task.completed"
          class="mt-0 pt-0"
          hide-details
          off-icon="mdi-checkbox-blank-circle-outline"
          on-icon="mdi-checkbox-marked-circle"
          @click.stop="task.completed ? setIncomplete(task) : setComplete(task)"
        ></v-checkbox>

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

          <v-row>
            <v-col cols="6">
              <div class="my-2">
                <p class="d-inline pa-2">Title: {{task.title}}</p>
                <v-btn color="primary"
                v-clipboard:copy="task.title"
                >Copy
                </v-btn>
              </div>

              <div class="my-2">
                <p class="d-inline pa-2">Price: {{task.price}}</p>
                <v-btn color="primary"
                v-clipboard:copy="task.price"
                >Copy
                </v-btn>
              </div>

              <div class="my-2">
                <p class="d-inline pa-2">SKU: {{task.fullCode}}</p>
                <v-btn color="primary"
                v-clipboard:copy="task.title"
                >Copy
                </v-btn>
              </div>

              <div class="my-2">
                <p class="d-inline pa-2">QTY: {{task.qty}}</p>
                <v-btn color="primary"
                v-clipboard:copy="task.qty"
                >Copy
                </v-btn>
              </div>


            </v-col>

            <v-col cols="6">
              <p class="pt-2">Material: {{task.material}}</p>

              <p class="">Size: {{task.size}}</p>

              <p class="">Age: {{task.age}}</p>

              <p class="">Colour: {{task.colour}}</p>
              <v-btn color="primary"
              v-clipboard:copy="'Size: '+task.size+'\n\n'+'Age: '+task.age+'\n\n'+'Colour: '+task.colour + '\n\n' + 'Material: '+task.material"
              >Copy
              </v-btn>
            </v-col>

          </v-row>






          <!-- <div>
              <p class="d-inline pa-2">Title: {{task.title}}</p>
              <v-btn color="primary"
              v-clipboard:copy="task.title"
              >Copy
              </v-btn>
           </div>

          <div>
              <p class="d-inline pa-2">Price: {{task.price}}</p>
              <v-btn color="primary"
              v-clipboard:copy="task.price"
              >Copy
              </v-btn>
           </div>

          <div>
              <p class="d-inline pa-2">SKU: {{task.fullCode}}</p>
              <v-btn color="primary"
              v-clipboard:copy="task.title"
              >Copy
              </v-btn>
           </div>

          <div>
              <p class="d-inline pa-2">QTY: {{task.qty}}</p>
              <v-btn color="primary"
              v-clipboard:copy="task.qty"
              >Copy
              </v-btn>
           </div>

           <div>
              <p class="d-inline pa-2">Material: {{task.material}}"</p>
          </div>

          <div>
              <p class="d-inline pa-2">Size: {{task.size}}</p>
           </div>

          <div>
              <p class="d-inline pa-2">Age: {{task.age}}</p>
           </div>

           <div>
              <p class="d-inline pa-2">Colour: {{task.colour}}</p>
              <v-btn color="primary"
              v-clipboard:copy="'Size: '+task.size+'\n\n'+'Age: '+task.age+'\n\n'+'Colour: '+task.colour + '\n\n' + 'Material: '+task.material"
              >Copy
              </v-btn>
          </div> -->








          <br>
          <v-row>
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

            <v-btn
            color="green white--text"
            block
            >
              UPLOAD PICTURES
            </v-btn>
<p></p>

              <v-btn color="primary white--text"
              @click.native.stop
              block
              v-on:click="downloadPhotos(task.images, task.fullCode)">
              DOWNLOAD PICTURES
            </v-btn>

        </div>

        <!-- <div v-show="$store.state.user.isAdmin" class="d-flex align-center">
          <v-btn v-show="$store.state.user.isAdmin" icon @click.stop="beginDelete(task)">
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
        </div> -->
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
import firebase from 'firebase'
export default {
  props: {
    // task list
    clothesread: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      filter: '',
      myBlock:''
    }
  },
  computed: {
    ...mapState('clothesread-app', ['clothesreadlabels']),
    visibleclothesread() {
      if (!this.filter)
      return this.clothesread.sort((a, b) => (a.sortDate < b.sortDate) ? 1 : -1)

      return this.clothesread.filter((t) => {
        return Boolean(Object.values(t).filter((prop) => typeof prop === 'string').find((item) => item.toLowerCase().includes(this.filter.toLowerCase())))
      })
    },
  },
  methods: {
    ...mapMutations('clothesread-app', {
      setComplete: 'clothesreadCompleted',
      setIncomplete: 'clothesreadIncomplete',
      deleteClothesread: 'deleteClothesread'
    }),

    readableTime(seconds){
      return moment(new Date(seconds)).format('Do MMM YY -- H:m')
    },
    getLabelColor(id) {
      const label = this.clothesreadlabels.find((l) => l.id === id)

      return label ? label.color : ''
    },
    getLabelTitle(id) {

      const label = this.clothesreadlabels.find((l) => l.id === id)

      return label ? label.title : ''
    },
    beginDelete(task){
      console.log(this.$store.state.user.isAdmin)
      if (this.$store.state.user.isAdmin){
        this.deleteClothesread(task)
      }
    },
    downloadPhotos(images, fullcode){
      console.log(images)

      let name = fullcode

      let ind = 0

     for (var i=0; i<images.length; i++){

     const resumeRef = firebase.storage().refFromURL(images[i])

  resumeRef.getDownloadURL().then((url) => {
    // `url` is the download URL
    console.log(url);

    // This can be downloaded directly:
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function () {
      const blob = xhr.response;
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = name+'--'+ind;
      link.click();
          ind++
      URL.revokeObjectURL(link.href);
    };
    xhr.open('GET', url);
    xhr.send();
  }).catch((error) => {
    // Handle any errors
    switch (error.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        break;

      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;

      case 'storage/canceled':
        // User canceled the upload
        break;

      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
      default:
        break;
    }
  });
    }
    }
  }
}
</script>

<style lang="scss" scoped>
.clothesread-filter {
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
