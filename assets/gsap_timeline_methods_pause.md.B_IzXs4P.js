import{l as a,c as e,a5 as i,a as n}from"./chunks/framework.DJyBczLA.js";const c=JSON.parse('{"title":"GSAP中文文档 - timeline 方法 - 暂停（pause）","description":"","frontmatter":{},"headers":[],"relativePath":"gsap/timeline/methods/pause.md","filePath":"gsap/timeline/methods/pause.md","lastUpdated":1733646466000}'),l={name:"gsap/timeline/methods/pause.md"};function p(t,s,r,h,d,o){return n(),e("div",null,s[0]||(s[0]=[i(`<h1 id="gsap中文文档-timeline-方法-暂停-pause" tabindex="-1">GSAP中文文档 - timeline 方法 - 暂停（pause） <a class="header-anchor" href="#gsap中文文档-timeline-方法-暂停-pause" aria-label="Permalink to &quot;GSAP中文文档 - timeline 方法 - 暂停（pause）&quot;">​</a></h1><h2 id="暂停-pause" tabindex="-1">暂停（pause） <a class="header-anchor" href="#暂停-pause" aria-label="Permalink to &quot;暂停（pause）&quot;">​</a></h2><p>暂停动画，可以选择性地首先跳转到特定时间。</p><p>如果您定义了要跳转到的时间（第一个参数，也可能是时间线实例的标签），播放头会立即移动到那里并跳过播放头原来的位置和新时间之间的任何事件/回调（除非 <code>suppressEvents</code> 参数设置为 <code>false</code>）。想象一下，就像在唱片机上拿起唱针，移动到新位置后再放回唱片上。如果您希望在最初的移动过程中触发事件/回调，只需将 <code>suppressEvents</code> 参数设置为 <code>false</code>。</p><h3 id="方法签名" tabindex="-1">方法签名 <a class="header-anchor" href="#方法签名" aria-label="Permalink to &quot;方法签名&quot;">​</a></h3><div class="language-plaintext vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>pause(time: Number, suppressEvents: Boolean): self</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>暂停动画，可以选择性地跳转到特定时间。</p><h3 id="参数-parameters" tabindex="-1">参数（Parameters） <a class="header-anchor" href="#参数-parameters" aria-label="Permalink to &quot;参数（Parameters）&quot;">​</a></h3><ul><li><p><strong>time</strong>: Number（可选）</p><ul><li>要跳转到的时间（以秒为单位）或标签。</li></ul></li><li><p><strong>suppressEvents</strong>: Boolean（可选）</p><ul><li>默认值为 <code>true</code>。如果设置为 <code>false</code>，则在跳转过程中会触发事件/回调。</li></ul></li></ul><h3 id="返回值-returns" tabindex="-1">返回值（Returns） <a class="header-anchor" href="#返回值-returns" aria-label="Permalink to &quot;返回值（Returns）&quot;">​</a></h3><ul><li>self <ul><li>返回实例本身，便于链式调用。</li></ul></li></ul><h2 id="示例代码-example-code" tabindex="-1">示例代码（Example Code） <a class="header-anchor" href="#示例代码-example-code" aria-label="Permalink to &quot;示例代码（Example Code）&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 在播放头当前位置暂停</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tl.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pause</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 跳转到动画的确切2秒处然后暂停</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tl.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pause</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 跳转到动画的确切2秒处暂停，但在最初的移动过程中不抑制事件</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tl.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pause</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>注意，当动画（补间或时间线）嵌套在时间线内时，即使子动画被暂停，父时间线的播放头也会继续运行（<a href="https://codepen.io/GreenSock/pen/BaKogyg?editors=1000" target="_blank" rel="noreferrer">演示</a>）。在大多数情况下，您可能希望暂停父时间线。</p>`,14)]))}const k=a(l,[["render",p]]);export{c as __pageData,k as default};