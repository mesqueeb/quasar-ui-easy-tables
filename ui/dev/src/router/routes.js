
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/:schemaId', component: () => import('pages/EasyTableDemo.vue'), props: true },
    ]
  }
]

export default routes
