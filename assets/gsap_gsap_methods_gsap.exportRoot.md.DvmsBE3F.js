import{l as s,c as a,a as i,a7 as e}from"./chunks/framework.dOJbCP6k.js";const E=JSON.parse('{"title":"gsap.exportRoot()","description":"","frontmatter":{},"headers":[],"relativePath":"gsap/gsap/methods/gsap.exportRoot.md","filePath":"gsap/gsap/methods/gsap.exportRoot.md","lastUpdated":1721038367000}'),t={name:"gsap/gsap/methods/gsap.exportRoot.md"},p=e(`<h1 id="gsap-exportroot" tabindex="-1">gsap.exportRoot() <a class="header-anchor" href="#gsap-exportroot" aria-label="Permalink to &quot;gsap.exportRoot()&quot;">​</a></h1><h3 id="gsap-exportroot-无缝地将所有的补间动画、时间轴以及-可选地-延迟调用从根时间轴传输到一个新的时间轴-以便您可以在似乎全局的基础上执行高级任务-而不会影响导出后创建的补间动画-时间轴。" tabindex="-1"><code>gsap.exportRoot()</code> 无缝地将所有的补间动画、时间轴以及 [可选地] 延迟调用从根时间轴传输到一个新的时间轴，以便您可以在似乎全局的基础上执行高级任务，而不会影响导出后创建的补间动画/时间轴。 <a class="header-anchor" href="#gsap-exportroot-无缝地将所有的补间动画、时间轴以及-可选地-延迟调用从根时间轴传输到一个新的时间轴-以便您可以在似乎全局的基础上执行高级任务-而不会影响导出后创建的补间动画-时间轴。" aria-label="Permalink to &quot;\`gsap.exportRoot()\` 无缝地将所有的补间动画、时间轴以及 [可选地] 延迟调用从根时间轴传输到一个新的时间轴，以便您可以在似乎全局的基础上执行高级任务，而不会影响导出后创建的补间动画/时间轴。&quot;">​</a></h3><p>例如，想象一个游戏使用 GSAP 进行所有动画制作，在游戏的某个时刻，您想让一切慢下来至停止（动画化 <code>timeScale</code>），同时动画化一个新的弹出窗口到适当的位置：</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> tl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> gsap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">exportRoot</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gsap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">to</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tl, { duration: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, timeScale: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> })</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 这个补间动画不受影响，因为它是在导出后创建的。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">gsap.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">fromTo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(myWindow, { scaleX: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, scaleY: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }, { duration: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, scaleX: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, scaleY: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> })</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>然后，当您准备好时，可以通过将 <code>timeScale</code> 动画化回 1 来重新动画化事物。或者，您可以使用 <code>exportRoot()</code> 收集所有动画并 <code>pause()</code> 它们，然后动画化弹出屏幕（或任何其他内容）。然后 <code>resume()</code> 该实例甚至 <code>reverse()</code>。</p><p>您可以根据需要多次使用 <code>exportRoot()</code>；它所做的只是将所有松散的补间动画、时间轴和 delayedCalls 包装到一个时间轴中，该时间轴本身被放置在根上，所以如果您再次 <code>exportRoot()</code>，那个时间轴将被包装到另一个中，以此类推。事物可以嵌套得尽可能深。</p><p><strong>注意：</strong> 完成的补间动画和时间轴会从 globalTimeline 中移除（用于自动垃圾回收），所以如果您在某个特定补间动画完成后 <code>exportRoot()</code>，它将不会被包含在导出中。</p><p><code>gsap.exportRoot()</code> 是一个强大的工具，它允许您将现有的 GSAP 动画导出到一个新的时间轴中，这样您就可以对它们进行集中的控制，如暂停、恢复或反向播放，而不会影响导出之后创建的任何动画。这对于执行复杂的动画序列或在游戏中创建慢动作效果等场景特别有用。</p>`,8),o=[p];function n(l,h,r,d,k,c){return i(),a("div",null,o)}const y=s(t,[["render",n]]);export{E as __pageData,y as default};