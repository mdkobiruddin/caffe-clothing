/*
|---------------------------------------------------------------------
| TODO Vuex Getters
|---------------------------------------------------------------------
*/
export default {
  incompleteClothesread({ clothesread }) {
    return clothesread.filter((t) => !t.completed)
  },
  completeClothesread({ clothesread }) {
    return clothesread.filter((t) => t.completed)
  }
}
