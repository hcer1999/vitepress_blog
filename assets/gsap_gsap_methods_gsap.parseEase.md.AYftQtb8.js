import{l as s,c as a,a as i,a7 as e}from"./chunks/framework.dOJbCP6k.js";const o=JSON.parse('{"title":"gsap.parseEase()","description":"","frontmatter":{},"headers":[],"relativePath":"gsap/gsap/methods/gsap.parseEase.md","filePath":"gsap/gsap/methods/gsap.parseEase.md","lastUpdated":1721038367000}'),p={name:"gsap/gsap/methods/gsap.parseEase.md"},n=e(`<h1 id="gsap-parseease" tabindex="-1">gsap.parseEase() <a class="header-anchor" href="#gsap-parseease" aria-label="Permalink to &quot;gsap.parseEase()&quot;">​</a></h1><p>将缓动字符串输入 <code>gsap.parseEase()</code>，它将返回相应的解析后的缓动函数。例如：</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 简单缓动</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ease </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> gsap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">parseEase</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;power1&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 或者可配置的缓动：</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> step </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> gsap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">parseEase</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;steps(5)&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> elastic </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> gsap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">parseEase</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;elastic(1.2, 0.5)&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>如果已加载/注册 <code>CustomEase</code>，则您甚至可以传入 Cubic Bezier 值，它将返回相应的自定义缓动函数，如：</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 如果已加载 CustomEase，GSAP 也可以解析 cubic bezier 值：</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ease </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> gsap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">parseEase</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;.17,.67,.83,.67&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>对于更复杂的用例，请参见<a href="https://gsap.com/docs/v3/HelperFunctions#blend-eases" target="_blank" rel="noreferrer">混合缓动辅助函数</a>。</p><p><code>gsap.parseEase()</code> 函数提供了一种简便的方法来根据缓动字符串获取实际的缓动函数，这些函数可以直接用于 GSAP 动画中的 <code>ease</code> 属性。此功能特别有用于处理复杂的缓动效果，或者当您需要根据条件动态改变缓动效果时。</p>`,7),t=[n];function l(h,r,k,d,E,c){return i(),a("div",null,t)}const y=s(p,[["render",l]]);export{o as __pageData,y as default};