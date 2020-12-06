<template>
  <v-dialog v-model="dialog" width="1000">
    <v-card>
      <v-card-title class="pa-2">
        {{ isEdit ? 'Edit News...' : 'Add News' }}
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <!-- task form -->

  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
  <h2>CAFFE Clothing</h2>

   <v-radio-group
      v-model="user"
      row
      @change="selectPrefix"
    >
      <v-radio
        label="Iris"
        value="iris"
      ></v-radio>
      <v-radio
        label="Valerie"
        value="valerie"
      ></v-radio>
    </v-radio-group>

   <v-radio-group
      v-model="category"
      @change="selectPrefix"
      row
    >
      <v-radio
        label="Infant"
        value="infant"
      ></v-radio>
      <v-radio
        label="Boys"
        value="boys"
      ></v-radio>
      <v-radio
        label="Girls"
        value="girls"
      ></v-radio>
      <v-radio
        label="Women"
        value="women"
      ></v-radio>
           <v-radio
        label="Men"
        value="men"
      ></v-radio>
    </v-radio-group>


    <h2>{{codePrefix}}</h2>
    <v-text-field
      v-model="code"
      outlined
      :counter="8"
      :rules="codeRules"
      label="Code"
      required
    ></v-text-field>


    <v-text-field
      v-model="title"
      outlined
      :counter="80"
      :rules="titleRules"
      label="Title"
      required
    ></v-text-field>

    <v-text-field
      v-model="age"
      outlined
      :counter="60"
      :rules="ageRules"
      label="Age"
    ></v-text-field>

    <v-text-field
      v-model="size"
      outlined
      :counter="100"
      :rules="sizeRules"
      label="Size"
    ></v-text-field>

    <v-text-field
      v-model="colour"
      outlined
      :counter="100"
      :rules="colourRules"
      label="Colour"
    ></v-text-field>

    <v-text-field
      v-model="material"
      outlined
      :counter="100"
      :rules="materialRules"
      label="Material"
    ></v-text-field>

    <v-text-field
      v-model="qty"
      outlined
      :counter="100"
      :rules="qtyRules"
      label="Quantity"
      required
    ></v-text-field>

      <v-text-field
      v-model="price"
      outlined
      :counter="100"
      :rules="priceRules"
      label="Price"
      required
    ></v-text-field>
    </v-form>


  <v-row>
    <v-col
      v-for="anImage in imageUrls" v-bind:key="anImage.id"
      class="d-flex child-flex"
      cols="4"
    >
      <v-img
        :src="anImage"
        aspect-ratio="1"
        class="grey lighten-2"
      >
      <span  @click="deleteImage(anImage)">X</span>
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



      <v-divider></v-divider>
 <!-- @vdropzone-mounted="dropMounted" -->
  <vue-dropzone id="imgDropzone" ref="imgDropzone" :options="dropzoneOptions" @vdropzone-complete="afterComplete"></vue-dropzone>


      <v-card-actions class="pa-2">
        <v-btn outlined @click="close">{{ $t('common.cancel') }}</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="post">{{ $t('common.save') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

/*
|---------------------------------------------------------------------
| TODO Compose Component
|---------------------------------------------------------------------
|
| Compose new tasks editor
*/
import moment from 'moment'
import { db } from '../../../main'
import firebase from 'firebase'
import vue2Dropzone from 'vue2-dropzone'
import "vue2-dropzone/dist/vue2Dropzone.min.css"
export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  data () {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        thumbnailHeight: 250,
        addRemoveLinks: true,
        acceptedFiles: ".jpg, .jpeg, .png"
      },
      dialog: false,
      title: '',
      time: '',
      likes:[],
      shares:0,
      events:[],
      codePrefix:'',
      incidentDate:'',
      foundEvents:[],
      show:true,
      iAmEditing:false,
      taskLabels: [],
      search: null,
      id:'',
      valid: true,
      files:[],
      imageRaw:null,
      receivedUrl:'',
      imageUrl:'',
      imageUrls:[],
      title: '',
      sortDate:'',
      author:'',
      code:'',
      category:'infant',
      user:'iris',
      size:'',
      age:'',
      colour:'',
      material:'',
      qty:'',
      price:'',
      codeRules: [
        (v) => !!v || 'Code is required',
        (v) => (v && v.length <= 80) || 'Code must be less than 8 characters'
      ],
      titleRules: [
        (v) => !!v || 'Title is required',
        (v) => (v && v.length <= 80) || 'Title must be less than 80 characters'
      ],
      sizeRules: [
        (v) => (v && v.length <= 80) || 'Size must be less than 80 characters'
      ],
      ageRules: [
        (v) => (v && v.length <= 100) || 'Age must be less than 100 characters'
      ],
      colourRules: [
        (v) => (v && v.length <= 100) || 'Colour must be less than 100 characters'
      ],
      materialRules: [
        (v) => (v && v.length <= 100) || 'Material must be less than 100 characters'
      ],
      qtyRules: [
        (v) => !!v || 'Quantity is required',
        (v) => (v && v.length <= 100) || 'Quantity must be less than 100 characters'
      ],
      priceRules: [
        (v) => !!v || 'Price is required',
        (v) => (v && v.length <= 100) || 'Price must be less than 100 characters'
      ],
      select: null,
      checkbox: false,
      imageChanged:false

    }
  },
  computed: {
    ...mapState('newsfeed-app', ['newsfeedlabels']),
    isEdit() {
      if (this.id!=null){
        console.log(this.id)
        if (this.id==''){
          return false
        }else{
          return true
        }
      }

    }
  },
  methods: {
    ...mapMutations('newsfeed-app', ['updateNewsfeed', 'addNewsfeed']),
    open(task, editing) {
      console.log('OPEN')
      if (task) {
        this.task = task
        this.iAmEditing = true
        this.code = this.task.code
        this.id = this.task.id
        this.completed = this.task.completed
        this.title = this.task.title
        this.age = this.task.age
        this.size = this.task.size
        this.colour = this.task.colour
        this.material = this.task.material
        this.qty = this.task.qty
        this.price = this.task.price
        this.codePrefix = this.task.codePrefix
        this.images = this.task.images
        this.taskLabels = this.task.labels
        this.imageUrls = this.task.images
        this.sortDate = this.task.sortDate
        this.category = this.task.category
        this.user = this.task.user
      } else {
        this.iAmEditing = false
        this.id = ''
        this.category = 'infant'
        this.user='iris'
        this.code = ''
        this.completed = false
        this.codePrefix = 'i'
        this.title = ''
        this.age = ''
        this.size = ''
        this.colour = ''
        this.material = ''
        this.qty = ''
        this.price = ''
        this.images = []
        this.taskLabels = []
        this.imageUrls = []
        this.sortDate = 0
      }

      this.dialog = true
    },
    close() {
      this.dialog = false
    },
    save() {
      const {category, title, code, size, age, taskLabels, imageUrls, id,
        colour, material, qty, price, completed, user, codePrefix, sortDate } = this

      const taskEdit = {
        title,
        sortDate,
        category,
        code,
        size,
        age,
        id,
        colour,
        material,
        qty,
        price,
        completed,
        user,
        codePrefix,
        images: imageUrls,
        label: [category],

      }

      if (this.iAmEditing == true) {
        this.updateNewsfeed({
          ...this.task,
          ...taskEdit
        })
      } else {
        console.log ('PASS URL '+sortDate)
        const taskNew = {
        sortDate,
        category,
        code,
        title,
        size,
        age,
        id,
        colour,
        material,
        qty,
        price,
        completed,
        user,
        codePrefix,
        images: imageUrls,
        label: [category],
      }
        this.addNewsfeed(taskNew)
      }
      this.resetValidation()
      this.close()
    },

    randomNumber (){
      return Math.floor(Math.random() * (999)) + 1;
    },
    selectPrefix(){
      if (this.user=='iris'){
        switch (this.category) {
          case 'infant':
            this.codePrefix='i'
            break;
          case 'boys':
            this.codePrefix='b'
            break;
          case 'girls':
            this.codePrefix='g'
            break;
          case 'women':
            this.codePrefix='w'
            break;
          case 'men':
            this.codePrefix='m'
            break;
          default:
            break;
        }
      }else{
        switch (this.category) {
          case 'infant':
            this.codePrefix='vi'
            break;
          case 'boys':
            this.codePrefix='vb'
            break;
          case 'girls':
            this.codePrefix='vg'
            break;
          case 'women':
            this.codePrefix='vw'
            break;
          case 'men':
            this.codePrefix='vm'
            break;
          default:
            break;
      }
      }

    },

    filter (item, queryText, itemText) {
      const hasValue = (val) => val !== null ? val : ''

      const text = hasValue(item.title)
      const query = hasValue(queryText)

      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1
    },


    async post () {

      if (this.iAmEditing==false){
      const unix = Date.now()

      this.sortDate = unix

      //this.id = this.sortDate.toString()

      const theDate = moment(unix).format('Do MMM YY')

      this.time = firebase.firestore.Timestamp.fromDate(new Date())

      this.taskLabels=[]
      this.taskLabels.push(this.postType)

      }else{

        this.taskLabels=[]
        this.taskLabels.push(this.postType)

        console.log('doc id '+this.id)
      }

      if (this.imageChanged){





      const uniqueTime = new Date().getTime()

      this.images = this.$refs.imgDropzone.getAcceptedFiles()

      let photoDone=0

      for (var i=0; i<this.images.length; i++){

        let imgName = this.images[i].name

        let ext = imgName.slice(imgName.lastIndexOf('.'))

      const storageRef=firebase.storage().ref(`clothes/${this.user}/${this.codePrefix}/${uniqueTime}/${this.codePrefix}${this.code}---${i}${ext}`).put(this.images[i]);
        storageRef.on(`state_changed`,snapshot=>{
        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          }, error=>{console.log(error.message)},
        ()=>{this.uploadValue=100;
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{

              this.imageUrls.push(url)


              if (photoDone==this.images.length-1){
                  console.log(this.imageUrls)

                  console.log('got id '+this.id)

                  if (this.id != ''){

                  db
                  .collection(this.codePrefix)
                  .doc(this.id)
                  .update({
                    label: this.category,
                    category: this.category,
                    sortDate : this.sortDate,
                    code: this.code ??'',
                    size: this.size ??'',
                    title: this.title ??'',
                    age: this.age ??'',
                    colour: this.colour ??'',
                    images: this.imageUrls ??[],
                    material:this.material ??'',
                    qty:this.qty ??'',
                    user:this.user ??'',
                    codePrefix: this.codePrefix ??'',
                    price:this.price ??'',
                    completed:this.completed ?? false
                  }).then((done)=>{
                    this.save()
                    this.$refs.imgDropzone.removeAllFiles()
                  })


                  }else{

                  db
                  .collection(this.codePrefix)
                  .add({
                    label: this.category,
                    category: this.category,
                    sortDate : this.sortDate,
                    code: this.code ??'',
                    size: this.size ??'',
                    title: this.title ??'',
                    age: this.age ??'',
                    colour: this.colour ??'',
                    images: this.imageUrls ??[],
                    material:this.material ??'',
                    qty:this.qty ??'',
                    user:this.user ??'',
                    codePrefix: this.codePrefix ??'',
                    price:this.price ??'',
                    completed:this.completed?? false
                  }).then((done)=>{
                    this.save()
                    this.$refs.imgDropzone.removeAllFiles()
                  })

                }
              }
              photoDone++
              //this.save()
              });
            }

          );

      }


      } else {

                  if (this.id != ''){

                  db
                  .collection(this.codePrefix)
                  .doc(this.id)
                  .update({
                    label: this.category,
                    category: this.category,
                    sortDate : this.sortDate,
                    code: this.code ??'',
                    size: this.size ??'',
                    title: this.title ??'',
                    age: this.age ??'',
                    colour: this.colour ??'',
                    images: this.imageUrls ??[],
                    material:this.material ??'',
                    qty:this.qty ??'',
                    user:this.user ??'',
                    codePrefix: this.codePrefix ??'',
                    price:this.price ??'',
                    completed:this.completed ?? false
                  }).then((done)=>{
                    this.save()
                  })

                  }else{

                  db
                  .collection(this.codePrefix)
                  .add({
                    label: this.category,
                    category: this.category,
                    sortDate : this.sortDate,
                    code: this.code ??'',
                    size: this.size ??'',
                    title: this.title ??'',
                    age: this.age ??'',
                    colour: this.colour ??'',
                    images: this.imageUrls ??[],
                    material:this.material ??'',
                    qty:this.qty ??'',
                    user:this.user ??'',
                    codePrefix: this.codePrefix ??'',
                    price:this.price ??'',
                    completed:this.completed ?? false
                  }).then((done)=>{
                    this.save()
                  })

                }
      }

    },
    imagePreview() {
      const fileReader = new FileReader()

      if (this.files.length>0){

      fileReader.addEventListener('load',() => {
        this.imageUrls.push(fileReader.result)
      })
      fileReader.readAsDataURL(this.files)
      this.images = this.files
      this.imageChanged = true

      }else{
        this.images=[]
        this.imageUrls=[]
        this.imageChanged = false
      }


    },
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    deleteImage (img) {
     let image = firebase.storage().refFromURL(img);

     var ind = this.imageUrls.indexOf(img);

      this.imageUrls.splice(ind,1);

        console.log (this.codePrefix+'   '+this.id)

          db
          .collection(this.codePrefix)
          .doc(this.id)
          .update({
            images: this.imageUrls,
          })

        image.delete().then(function() {
          console.log('image deleted');

        }).catch(function(error) {
          // Uh-oh, an error occurred!
          console.log('an error occurred');
        });


    },
    dropMounted () {

      for (var p=0; p<this.images.length; p++){
        var file = { size: 123, name: 'Icon'+p, type: 'image/png' };
        var url = this.images[p];
        this.$refs.imgDropzone.manuallyAddFile(file, url);
      }

      console.log('drop mounted')

    },
    async afterComplete(file) {
      try {
        //const imageName = uuid.v1();
        var metaData = {
          contentType: "image/png"
        }


      //this.images = this.$refs.imgDropzone.getAcceptedFiles()

       this.imageChanged = true

      console.log ('image done')

      } catch (error) {
        console.log(error);
      }
    }

  }
}
</script>
