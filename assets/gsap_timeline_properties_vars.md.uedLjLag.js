import{l as e,c as o,a5 as d,a as r}from"./chunks/framework.DJyBczLA.js";const u=JSON.parse('{"title":"GSAP中文文档 - timeline 属性 - 配置对象（vars）","description":"","frontmatter":{},"headers":[],"relativePath":"gsap/timeline/properties/vars.md","filePath":"gsap/timeline/properties/vars.md","lastUpdated":1733646466000}'),a={name:"gsap/timeline/properties/vars.md"};function n(c,t,s,p,i,m){return r(),o("div",null,t[0]||(t[0]=[d('<h1 id="gsap中文文档-timeline-属性-配置对象-vars" tabindex="-1">GSAP中文文档 - timeline 属性 - 配置对象（vars） <a class="header-anchor" href="#gsap中文文档-timeline-属性-配置对象-vars" aria-label="Permalink to &quot;GSAP中文文档 - timeline 属性 - 配置对象（vars）&quot;">​</a></h1><h2 id="配置对象-vars" tabindex="-1">配置对象（vars） <a class="header-anchor" href="#配置对象-vars" aria-label="Permalink to &quot;配置对象（vars）&quot;">​</a></h2><p>通过构造函数传递给原始时间线的配置对象，如 <code>gsap.timeline({onComplete: func});</code></p><h2 id="详细信息-details" tabindex="-1">详细信息（Details） <a class="header-anchor" href="#详细信息-details" aria-label="Permalink to &quot;详细信息（Details）&quot;">​</a></h2><p><code>vars</code> 对象包含您希望时间线拥有的所有属性/值。</p><table><thead><tr><th>属性</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td><strong>autoRemoveChildren</strong></td><td>Boolean</td><td>如果设置为 <code>true</code>，则子补间/时间线完成后将自动被杀死/移除。默认为 <code>false</code>，除了根时间线。</td></tr><tr><td><strong>callbackScope</strong></td><td>Object</td><td>所有回调（<code>onStart</code>, <code>onUpdate</code>, <code>onComplete</code> 等）使用的作用域。作用域是回调内部 <code>this</code> 引用的对象。</td></tr><tr><td><strong>defaults</strong></td><td>Object</td><td>设置默认值，这些默认值会被子动画继承。详见 &quot;defaults&quot; 部分。</td></tr><tr><td><strong>delay</strong></td><td>Number</td><td>动画开始前的延迟时间，以秒为单位。</td></tr><tr><td><strong>onComplete</strong></td><td>Function</td><td>动画完成时调用的函数。</td></tr><tr><td><strong>onCompleteParams</strong></td><td>Array</td><td>传递给 <code>onComplete</code> 函数的参数数组。例如，<code>gsap.timeline({onComplete: myFunction, onCompleteParams: [&quot;param1&quot;, &quot;param2&quot;]});</code>。</td></tr><tr><td><strong>onInterrupt</strong></td><td>Function</td><td>动画被中断时调用的函数。注意，如果动画正常完成，则不会触发此事件。</td></tr><tr><td><strong>onInterruptParams</strong></td><td>Array</td><td>传递给 <code>onInterrupt</code> 函数的参数数组。例如，<code>gsap.to(&quot;.class&quot;, {x:100, onInterrupt:myFunction, onInterruptParams:[&quot;param1&quot;, &quot;param2&quot;]});</code>。</td></tr><tr><td><strong>onRepeat</strong></td><td>Function</td><td>动画每次重复时调用的函数。</td></tr><tr><td><strong>onRepeatParams</strong></td><td>Array</td><td>传递给 <code>onRepeat</code> 函数的参数数组。例如，<code>gsap.timeline({onRepeat: myFunction, onRepeatParams: [&quot;param1&quot;, &quot;param2&quot;]});</code>。</td></tr><tr><td><strong>onReverseComplete</strong></td><td>Function</td><td>动画从反向到达开始时调用的函数。例如，如果调用了 <code>reverse()</code>，则补间会向开始移动，当其 <code>time</code> 达到 <code>0</code> 时，<code>onReverseComplete</code> 将被调用。</td></tr><tr><td><strong>onReverseCompleteParams</strong></td><td>Array</td><td>传递给 <code>onReverseComplete</code> 函数的参数数组。例如，<code>gsap.timeline({onReverseComplete: myFunction, onReverseCompleteParams: [&quot;param1&quot;, &quot;param2&quot;]});</code>。</td></tr><tr><td><strong>onStart</strong></td><td>Function</td><td>动画开始时调用的函数（当其 <code>time</code> 从 <code>0</code> 变为其他值时，如果补间多次重启，可能会发生多次）。</td></tr><tr><td><strong>onStartParams</strong></td><td>Array</td><td>传递给 <code>onStart</code> 函数的参数数组。例如，<code>gsap.timeline({onStart: myFunction, onStartParams: [&quot;param1&quot;, &quot;param2&quot;]});</code>。</td></tr><tr><td><strong>onUpdate</strong></td><td>Function</td><td>动画每次更新时调用的函数（在动画活动期间的每一帧）。</td></tr><tr><td><strong>onUpdateParams</strong></td><td>Array</td><td>传递给 <code>onUpdate</code> 函数的参数数组。例如，<code>gsap.timeline({onUpdate: myFunction, onUpdateParams: [&quot;param1&quot;, &quot;param2&quot;]});</code>。</td></tr><tr><td><strong>paused</strong></td><td>Boolean</td><td>如果为 <code>true</code>，则动画将在创建后立即暂停。</td></tr><tr><td><strong>repeat</strong></td><td>Number</td><td>动画在第一次迭代后应重复的次数。例如，如果 <code>repeat</code> 是 <code>1</code>，则动画将总共播放两次（初始播放加上1次重复）。要无限重复，请使用 <code>-1</code>。<code>repeat</code> 应始终为整数。</td></tr><tr><td><strong>repeatDelay</strong></td><td>Number</td><td>重复之间的时间，以秒为单位。例如，如果 <code>repeat</code> 是 <code>2</code> 且 <code>repeatDelay</code> 是 <code>1</code>，则动画将首先播放，然后等待1秒再重复，然后再次播放，然后再等待1秒再进行最后一次重复。</td></tr><tr><td><strong>repeatRefresh</strong></td><td>Boolean</td><td>设置 <code>repeatRefresh: true</code> 会导致重复时间线在每次完整迭代（不包括悠悠）时 <code>invalidate()</code> 其所有子补间，并在内部重新记录它们的起始/结束值。这在您使用动态值（相对的、随机的或基于函数的）时很有用。例如，<code>x: &quot;random(-100, 100)&quot;</code> 将在每次重复时获得一个新的随机 x 值。<code>duration</code>、<code>delay</code> 和 <code>stagger</code> 不会刷新。</td></tr><tr><td><strong>smoothChildTiming</strong></td><td>Boolean</td><td>控制子动画是否自动重新定位（更改它们的 <code>startTime</code>）以在运行时更改属性时保持平滑播放。例如，想象时间线的播放头在一个孩子补间上，该补间完成了 75%，移动元素的左边从 0 到 100，然后调用该补间的 <code>reverse()</code> 方法。如果 <code>smoothChildTiming</code> 是 <code>false</code>（默认值，除了全局时间线外），补间将在原地翻转，保持其 <code>startTime</code> 一致。因此，时间线的播放头现在将在补间的 25% 完成点而不是 75%。详见 &quot;时间线如何工作？&quot; 部分。</td></tr><tr><td><strong>yoyo</strong></td><td>Boolean</td><td>如果为 <code>true</code>，则每隔一次重复周期将朝相反方向运行，使补间看起来来回移动（先前然后后）。这不会直接影响 <code>reversed</code> 属性。所以如果 <code>repeat</code> 是 <code>2</code> 且 <code>yoyo</code> 是 <code>false</code>，它看起来像：开始 - 1 - 2 - 3 - 1 - 2 - 3 - 1 - 2 - 3 - 结束。但如果 <code>yoyo</code> 是 <code>true</code>，它看起来像：开始 - 1 - 2 - 3 - 3 - 2 - 1 - 1 - 2 - 3 - 结束。</td></tr></tbody></table>',6)]))}const g=e(a,[["render",n]]);export{u as __pageData,g as default};