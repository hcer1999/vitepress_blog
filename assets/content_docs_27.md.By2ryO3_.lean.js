import{l as a,c as t,a5 as i,a as s}from"./chunks/framework.DJyBczLA.js";const k=JSON.parse('{"title":"作为前端，你必须要知道的meta标签知识","description":"","frontmatter":{"author":"bingkele","title":"作为前端，你必须要知道的meta标签知识","date":"2024-5-10","permalink":"/content"},"headers":[],"relativePath":"content/docs/27.md","filePath":"content/docs/27.md","lastUpdated":1733646466000}'),n={name:"content/docs/27.md"};function l(o,e,r,h,p,d){return s(),t("div",null,e[0]||(e[0]=[i(`<h1 id="作为前端-你必须要知道的-meta-标签知识" tabindex="-1">作为前端，你必须要知道的 meta 标签知识 <a class="header-anchor" href="#作为前端-你必须要知道的-meta-标签知识" aria-label="Permalink to &quot;作为前端，你必须要知道的 meta 标签知识&quot;">​</a></h1><h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>前几天面试的时候，面试官问：你都知道什么 <code>meta</code> 标签？用处是什么？尽可能多的说出来。我：嗯…… 嗯…… 我一般都自动生成……面试官：……后来俺找资料好好学了下，再看了 taobao 和头条的网页才知道：meta 标签用处可大得很呐！今天就来浅浅总结一下。</p><p>顺便感叹一下字节这块适配做的是真的蛮好。</p><h2 id="概览" tabindex="-1">概览 <a class="header-anchor" href="#概览" aria-label="Permalink to &quot;概览&quot;">​</a></h2><p>meta 标签一般放在整个 <code>html</code> 页面的 <code>head</code> 部分，在 <code>MDN</code> 中对他这样定义：meta 是 <strong>文档级元数据元素</strong>，用来表示那些不能由其它 HTML 元相关元素（ <code>&lt;base&gt;</code>、 <code>&lt;link&gt;</code>, <code>&lt;script&gt;</code>、 <code>&lt;style&gt;</code> 或 <code>&lt;title&gt;</code>）之一表示的任何元数据。</p><p>是不是感觉看起来很抽象？说白了就是为了传达信息。</p><h2 id="name-属性" tabindex="-1">name 属性 <a class="header-anchor" href="#name-属性" aria-label="Permalink to &quot;name 属性&quot;">​</a></h2><p><code>name</code> 和 <code>content</code> 一起使用，前者表示要表示的元数据的 <code>名称</code>，后者是元数据的 <code>值</code>。</p><h3 id="author" tabindex="-1">author <a class="header-anchor" href="#author" aria-label="Permalink to &quot;author&quot;">​</a></h3><p>用来表示网页的作者的名字，例如某个组织或者机构。</p><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">meta</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;author&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;aaa@mail.abc.com&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="description" tabindex="-1">description <a class="header-anchor" href="#description" aria-label="Permalink to &quot;description&quot;">​</a></h3><p>是一段简短而精确的、对页面内容的描述。以头条和 taobao 的 <code>description</code> 标签为例：</p><p><img src="http://cdn.bingkele.cc/FvoRAQRRb1j5IVkZseZoFCMDiaNK" alt="头条description标签示例"></p><p><img src="http://cdn.bingkele.cc/FkpfjueDH31iL-al_CFzHB9EbkU1" alt="淘宝description标签示例"></p><h3 id="keywords" tabindex="-1">keywords <a class="header-anchor" href="#keywords" aria-label="Permalink to &quot;keywords&quot;">​</a></h3><p>与页面内容相关的关键词，使用逗号分隔。某些搜索引擎在遇到这些关键字时，会用这些关键字对文档进行分类。还是以头条和 taobao 为例：</p><p><img src="http://cdn.bingkele.cc/Fve78GzM8Im1o0pN3jxs2eBDT6h4" alt="头条keywords标签示例"></p><p><img src="http://cdn.bingkele.cc/FjjMV3rlL4lOaXb8vCjPx34vi569" alt="淘宝keywords标签示例"></p><h3 id="viewport" tabindex="-1">viewport <a class="header-anchor" href="#viewport" aria-label="Permalink to &quot;viewport&quot;">​</a></h3><p>为 viewport（视口）的初始大小提供指示。目前仅用于移动设备。</p><p>可能你也发现了，我们在 <code>vscode</code> 中自动生成 <code>html</code> 的代码片段时，会自动生成：</p><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">meta</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;viewport&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;width=device-width, initial-scale=1.0&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><code>width</code> 用来设置 viewport 的宽度为设备宽度；<code>initial-scale</code> 为设备宽度与 viewport 大小之间的缩放比例。</p><p><img src="http://cdn.bingkele.cc/FiFzN3PPqQ3A27XYkrUMmEygJdce" alt="viewport示例"></p><h3 id="robots" tabindex="-1">robots <a class="header-anchor" href="#robots" aria-label="Permalink to &quot;robots&quot;">​</a></h3><p>表示爬虫对此页面的处理行为，或者说，应当遵守的规则，是用来做搜索引擎抓取的。</p><p>它的 <code>content</code> 可以为：</p><ol><li><code>all</code>:搜索引擎将索引此网页，并继续通过此网页的链接索引文件将被检索</li><li><code>none</code>:搜索引擎讲忽略此网页</li><li><code>index</code>:搜索引擎索引此网页</li><li><code>follow</code>:搜索引擎继续通过此网页的链接索引搜索其它的网页</li></ol><h3 id="renderer" tabindex="-1">renderer <a class="header-anchor" href="#renderer" aria-label="Permalink to &quot;renderer&quot;">​</a></h3><p>用来指定双核浏览器的渲染方式，比如 360 浏览器，我们可以通过这个设置来指定 360 浏览器的渲染方式。</p><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">meta</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;renderer&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;webkit&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">&lt;!-- 默认webkit内核 --&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">meta</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;renderer&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;ie-comp&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">&lt;!-- 默认IE兼容模式 --&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">meta</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;renderer&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;ie-stand&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">&lt;!-- 默认IE标准模式 --&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="http-equiv" tabindex="-1">http-equiv <a class="header-anchor" href="#http-equiv" aria-label="Permalink to &quot;http-equiv&quot;">​</a></h2><p><code>http-equiv</code> 也是和 <code>content</code> 一起使用，前者表示要表示的元数据的 <code>名称</code>，后者是元数据的 <code>值</code>。</p><p><code>http-equiv</code> 所有允许的值都是特定 HTTP 头部的名称，</p><h3 id="x-ua-compatible" tabindex="-1">X-UA-Compatible <a class="header-anchor" href="#x-ua-compatible" aria-label="Permalink to &quot;X-UA-Compatible&quot;">​</a></h3><p>我们最常见的 <code>http-equiv</code> 值可能就是 <code>X-UA-Compatible</code> 了，它常常长这个样子：</p><p><img src="http://cdn.bingkele.cc/FlCH_L5Xhes1UwS6ITBVJfuBSDR0" alt="X-UA-Compatible示例"></p><p>它是用来是做 IE 浏览器适配的。</p><p><code>IE=edge</code> 告诉浏览器，以当前浏览器支持的最新版本来渲染，IE9 就以 IE9 版本来渲染。</p><p><code>chrome=1</code> 告诉浏览器，如果当前 IE 浏览器安装了 <code>Google Chrome Frame</code> 插件，就以 chrome 内核来渲染页面。</p><p>像上图这种两者都存在的情况：如果有 chrome 插件，就以 chrome 内核渲染，如果没有，就以当前浏览器支持的最高版本渲染。</p><p>另外，这个属性支持的范围是 <code>IE8-IE11</code></p><p>你可能注意到了，如果在我们的 <code>http</code> 头部中也设置了这个属性，并且和 <code>meta</code> 中设置的有冲突，那么哪一个优先呢？</p><p>答案是：开发者偏好（ <code>meta</code> 元素）优先于 Web 服务器设置（HTTP 头）。</p><h3 id="content-type" tabindex="-1">content-type <a class="header-anchor" href="#content-type" aria-label="Permalink to &quot;content-type&quot;">​</a></h3><p>用来声明文档类型和字符集</p><p><img src="http://cdn.bingkele.cc/FmwVQrFvENxLAxdtawdJlaQJD3Ia" alt="content-type示例"></p><h3 id="x-dns-prefetch-control" tabindex="-1">x-dns-prefetch-control <a class="header-anchor" href="#x-dns-prefetch-control" aria-label="Permalink to &quot;x-dns-prefetch-control&quot;">​</a></h3><p>一般来说，HTML 页面中的 a 标签会自动启用 DNS 提前解析来提升网站性能，但是在使用 https 协议的网站中失效了，我们可以设置：</p><p><img src="http://cdn.bingkele.cc/FgpYtGWCd0k5WUQnZrWoFX_0MQaD" alt="x-dns-prefetch-control示例"></p><p>来打开 dns 对 a 标签的提前解析</p><h3 id="cache-control、pragma、expires" tabindex="-1">cache-control、Pragma、Expires <a class="header-anchor" href="#cache-control、pragma、expires" aria-label="Permalink to &quot;cache-control、Pragma、Expires&quot;">​</a></h3><p>和缓存相关的设置，但是遗憾的是这些往往不生效，我们一般都通过 <code>http headers</code> 来设置缓存策略</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>常用了就是这些啦~实际使用时还有很多新的需要学习，这就需要俺们平时多看看其他网站是怎么设置 <code>meta</code> 的~ 一起加油叭</p><h2 id="参考文章" tabindex="-1">参考文章 <a class="header-anchor" href="#参考文章" aria-label="Permalink to &quot;参考文章&quot;">​</a></h2><ol><li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta" target="_blank" rel="noreferrer">meta：文档级元数据元素</a></li><li><a href="https://www.w3schools.com/tags/tag_meta.asp" target="_blank" rel="noreferrer">meta 标签是做什么的</a></li><li><a href="https://www.smashingmagazine.com/2011/11/the-essential-meta-tags-for-social-media-sharing/" target="_blank" rel="noreferrer">那些你不知道的 meta 标签</a></li><li><a href="https://www.w3cplus.com/html5/meta-tags.html" target="_blank" rel="noreferrer">HTML meta 标签总结与属性使用介绍</a></li></ol><div class="tip custom-block"><p class="custom-block-title">传送门</p><p><a href="https://juejin.cn/post/7089271039842058253?searchId=20240325092953DDC0218125331A81F146" target="_blank" rel="noreferrer">原文地址</a></p></div>`,60)]))}const m=a(n,[["render",l]]);export{k as __pageData,m as default};