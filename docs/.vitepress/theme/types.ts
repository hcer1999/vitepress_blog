export interface NavLink {
  /** 站点图标 */
  icon?: string | { svg: string }
  badge?:
    | string
    | {
        text?: string
        type?: 'info' | 'tip' | 'warning' | 'danger'
      }
  /** 站点名称 */
  title: string
  /** 站点名称 */
  desc?: string
  /** 站点链接 */
  link: string
  /** 是否在当前页跳转 */
  target?: string | '_blank' | '_self'
}

export interface NavData {
  title: string
  items: NavLink[]
}
