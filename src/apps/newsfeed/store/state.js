import newsfeed from './content/newsfeed'

/*
|---------------------------------------------------------------------
| TODO Vuex State
|---------------------------------------------------------------------
*/
export default {
  newsfeed,

  // labels
  newsfeedlabels: [{
    id: 'infant',
    title: 'Infant',
    color: 'green'
  },{
    id: 'boys',
    title: 'Boys',
    color: 'orange'
  },
  {
    id: 'girls',
    title: 'Girls',
    color: 'pink'
  },
  {
    id: 'women',
    title: 'Women',
    color: 'red'
  },
  {
    id: 'men',
    title: 'Men',
    color: 'blue'
  }
  ]
}
