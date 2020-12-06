<template>
  <newsfeed-list :newsfeed="labelNewsfeed" @edit-reponewsfeedrts="$emit('edit-newsfeed', $event)" />
</template>

<script>
import { mapState } from 'vuex'
import NewsfeedList from '../components/NewsfeedList'

export default {
  components: {
    NewsfeedList
  },
  computed: {
    ...mapState('newsfeed-app', ['newsfeed']),
    labelNewsfeed() {
      return this.newsfeed
        .filter((t) => t.label.indexOf(this.$route.params.id) !== -1)
        .sort((a, b) => a === false ? 1 : -1)
    }
  }
}
</script>
