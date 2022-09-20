import Login from '@/components/UserLogin/Login'
import Panel from '@/components/Content/Panel'
import UserData from '@/components/Content/UserDataPanel/UserData'
import UserArticle from '@/components/Content/UserDataPanel/UserArticle'

export default [
  {
    path: '/',
    component: Login
  },
  {
    path: '/Login',
    component: Login
  },
  {
    path: '/Panel',
    component: Panel,
    redirect: '/Panel/UserData',
    meta: {
      requireAuth: true
    },
    children: [
      { path: 'UserData', component: UserData },
      { path: 'UserArticle', component: UserArticle }
    ]
  }
]
