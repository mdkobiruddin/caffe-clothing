/*
|---------------------------------------------------------------------
| TODO Vuex Mutations
|---------------------------------------------------------------------
*/
import { db } from '../../../main'
export default {
  addClothesread: (state, clothesread) => {
    //console.log('*******' + task.id)
    state.clothesread.push({
      id: '_' + clothesread.id,//Math.random().toString(36).substr(2, 9),
      ...clothesread
    })

  },
  clearClothesread: (state) => {
    console.log('FEED CLARRRRRRR')
    state.clothesread = []
  },
  updateClothesread: (state, clothesread) => {
    const taskIdx = state.clothesread.find((t) => t.id === clothesread.id)

    Object.assign(taskIdx, clothesread)
  },
  clothesreadCompleted: (state, clothesread) => {
    const taskIdx = state.clothesread.findIndex((t) => t.id === clothesread.id)

    state.clothesread[taskIdx].completed = true

    console.log('COMPLETE ' + clothesread.id)

    db
      .collection(clothesread.codePrefix)
      .doc(clothesread.id)
      .update({
        completed: true
      })

  },
  clothesreadIncomplete: (state, clothesread) => {
    const taskIdx = state.clothesread.findIndex((t) => t.id === clothesread.id)

    state.clothesread[taskIdx].completed = false

    db
      .collection(clothesread.codePrefix)
      .doc(clothesread.id)
      .update({
        completed: false
      })

  },
  deleteClothesread: (state, clothesread) => {

    const taskIdx = state.clothesread.findIndex((t) => t.id === clothesread.id)

    if (taskIdx !== -1) state.clothesread.splice(taskIdx, 1)

    console.log(clothesread.id)

    db.collection('clothesread').doc(clothesread.id).delete().then(function () {
      console.log('Document successfully deleted!')
    }).catch(function (error) {
      console.error('Error removing document: ', error)
    })

  }
}
