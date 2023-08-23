interface Data {
  title: string
  items: Item[]
}
interface Badge {
  text: string
  type: string
}
interface Item {
  icon?: string
  title: string
  text?: string
  badge?: Badge
  desc?: string
  link?: string
  target?: string
  noIcon?: boolean
}

const data: Data[] = [
  {
    title: '文章列表',
    items: [
      {
        // noIcon: true,
        icon: '../icons/webstorm.svg',
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
        title: '丢失this问题',
        badge: {
          text: '2020-3-15',
          type: 'info',
        },
        desc: '今天在 Vue 项目开发的时候，在 mount 生命周期内用到了定时器，定时器函数内获取了`this`中的一个方法，结果用控制台一打印，出来的是`undefined`？？？',
        link: '/content/docs/2',
        target: '_self',
      },
      {
        noIcon: true,
        title: '防抖和节流',
        badge: {
          text: '2020-4-15',
          type: 'info',
        },
        desc: '防抖和节流一直是面试题中出现频率非常高的题目。',
        link: '/content/docs/3',
        target: '_self',
      },

      {
        noIcon: true,
        title: '简单实现vue双向数据绑定',
        badge: {
          text: '2020-5-20',
          type: 'info',
        },
        desc: 'Vue 的双向数据绑定的核心是`Object.defineProperty()`,通过这个方法来劫持各个属性的`setter`，`getter`，在数据变动时同时改变绑定这个数据的元素的值。这个方法有三个参数',
        link: '/content/docs/4',
        target: '_self',
      },
      {
        noIcon: true,
        title: '利用exif.js解决ios手机上传竖拍照片旋转90度问题',
        badge: {
          text: '2020-6-12',
          type: 'info',
        },
        desc: '我的项目是`Vue`+`Vant`，今天在写上传头像的功能时发现，苹果手机上传的话照片会自动旋转 90 度，安卓和 PC 端则不会。花了一上午的时间解决了这个问题。',
        link: '/content/docs/5',
        target: '_self',
      },
      {
        noIcon: true,
        title: '手撕bind、call、apply',
        badge: {
          text: '2020-7-5',
          type: 'info',
        },
        desc: '在面试中，面试官总让人手撕代码，工作了几年，精通各种技术，结果连最基础的如何实现 apply、call、bind 都被问得哑口无言，实在难以面对江东父老。',
        link: '/content/docs/6',
        target: '_self',
      },
      {
        noIcon: true,
        title: '图片转换base64方法',
        badge: {
          text: '2020-7-25',
          type: 'info',
        },
        desc: '我们需要先在`element-ui`的`upload`组件中绑定`on-change`事件拿到文件信息，并且需要把自动上传给关掉。',
        link: '/content/docs/7',
        target: '_self',
      },
      {
        noIcon: true,
        title: 'npm命令总结',
        badge: {
          text: '2020-8-13',
          type: 'info',
        },
        link: '/content/docs/8',
        target: '_self',
      },
      {
        noIcon: true,
        title: 'Javascript常用API合集',
        badge: {
          text: '2020-8-28',
          type: 'info',
        },
        desc: '防抖和节流一直是面试题中出现频率非常高的题目。',
        link: '/content/docs/9',
        target: '_self',
      },
      {
        noIcon: true,
        title: '在H5页面中使用新拟态UI设计',
        badge: {
          text: '2020-9-10',
          type: 'info',
        },
        desc: '在设计达人看来这种 UI 很适合用来做概念设计的产品，当然实际应用中也可以尝试，因为视觉效果确实是很不错呢。我们来看看关于新拟态的 UI 作品。',
        link: '/content/docs/10',
        target: '_self',
      },
      {
        noIcon: true,
        title: 'Github 镜像加速，浏览器脚本',
        badge: {
          text: '2020-10-25',
          type: 'info',
        },
        desc: 'Github 作为程序员们最大的~~交友~~(搞基)平台，但是由于 Github 的服务器在大洋彼岸，导致国内用户访问速度超级慢，有时候甚至直接打不开',
        link: '/content/docs/11',
        target: '_self',
      },
      {
        noIcon: true,
        title: 'JS七种方法实现数组的去重',
        badge: {
          text: '2020-12-14',
          type: 'info',
        },
        desc: '作为面试题中出场率最高之一的经典案例，掌握数组的去重将使你在面试的过程中遇到这个问题而如鱼得水，下面我们一起来看看数组去重的这七种办法。',
        link: '/content/docs/12',
        target: '_self',
      },

      {
        noIcon: true,
        title: 'vue-router中的两种路由模式的区别',
        badge: {
          text: '2022-6-14',
          type: 'info',
        },
        link: '/content/docs/13',
        target: '_self',
      },
      {
        noIcon: true,
        title: 'Prettier常用格式化配置',
        badge: {
          text: '2022-7-20',
          type: 'info',
        },
        desc: '一个好的团队，代码风格的统一性是必不可少的，Prettier 作为大家首选的代码格式化工具，只需要简单的配置一下即可使用。今天分享一些基本的配置，以便日后查询使用。',
        link: '/content/docs/14',
        target: '_self',
      },
      {
        noIcon: true,
        title: '用uni-app仿网易云音乐遇到的问题（一）',
        badge: {
          text: '2023-3-24',
          type: 'info',
        },
        desc: '今天准备完成播放界面的开发，在设计唱片图标旋转的时候，我天真的以为使用 transform 的 roteta 就可以解决，看看代码。',
        link: '/content/docs/15',
        target: '_self',
      },
      {
        noIcon: true,
        title: '微信小程序中实现类似Vue过滤器效果',
        badge: {
          text: '2023-4-12',
          type: 'info',
        },
        desc: '今天在做微信小程序版网抑云音乐的时候，想对后端返回的数据进行处理一下再进行显示，但是微信小程序中没有像 Vue 一样的过滤器或者计算属性的功能，于是我找遍官方文档，发现有一个 WXS 语法应该可以实现这样的功能，话不多说，开整。',
        link: '/content/docs/16',
        target: '_self',
      },
      {
        noIcon: true,
        title: '详解小程序BackgroundAudioManager踩坑之旅',
        badge: {
          text: '2023-5-24',
          type: 'info',
        },
        link: '/content/docs/17',
        target: '_self',
      },
      {
        noIcon: true,
        title: '微信小程序切换密码类型的 input 组件时不弹出输入法',
        badge: {
          text: '2023-8-17',
          type: 'info',
        },
        desc: '关于这个问题，小程序官方社区在 2021 年就有人提出来了，2 年过去了，官方并没有修复....',
        link: '/content/docs/18',
        target: '_self',
      },
      {
        noIcon: true,
        title: 'post为什么会发送两次请求?',
        badge: {
          text: '2023-8-23',
          type: 'info',
        },
        desc: '要理解请求，咱们必须先了解一下什么是浏览器的同源策略....',
        link: '/content/docs/19',
        target: '_self',
      },
    ],
  },
]

// 将data 下的items反转
data.forEach((item) => {
  item.items.reverse()
})

export default data
