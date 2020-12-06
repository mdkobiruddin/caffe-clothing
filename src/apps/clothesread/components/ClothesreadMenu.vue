<template>
  <div>
    <v-btn
      block
      large
      color="primary"
      class="mb-3"
      @click="$emit('open-compose')"
    >{{ $t('appclothesread.addTask') }}</v-btn>

    <v-list nav class="mt-2 pa-0">
      <v-list-item to="/apps/clothesread/clothesread" active-class="primary--text" link>
        <v-list-item-icon>
          <v-icon small>mdi-checkbox-marked-circle-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ $t('appclothesread.clothesread') }}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action v-if="incompleteClothesread.length > 0">
          <v-badge inline color="primary" class="font-weight-bold" :content="incompleteClothesread.length">
          </v-badge>
        </v-list-item-action>
      </v-list-item>

      <v-list-item to="/apps/clothesread/completed" active-class="primary--text" link>
        <v-list-item-icon>
          <v-icon small>mdi-check</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ $t('appclothesread.completed') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list dense nav class="mt-2 pa-0">
      <div class="overline pa-1 mt-2">{{ $t('appclothesread.labels') }}</div>

      <v-list-item
        v-for="label in clothesreadlabels"
        :key="label.id"
        :to="`/apps/clothesread/label/${label.id}`"
        exact
        active-class="primary--text"
        link
      >

        <v-list-item-icon>
          <v-icon small :color="label.color">mdi-label-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ label.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

/*
|---------------------------------------------------------------------
| TODO Menu Component
|---------------------------------------------------------------------
|
| TODO application navigation
|
*/
export default {
  computed: {
    ...mapState('clothesread-app', ['clothesreadlabels']),
    ...mapGetters('clothesread-app', ['incompleteClothesread'])
  }
}
</script>
