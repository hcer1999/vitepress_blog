import{l as i,c as t,a5 as l,v as a,i as s,a as o}from"./chunks/framework.DJyBczLA.js";const g=JSON.parse('{"title":"GSAP中文文档 - timeline 方法 - 增加标签（addLabel）","description":"","frontmatter":{},"headers":[],"relativePath":"gsap/timeline/methods/add-label.md","filePath":"gsap/timeline/methods/add-label.md","lastUpdated":1733646466000}'),n={name:"gsap/timeline/methods/add-label.md"};function d(r,e,p,c,h,u){return o(),t("div",null,e[0]||(e[0]=[l(`<h1 id="gsap中文文档-timeline-方法-增加标签-addlabel" tabindex="-1">GSAP中文文档 - timeline 方法 - 增加标签（addLabel） <a class="header-anchor" href="#gsap中文文档-timeline-方法-增加标签-addlabel" aria-label="Permalink to &quot;GSAP中文文档 - timeline 方法 - 增加标签（addLabel）&quot;">​</a></h1><h2 id="增加标签-addlabel" tabindex="-1">增加标签（addLabel） <a class="header-anchor" href="#增加标签-addlabel" aria-label="Permalink to &quot;增加标签（addLabel）&quot;">​</a></h2><p>向时间线添加标签，便于标记重要的位置/时间。</p><h3 id="方法签名" tabindex="-1">方法签名 <a class="header-anchor" href="#方法签名" aria-label="Permalink to &quot;方法签名&quot;">​</a></h3><div class="language-plaintext vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>addLabel( label: String, position: [Number | String] ): self</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>向时间线添加标签，便于标记重要的位置/时间。</p><h3 id="参数-parameters" tabindex="-1">参数（Parameters） <a class="header-anchor" href="#参数-parameters" aria-label="Permalink to &quot;参数（Parameters）&quot;">​</a></h3><ul><li><p><strong>label</strong>: String</p><ul><li>标签的名称。</li></ul></li><li><p><strong>position</strong>: [Number | String]</p><ul><li>（默认值为 <code>&quot;+=0&quot;</code>）控制时间线上的插入点（默认情况下，它是时间线的末尾）。详见下面的选项，或参考位置参数文章，其中包含交互式时间线可视化和视频。如果定义了一个尚不存在的标签，它将<strong>自动被添加到时间线的末尾</strong>。</li></ul></li></ul><h3 id="返回值-returns" tabindex="-1">返回值（Returns） <a class="header-anchor" href="#返回值-returns" aria-label="Permalink to &quot;返回值（Returns）&quot;">​</a></h3><ul><li>self <ul><li>返回实例本身，便于链式调用。</li></ul></li></ul><h3 id="详细信息-details" tabindex="-1">详细信息（Details） <a class="header-anchor" href="#详细信息-details" aria-label="Permalink to &quot;详细信息（Details）&quot;">​</a></h3><p>向时间线添加标签，便于标记重要的位置/时间。之后您可以在其他方法中引用该标签，如 <code>seek(&quot;myLabel&quot;)</code> 或 <code>add(myTween, &quot;myLabel&quot;)</code> 或 <code>reverse(&quot;myLabel&quot;)</code>。您也可以使用<a href="./add"><code>timeline.add()</code></a> 方法插入标签。</p><h2 id="在时间线上定位标签" tabindex="-1">在时间线上定位标签 <a class="header-anchor" href="#在时间线上定位标签" aria-label="Permalink to &quot;在时间线上定位标签&quot;">​</a></h2><p>默认情况下，标签被添加到时间线的<strong>末尾</strong>，但您可以使用位置参数精确控制它们的位置。它使用灵活的语法，具有以下选项：</p><ul><li><strong>绝对时间</strong>（以秒为单位），从时间线的开始测量，作为一个<strong>数字</strong>，如 <code>3</code></li></ul><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 从时间线的开始处精确插入3秒</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tl.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addLabel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;myLabel&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul><li><strong>标签</strong>，如 <code>&quot;someLabel&quot;</code>。如果标签不存在，它将被添加到时间线的末尾。</li></ul><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 在 &quot;someLabel&quot; 标签处插入</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tl.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addLabel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;myLabel&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;someLabel&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul><li><code>&quot;&lt;&quot;</code> 前一个动画的<strong>开始</strong>。将 <code>&lt;</code> 视为指向前一个动画开始的指针。</li></ul><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 在前一个动画的开始处插入</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tl.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addLabel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;myLabel&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&lt;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul><li><code>&quot;&gt;&quot;</code> 前一个动画的<strong>结束</strong>。将 <code>&gt;</code> 视为指向前一个动画结束的指针。</li></ul><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 在前一个动画的结束处插入</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tl.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addLabel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;myLabel&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&gt;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul><li><p>一个复杂的字符串，其中 <code>&quot;+=&quot;</code> 和 <code>&quot;-=&quot;</code> 前缀表示<strong>相对</strong>值。当一个数字跟随 <code>&lt;</code> 或 <code>&quot;&gt;&quot;</code> 时，它被解释为相对的，所以 <code>&quot;&lt;2&quot;</code> 与 <code>&quot;&lt;+=2&quot;</code> 相同。示例：</p><ul><li><code>&quot;+=1&quot;</code> - 比时间线结束早1秒（创建间隙）</li><li><code>&quot;-=1&quot;</code> - 比时间线结束晚1秒（重叠）</li><li><code>&quot;myLabel+=2&quot;</code> - 比标签 <code>&quot;myLabel&quot;</code> 晚2秒</li><li><code>&quot;&lt;+=3&quot;</code> - 比前一个动画的开始晚3秒</li><li><code>&quot;&lt;3&quot;</code> - 与 <code>&quot;&lt;+=3&quot;</code> 相同（见上文）（当跟随 <code>&lt;</code> 或 <code>&quot;&gt;&quot;</code> 时，<code>&quot;+=&quot;</code> 是隐含的）</li><li><code>&quot;&gt;-0.5&quot;</code> - 比前一个动画的结束早0.5秒。就像说 &quot;前一个动画的结束加上 -0.5&quot;</li></ul></li><li><p>一个基于<strong>百分比</strong>的复杂字符串。当紧跟 <code>&quot;+=&quot;</code> 或 <code>&quot;-=&quot;</code> 前缀时，百分比是基于<strong>被插入动画</strong>的总持续时间。当紧跟 <code>&lt;</code> 或 <code>&quot;&gt;&quot;</code> 时，它是基于<strong>前一个动画</strong>的总持续时间。注意：总持续时间包括重复/悠悠。示例：</p><ul><li><code>&quot;-=25%&quot;</code> - 与时间线结束重叠，重叠部分为插入动画总持续时间的25%</li><li><code>&quot;+=50%&quot;</code> - 超过时间线结束，超过部分为插入动画总持续时间的50%，创建间隙</li><li><code>&quot;&lt;25%&quot;</code> - 从前一个动画的开始25%处。与 <code>&quot;&gt;-75%&quot;</code> 相同，即从前一个动画的结束处负75%</li><li><code>&quot;&lt;+=25%&quot;</code> - 从前一个动画的开始处插入动画总持续时间的25%。与 <code>&quot;&lt;25%&quot;</code> 不同，后者的百分比是基于前一个动画的总持续时间，而任何紧跟 <code>&quot;+=&quot;</code> 或 <code>&quot;-=&quot;</code> 的都基于插入动画的总持续时间。</li><li><code>&quot;myLabel+=30%&quot;</code> - 从标签 <code>&quot;myLabel&quot;</code> 处插入动画总持续时间的30%</li></ul></li></ul><p><strong>基于百分比的值是在 GSAP 3.7.0 中添加的</strong></p><p><strong>“前一个动画”</strong> 指的是最近插入的动画，而不一定是最接近时间线末尾的动画。</p><h2 id="位置参数交互式演示" tabindex="-1">位置参数交互式演示 <a class="header-anchor" href="#位置参数交互式演示" aria-label="Permalink to &quot;位置参数交互式演示&quot;">​</a></h2>`,26),a("iframe",{src:"https://codepen.io/GreenSock/pen/PopXddg",width:"100%",height:"800",scrolling:"no",frameborder:"no",allowtransparency:"true",allowfullscreen:"true"},null,-1),a("p",null,[s("务必阅读我们的教程"),a("a",{href:"https://gsap.com/resources/position-parameter",target:"_blank",rel:"noreferrer"},"《理解位置参数》"),s("，其中包含交互式时间线可视化和视频。")],-1)]))}const b=i(n,[["render",d]]);export{g as __pageData,b as default};