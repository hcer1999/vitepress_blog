import{l as e,c as s,a5 as i,a as l}from"./chunks/framework.DJyBczLA.js";const k=JSON.parse('{"title":"GSAP中文文档 - timeline 方法 - 终止（kill）","description":"","frontmatter":{},"headers":[],"relativePath":"gsap/timeline/methods/kill.md","filePath":"gsap/timeline/methods/kill.md","lastUpdated":1733646466000}'),n={name:"gsap/timeline/methods/kill.md"};function t(r,a,p,d,o,h){return l(),s("div",null,a[0]||(a[0]=[i(`<h1 id="gsap中文文档-timeline-方法-终止-kill" tabindex="-1">GSAP中文文档 - timeline 方法 - 终止（kill） <a class="header-anchor" href="#gsap中文文档-timeline-方法-终止-kill" aria-label="Permalink to &quot;GSAP中文文档 - timeline 方法 - 终止（kill）&quot;">​</a></h1><h2 id="终止-kill" tabindex="-1">终止（kill） <a class="header-anchor" href="#终止-kill" aria-label="Permalink to &quot;终止（kill）&quot;">​</a></h2><p>立即终止时间线并将其从父时间线中移除，停止其动画。</p><h3 id="方法签名" tabindex="-1">方法签名 <a class="header-anchor" href="#方法签名" aria-label="Permalink to &quot;方法签名&quot;">​</a></h3><div class="language-plaintext vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>kill(): Timeline</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>立即停止动画，将其从父时间线中移除，并释放它以便垃圾回收。<strong>注意</strong>：如果您稍后想要再次使用动画，请不要使用 <code>kill()</code> - 您可以使用 <code>pause()</code> 暂停它，以便重用。</p><h3 id="返回值-returns" tabindex="-1">返回值（Returns） <a class="header-anchor" href="#返回值-returns" aria-label="Permalink to &quot;返回值（Returns）&quot;">​</a></h3><ul><li>Timeline <ul><li>自身（用于链式调用）。</li></ul></li></ul><h3 id="详细信息-details" tabindex="-1">详细信息（Details） <a class="header-anchor" href="#详细信息-details" aria-label="Permalink to &quot;详细信息（Details）&quot;">​</a></h3><p>立即停止动画，将其从父时间线中移除，并释放它以便垃圾回收。<strong>注意</strong>：如果您稍后想要再次使用动画，请不要使用 <code>kill()</code> - 您可以使用 <code>pause()</code> 暂停它，以便重用。</p><h2 id="示例代码-example-code" tabindex="-1">示例代码（Example Code） <a class="header-anchor" href="#示例代码-example-code" aria-label="Permalink to &quot;示例代码（Example Code）&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 终止时间线</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tl.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">kill</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 设置为 null，以便移除引用</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div>`,12)]))}const u=e(n,[["render",t]]);export{k as __pageData,u as default};