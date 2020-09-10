import Vue from 'vue'
import VueRouter from 'vue-router'
import student from '../components/student.vue'
import home from '../components/home.vue'
import teacher from '../components/teacher.vue'
import department from '../components/department.vue'
import sct from '../components/sct.vue'
import course from '../components/course.vue'
import login from '../components/login.vue'
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
      },
      {
        path:'/teacher',
        name:'teacher',
        component:teacher
      },
      {
        path:'/department',
        name:'department',
        component:department
      },
      {
        path:'/sct',
        name:'sct',
        component:sct
      },
      {
        path:'/course',
        name:'course',
        component:course
      }
    ],
    redirect:'/student'
  },
      {
        path:'/login',
        name:'login',
        component: login
      }
]

const router = new VueRouter({
  routes
})

export default router
