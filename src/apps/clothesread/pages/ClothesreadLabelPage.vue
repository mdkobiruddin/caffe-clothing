<template>
  <clothesread-list :clothesread="labelClothesread" @edit-clothesread="$emit('edit-clothesread', $event)" />
</template>

<script>
import { mapState } from 'vuex'
import ClothesreadList from '../components/ClothesreadList'

export default {
  components: {
    ClothesreadList
  },
  computed: {
    ...mapState('clothesread-app', ['clothesread']),
    labelClothesread() {
      return this.clothesread
        .filter((t) => t.label.indexOf(this.$route.params.id) !== -1)
        .sort((a, b) => a === false ? 1 : -1)
    }
  }
}
</script>
