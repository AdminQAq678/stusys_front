import Vue from 'vue'
import VueRouter from 'vue-router'
import student from '../components/student.vue'
import home from '../components/home.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
    children:[
      {
        path:'/student',
        name:'student',
        component:student
      }
    ],
    redirect:'/student'
  }
]

const router = new VueRouter({
  routes
})

export default router
