import{l as a,c as i,a5 as t,a as l}from"./chunks/framework.DJyBczLA.js";const p=JSON.parse('{"title":"GSAP中文文档 - timeline 方法 - 移动子元素（shiftChildren）","description":"","frontmatter":{},"headers":[],"relativePath":"gsap/timeline/methods/shift-children.md","filePath":"gsap/timeline/methods/shift-children.md","lastUpdated":1733646466000}'),r={name:"gsap/timeline/methods/shift-children.md"};function s(n,e,o,d,h,c){return l(),i("div",null,e[0]||(e[0]=[t('<h1 id="gsap中文文档-timeline-方法-移动子元素-shiftchildren" tabindex="-1">GSAP中文文档 - timeline 方法 - 移动子元素（shiftChildren） <a class="header-anchor" href="#gsap中文文档-timeline-方法-移动子元素-shiftchildren" aria-label="Permalink to &quot;GSAP中文文档 - timeline 方法 - 移动子元素（shiftChildren）&quot;">​</a></h1><h2 id="移动子元素-shiftchildren" tabindex="-1">移动子元素（shiftChildren） <a class="header-anchor" href="#移动子元素-shiftchildren" aria-label="Permalink to &quot;移动子元素（shiftChildren）&quot;">​</a></h2><p>shiftChildren 方法用于将时间轴的子元素的开始时间按指定的量进行移动，并且可以选择性地调整标签。</p><h3 id="方法签名" tabindex="-1">方法签名 <a class="header-anchor" href="#方法签名" aria-label="Permalink to &quot;方法签名&quot;">​</a></h3><div class="language-plaintext vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>shiftChildren(amount: Number, adjustLabels: Boolean, ignoreBeforeTime: Number): self</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>将时间轴的子元素的开始时间按指定的量进行移动，并且可以选择性地调整标签。</p><h3 id="参数-parameters" tabindex="-1">参数（Parameters） <a class="header-anchor" href="#参数-parameters" aria-label="Permalink to &quot;参数（Parameters）&quot;">​</a></h3><ul><li><p><strong>amount</strong>: Number</p><ul><li>移动每个子元素的秒数（或对于基于帧的时间轴，为帧数）。</li></ul></li><li><p><strong>adjustLabels</strong>: Boolean</p><ul><li>默认值为 <code>false</code>。如果设置为 <code>true</code>，则所有标签的时机也将被相应调整。</li></ul></li><li><p><strong>ignoreBeforeTime</strong>: Number</p><ul><li>默认值为 <code>0</code>。所有开始时间等于或晚于 <code>ignoreBeforeTime</code> 的子元素将受到移动的影响（默认为 0，意味着所有子元素都将受到影响）。这提供了一个简单的方法来将子元素插入到时间轴的某个特定位置，仅将该点之后的子元素向后推，为新元素腾出空间。</li></ul></li></ul><h3 id="返回值-returns" tabindex="-1">返回值（Returns） <a class="header-anchor" href="#返回值-returns" aria-label="Permalink to &quot;返回值（Returns）&quot;">​</a></h3><ul><li>self <ul><li>返回实例本身，便于链式调用。</li></ul></li></ul><h3 id="详细信息-details" tabindex="-1">详细信息（Details） <a class="header-anchor" href="#详细信息-details" aria-label="Permalink to &quot;详细信息（Details）&quot;">​</a></h3><p>通过指定的量移动时间轴子元素的 <code>startTime</code>，并且可以选择性地调整标签。当你想要在时间轴的开头添加子元素或将它们插入到某个特定位置时，这个功能非常有用，可以将现有元素向后移动，为新元素腾出空间。</p>',12)]))}const m=a(r,[["render",s]]);export{p as __pageData,m as default};