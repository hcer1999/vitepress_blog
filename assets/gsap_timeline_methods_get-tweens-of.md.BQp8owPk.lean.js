import{l as a,c as s,a5 as t,a as i}from"./chunks/framework.DJyBczLA.js";const u=JSON.parse('{"title":"GSAP中文文档 - timeline 方法 - 获取特定目标的补间（getTweensOf）","description":"","frontmatter":{},"headers":[],"relativePath":"gsap/timeline/methods/get-tweens-of.md","filePath":"gsap/timeline/methods/get-tweens-of.md","lastUpdated":1733646466000}'),n={name:"gsap/timeline/methods/get-tweens-of.md"};function l(r,e,p,o,h,d){return i(),s("div",null,e[0]||(e[0]=[t(`<h1 id="gsap中文文档-timeline-方法-获取特定目标的补间-gettweensof" tabindex="-1">GSAP中文文档 - timeline 方法 - 获取特定目标的补间（getTweensOf） <a class="header-anchor" href="#gsap中文文档-timeline-方法-获取特定目标的补间-gettweensof" aria-label="Permalink to &quot;GSAP中文文档 - timeline 方法 - 获取特定目标的补间（getTweensOf）&quot;">​</a></h1><h2 id="获取特定目标的补间-gettweensof" tabindex="-1">获取特定目标的补间（getTweensOf） <a class="header-anchor" href="#获取特定目标的补间-gettweensof" aria-label="Permalink to &quot;获取特定目标的补间（getTweensOf）&quot;">​</a></h2><p>返回在该时间线内特定对象的补间。</p><h3 id="方法签名" tabindex="-1">方法签名 <a class="header-anchor" href="#方法签名" aria-label="Permalink to &quot;方法签名&quot;">​</a></h3><div class="language-plaintext vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>getTweensOf(target: [Object | Selector text | Array], nested: Boolean): Array</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>返回在该时间线内特定对象的补间。</p><h3 id="参数-parameters" tabindex="-1">参数（Parameters） <a class="header-anchor" href="#参数-parameters" aria-label="Permalink to &quot;参数（Parameters）&quot;">​</a></h3><ul><li><p><strong>target</strong>: [Object | Selector text | Array]</p><ul><li>补间的目标对象。</li></ul></li><li><p><strong>nested</strong>: Boolean</p><ul><li>（默认值为 <code>true</code>）确定是否返回嵌套时间线中的补间。如果您只想要“顶级”补间和时间线，将此设置为 <code>false</code>。</li></ul></li></ul><h3 id="返回值-returns" tabindex="-1">返回值（Returns） <a class="header-anchor" href="#返回值-returns" aria-label="Permalink to &quot;返回值（Returns）&quot;">​</a></h3><ul><li>Array <ul><li>Tween 实例的数组。</li></ul></li></ul><h3 id="详细信息-details" tabindex="-1">详细信息（Details） <a class="header-anchor" href="#详细信息-details" aria-label="Permalink to &quot;详细信息（Details）&quot;">​</a></h3><p>返回在该时间线内特定目标的补间。您可以传入多个目标的数组或选择器文本。</p><h2 id="示例代码-example-code" tabindex="-1">示例代码（Example Code） <a class="header-anchor" href="#示例代码-example-code" aria-label="Permalink to &quot;示例代码（Example Code）&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 获取时间线中目标为 &quot;.myClass&quot; 的所有补间</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tl.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getTweensOf</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;.myClass&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 获取时间线中目标为 myElem 的所有补间，包括嵌套时间线</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tl.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getTweensOf</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(myElem, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div>`,14)]))}const m=a(n,[["render",l]]);export{u as __pageData,m as default};