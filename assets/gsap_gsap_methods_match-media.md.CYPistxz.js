import{l as n,c as l,a5 as i,v as s,i as e,a as p}from"./chunks/framework.DJyBczLA.js";const o=JSON.parse('{"title":"GSAP中文文档 - gsap.matchMedia()","description":"","frontmatter":{},"headers":[],"relativePath":"gsap/gsap/methods/match-media.md","filePath":"gsap/gsap/methods/match-media.md","lastUpdated":1733646466000}'),t={name:"gsap/gsap/methods/match-media.md"};function h(k,a,r,d,E,c){return p(),l("div",null,a[0]||(a[0]=[i(`<h1 id="gsap中文文档-gsap-matchmedia" tabindex="-1">GSAP中文文档 - gsap.matchMedia() <a class="header-anchor" href="#gsap中文文档-gsap-matchmedia" aria-label="Permalink to &quot;GSAP中文文档 - gsap.matchMedia()&quot;">​</a></h1><h2 id="gsap-matchmedia" tabindex="-1">gsap.matchMedia() <a class="header-anchor" href="#gsap-matchmedia" aria-label="Permalink to &quot;gsap.matchMedia()&quot;">​</a></h2><p>返回类型：MatchMedia</p><p><code>gsap.matchMedia()</code> 允许您将设置代码放入一个函数中，该函数仅在特定的媒体查询匹配时执行，并且当不再匹配时，该函数执行期间创建的所有 GSAP 动画和 ScrollTriggers 将<strong>自动撤销</strong>！它是实现响应式、可访问动画和 ScrollTriggers 的理想选择。为移动设备/桌面或 <code>prefers-reduced-motion</code> 可访问性进行自定义非常简单。</p><p>每个媒体查询字符串与您传递给浏览器原生 <code>window.matchMedia()</code> 的完全相同。</p><h4 id="基本语法" tabindex="-1">基本语法 <a class="header-anchor" href="#基本语法" aria-label="Permalink to &quot;基本语法&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 创建</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> mm </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> gsap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">matchMedia</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 添加媒体查询。当匹配时，关联的函数将运行</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mm.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;(min-width: 800px)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 仅在视口宽度至少为 800px 时运行此设置代码</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  gsap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">to</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  gsap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ScrollTrigger.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 可选</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 自定义清理代码（在停止匹配时运行）</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 稍后，如果我们需要撤销所有动画/ScrollTriggers...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mm.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">revert</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>我们创建一个 <code>mm</code> 变量用于 MatchMedia，以便我们可以向该对象添加任意数量的媒体查询。这样，我们就可以在单个对象上调用 <code>revert()</code>，以立即撤销在任何关联 MatchMedia 函数中创建的所有动画/ScrollTriggers。</p><p>当匹配时，函数将被调用。因此，如果用户多次调整浏览器大小，越过断点并返回，该函数将被多次调用。</p><h4 id="add-参数" tabindex="-1">.add() 参数 <a class="header-anchor" href="#add-参数" aria-label="Permalink to &quot;.add() 参数&quot;">​</a></h4><ol><li><strong>query/conditions</strong> - 媒体查询字符串，如 <code>&quot;(min-width: 800px)&quot;</code> <strong>或</strong> 条件对象，您可以指定任意数量的查询字符串；您将能够检查每个查询字符串的匹配状态（布尔值）。有关条件语法的详细信息，请参见下文。</li><li><strong>handler function</strong> - 匹配时调用的函数。在此函数执行期间创建的所有 GSAP 动画和 ScrollTriggers 将被收集在上下文中，以便在 MatchMedia 被撤销时可以撤销它们（例如，当条件停止匹配时）。</li><li><strong>scope</strong> <em>[可选]</em> - 所有 GSAP 相关的选择器文本在处理函数内的调用将限定在此元素或 React Ref 或 Angular ElementRef。想象一下，这就像是在此元素上调用 <code>querySelectorAll()</code>，因此只有它的后代才能被选择。有关详细信息，请参见下文。</li></ol><p>结构如下：</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mm.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;(min-width: 800px)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}, myElementOrRef);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="简单的桌面-移动示例" tabindex="-1">简单的桌面/移动示例 <a class="header-anchor" href="#简单的桌面-移动示例" aria-label="Permalink to &quot;简单的桌面/移动示例&quot;">​</a></h4><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> mm </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> gsap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">matchMedia</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mm.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;(min-width: 800px)&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 桌面设置代码在这里...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mm.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;(max-width: 799px)&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 移动设置代码在这里...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h4 id="条件语法" tabindex="-1">条件语法 <a class="header-anchor" href="#条件语法" aria-label="Permalink to &quot;条件语法&quot;">​</a></h4><p>如果您针对各种媒体查询的设置代码大部分相同，但有几个关键值不同怎么办？如果您分别 <code>add()</code> 每个媒体查询，可能会导致大量的<strong>冗余代码</strong>。使用条件语法！在第一个参数中，不要使用字符串，而使用<strong>具有任意命名条件的对象</strong>，然后函数将在<strong>任何</strong>条件匹配时被调用，并且您可以将每个条件作为布尔值（匹配或不匹配）进行检查。条件对象可能如下所示：</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  isDesktop</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;(min-width: 800px)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  isMobile</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;(max-width: 799px)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  reduceMotion</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;(prefers-reduced-motion: reduce)&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>您可以随意命名条件。</p><p>下面我们将在 800px 宽度处设置断点，并尊重用户的 <code>prefers-reduced-motion</code> 偏好，利用相同的设置代码，并在必要时使用条件逻辑：</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> mm </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> gsap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">matchMedia</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  breakPoint </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 800</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mm.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 设置任意数量的任意命名条件。下面的函数将在任何条件匹配时调用。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    isDesktop: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`(min-width: \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">breakPoint</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}px)\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    isMobile: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`(max-width: \${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">breakPoint</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}px)\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    reduceMotion: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;(prefers-reduced-motion: reduce)&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">context</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // context.conditions 为上面定义的每个条件都有一个布尔属性，指示它是否匹配。</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { isDesktop, isMobile, reduceMotion } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> context.conditions</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    gsap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">to</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;.box&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      rotation: isDesktop </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 360</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> :</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 180</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 如果是桌面环境，则旋转更多</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      duration: reduceMotion </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> :</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 如果 prefer reduced motion，则跳到结尾</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    })</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 可选返回一个清理函数，当所有条件不再匹配时将被调用（在匹配之后）。</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 它将自动调用 context.revert() - 这里不要这么做。只在这里放置自定义清理代码。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>简洁明了！🎉</p><p>它将在<strong>任何</strong>条件切换时撤销并再次运行处理函数（当然，如果没有任何条件匹配，它不会再次运行）。例如，如果您有三个条件，其中两个匹配，它将运行。然后，如果一个匹配的查询<strong>停止</strong>匹配（切换到 <code>false</code>），它将撤销并使用更新的条件值再次运行该函数。</p><p>注意，上下文作为唯一的参数创建并传入。如果您需要稍后创建事件处理程序或执行其他代码，这可能很有用，以便在调用 MatchMedia 上的 <code>revert()</code> 时创建的动画/ScrollTriggers 应该被撤销。</p><h3 id="使用条件语法的演示" tabindex="-1">使用条件语法的演示 <a class="header-anchor" href="#使用条件语法的演示" aria-label="Permalink to &quot;使用条件语法的演示&quot;">​</a></h3>`,25),s("iframe",{src:"https://codepen.io/GreenSock/pen/KKoMpMv",width:"100%",height:"500",scrolling:"no",frameborder:"no",allowtransparency:"true",allowfullscreen:"true",allow:"autoplay; fullscreen; payment"},null,-1),i(`<h3 id="交互性和清理" tabindex="-1">交互性和清理 <a class="header-anchor" href="#交互性和清理" aria-label="Permalink to &quot;交互性和清理&quot;">​</a></h3><p>在执行函数时创建的 GSAP 动画和 ScrollTriggers 会被记录在上下文中，但是如果您设置了事件侦听器，例如 &quot;click&quot; 事件，它们将在 MatchMedia 函数执行完毕后的某个时间运行，怎么办？您可以将一个命名函数添加到上下文对象本身，以便当它运行时，该函数中创建的任何动画/ScrollTriggers 将被收集到上下文中，如下所示：</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> mm </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> gsap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">matchMedia</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mm.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;(min-width: 800px)&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">context</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  context.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;onClick&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    gsap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">to</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;.box&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, { rotation: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">360</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 现在它被记录在上下文中</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  })</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  myButton.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;click&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, context.onClick)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 确保在清理函数中清理事件侦听器！</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    myButton.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">removeEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;click&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, context.onClick)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="限定选择器文本" tabindex="-1">限定选择器文本 <a class="header-anchor" href="#限定选择器文本" aria-label="Permalink to &quot;限定选择器文本&quot;">​</a></h3><p>您可以选择性地传递一个元素或 React Ref 或 Angular ElementRef 作为第三个参数，然后提供的所有选择器文本将被限定到那个特定的元素/引用（就像在该元素/引用上调用 <code>querySelectorAll()</code>）。</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> mm </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> gsap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">matchMedia</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mm.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;(min-width: 800px)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  gsap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">to</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;.box&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, {</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 普通的选择器文本，自动限定到 myRefOrElement</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}, myRefOrElement); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 限定！！！</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><code>scope</code> 可以是选择器文本本身，如 <code>&quot;.myClass&quot;</code>，或一个元素，React Ref 或 Angular ElementRef。</p><p>当您创建 MatchMedia 时，可以设置一个<strong>默认作用域</strong>，将其作为唯一参数传递：</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> mm </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> gsap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">matchMedia</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(myRefOrElement);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mm.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;(min-width: 800px)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 选择器文本限定到 myRefOrElement</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  gsap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">to</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;.class&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, {</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mm.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;(max-width: 799px)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 选择器文本限定到 myOtherElement</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  gsap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">to</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;.class&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, {</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}, myOtherElement); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 覆盖默认作用域！！！</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="刷新所有匹配项" tabindex="-1">刷新所有匹配项 <a class="header-anchor" href="#刷新所有匹配项" aria-label="Permalink to &quot;刷新所有匹配项&quot;">​</a></h3><p>使用 <code>gsap.matchMediaRefresh()</code> 可以立即撤销所有活动/匹配的 MatchMedia 对象，然后运行当前匹配的任何对象。如果您需要适应切换减少运动偏好的 UI 复选框，这可能非常有用。</p><h3 id="可访问动画与-prefers-reduced-motion" tabindex="-1">可访问动画与 prefers-reduced-motion <a class="header-anchor" href="#可访问动画与-prefers-reduced-motion" aria-label="Permalink to &quot;可访问动画与 prefers-reduced-motion&quot;">​</a></h3><p>我们都喜欢这里的动画，但它可能会让一些患有前庭障碍的用户感到恶心。尊重他们的偏好，提供最小的动画或根本没有动画，这一点非常重要。我们可以为此利用 prefers reduced motion 媒体查询。</p><h3 id="简单示例" tabindex="-1">简单示例 <a class="header-anchor" href="#简单示例" aria-label="Permalink to &quot;简单示例&quot;">​</a></h3>`,14),s("iframe",{src:"https://codepen.io/GreenSock/pen/qBoRdqp",width:"100%",height:"500",scrolling:"no",frameborder:"no",allowtransparency:"true",allowfullscreen:"true",allow:"autoplay; fullscreen; payment"},null,-1),s("h3",{id:"复选框切换",tabindex:"-1"},[e("复选框切换 "),s("a",{class:"header-anchor",href:"#复选框切换","aria-label":'Permalink to "复选框切换"'},"​")],-1),s("iframe",{src:"https://codepen.io/GreenSock/pen/RwMQwpR",width:"100%",height:"500",scrolling:"no",frameborder:"no",allowtransparency:"true",allowfullscreen:"true",allow:"autoplay; fullscreen; payment"},null,-1),i('<p>更多信息请参见这篇 <a href="https://css-tricks.com/empathetic-animation/" target="_blank" rel="noreferrer">CSS tricks</a> 文章。</p><h3 id="我需要使用-gsap-context-吗" tabindex="-1">我需要使用 gsap.context() 吗？ <a class="header-anchor" href="#我需要使用-gsap-context-吗" aria-label="Permalink to &quot;我需要使用 gsap.context() 吗？&quot;">​</a></h3><p>不需要！内部地，gsap.matchMedia() 创建了一个 gsap.context()，所以同时使用两者将是多余的，也完全没有必要。把 gsap.matchMedia() 想象成一个围绕 gsap.context() 的专门包装器。所以当您调用 gsap.matchMedia() 对象上的 <code>revert()</code> 时，它与在 gsap.context() 上调用它是一样的。</p><h3 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h3><p><a href="https://codepen.io/collection/vBebgJ" target="_blank" rel="noreferrer">查看 CodePen 集合</a>。</p><h3 id="移动设备似乎不起作用" tabindex="-1">移动设备似乎不起作用？ <a class="header-anchor" href="#移动设备似乎不起作用" aria-label="Permalink to &quot;移动设备似乎不起作用？&quot;">​</a></h3><p>尝试在 <code>&lt;head&gt;&lt;/head&gt;</code> 中添加以下内容：</p><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">meta</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;viewport&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;width=device-width, initial-scale=1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>gsap.matchMedia() 在 GSAP <strong>3.11.0</strong> 中添加。</p>',9)]))}const y=n(t,[["render",h]]);export{o as __pageData,y as default};