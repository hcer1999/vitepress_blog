import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.c6ce8c78.js";const A=JSON.parse('{"title":"用 uni-app 仿网易云音乐遇到的问题（一）","description":"","frontmatter":{},"headers":[],"relativePath":"content/docs/15.md","lastUpdated":1705823850000}'),l={name:"content/docs/15.md"},t=p(`<h1 id="用-uni-app-仿网易云音乐遇到的问题-一" tabindex="-1">用 uni-app 仿网易云音乐遇到的问题（一） <a class="header-anchor" href="#用-uni-app-仿网易云音乐遇到的问题-一" aria-label="Permalink to &quot;用 uni-app 仿网易云音乐遇到的问题（一）&quot;">​</a></h1><p>今天准备完成播放界面的开发，在设计唱片图标旋转的时候，我天真的以为使用 transform 的 roteta 就可以解决，看看代码。</p><p><img src="http://cdn.bingkele.cc/FtYsMXcEeUdCyx0batOdw6W0YFPU" alt=""></p><p>再看看执行效果</p><p><img src="http://cdn.bingkele.cc/FgkXqG4-Jatin4lcnhjrsINv19xe" alt=""></p><p>就 TM 转了一圈！！！！</p><p>秃然想起使用自定义动画解决。</p><p>整！</p><p>上代码！</p><div class="language-css line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/*</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">			rotate : 定义的动画名称</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">			10s : 动画时间</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">			linear : 动画平滑</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">			infinite :使动画无限循环</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">			transform:rotate(旋转角度)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">			%0:动画开始</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">			%100:动画结束</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">*/</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;font-style:italic;">@keyframes</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">rotate</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">				</span><span style="color:#FFCB6B;">0%</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">					</span><span style="color:#B2CCD6;">transform</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">rotate</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">0deg</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">				</span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">​				</span><span style="color:#FFCB6B;">20%</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">​					</span><span style="color:#B2CCD6;">transform</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">rotate</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">72deg</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">​				</span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">​				</span><span style="color:#FFCB6B;">40%</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">​					</span><span style="color:#B2CCD6;">transform</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">rotate</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">144deg</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">​				</span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">​				</span><span style="color:#FFCB6B;">60%</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">​					</span><span style="color:#B2CCD6;">transform</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">rotate</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">216deg</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">​				</span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">​				</span><span style="color:#FFCB6B;">80%</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">​					</span><span style="color:#B2CCD6;">transform</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">rotate</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">288deg</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">​				</span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">​				</span><span style="color:#FFCB6B;">100%</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">​	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><p>再看看效果</p><p><img src="http://cdn.bingkele.cc/FojXO5qcv5ojdZn-w46HvGQLqDqr" alt=""></p><p>完美解决！</p>`,13),e=[t];function o(r,c,i,y,D,C){return n(),a("div",null,e)}const b=s(l,[["render",o]]);export{A as __pageData,b as default};