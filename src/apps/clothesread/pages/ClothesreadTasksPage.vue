<template>
  <clothesread-list :clothesread="incompleteClothesread" @edit-clothesread="$emit('edit-clothesread', $event)" />
</template>

<script>
import { mapGetters } from 'vuex'
import ClothesreadList from '../components/ClothesreadList'

export default {
  components: {
    ClothesreadList
  },
  computed: {
    ...mapGetters('clothesread-app', ['incompleteClothesread'])
  }
}
</script>
