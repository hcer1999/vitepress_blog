import{l as a,c as i,a5 as e,a as n}from"./chunks/framework.DJyBczLA.js";const c=JSON.parse('{"title":"GSAP中文文档 - timeline 方法 - 通过ID获取（getById）","description":"","frontmatter":{},"headers":[],"relativePath":"gsap/timeline/methods/get-by-id.md","filePath":"gsap/timeline/methods/get-by-id.md","lastUpdated":1733646466000}'),t={name:"gsap/timeline/methods/get-by-id.md"};function l(p,s,r,h,d,k){return n(),i("div",null,s[0]||(s[0]=[e(`<h1 id="gsap中文文档-timeline-方法-通过id获取-getbyid" tabindex="-1">GSAP中文文档 - timeline 方法 - 通过ID获取（getById） <a class="header-anchor" href="#gsap中文文档-timeline-方法-通过id获取-getbyid" aria-label="Permalink to &quot;GSAP中文文档 - timeline 方法 - 通过ID获取（getById）&quot;">​</a></h1><h2 id="通过id获取-getbyid" tabindex="-1">通过ID获取（getById） <a class="header-anchor" href="#通过id获取-getbyid" aria-label="Permalink to &quot;通过ID获取（getById）&quot;">​</a></h2><p>搜索时间线并返回第一个与提供的ID匹配的子元素。当创建补间或时间线时，您可以为其分配一个 <code>id</code>，以便稍后可以使用该 <code>id</code> 找到它。这在使用像React这样的框架和构建工具时特别有用，因为跟踪变量可能会很困难。</p><h3 id="方法签名" tabindex="-1">方法签名 <a class="header-anchor" href="#方法签名" aria-label="Permalink to &quot;方法签名&quot;">​</a></h3><div class="language-plaintext vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>getById(id: String): [Tween | Timeline]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>搜索时间线并返回第一个与提供的ID匹配的子元素。</p><h3 id="参数-parameters" tabindex="-1">参数（Parameters） <a class="header-anchor" href="#参数-parameters" aria-label="Permalink to &quot;参数（Parameters）&quot;">​</a></h3><ul><li><strong>id</strong>: String <ul><li>要搜索的补间或时间线的ID。</li></ul></li></ul><h3 id="返回值-returns" tabindex="-1">返回值（Returns） <a class="header-anchor" href="#返回值-returns" aria-label="Permalink to &quot;返回值（Returns）&quot;">​</a></h3><ul><li>Tween | Timeline <ul><li>与提供的ID匹配的补间或时间线。</li></ul></li></ul><h3 id="详细信息-details" tabindex="-1">详细信息（Details） <a class="header-anchor" href="#详细信息-details" aria-label="Permalink to &quot;详细信息（Details）&quot;">​</a></h3><p>例如：</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> tl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> gsap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">timeline</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 在创建时给动画一个 &quot;myTween&quot; ID</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tl.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">to</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(obj, { id: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;myTween&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, duration: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, x: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> })</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 稍后我们可以这样获取它</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> myTween </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> tl.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getById</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;myTween&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div>`,13)]))}const g=a(t,[["render",l]]);export{c as __pageData,g as default};