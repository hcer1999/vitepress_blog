import{l as s,c as a,a as i,a7 as n}from"./chunks/framework.dOJbCP6k.js";const u=JSON.parse('{"title":"GSAP中文文档","description":"","frontmatter":{},"headers":[],"relativePath":"gsap/start.md","filePath":"gsap/start.md","lastUpdated":1721038367000}'),e={name:"gsap/start.md"},l=n(`<h1 id="gsap中文文档" tabindex="-1">GSAP中文文档 <a class="header-anchor" href="#gsap中文文档" aria-label="Permalink to &quot;GSAP中文文档&quot;">​</a></h1><h2 id="开始" tabindex="-1">开始 <a class="header-anchor" href="#开始" aria-label="Permalink to &quot;开始&quot;">​</a></h2><p><strong>详细教程</strong></p><p>GSAP 是“与框架无关”的，这意味着它可以在 React、Webflow、Wordpress 或任何其他 JavaScript/Web 框架中使用。核心 GSAP 文件和所有插件都只是 <strong>JavaScript 文件</strong>。</p><p>下面的视频和安装助手都涵盖了加载文件的最常见方式。即通过 NPM、Yarn 和使用简单的 <code>&lt;script&gt;</code> 标签。选择你自己喜欢的方式，或者查看左侧子菜单中的安装指南，以获取特定框架或工具的指导。</p><h2 id="获取文件" tabindex="-1">获取文件 <a class="header-anchor" href="#获取文件" aria-label="Permalink to &quot;获取文件&quot;">​</a></h2><p><a href="https://gsap.com/community/files/file/20-gsap-public-files/?do=download&amp;csrfKey=363f7091946466d5947e6751b678f5cc" target="_blank" rel="noreferrer">GSAP（点击下载）</a></p><p>zip 下载包中包含什么？</p><p>zip 文件包含以下目录：</p><ul><li><strong>/minified/</strong> - 最简单的选项。通过脚本标签加载到网页中，具有普遍兼容性，高度压缩以实现最大加载速度。</li><li><strong>/UMD/</strong> - 未压缩的 minified 文件版本，以 UMD 格式（高度兼容）。通常这些用于旧版构建工具或调试（因为源代码是可读的）。</li><li><strong>/ESM</strong> - ES 模块文件，转译以与几乎所有现代构建工具兼容（没有花哨的 ES6 特性）。</li><li><strong>/src/</strong> - 原始源代码文件，是现代 ES6 模块。</li></ul><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-Gkf4M" id="tab-3Zmsrh5" checked="checked"><label for="tab-3Zmsrh5">npm</label><input type="radio" name="group-Gkf4M" id="tab-mY8lnLD"><label for="tab-mY8lnLD">cdn</label><input type="radio" name="group-Gkf4M" id="tab-fGqeWzM"><label for="tab-fGqeWzM">yarn</label></div><div class="blocks"><div class="language-bash vp-adaptive-theme active line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gsap</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> src</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gsap</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></div></div><h4 id="插件" tabindex="-1">插件 <a class="header-anchor" href="#插件" aria-label="Permalink to &quot;插件&quot;">​</a></h4><ul><li>Flip (翻转)</li><li>ScrollTrigger (滚动触发器)</li><li>Observer (观察者)</li><li>ScrollTo (滚动到)</li><li>Draggable (拖拽)</li><li>MotionPath (运动路径)</li><li>Easel (Easel)</li><li>Pixi (Pixi)</li><li>Text (文本)</li></ul><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Flip } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;gsap/Flip&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { ScrollTrigger } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;gsap/ScrollTrigger&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Observer } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;gsap/Observer&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { ScrollToPlugin } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;gsap/ScrollToPlugin&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Draggable } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;gsap/Draggable&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { MotionPathPlugin } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;gsap/MotionPathPlugin&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { EaselPlugin } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;gsap/EaselPlugin&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { PixiPlugin } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;gsap/PixiPlugin&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { TextPlugin } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;gsap/TextPlugin&#39;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h4 id="缓动函数" tabindex="-1">缓动函数 <a class="header-anchor" href="#缓动函数" aria-label="Permalink to &quot;缓动函数&quot;">​</a></h4><ul><li>RoughEase (毛刺缓动)</li><li>ExpoScaleEase (指数缩放缓动)</li><li>SlowMo (慢动作缓动)</li><li>CustomEase (自定义缓动)</li></ul><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { RoughEase, ExpoScaleEase, SlowMo } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;gsap/EasePack&#39;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="react" tabindex="-1">React <a class="header-anchor" href="#react" aria-label="Permalink to &quot;React&quot;">​</a></h4><ul><li>useGSAP</li></ul><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { useGSAP } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;@gsap/react&#39;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="常见问题解答" tabindex="-1">常见问题解答 <a class="header-anchor" href="#常见问题解答" aria-label="Permalink to &quot;常见问题解答&quot;">​</a></h3><h4 id="我需要为每个插件调用-gsap-registerplugin-吗" tabindex="-1">我需要为每个插件调用 gsap.registerPlugin() 吗？ <a class="header-anchor" href="#我需要为每个插件调用-gsap-registerplugin-吗" aria-label="Permalink to &quot;我需要为每个插件调用 gsap.registerPlugin() 吗？&quot;">​</a></h4><p>通常，是的。如果你通过 <code>&lt;script&gt;</code> 标签加载 GSAP（即不是构建工具），GSAP 将尝试自动注册插件，只要核心已经加载，但我们仍然建议注册插件，以便构建工具在树摇动期间不会丢弃它们。你可以一次性注册所有插件，像这样：</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gsap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">registerPlugin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(MotionPathPlugin, ScrollToPlugin, TextPlugin)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="多次注册插件是否有害" tabindex="-1">多次注册插件是否有害？ <a class="header-anchor" href="#多次注册插件是否有害" aria-label="Permalink to &quot;多次注册插件是否有害？&quot;">​</a></h4><p>不，完全没有问题。它既不会帮助任何东西，也不会造成伤害。</p><p>如果你使用模块环境并希望避免多次注册插件，你可以在 gsap.js 文件中导入 GSAP 和你需要的所有插件，然后从该文件中导入其他模块所需的内容。例如，使用 GSAP 核心和 DrawSVG 的 gsap.js 可能是：</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;gsap&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;gsap/DrawSVGPlugin&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { gsap } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;gsap&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { DrawSVGPlugin } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;gsap/DrawSVGPlugin&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gsap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">registerPlugin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(DrawSVGPlugin)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>然后在另一个文件中：</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { gsap, DrawSVGPlugin } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;../gsap.js&#39;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="我遇到了-typescript-错误-怎么办" tabindex="-1">我遇到了 TypeScript 错误 - 怎么办？ <a class="header-anchor" href="#我遇到了-typescript-错误-怎么办" aria-label="Permalink to &quot;我遇到了 TypeScript 错误 - 怎么办？&quot;">​</a></h4><p>首先，确保你使用的是官方 TypeScript 定义，这些定义可以在主 GitHub 存储库中找到。如果你继续遇到问题，请随时在我们的论坛上发帖或在 GSAP GitHub 存储库中创建新问题。如果你需要告诉编译器定义的位置，你可以这样做：</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;compilerOptions&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  &quot;files&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;node_modules/gsap/types/index.d.ts&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h4 id="如何使用构建工具加载非-es-模块版本的-gsap" tabindex="-1">如何使用构建工具加载非 ES 模块版本的 GSAP？ <a class="header-anchor" href="#如何使用构建工具加载非-es-模块版本的-gsap" aria-label="Permalink to &quot;如何使用构建工具加载非 ES 模块版本的 GSAP？&quot;">​</a></h4><p>一些构建工具可能不理解 ES 模块，因此你可以使用 UMD（通用模块定义）格式。要做到这一点，只需点击上面的“NPM”，然后点击“UMD”，并复制生成的代码。例如：<code>import { gsap } from &quot;gsap/dist/gsap&quot;;</code>（注意文件都在 <code>/dist/</code> 子目录中）</p><h4 id="为什么我的生产构建失败-可能在-webpack、vue-cli-或-create-react-app-中" tabindex="-1">为什么我的生产构建失败？（可能在 webpack、vue-cli 或 create-react-app 中） <a class="header-anchor" href="#为什么我的生产构建失败-可能在-webpack、vue-cli-或-create-react-app-中" aria-label="Permalink to &quot;为什么我的生产构建失败？（可能在 webpack、vue-cli 或 create-react-app 中）&quot;">​</a></h4><p>现代构建工具通常使用一种称为树摇动的过程来移除未使用的代码。有时它们过于激进，由于你没有在你自己代码的任何地方引用它们，就会丢弃插件。为了防止这种情况，你必须使用 gsap.registerPlugin 显式注册插件：</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gsap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">registerPlugin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(MotionPathPlugin, ScrollToPlugin, TextPlugin)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="额外插件的-cdn-链接在哪里" tabindex="-1">额外插件的 CDN 链接在哪里？ <a class="header-anchor" href="#额外插件的-cdn-链接在哪里" aria-label="Permalink to &quot;额外插件的 CDN 链接在哪里？&quot;">​</a></h4><p>额外插件仅对 Club GSAP 成员可用，因此它们不在 CDN 上。你必须从你的账户仪表板中下载它们。</p><h4 id="我可以使用旧版本的-gsap-吗" tabindex="-1">我可以使用旧版本的 GSAP 吗？ <a class="header-anchor" href="#我可以使用旧版本的-gsap-吗" aria-label="Permalink to &quot;我可以使用旧版本的 GSAP 吗？&quot;">​</a></h4><p>当然可以！你可以通过访问 GitHub 发布页面来查看和下载 GSAP 的旧版本。不过，我们推荐使用最新版本。</p>`,43),p=[l];function t(r,h,k,d,o,c){return i(),a("div",null,p)}const b=s(e,[["render",t]]);export{u as __pageData,b as default};