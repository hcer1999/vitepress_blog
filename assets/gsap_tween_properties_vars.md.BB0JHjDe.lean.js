import{l as r,c as a,v as d,i as e,K as s,k as c,a5 as n,F as l,a as p}from"./chunks/framework.DJyBczLA.js";const k=JSON.parse('{"title":"GSAP中文文档 - tween 属性 - 配置对象（vars）","description":"","frontmatter":{},"headers":[],"relativePath":"gsap/tween/properties/vars.md","filePath":"gsap/tween/properties/vars.md","lastUpdated":1733646466000}'),i={name:"gsap/tween/properties/vars.md"},m={class:"info custom-block"};function u(w,t,f,v,g,h){const o=l("Badge");return p(),a("div",null,[t[3]||(t[3]=d("h1",{id:"gsap中文文档-tween-属性-配置对象-vars",tabindex:"-1"},[e("GSAP中文文档 - tween 属性 - 配置对象（vars） "),d("a",{class:"header-anchor",href:"#gsap中文文档-tween-属性-配置对象-vars","aria-label":'Permalink to "GSAP中文文档 - tween 属性 - 配置对象（vars）"'},"​")],-1)),t[4]||(t[4]=d("h2",{id:"配置对象-vars",tabindex:"-1"},[e("配置对象（vars） "),d("a",{class:"header-anchor",href:"#配置对象-vars","aria-label":'Permalink to "配置对象（vars）"'},"​")],-1)),d("div",m,[t[2]||(t[2]=d("p",{class:"custom-block-title"},"-",-1)),d("p",null,[t[1]||(t[1]=e("vars: ")),s(o,{type:"tip"},{default:c(()=>t[0]||(t[0]=[e("Object")])),_:1})])]),t[5]||(t[5]=n('<p>传递给构造函数的配置对象，其中包含您想要动画化的所有属性/值，以及任何可选的<strong>特殊属性</strong>，如 <code>onComplete</code>, <code>onUpdate</code> 等，例如 <code>gsap.to(&quot;.class&quot;,{onComplete: func});</code></p><h2 id="详细信息" tabindex="-1">详细信息 <a class="header-anchor" href="#详细信息" aria-label="Permalink to &quot;详细信息&quot;">​</a></h2><table><thead><tr><th>属性</th><th>描述</th><th>默认值</th></tr></thead><tbody><tr><td>callbackScope</td><td>用于所有回调（onStart, onUpdate, onComplete 等）的作用域。</td><td></td></tr><tr><td>data</td><td>将任意数据分配给此属性（一个字符串，一个对象的引用，任何东西），它会附加到 tween 实例本身，以便您稍后可以像 <code>yourTween.data</code> 一样引用它。</td><td></td></tr><tr><td>delay</td><td>动画应该开始之前的延迟时间（以秒为单位）。</td><td></td></tr><tr><td>duration</td><td>动画的持续时间（以秒为单位）。</td><td><code>0.5</code></td></tr><tr><td>ease</td><td>控制动画期间的变化率，赋予它特定的感觉。例如，<code>&quot;elastic&quot;</code> 或 <code>&quot;strong.inOut&quot;</code>。<code>ease</code> 可以是一个字符串（最常见的）或是一个接受一个介于 0 和 1 之间的进度值并返回一个转换后的、标准化的值的函数。</td><td><code>&quot;power1.out&quot;</code></td></tr><tr><td>id</td><td>允许您（可选地）为您的 tween 实例分配一个唯一标识符，以便您稍后可以使用 <code>gsap.getById()</code> 找到它，并且它会在 GSDevTools 中以该 id 显示。</td><td></td></tr><tr><td>immediateRender</td><td>通常，tween 会等到下一个更新周期（tick）才进行第一次渲染，除非您指定了延迟。设置 <code>immediateRender: true</code> 可以强制它在实例化时立即渲染。</td><td><code>false</code> 对于 to() tweens，<code>true</code> 对于 from() 和 fromTo() tweens 或任何具有 scrollTrigger 应用的 tweens</td></tr><tr><td>inherit</td><td>通常，tweens 会继承其父时间线的 <code>defaults</code> 对象（如果定义了的话），但您可以通过设置 <code>inherit: false</code> 在每个 tween 基础上禁用此行为。</td><td></td></tr><tr><td>lazy</td><td>当 tween 首次渲染并读取其起始值时，GSAP 会尝试将值的写入延迟到当前“tick”的最后，这可以提高性能，因为它避免了浏览器不喜欢的读写/读写布局破坏。要为特定 tween 禁用延迟渲染，请设置 <code>lazy: false</code>。</td><td><code>true</code>（零持续时间的 tweens 除外）</td></tr><tr><td>onComplete</td><td>当动画完成时调用的函数。</td><td></td></tr><tr><td>onCompleteParams</td><td>传递给 onComplete 函数的参数数组。</td><td></td></tr><tr><td>onRepeat</td><td>每次动画进入新的迭代周期（重复）时调用的函数。这只在您设置非零 <code>repeat</code> 时发生。</td><td></td></tr><tr><td>onRepeatParams</td><td>传递给 onRepeat 函数的参数数组。</td><td></td></tr><tr><td>onReverseComplete</td><td>当动画从反向到达其开始时调用的函数（不包括重复）。</td><td></td></tr><tr><td>onReverseCompleteParams</td><td>传递给 onReverseComplete 函数的参数数组。</td><td></td></tr><tr><td>onStart</td><td>当动画开始时调用的函数（当其时间从 0 变为其他值时，如果 tween 多次重启，这种情况可能会发生多次）。</td><td></td></tr><tr><td>onStartParams</td><td>传递给 onStart 函数的参数数组。</td><td></td></tr><tr><td>onUpdate</td><td>每次动画更新时调用的函数（在移动其播放头的每个“tick”上）。</td><td></td></tr><tr><td>onUpdateParams</td><td>传递给 onUpdate 函数的参数数组。</td><td></td></tr><tr><td>overwrite</td><td>如果为 <code>true</code>，则所有相同目标的 tweens 将立即被杀死，无论它们影响哪些属性。如果为 <code>&quot;auto&quot;</code>，则当 tween 第一次渲染时，它会寻找任何活动的动画中的冲突（影响相同目标的相同属性）并仅杀死其他 tweens 的<strong>这些部分</strong>。</td><td><code>false</code></td></tr><tr><td>paused</td><td>如果为 <code>true</code>，则动画将在创建后立即暂停。</td><td><code>false</code></td></tr><tr><td>repeat</td><td>动画应该重复的次数。<code>repeat: 1</code> 将播放总共两次迭代。<code>repeat: -1</code> 将无限重复。</td><td><code>0</code></td></tr><tr><td>repeatDelay</td><td>重复之间的等待时间（以秒为单位）。</td><td><code>0</code></td></tr><tr><td>repeatRefresh</td><td>设置 <code>repeatRefresh: true</code> 会导致重复的 tween 在每次完整迭代（不包括 yoyo 的）时 <code>invalidate()</code> 并重新记录其起始/结束值。</td><td></td></tr><tr><td>reversed</td><td>如果为 <code>true</code>，则动画将从其播放头反转开始，这意味着它将朝向其开始移动。</td><td></td></tr><tr><td>runBackwards</td><td>如果为 <code>true</code>，则动画将反转其起始和结束值（这就是 from() tween 在内部做的），尽管 ease 不会被翻转。</td><td></td></tr><tr><td>stagger</td><td>如果定义了多个目标，您可以通过设置像 <code>stagger: 0.1</code>（每个开始时间之间 0.1 秒）的值来轻松地错开开始时间。</td><td></td></tr><tr><td>startAt</td><td>为任何属性定义起始值（即使它们不进行动画化）。</td><td></td></tr><tr><td>yoyo</td><td>如果为 <code>true</code>，则每隔一次 <code>repeat</code> 迭代将反向运行，使 tween 看起来来回移动。</td><td><code>false</code></td></tr><tr><td>yoyoEase</td><td>允许您在 tween 的 <code>yoyo</code> 阶段改变 ease。</td><td><code>false</code></td></tr><tr><td>keyframes</td><td>要将目标动画化到各种状态，使用 <code>keyframes</code> - 一个 vars 对象数组，作为 <code>to()</code> tweens。</td><td></td></tr></tbody></table>',3))])}const b=r(i,[["render",u]]);export{k as __pageData,b as default};