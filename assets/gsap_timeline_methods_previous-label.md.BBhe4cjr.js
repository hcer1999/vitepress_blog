import{l as a,c as i,a5 as s,a as t}from"./chunks/framework.DJyBczLA.js";const h=JSON.parse('{"title":"GSAP中文文档 - timeline 方法 - 上一个标签（previousLabel）","description":"","frontmatter":{},"headers":[],"relativePath":"gsap/timeline/methods/previous-label.md","filePath":"gsap/timeline/methods/previous-label.md","lastUpdated":1733646466000}'),l={name:"gsap/timeline/methods/previous-label.md"};function r(n,e,o,p,d,c){return t(),i("div",null,e[0]||(e[0]=[s('<h1 id="gsap中文文档-timeline-方法-上一个标签-previouslabel" tabindex="-1">GSAP中文文档 - timeline 方法 - 上一个标签（previousLabel） <a class="header-anchor" href="#gsap中文文档-timeline-方法-上一个标签-previouslabel" aria-label="Permalink to &quot;GSAP中文文档 - timeline 方法 - 上一个标签（previousLabel）&quot;">​</a></h1><h2 id="上一个标签-previouslabel" tabindex="-1">上一个标签（previousLabel） <a class="header-anchor" href="#上一个标签-previouslabel" aria-label="Permalink to &quot;上一个标签（previousLabel）&quot;">​</a></h2><p>返回在 <code>time</code> 参数之前出现的上一个标签（如果有）。如果没有提供 <code>time</code>，则使用时间线的当前播放头时间。无论时间线是否反转（&quot;之前&quot; 指的是在时间线的本地时间区域中更早），都没有区别。</p><p>返回在 <code>time</code> 参数之前出现的上一个标签（如果有）。如果没有提供 <code>time</code>，则使用时间线的当前播放头时间。如果标签正好位于与 <code>time</code> 参数相同的 <code>time</code>，则会被忽略。</p><p>您可以将 <code>previousLabel()</code> 与 <code>tweenTo()</code> 结合使用，使时间线补间回到上一个标签，如下所示：</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tl.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">tweenTo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tl.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">previousLabel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">())</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="方法签名" tabindex="-1">方法签名 <a class="header-anchor" href="#方法签名" aria-label="Permalink to &quot;方法签名&quot;">​</a></h3><div class="language-plaintext vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>previousLabel(time: Number): String</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>返回在指定时间之前的第一个标签名称，如果没有提供时间，则使用当前播放头的位置。</p><h3 id="参数-parameters" tabindex="-1">参数（Parameters） <a class="header-anchor" href="#参数-parameters" aria-label="Permalink to &quot;参数（Parameters）&quot;">​</a></h3><ul><li><strong>time</strong>: Number（可选） <ul><li>要检查的特定时间。</li></ul></li></ul><h3 id="返回值-returns" tabindex="-1">返回值（Returns） <a class="header-anchor" href="#返回值-returns" aria-label="Permalink to &quot;返回值（Returns）&quot;">​</a></h3><ul><li>String <ul><li>返回在指定时间之前的标签名称，如果没有标签，则返回 <code>null</code> 或 <code>undefined</code>。</li></ul></li></ul>',13)]))}const m=a(l,[["render",r]]);export{h as __pageData,m as default};