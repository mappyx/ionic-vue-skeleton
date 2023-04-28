import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import App from '@/App.vue';
import TokenService from '@/services/token.service';
import AuthenticationPage from '@/views/authentication/AuthenticationPage.vue';
import SignIn from '@/views/authentication/SignIn.vue';
import DashboardPage from '@/views/DashboardPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '/auth',
        component: AuthenticationPage,
        children: [
          {
            path: '/auth/login',
            component: SignIn,
            name: 'signin',
            meta: {
              requiresAuth: false
            }
          }
        ]
      },
      {
        path: '/dashboard',
        name: 'dashboard.index',
        component: DashboardPage,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/',
        redirect: { name: 'dashboard.index'}
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const loggedIn = !!TokenService.getToken();

  if (requiresAuth && !loggedIn) {
    return next({ name: 'signin' });
  }

  if (!requiresAuth && loggedIn) {
    return next({ name: 'dashboard.index'});
  }

  next();
});

export default router
