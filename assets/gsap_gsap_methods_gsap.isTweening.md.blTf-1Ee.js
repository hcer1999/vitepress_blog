import{l as s,c as a,a as i,a7 as e}from"./chunks/framework.dOJbCP6k.js";const _=JSON.parse('{"title":"gsap.isTweening()","description":"","frontmatter":{},"headers":[],"relativePath":"gsap/gsap/methods/gsap.isTweening.md","filePath":"gsap/gsap/methods/gsap.isTweening.md","lastUpdated":1721038367000}'),n={name:"gsap/gsap/methods/gsap.isTweening.md"},t=e(`<h1 id="gsap-istweening" tabindex="-1">gsap.isTweening() <a class="header-anchor" href="#gsap-istweening" aria-label="Permalink to &quot;gsap.isTweening()&quot;">​</a></h1><p><code>gsap.isTweening()</code> 函数报告一个特定对象是否正在被动画化。如果一个补间动画（tween）被暂停、已完成或尚未开始，则它不被认为是活动的。例如：</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gsap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isTweening</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;#id&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 执行一些操作</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>在这个例子中，如果与 <code>#id</code> 选择器匹配的对象当前没有被动画化，则执行一些操作。目标可以是选择器文本或对象/元素。</p>`,4),p=[t];function l(h,r,d,g,c,o){return i(),a("div",null,p)}const E=s(n,[["render",l]]);export{_ as __pageData,E as default};