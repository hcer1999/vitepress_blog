import{l as i,c as a,a5 as e,a as n}from"./chunks/framework.DJyBczLA.js";const E=JSON.parse('{"title":"GSAP中文文档 - tween 属性 - 比率（ratio）","description":"","frontmatter":{},"headers":[],"relativePath":"gsap/tween/properties/ratio.md","filePath":"gsap/tween/properties/ratio.md","lastUpdated":1733646466000}'),t={name:"gsap/tween/properties/ratio.md"};function p(h,s,l,k,r,o){return n(),a("div",null,s[0]||(s[0]=[e(`<h1 id="gsap中文文档-tween-属性-比率-ratio" tabindex="-1">GSAP中文文档 - tween 属性 - 比率（ratio） <a class="header-anchor" href="#gsap中文文档-tween-属性-比率-ratio" aria-label="Permalink to &quot;GSAP中文文档 - tween 属性 - 比率（ratio）&quot;">​</a></h1><h2 id="比率-ratio" tabindex="-1">比率（ratio） <a class="header-anchor" href="#比率-ratio" aria-label="Permalink to &quot;比率（ratio）&quot;">​</a></h2><p><strong>只读</strong> Tween 的进度（一个介于 0 和 1 之间的值，其中 0.5 在中间）<strong>经过</strong> <code>ease</code> 函数处理后的结果。因此，这个值可能会超出 0-1 的范围，比如在 <code>ease: &quot;back&quot;</code> 或 <code>ease: &quot;elastic&quot;</code> 的情况下。它可以用作您自己的插值的乘数，比如在 <code>onUpdate</code> 回调中。</p><p>所以，如果您有一个一秒长的 tween，其 ease 设置为 <code>&quot;power2.out&quot;</code>，在 0.5 秒的标记处（进度也是一半），<code>tween.progress()</code> 会报告 0.5，而 <code>tween.ratio</code> 会报告 0.875。如下代码所示，<code>this.ratio</code> 总是等于您可以通过将 tween 的 <code>.progress()</code> 传递给 ease 函数获得的值。</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> easeFunc</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> gsap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">parseEase</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;power2.out&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> tween</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> gsap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">to</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ foo: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }, { foo: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, duration: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, ease: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;power2.out&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tween.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pause</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 在这个一秒长的 tween 中暂停在 0.5 秒，也就是半路</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tween.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">progress</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 0.5</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tween.ratio) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 0.875</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">easeFunc</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tween.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">progress</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">())) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 0.875</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div>`,5)]))}const g=i(t,[["render",p]]);export{E as __pageData,g as default};