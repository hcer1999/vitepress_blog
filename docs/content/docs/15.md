# 用 uni-app 仿网易云音乐遇到的问题（一）

今天准备完成播放界面的开发，在设计唱片图标旋转的时候，我天真的以为使用 transform 的 roteta 就可以解决，看看代码。

![](http://cdn.bingkele.cc/FtYsMXcEeUdCyx0batOdw6W0YFPU)

再看看执行效果

![](http://cdn.bingkele.cc/FgkXqG4-Jatin4lcnhjrsINv19xe)

就 TM 转了一圈！！！！

秃然想起使用自定义动画解决。

整！

上代码！

```css
/*
			rotate : 定义的动画名称
			10s : 动画时间
			linear : 动画平滑
			infinite :使动画无限循环
			transform:rotate(旋转角度)
			%0:动画开始
			%100:动画结束
*/
			@keyframes rotate {
				0% {
					transform: rotate(0deg);
				}

​				20% {
​					transform: rotate(72deg);
​				}

​				40% {
​					transform: rotate(144deg);
​				}

​				60% {
​					transform: rotate(216deg);
​				}

​				80% {
​					transform: rotate(288deg);
​				}

​				100% {
​	}
}
```

再看看效果

![](http://cdn.bingkele.cc/FojXO5qcv5ojdZn-w46HvGQLqDqr)

完美解决！
