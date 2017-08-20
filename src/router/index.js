import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout';

/* login */
const Login = _import('login/index');
const authRedirect = _import('login/authredirect');

/* dashboard */
const dashboard = _import('dashboard/index');

/* error page */
const Err404 = _import('error/404');
const Err401 = _import('error/401');

/* error log */
const ErrorLog = _import('errlog/index');

/*dashboard*/
const Dashboard = _import('dashboard/index');


/*profile*/

const Profile = _import('profile/index');

/* permission */
const Permission = _import('permission/index');

/*shop*/
const Shop = _import('shop/shop/index')
const Certify = _import('shop/certify/index')

/*batch*/
const All = _import('batch/all/index')
const Ongoing = _import('batch/ongoing/index')
const Done = _import('batch/done/index')

const Detail = _import('batch/all/children/index')
/*commodity*/
const Resources = _import('commodity/resources/index')
const ResourcesDetail = _import('commodity/resources/children/index')
const AddCommodity = _import('commodity/resources/children/add')
const EditDetail = _import('commodity/resources/children/detail')
const Forsale = _import('commodity/forsale/index')
const ForsaleDetail = _import('commodity/forsale/children/index')
const Unsold = _import('commodity/unsold/index')
const UnsoldDetail = _import('commodity/unsold/children/index')
const Sticky = _import('commodity/sticky/index')
const StickyDetail = _import('commodity/sticky/children/index')

Vue.use(Router);

 /**
  * icon : the icon show in the sidebar
  * hidden : if hidden:true will not show in the sidebar
  * redirect : if redirect:noredirect will not redirct in the levelbar
  * noDropdown : if noDropdown:true will not has submenu
  * meta : { role: ['admin'] }  will control the page role
  **/

export const constantRouterMap = [
    { path: '/login', component: Login, hidden: true },
    { path: '/authredirect', component: authRedirect, hidden: true },
    { path: '/404', component: Err404, hidden: true },
    { path: '/401', component: Err401, hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{ path: 'dashboard', component: Dashboard}]
  },
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    name: '个人资料详情',
    icon: 'theme',
    // meta: { role: ['admin'] },
    noDropdown: true,
    children: [{ path: 'index', component: Profile, name: '个人资料'/*, meta: { role: ['admin'] }*/ }]
  },
  {
    path: '/shop',
    component: Layout,
    redirect: '/shop/index',
    name: '店铺管理',
    icon: 'quanxian',
    children: [
      { path: 'index', component: Shop, name: '店铺装修 ' },
      { path: 'certify', component: Certify, name: '实名认证' },
    ]
  },
  {
    path: '/batch',
    component: Layout,
    redirect: '/batch/index',
    name: '批次管理',
    icon: 'zonghe',
    children: [
      { path: 'index', component: All, name: '批次管理详情'},
      {path: 'detail', component: Detail, name: '查看批次详情', hidden: true},
      { path: 'ongoing', component: Ongoing, name: '创建批次' }
    ]
  },
  {
    path: '/commodity',
    component: Layout,
    redirect: '/commodity/index',
    name: '商品管理',
    icon: 'zujian',
    children: [
      { path: 'index', component: Resources, name: '商品源'},
      {path: 'index/detail', component: ResourcesDetail, name: '查看详情1', hidden: true},
      {path: 'index/addcommodity', component: AddCommodity, name: '添加商品源', hidden: true},
      {path: 'index/editdetail', component: EditDetail, name: '编辑商品详情', hidden: true},
      { path: 'forsale', component: Forsale, name: '出售中' },
      {path: 'forsale/detail', component: ForsaleDetail, name: '查看详情2', hidden: true},
      { path: 'unsold', component: Unsold, name: '未出售' },
      {path: 'unsold/detail', component: UnsoldDetail, name: '查看详情3', hidden: true},
      { path: 'sticky', component: Sticky, name: '库存' },
      {path: 'sticky/detail', component: StickyDetail, name: '查看详情4', hidden: true},
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];
