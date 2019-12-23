const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/slots', component: () => import('pages/SlotsDemo.vue') },
      { path: '/:schemaId', component: () => import('pages/EasyTableDemo.vue'), props: true },
    ],
  },
]

export default routes
