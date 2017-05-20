export default [
  {
      path: '/about/',
      component: require('./pages/about.vue')
  },
  {
      path: '/form/',
      component: require('./pages/form.vue')
  },
  {
      path: '/dynamic-route/blog/:blogId/post/:postId/',
      component: require('./pages/dynamic-route.vue')
  },
    {
        path: '/trip/',
        component: require('./pages/trip.vue')
    },
    {
        path: '/time/',
        component: require('./pages/time.vue')
    },
    {
        path: '/manual/',
        component: require('./pages/manual.vue')
    },
    {
        path: '/ctrlpump/',
        component: require('./pages/ctrlpump.vue')
    },
    {
        path: '/params/',
        component: require('./pages/params.vue')
    },
    {
        path: '/system/',
        component: require('./pages/system.vue')
    }
]