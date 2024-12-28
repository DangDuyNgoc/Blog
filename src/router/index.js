import { createRouter, createWebHistory } from 'vue-router'
import BlogForm from '@/components/BlogForm.vue'
import BlogDetail from '@/components/BlogDetail.vue'
import BlogList from '@/components/BlogList.vue'
import BlogEdit from '@/components/BlogEdit.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import HomeView from '@/views/HomeView.vue'
import NoFoundPage from '@/views/NoFoundPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: '/blog/:id',
          name: 'blog-details',
          component: BlogDetail,
        },
        {
          path: '/blog',
          name: 'blogs',
          component: BlogList,
        },
      ],
    },
    {
      path: '/blog/addBlog',
      name: 'add-blog',
      component: BlogForm,
    },
    {
      path: '/blog/:id',
      name: 'edit-blog',
      component: BlogEdit,
      props: (route) => ({ initialBlog: route.params.blog, isEditMode: true }),
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NoFoundPage },
  ],
})

export default router
