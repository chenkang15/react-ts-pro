export default {
  routes: [{
    path: '/',
    component: 'index',
    routes: [{
      path: '/test',
      component: 'test/index'
    }]
  }],
}
