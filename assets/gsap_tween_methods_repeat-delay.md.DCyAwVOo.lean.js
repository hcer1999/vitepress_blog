import{l as a,c as s,a5 as t,a as i}from"./chunks/framework.DJyBczLA.js";const k=JSON.parse('{"title":"GSAP中文文档 - tween 方法 - 重复延迟（repeatDelay）","description":"","frontmatter":{},"headers":[],"relativePath":"gsap/tween/methods/repeat-delay.md","filePath":"gsap/tween/methods/repeat-delay.md","lastUpdated":1733646466000}'),l={name:"gsap/tween/methods/repeat-delay.md"};function n(r,e,p,d,h,o){return i(),s("div",null,e[0]||(e[0]=[t(`<h1 id="gsap中文文档-tween-方法-重复延迟-repeatdelay" tabindex="-1">GSAP中文文档 - tween 方法 - 重复延迟（repeatDelay） <a class="header-anchor" href="#gsap中文文档-tween-方法-重复延迟-repeatdelay" aria-label="Permalink to &quot;GSAP中文文档 - tween 方法 - 重复延迟（repeatDelay）&quot;">​</a></h1><h2 id="重复延迟-repeatdelay" tabindex="-1">重复延迟（repeatDelay） <a class="header-anchor" href="#重复延迟-repeatdelay" aria-label="Permalink to &quot;重复延迟（repeatDelay）&quot;">​</a></h2><p>省略参数时返回当前值（获取器），而定义参数则设置该值（设置器），并返回实例本身以便于链式调用。</p><p>获取或设置补间重复之间的时间（以秒为单位）。例如，如果 <code>repeat</code> 是 2 且 <code>repeatDelay</code> 是 1，补间将首先播放，然后等待 1 秒后重复，再次播放后，再等待 1 秒后进行最后一次重复。您可以通过 <code>vars</code> 参数设置初始 <code>repeatDelay</code> 值，如：<code>gsap.to(obj, {duration: 1, x: 100, repeat: 2, repeatDelay: 1});</code></p><p>此方法既作为获取器也作为设置器。省略参数时返回当前值（获取器），而定义参数则设置该值（设置器），并返回实例本身以便于链式调用，如 <code>myTween.repeat(2).yoyo(true).repeatDelay(0.5).play();</code></p><h3 id="参数-parameters" tabindex="-1">参数（Parameters） <a class="header-anchor" href="#参数-parameters" aria-label="Permalink to &quot;参数（Parameters）&quot;">​</a></h3><ul><li><strong>value</strong>: Number <ul><li>可选参数，设置补间重复之间的延迟时间（以秒为单位）。</li></ul></li></ul><h3 id="返回值-returns" tabindex="-1">返回值（Returns） <a class="header-anchor" href="#返回值-returns" aria-label="Permalink to &quot;返回值（Returns）&quot;">​</a></h3><ul><li>Number <ul><li>如果未提供参数，返回当前的重复延迟值。</li></ul></li><li>self <ul><li>如果提供了参数，返回实例本身以便于链式调用。</li></ul></li></ul><h3 id="示例代码-example-code" tabindex="-1">示例代码（Example Code） <a class="header-anchor" href="#示例代码-example-code" aria-label="Permalink to &quot;示例代码（Example Code）&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 获取当前重复延迟值</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> currentRepeatDelay </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> myTween.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">repeatDelay</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 设置重复延迟为 2 秒</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">myTween.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">repeatDelay</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div>`,11)]))}const u=a(l,[["render",n]]);export{k as __pageData,u as default};