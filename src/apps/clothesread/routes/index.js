export default [{
  path: '',
  redirect: 'clothesread'
}, {
  path: 'clothesread',
  name: 'apps-clothesread-clothesread',
  component: () => import(/* webpackChunkName: "apps-clothesread-feedback" */ '@/apps/clothesread/pages/ClothesreadTasksPage.vue')
}, {
  path: 'completed',
  name: 'apps-clothesread-completed',
  component: () => import(/* webpackChunkName: "apps-clothesread-completed" */ '@/apps/clothesread/pages/ClothesreadCompletedPage.vue')
}, {
  path: 'label/:id',
  name: 'apps-clothesread-label',
  component: () => import(/* webpackChunkName: "apps-clothesread-label" */ '@/apps/clothesread/pages/ClothesreadLabelPage.vue')
}]
