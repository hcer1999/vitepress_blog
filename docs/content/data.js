export const data = [
  {
    title: '文章列表',
    items: [
      {
        // noIcon: true,
        icon: '../public/icons/webstorm.svg',
        title: 'Webstorm史上最全快捷键',
        badge: {
          text: '2020-1-12',
          type: 'info',
        },
        desc: '注：只适用于 Windows 以及 Linux',
        link: '/content/docs/1',
        target: '_self',
      },
      {
        noIcon: true,
        // icon: 'tada: :100',
        title: '丢失this问题',
        badge: {
          text: '2020-3-15',
          type: 'info',
        },
        desc: '今天在 Vue 项目开发的时候，在 mount 生命周期内用到了定时器，定时器函数内获取了`this`中的一个方法，结果用控制台一打印，出来的是`undefined`？？？',
        link: '/content/docs/2',
        target: '_self',
      },
    ],
  },
]
