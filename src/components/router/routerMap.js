import User from '@/components/Content/UserDataPanel/UserData'

export default [
  {
    path: '/',
    component: User
  },
  {
    path: '/User',
    name: 'User',
    component: User,
    redirect: '/User/DataPanel',
    meta: {
      requireAuth: true
    },
    children: [
      { path: 'DataPanel', component: User },
      { path: 'DataPanel1', component: User }
    ]
  }
]
