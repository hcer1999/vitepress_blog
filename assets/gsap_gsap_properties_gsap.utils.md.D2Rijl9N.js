import{l as e,c as o,a as d,v as t,i as r,a7 as c}from"./chunks/framework.dOJbCP6k.js";const w=JSON.parse('{"title":"gsap.utils()","description":"","frontmatter":{},"headers":[],"relativePath":"gsap/gsap/properties/gsap.utils.md","filePath":"gsap/gsap/properties/gsap.utils.md","lastUpdated":1721038367000}'),a={name:"gsap/gsap/properties/gsap.utils.md"},s=t("h1",{id:"gsap-utils",tabindex:"-1"},[r("gsap.utils() "),t("a",{class:"header-anchor",href:"#gsap-utils","aria-label":'Permalink to "gsap.utils()"'},"​")],-1),p=t("html",null,[t("iframe",{width:"882",height:"494",src:"https://www.youtube.com/embed/NqiF5xIuMd0",title:"GSAP 3 Utility Methods Demo",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",referrerpolicy:"strict-origin-when-cross-origin",allowfullscreen:""})],-1),i=c('<h3 id="组合实用方法" tabindex="-1">组合实用方法 <a class="header-anchor" href="#组合实用方法" aria-label="Permalink to &quot;组合实用方法&quot;">​</a></h3><p><code>gsap.utils</code> 提供了一些非常有用的实用函数。注意，它们中的许多可以选择返回函数，以便它们可以直接插入到补间动画中，利用 GSAP 的基于函数的能力。在这种情况下，它们将为每个目标调用一次，而不仅仅是使用相同的结束值。</p><table><thead><tr><th>实用方法</th><th>描述</th></tr></thead><tbody><tr><td>checkPrefix()</td><td>如果需要，为提供的 CSS 属性添加前缀（例如：<code>checkPrefix(&quot;transform&quot;)</code> 在 IE9 中返回 <code>&quot;msTransform&quot;</code>；如果属性根本不受支持，则返回 null）。</td></tr><tr><td>clamp()</td><td>将值限制在特定范围内（例如：<code>clamp(0, 100, -12)</code> 返回 <code>0</code>）。</td></tr><tr><td>distribute()</td><td>在数组的对象中线性分配一个值或根据其在网格中的位置分配，可选地应用缓动。</td></tr><tr><td>getUnit()</td><td>获取字符串的单位（例如：<code>getUnit(&quot;30px&quot;)</code> 返回 <code>&quot;px&quot;</code>）。</td></tr><tr><td>interpolate()</td><td>在几乎任何两个值之间进行插值（数字、颜色、字符串、数组、复杂字符串，甚至是具有多个属性的对象）（例如：<code>interpolate(&quot;red&quot;, &quot;blue&quot;, 0.5)</code> 返回 <code>&quot;rgba(128,0,128,1)&quot;</code>）。</td></tr><tr><td>mapRange()</td><td>将一个范围映射到另一个范围（例如：<code>mapRange(-10, 10, 0, 100, 5)</code> 返回 <code>75</code>）。</td></tr><tr><td>normalize()</td><td>将一个数字映射到一个范围内，进度在 0 到 1 之间（例如：<code>normalize(100, 200, 150)</code> 返回 <code>0.5</code>）。</td></tr><tr><td>pipe()</td><td>序列一系列函数调用，将每个的结果传递给下一个（例如：<code>pipe(clamp(0, 100), snap(5))(8)</code> 返回 <code>10</code>）。</td></tr><tr><td>random()</td><td>根据参数生成一个随机数（例如：<code>random(0, 100, 5)</code> 返回 <code>65</code>）或从提供的数组中随机选择一个元素（例如：<code>random([&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;])</code> 返回 <code>&quot;red&quot;</code>）。</td></tr><tr><td>selector()</td><td>返回一个作用域限定在特定元素（或 React ref 或 Angular ElementRef）的选择器 <strong>函数</strong>。（例如：<code>selector(myElement)</code>）</td></tr><tr><td>shuffle()</td><td>就地打乱数组的内容。（例如：<code>shuffle([1, 2, 3, 4, 5])</code> 返回 <code>[4, 2, 1, 5, 3]</code>）</td></tr><tr><td>snap()</td><td>将值快照到一个增量（例如：<code>snap(5, 13)</code> 返回 <code>15</code>）或数组中最接近的值（例如：<code>snap([0, 5, 10], 7)</code> 返回 <code>5</code>）。</td></tr><tr><td>splitColor()</td><td>将任何颜色分解为其红色、绿色、蓝色（和可选的 alpha）组件。或色相、饱和度和亮度。（例如：<code>splitColor(&quot;red&quot;)</code> 返回 <code>[255, 0, 0]</code>）。</td></tr><tr><td>toArray()</td><td>将几乎所有类数组对象转换为数组，包括选择器文本！（例如：<code>toArray(&quot;.class&quot;)</code> 返回 <code>[element1, element2]</code>）。</td></tr><tr><td>unitize()</td><td>包装另一个实用函数，允许它接受带有单位的值，如 <code>&quot;20px&quot;</code> 或 <code>&quot;50%&quot;</code>，在提供给包装实用函数时剥离单位，然后将单位重新添加到结果上（例如：<code>var wrap = gsap.utils.unitize(gsap.utils.wrap(0, 100)); wrap(&quot;150px&quot;);</code> 返回 <code>&quot;50px&quot;</code>）。或强制使用特定单位（例如：<code>unitize(gsap.utils.mapRange(-10, 10, 0, 100), &quot;%&quot;);</code> 总是返回带 <code>&quot;%&quot;</code>）。</td></tr><tr><td>wrap()</td><td>将数字放入指定范围，使其超出最大值时回绕到起点，小于最小值时回绕到终点（例如：<code>wrap(5, 10, 12)</code> 返回 <code>7</code>）。或循环遍历一个 <strong>数组</strong>，使得当提供的索引大于数组长度时，它回绕到起点（例如：<code>wrap([0, 10, 20], 4)</code> 返回 <code>10</code>）。</td></tr><tr><td>wrapYoyo()</td><td>将数字放入指定范围，使其超出最大值时来回摆动回到起点，小于最小值时向前摆动到终点（例如：<code>wrapYoyo(5, 10, 12)</code> 返回 <code>8</code>）。或循环遍历一个 <strong>数组</strong>，使得当提供的索引大于数组长度时，它来回摆动回到起点（例如：<code>wrapYoyo([0, 10, 20, 30], 4)</code> 返回 <code>20</code>）。</td></tr></tbody></table><p>这些实用函数覆盖了广泛的用途，从简单的数值操作到颜色处理、数组操作等，它们可以极大地增强你在 GSAP 中的动画制作能力。</p>',4),u=[s,p,i];function l(n,q,g,m,h,_){return d(),o("div",null,u)}const b=e(a,[["render",l]]);export{w as __pageData,b as default};