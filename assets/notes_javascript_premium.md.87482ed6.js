import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.c6ce8c78.js";const C=JSON.parse('{"title":"JavaScript - 进阶知识点","description":"","frontmatter":{},"headers":[],"relativePath":"notes/javascript_premium.md","lastUpdated":1705823850000}'),o={name:"notes/javascript_premium.md"},p=l(`<h1 id="javascript-进阶知识点" tabindex="-1">JavaScript - 进阶知识点 <a class="header-anchor" href="#javascript-进阶知识点" aria-label="Permalink to &quot;JavaScript - 进阶知识点&quot;">​</a></h1><h2 id="_1-数据类型检测的方式有哪些" tabindex="-1">1. 数据类型检测的方式有哪些 <a class="header-anchor" href="#_1-数据类型检测的方式有哪些" aria-label="Permalink to &quot;1. 数据类型检测的方式有哪些&quot;">​</a></h2><ol><li>typeof</li></ol><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">typeof</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">             </span><span style="color:#676E95;font-style:italic;">//number</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">typeof</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">          </span><span style="color:#676E95;font-style:italic;">//boolean</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">typeof</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">str</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">         </span><span style="color:#676E95;font-style:italic;">//string</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">typeof</span><span style="color:#A6ACCD;"> [])</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">            </span><span style="color:#676E95;font-style:italic;">//object</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">typeof</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(){}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">//function</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">typeof</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">undefined</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">     </span><span style="color:#676E95;font-style:italic;">//object</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">typeof</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">          </span><span style="color:#676E95;font-style:italic;">//undefined</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><ol start="2"><li>instanceof <code>instanceof</code>可以正确判断对象的类型， 其内部运行机制是判断在其原型链中能否找到该类型的原型。</li></ol><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">5</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">instanceof</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Number</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">             </span><span style="color:#676E95;font-style:italic;">//false</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#FF9CAC;">false</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">instanceof</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Boolean</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">         </span><span style="color:#676E95;font-style:italic;">//false</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">str</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">instanceof</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">String</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">         </span><span style="color:#676E95;font-style:italic;">//false</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">([] </span><span style="color:#89DDFF;">instanceof</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Array</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">             </span><span style="color:#676E95;font-style:italic;">//true</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">00instanceof </span><span style="color:#A6ACCD;font-style:italic;">Function</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">;  </span><span style="color:#676E95;font-style:italic;">//true</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">instanceof</span><span style="color:#A6ACCD;"> 0</span><span style="color:#FFCB6B;">bject</span><span style="color:#A6ACCD;">);             </span><span style="color:#676E95;font-style:italic;">//true</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><code>instanceof</code> 只能正确判断引用数据类型， 而不能判断基本数据类型。 <code>instanceof</code> 运算符可以用来测试一个对象在其原型链中是否存在一个构造函数的<code> prototype</code> 属性。 3. constructor</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">((</span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">constructor </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> Number)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">               </span><span style="color:#676E95;font-style:italic;">//true</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">((</span><span style="color:#FF9CAC;">true</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">constructor </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> Boolean)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">          </span><span style="color:#676E95;font-style:italic;">//true</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">((</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">str</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">constructor </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> String)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">           </span><span style="color:#676E95;font-style:italic;">//true</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(([])</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">constructor </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> Array)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">               </span><span style="color:#676E95;font-style:italic;">//true</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">((</span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">constructor </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> Function)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">//true</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">((</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">constructor </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">e</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> 0bject)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">               </span><span style="color:#676E95;font-style:italic;">//true</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><code>constructor</code>有两个作用，一是判断数据的类型，二是对象实例通过<code>constrcutor</code> 对象访问它的构造函数。 需要注意，如果创建一个对象来改变它的原型， <code>constructor</code> 就不能用来判断数据类型了。</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Fn</span><span style="color:#89DDFF;">(){};</span></span>
<span class="line"><span style="color:#FFCB6B;">Fn</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Array</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> f </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Fn</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(f</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">constructor </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> Fn)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;">// false</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(f</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">constructor </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> Array)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// true</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ol start="4"><li>Object.prototype.toString.call() Object.prototype.toString.call() 使用 <code>Object</code> 对象的原型方法 <code>toString</code>来判断数据类型：</li></ol><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Object</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">toString</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(a</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">call</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">))</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">     </span><span style="color:#676E95;font-style:italic;">//[object Number]</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(a</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">call</span><span style="color:#A6ACCD;">(</span><span style="color:#FF9CAC;">true</span><span style="color:#A6ACCD;">))</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">   </span><span style="color:#676E95;font-style:italic;">//[object Boolean]</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(a</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">call</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">str</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">))</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">//[object String]</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(a</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">call</span><span style="color:#A6ACCD;">([]))</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">     </span><span style="color:#676E95;font-style:italic;">//[object Array]</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(a</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">call</span><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(){}</span><span style="color:#A6ACCD;">))</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">   </span><span style="color:#676E95;font-style:italic;">//[object Function]</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(a</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">call</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{}</span><span style="color:#A6ACCD;">))</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">             </span><span style="color:#676E95;font-style:italic;">//[object Object]</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(a</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">call</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">undefined</span><span style="color:#A6ACCD;">))</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">      </span><span style="color:#676E95;font-style:italic;">//[object Undefined]</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(a</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">call</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">null</span><span style="color:#A6ACCD;">))</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">           </span><span style="color:#676E95;font-style:italic;">//[object Null]</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="_2-null-和-undefined-区别" tabindex="-1">2. null 和 undefined 区别 <a class="header-anchor" href="#_2-null-和-undefined-区别" aria-label="Permalink to &quot;2. null 和 undefined 区别&quot;">​</a></h2><ul><li><p>首先 <code>Undefined</code> 和 <code>Null</code> 都是基本数据类型， 这两个基本数据类型分别都只有一个值， 就是 <code>undefined</code> 和 <code>null</code>。</p></li><li><p><code>undefined</code> 代表的含义是未定义， <code>null</code> 代表的含义是空对象。 一般变量声明了但还没有定义的时候会返回<code>undefined</code>， <code>null</code>主要用于赋值给一些可能会返回对象的变量， 作为初始化。<code>undefined</code> 在 <code>JavaScript</code> 中不是一个保留字， 这意味着可以使用<code>undefined</code>来作为一个变量名， 但是这样的做法是非常危险的， 它会影响对<code>undefined</code> 值的判断。 我们可以通过一些方法获得安全的<code>undefined</code>值，比如说 <code>void 0</code>。</p></li><li><p>当对这两种类型使用 <code>typeof </code>进行判断时， <code>Null</code>类型化会返回<code>object</code> ，这是一个历史遗留的问题。 当使用双等号对两种类型的值进行比较时会返回<code>true</code>， 使用三个等号时会返回 <code>false</code>。</p></li></ul><h2 id="_3-intanceof-操作符的实现原理及实现" tabindex="-1">3. intanceof 操作符的实现原理及实现 <a class="header-anchor" href="#_3-intanceof-操作符的实现原理及实现" aria-label="Permalink to &quot;3. intanceof 操作符的实现原理及实现&quot;">​</a></h2><p><code>instanceof</code>运算符用于判断构造函数的 <code>prototype</code> 属性是否出现在对象的原型链中的任何位置。</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">myInstanceof</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">left</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">right</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">//获取对象的原型</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">proto</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">object</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getPrototypeof</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">left</span><span style="color:#F07178;">) </span><span style="color:#676E95;font-style:italic;">//获取构造函数的 prototype对象</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">prototype</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">right</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">prototype</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">//判断构造函数的prototype对象是否在对象的原型链上</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">while</span><span style="color:#F07178;"> (</span><span style="color:#FF9CAC;">true</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">proto</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> ((</span><span style="color:#A6ACCD;">proto</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">prototype</span><span style="color:#F07178;">)) </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">//如果没有找到,就继续从其原型上找，object.getPrototypeof方法用来获取指定对象的原型</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">proto</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">object</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getprototypeof</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">proto</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="_4-如何获取安全的-undefined-值" tabindex="-1">4. 如何获取安全的 undefined 值？ <a class="header-anchor" href="#_4-如何获取安全的-undefined-值" aria-label="Permalink to &quot;4.  如何获取安全的 undefined 值？&quot;">​</a></h2><p>因为 <code>undefined</code> 是一个标识符， 所以可以被当作变量来使用和赋值，但是这样会影响 <code>undefined</code> 的正常判断。 表达式 <code>void ___</code> 没有返回值， 因此返回结果是 <code>undefined</code>。<code> void</code> 并不改变表达式的结果，只是让表达式不返回值。 因此可以用 <code>void 0</code> 来获得 <code>undefined</code>。</p><h2 id="_5-object-is-与比较操作符-、-的区别" tabindex="-1">5. Object.is() 与比较操作符 “ ===” 、 “ ==” 的区别？ <a class="header-anchor" href="#_5-object-is-与比较操作符-、-的区别" aria-label="Permalink to &quot;5. Object.is() 与比较操作符 “ ===” 、 “ ==” 的区别？&quot;">​</a></h2><ul><li><p>使用双等号（ ==） 进行相等判断时，如果两边的类型不一致，则会进行强制类型转化后再进行比较。</p></li><li><p>使用三等号（ ===）进行相等判断时，如果两边的类型不一致时，不会做强制类型准换， 直接返回 <code>false</code>。</p></li><li><p>使用 <code>Object.is</code> 来进行相等判断时，一般情况下和三等号的判断相同，它处理了一些特殊的情况， 比如 -0 和 +0 不再相等， 两个 <code>NaN</code>是相等的。</p></li></ul><h2 id="_6-什么是-javascript-中的包装类型" tabindex="-1">6. 什么是 JavaScript 中的包装类型？ <a class="header-anchor" href="#_6-什么是-javascript-中的包装类型" aria-label="Permalink to &quot;6. 什么是 JavaScript 中的包装类型？&quot;">​</a></h2><p>在 JavaScript 中， 基本类型是没有属性和方法的， 但是为了便于操作基本类型的值， 在调用基本类型的属性或方法时 JavaScript 会在后台隐式地将基本类型的值转换为对象， 如：</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">abc</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">a</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">// 3</span></span>
<span class="line"><span style="color:#A6ACCD;">a</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toUpperCase</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span><span style="color:#676E95;font-style:italic;">// &quot;ABC”&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>在 访 问<code> &#39;abc&#39;.length</code> 时 ， JavaScript 将 <code>&#39;abc&#39; </code>在 后 台 转 换 成<code>String(&#39;abc&#39;)</code>， 然后再访问其 <code>length</code> 属性。 <code>JavaScript</code> 也可以使用 <code>Object</code> 函数显式地将基本类型转换为包装类型：</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">abc</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">0</span><span style="color:#82AAFF;">bject</span><span style="color:#A6ACCD;">(a)</span><span style="color:#676E95;font-style:italic;">// String {&quot;abc&quot;}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>也可以使用 valueOf 方法将包装类型倒转成基本类型：</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">abc&quot;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> b </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Object</span><span style="color:#A6ACCD;">(a)</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> c </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> b</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">valueof</span><span style="color:#A6ACCD;">( </span><span style="color:#676E95;font-style:italic;">// &quot;abc&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>看看如下代码会打印出什么：</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> a </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Boolean</span><span style="color:#A6ACCD;">(</span><span style="color:#FF9CAC;">false</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">a) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Oops” );// never runs</span></span>
<span class="line"><span style="color:#F07178;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>答案是什么都不会打印， 因为虽然包裹的基本类型是 <code>false</code>， 但是<code>false</code> 被包裹成包装类型后就成了对象， 所以其非值为 <code>false</code>， 所以循环体中的内容不会运行。</p><h2 id="_7-为什么会有-bigint-的提案" tabindex="-1">7. 为什么会有 BigInt 的提案？ <a class="header-anchor" href="#_7-为什么会有-bigint-的提案" aria-label="Permalink to &quot;7. 为什么会有 BigInt 的提案？&quot;">​</a></h2><p>JavaScript 中 <code>Number.MAX_SAFE_INTEGER</code> 表示最⼤安全数字， 计算结果是 <code>9007199254740991</code>， 即在这个数范围内不会出现精度丢失（小数除外） 。 但是⼀旦超过这个范围， js 就会出现计算不准确的情况，这在⼤数计算的时候不得不依靠⼀些第三⽅库进⾏解决， 因此官⽅提出了 <code>BigInt</code> 来解决此问题。</p><h2 id="_8-如何判断一个对象是空对象" tabindex="-1">8. 如何判断一个对象是空对象 ? <a class="header-anchor" href="#_8-如何判断一个对象是空对象" aria-label="Permalink to &quot;8. 如何判断一个对象是空对象 ?&quot;">​</a></h2><ol><li><p>使用 JSON 自带的.stringify 方法来判断 :</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;">(json</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">stringify</span><span style="color:#A6ACCD;">(0bj)</span><span style="color:#89DDFF;">==</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">{}</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">空对象&quot;);</span></span>
<span class="line"><span style="color:#F07178;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li><li><p>使用 ES6 新增的方法 Object.keys()来判断：</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;">(Object</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">keys</span><span style="color:#A6ACCD;">(Obj)</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">空对象</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li></ol><h2 id="_9-const-对象的属性可以修改吗" tabindex="-1">9. const 对象的属性可以修改吗 ? <a class="header-anchor" href="#_9-const-对象的属性可以修改吗" aria-label="Permalink to &quot;9. const 对象的属性可以修改吗  ?&quot;">​</a></h2><p><code>const</code> 保证的并不是变量的值不能改动， 而是变量指向的那个内存地址不能改动。 对于基本类型的数据（ 数值、 字符串、 布尔值） ，其值就保存在变量指向的那个内存地址， 因此等同于常量。 但对于引用类型的数据（ 主要是对象和数组） 来说， 变量指向数据的内存地址， 保存的只是一个指针， <code>const</code> 只能保证这个指针是固定不变的， 至于它指向的数据结构是不是可变的， 就完全不能控制了。</p><h2 id="_10-如果-new-一个箭头函数的会怎么样" tabindex="-1">10. 如果 new 一个箭头函数的会怎么样 ? <a class="header-anchor" href="#_10-如果-new-一个箭头函数的会怎么样" aria-label="Permalink to &quot;10. 如果 new 一个箭头函数的会怎么样 ?&quot;">​</a></h2><p>箭头函数是 <code>ES6</code> 中的提出来的， 它没有 <code>prototype</code>， 也没有自己的 <code>this</code>指向， 更不可以使用 <code>arguments</code> 参数， 所以不能<code> New</code> 一个箭头函数。</p><p>new 操作符的实现步骤如下： 1.创建一个对象 2.将构造函数的作用域赋给新对象（ 也就是将对象的__proto__属性指向构造函数的 <code>prototype</code> 属性） 3.指向构造函数中的代码， 构造函数中的 <code>this</code> 指向该对象（ 也就是为这个对象添加属性和方法） 4.返回新的对象 所以， 上面的第二、 三步， 箭头函数都是没有办法执行的 。</p>`,40),e=[p];function c(t,r,y,D,i,A){return n(),a("div",null,e)}const d=s(o,[["render",c]]);export{C as __pageData,d as default};