import { createRouter, createWebHistory } from 'vue-router'
// import Register from '../views/Register.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LogIn.vue')
      // component: () => import('/MedicalSystem/MedicalSystem/src/components/video.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/register',
      component: () => import('../views/Register.vue'),
      hidden: true
    },
    {
      path: '/doctor',
      component: () => import('../views/doctor/DoctorDetect.vue'),
      children:[
        {
          path:'/first',
          component: () => import('../views/doctor/FirstPage.vue')
        },
        {
          path:'/detect',
          // component: () => import('/MedicalSystem/MedicalSystem/src/components/video.vue')
          component:() => import('../views/doctor/StartDetect.vue')

        },
        {
          path:'/history',
          component:() => import('../views/doctor/DetectHistory.vue')
        },
        {
          path:'/message',
          component:() => import('../views/doctor/DetectMessage.vue')
        },
      ]
    },
    {
      path:'/ptl',
      component:() => import('../views/pathologist/PTLDetect.vue'),
      children:[
        {
          path:'/ptlfirst',
          component: () => import('../views/pathologist/ptlfirst.vue')
        },
        {
          path:'/ptldetect',
          component: () => import('../views/pathologist/pdetect.vue')
        },
        {
          path:'/ptlhistory',
          component:() => import('../views/pathologist/ptlhistory.vue')
        },
        {
          path:'/ptlmessage',
          component:() => import('../views/pathologist/ptlmessage.vue')
        },
      ]
    }
  ]
})

export default router
