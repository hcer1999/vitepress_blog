import{l as e,c as s,a5 as i,a as t}from"./chunks/framework.DJyBczLA.js";const k=JSON.parse('{"title":"GSAP中文文档 - tween 方法 - 迭代次数（iteration）","description":"","frontmatter":{},"headers":[],"relativePath":"gsap/tween/methods/iteration.md","filePath":"gsap/tween/methods/iteration.md","lastUpdated":1733646466000}'),n={name:"gsap/tween/methods/iteration.md"};function r(l,a,p,o,h,d){return t(),s("div",null,a[0]||(a[0]=[i(`<h1 id="gsap中文文档-tween-方法-迭代次数-iteration" tabindex="-1">GSAP中文文档 - tween 方法 - 迭代次数（iteration） <a class="header-anchor" href="#gsap中文文档-tween-方法-迭代次数-iteration" aria-label="Permalink to &quot;GSAP中文文档 - tween 方法 - 迭代次数（iteration）&quot;">​</a></h1><h2 id="迭代次数-iteration" tabindex="-1">迭代次数（iteration） <a class="header-anchor" href="#迭代次数-iteration" aria-label="Permalink to &quot;迭代次数（iteration）&quot;">​</a></h2><p>省略参数时返回当前值（获取器），而定义参数则设置该值（设置器），并返回实例本身以便于链式调用。</p><p>获取或设置重复补间的迭代次数。例如，第一次通过时迭代次数是 <code>1</code>，然后在第一次重复时，迭代次数是 <code>2</code>，接着是 <code>3</code>，以此类推。</p><p>设置迭代次数将导致补间跳转到指定的迭代次数。例如，如果 <code>repeat</code> 是 4，并且播放头当前在第三次重复，<code>.iteration(2)</code> 将使补间跳回到第二次迭代。</p><h3 id="参数-parameters" tabindex="-1">参数（Parameters） <a class="header-anchor" href="#参数-parameters" aria-label="Permalink to &quot;参数（Parameters）&quot;">​</a></h3><ul><li><strong>value</strong>: Number（可选） <ul><li>设置补间的迭代次数。</li></ul></li></ul><h3 id="返回值-returns" tabindex="-1">返回值（Returns） <a class="header-anchor" href="#返回值-returns" aria-label="Permalink to &quot;返回值（Returns）&quot;">​</a></h3><ul><li>Number <ul><li>如果未提供参数，返回当前迭代次数。</li></ul></li><li>self <ul><li>如果提供了参数，返回实例本身以便于链式调用。</li></ul></li></ul><h3 id="示例代码-example-code" tabindex="-1">示例代码（Example Code） <a class="header-anchor" href="#示例代码-example-code" aria-label="Permalink to &quot;示例代码（Example Code）&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 获取当前迭代次数</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> currentIteration </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> myTween.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">iteration</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 将迭代次数设置为第二次迭代</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">myTween.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">iteration</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div>`,11)]))}const u=e(n,[["render",r]]);export{k as __pageData,u as default};