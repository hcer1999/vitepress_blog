import{l as a,c as l,a5 as i,a as s}from"./chunks/framework.DJyBczLA.js";const c=JSON.parse('{"title":"GSAP中文文档 - tween 方法 - 全局时间（globalTime）","description":"","frontmatter":{},"headers":[],"relativePath":"gsap/tween/methods/global-time.md","filePath":"gsap/tween/methods/global-time.md","lastUpdated":1733646466000}'),t={name:"gsap/tween/methods/global-time.md"};function n(o,e,r,d,p,h){return s(),l("div",null,e[0]||(e[0]=[i(`<h1 id="gsap中文文档-tween-方法-全局时间-globaltime" tabindex="-1">GSAP中文文档 - tween 方法 - 全局时间（globalTime） <a class="header-anchor" href="#gsap中文文档-tween-方法-全局时间-globaltime" aria-label="Permalink to &quot;GSAP中文文档 - tween 方法 - 全局时间（globalTime）&quot;">​</a></h1><h2 id="全局时间-globaltime" tabindex="-1">全局时间（globalTime） <a class="header-anchor" href="#全局时间-globaltime" aria-label="Permalink to &quot;全局时间（globalTime）&quot;">​</a></h2><p>将本地时间转换为对应的 <code>gsap.globalTimeline</code> 上的时间（考虑所有嵌套、时间缩放等）。</p><h3 id="参数-parameters" tabindex="-1">参数（Parameters） <a class="header-anchor" href="#参数-parameters" aria-label="Permalink to &quot;参数（Parameters）&quot;">​</a></h3><ul><li><strong>localTime</strong>: Number <ul><li>需要转换为全局时间的本地时间。</li></ul></li></ul><h3 id="返回值-returns" tabindex="-1">返回值（Returns） <a class="header-anchor" href="#返回值-returns" aria-label="Permalink to &quot;返回值（Returns）&quot;">​</a></h3><ul><li>Number <ul><li><code>gsap.globalTimeline</code> 上对应的时间。</li></ul></li></ul><h3 id="详细信息-details" tabindex="-1">详细信息（Details） <a class="header-anchor" href="#详细信息-details" aria-label="Permalink to &quot;详细信息（Details）&quot;">​</a></h3><p>将本地时间转换为对应的 <code>gsap.globalTimeline</code> 上的时间（考虑所有嵌套、时间缩放等）。例如，如果您有一个补间嵌套在另一个时间线中，而您想要将该补间的开始时间（0）转换为它在全局时间线上的位置，您可以使用 <code>tween.globalTime(0)</code>。</p><p>默认情况下，它使用补间的总时间，所以 <code>tween.globalTime()</code> 与 <code>tween.globalTime(tween.totalTime())</code> 是相同的。</p><h3 id="示例代码-example-code" tabindex="-1">示例代码（Example Code） <a class="header-anchor" href="#示例代码-example-code" aria-label="Permalink to &quot;示例代码（Example Code）&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 将本地时间转换为全局时间</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> globalTime </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> tween.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">globalTime</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(localTime)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div>`,12)]))}const b=a(t,[["render",n]]);export{c as __pageData,b as default};