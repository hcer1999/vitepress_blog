import{l as i,c as t,a5 as n,v as s,i as a,a as l}from"./chunks/framework.DJyBczLA.js";const g=JSON.parse('{"title":"GSAP中文文档 - Easing","description":"","frontmatter":{},"headers":[],"relativePath":"gsap/easing/start.md","filePath":"gsap/easing/start.md","lastUpdated":1733646466000}'),r={name:"gsap/easing/start.md"};function p(o,e,h,c,d,u){return l(),t("div",null,e[0]||(e[0]=[n(`<h1 id="gsap中文文档-easing" tabindex="-1">GSAP中文文档 - Easing <a class="header-anchor" href="#gsap中文文档-easing" aria-label="Permalink to &quot;GSAP中文文档 - Easing&quot;">​</a></h1><div class="warning custom-block"><p class="custom-block-title">额外的俱乐部版缓动（Easing）</p><p>&quot;slow&quot;、&quot;rough&quot; 和 &quot;expoScale&quot; 缓动并不包含在核心库中 - 它们被打包在一个EasePack文件中，以最小化文件大小。&quot;CustomEase&quot;、&quot;CustomBounce&quot; 和 &quot;CustomWiggle&quot; 也是独立打包的（不在核心库中）。</p><p>查看<a href="/vitepress_blog/gsap/start">安装页面</a>以获取详细信息。</p></div><p>动画效果待补充....</p><div class="tip custom-block"><p class="custom-block-title">提示 - 默认缓动</p><p>GSAP使用默认的缓动效果为 &quot;power1.out&quot;。你可以通过为特定补间动画（tween）设置其<code>ease</code>属性为另一个（有效的）缓动值来覆盖这个默认值。你也可以使用<a href="/vitepress_blog/gsap/gsap/methods/defaults"><code>gsap.defaults()</code></a>来为GSAP设置不同的默认缓动效果。此外，你还可以为特定的<a href="/vitepress_blog/gsap/timeline/start">时间轴</a>设置默认值。</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gsap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">defaults</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ease: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;power2.in&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  duration: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gsap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">timeline</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({ defaults: { ease: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;power2.in&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } })</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div></div><h2 id="如何使用缓动可视化工具" tabindex="-1">如何使用缓动可视化工具 <a class="header-anchor" href="#如何使用缓动可视化工具" aria-label="Permalink to &quot;如何使用缓动可视化工具&quot;">​</a></h2><p>要使用缓动可视化工具，只需点击您想要使用的缓动名称。您也可以点击下划线的文本来更改缓动的值和类型。 使用左侧菜单中的导航链接，以获取有关复杂缓动的更多信息。</p>`,6),s("iframe",{src:"https://youtu.be/jfKf7EtMbxI",width:"100%",height:"400",frameborder:"no",loading:"lazy",allowtransparency:"true",allowfullscreen:"true"},null,-1),s("p",null,[a("非常感谢Carl提供这个视频。我们强烈推荐他们在"),s("a",{href:"https://www.creativecodingclub.com/bundles/creative-coding-club?ref=44f484",target:"_blank",rel:"noreferrer"},"CreativeCodingClub.com"),a("提供的全面的GSAP培训。今天立即报名参加他们的"),s("a",{href:"https://www.creativecodingclub.com/courses/FreeGSAP3Express?ref=44f484",target:"_blank",rel:"noreferrer"},"免费GSAP课程"),a("，发现用代码制作动画的乐趣。")],-1)]))}const E=i(r,[["render",p]]);export{g as __pageData,E as default};