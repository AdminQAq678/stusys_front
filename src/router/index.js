import Vue from 'vue'
import VueRouter from 'vue-router'
import student from '../components/student.vue'
import home from '../components/home.vue'
import teacher from '../components/teacher.vue'
import department from '../components/department.vue'
import sct from '../components/sct.vue'
import course from '../components/course.vue'
import selectCourse from '../components/selectCourse.vue'
import login from '../components/login.vue'
import teascourses from '../components/teascourses.vue'
import chgpasswd from '../components/chgpasswd.vue'
import userinfo from '../components/userinfo.vue'
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
      },
      {
        path:'/selectCourse',
        name:'selectCourse',
        component:selectCourse
      }
      ,
      {
        path:'/teascourses',
        name:'teascourses',
        component:teascourses
      },
      {
        path:'/chgpasswd',
        name:'chgpasswd',
        component:chgpasswd
      },
      {
        path:'/userinfo',
        name:'userinfo',
        component:userinfo
      },
      
      
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

//路由导航守卫
router.beforeEach((to,from,next)=>{
	//to 要访问的页面
	//from 当前页面
	// next 放行函数
	//放行登录页面
	if(to.path==='/login') return next();
	//获取token
	const tokenStr=window.sessionStorage.getItem("token");
  if(!tokenStr)
    return next('/login');
	next();
})



export default router
