export default {
  path: '/trackOrder',
  name: 'TrackOrder',
  meta: {
    title: '订单溯源'
  },
  children: [
    {
      path: 'index',
      name: 'Index',
      component: () => import('@/views/trackOrder/Index.vue'),
      meta: {
        title: '订单溯源',
        keepAlive: true
      }
    },
    {
      path: 'print',
      name: 'Print',
      component: () => import('@/views/trackOrder/Print.vue'),
      meta: {
        title: '订单溯源 - 打印',
        keepAlive: true
      }
    }
  ]
}
