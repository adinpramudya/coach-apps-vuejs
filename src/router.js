import { createRouter, createWebHistory } from 'vue-router';
import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachRegister from './pages/coaches/CoachRegister.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestReceived from './pages/requests/RequestReceived.vue';
import UserAuth from './pages/UserAuth.vue';
import NotFound from './pages/NotFound.vue';
import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches',
    },
    {
      path: '/coaches',
      component: CoachesList,
    },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [
        {
          path: 'contact',
          component: ContactCoach,
        },
      ],
    },
    {
      path: '/register',
      component: CoachRegister,
      meta: { requiresAuth: true },
    },
    {
      path: '/request',
      component: RequestReceived,
      meta: { requiresAuth: true },
    },
    {
      path: '/userAuth',
      component: UserAuth,
      meta: { requiresUnauth: true },
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticate) {
    next('/userAuth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticate) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
