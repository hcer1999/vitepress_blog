# gsap.matchMediaRefresh()

立即恢复所有活动/匹配的 MatchMedia 对象，然后运行当前匹配的任何对象。当您需要容纳一个可以切换“减少运动”之类的内容的 UI 复选框时，这会特别有用：

### Demo

<iframe src="https://codepen.io/GreenSock/pen/RwMQwpR" width="100%" height="500" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" allow="autoplay; fullscreen; payment"></iframe>

请注意，它不会销毁任何 gsap.matchMedia() 实例。它只是恢复任何当前匹配的，然后重新运行任何匹配的。可以想象一下，如果您完全调整窗口大小，使所有当前匹配的窗口不再匹配，然后将窗口大小调整回原始大小，以便它们再次匹配，会发生什么情况。
