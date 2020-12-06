import clothesreadRoutes from '../apps/clothesread/routes'
import Router from 'vue-router'
import store from '../store'

export default [{
  path: '/apps/clothesread',
  beforeEnter: guard,
  component: () => import(/* webpackChunkName: "apps-clothesread" */ '@/apps/clothesread/ClothesreadApp.vue'),
  children: [
    ...clothesreadRoutes
  ]
}
]

function guard(to, from, next) {
  if (store.state.user.isAdmin) {
    return next()
  } else if (store.state.user.role === 'editor') {
    return next()
  } else {
    return next('/auth/signin')
  }
}
