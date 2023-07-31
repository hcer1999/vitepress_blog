import{_ as s,o as n,c as a,Q as e}from"./chunks/framework.c6ce8c78.js";const A=JSON.parse('{"title":"数据库语句","description":"","frontmatter":{},"headers":[],"relativePath":"notes/sql.md","lastUpdated":1690781162000}'),l={name:"notes/sql.md"},p=e(`<h1 id="数据库语句" tabindex="-1">数据库语句 <a class="header-anchor" href="#数据库语句" aria-label="Permalink to &quot;数据库语句&quot;">​</a></h1><h2 id="增" tabindex="-1">增 <a class="header-anchor" href="#增" aria-label="Permalink to &quot;增&quot;">​</a></h2><div class="language-mysql line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">inset into &lt;表名&gt; (字段名称,字段名称) value(&#39;value&#39;,&#39;value2&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;">-- 插入一段</span></span>
<span class="line"><span style="color:#A6ACCD;">inset into &lt;表名&gt; (字段名称,字段名称) value(&#39;value&#39;,&#39;value2&#39;),(&#39;value1&#39;,&#39;value2&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;">-- 插入两段</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="删" tabindex="-1">删 <a class="header-anchor" href="#删" aria-label="Permalink to &quot;删&quot;">​</a></h2><div class="language-mysql line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">delete from &lt;表名&gt; where id=1</span></span>
<span class="line"><span style="color:#A6ACCD;">-- 删除数据库中id为1的这条数据</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="改" tabindex="-1">改 <a class="header-anchor" href="#改" aria-label="Permalink to &quot;改&quot;">​</a></h2><div class="language-mysql line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">update &lt;表名&gt; set name = &#39;zhangsan&#39; where age = 30;</span></span>
<span class="line"><span style="color:#A6ACCD;">-- 将age=30的字段的name改为zhangsan</span></span>
<span class="line"><span style="color:#A6ACCD;">update &lt;表名&gt; set age = age+50 where name = &#39;李四&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;">-- 将name为李四的字段的age等于本身加上50</span></span>
<span class="line"><span style="color:#A6ACCD;">update &lt;表名&gt; set age = age+50,name=&#39;张三&#39; where name=&#39;李四&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;">-- 将name为李四的字段的age改为本身加50，name改为张三</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="查" tabindex="-1">查 <a class="header-anchor" href="#查" aria-label="Permalink to &quot;查&quot;">​</a></h2><div class="language-mysql line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">mysql</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">select * form &lt;表名&gt;;</span></span>
<span class="line"><span style="color:#A6ACCD;">-- 查询所有数据</span></span>
<span class="line"><span style="color:#A6ACCD;">select distinct name from &lt;表名&gt;;</span></span>
<span class="line"><span style="color:#A6ACCD;">-- 查询去重后的数据</span></span>
<span class="line"><span style="color:#A6ACCD;">select * from &lt;表名&gt; where age=22;</span></span>
<span class="line"><span style="color:#A6ACCD;">-- 查询age等于22的数据</span></span>
<span class="line"><span style="color:#A6ACCD;">select * from &lt;表名&gt; where age&gt;22;</span></span>
<span class="line"><span style="color:#A6ACCD;">-- 查询age&gt;22的数据</span></span>
<span class="line"><span style="color:#A6ACCD;">select * from &lt;表名&gt; where age&lt;22;</span></span>
<span class="line"><span style="color:#A6ACCD;">-- 查询age&lt;22的数据</span></span>
<span class="line"><span style="color:#A6ACCD;">select * from &lt;表名&gt; where age&gt;=22;</span></span>
<span class="line"><span style="color:#A6ACCD;">-- 查询age&gt;=22的数据</span></span>
<span class="line"><span style="color:#A6ACCD;">select * from &lt;表名&gt; where age&lt;=22;</span></span>
<span class="line"><span style="color:#A6ACCD;">-- 查询age&lt;=22的数据</span></span>
<span class="line"><span style="color:#A6ACCD;">select * from &lt;表名&gt; where name like &#39;%mysql%&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">-- 查询name字段中包含mysql的数据（ 模糊查找 ）</span></span>
<span class="line"><span style="color:#A6ACCD;">select * from &lt;表名&gt; where name like  &#39;mysql%&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">-- 查询name字段中以mysql开头的数据</span></span>
<span class="line"><span style="color:#A6ACCD;">select * from &lt;表名&gt; where age between 100 and 200;</span></span>
<span class="line"><span style="color:#A6ACCD;">-- 区间查询</span></span>
<span class="line"><span style="color:#A6ACCD;">select * from &lt;表名&gt; where name = &#39;zhangsan &#39; or name = &#39;lisi&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;">-- 或</span></span>
<span class="line"><span style="color:#A6ACCD;">select username,age  from &lt;表名&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">-- 查询指定列的数据</span></span>
<span class="line"><span style="color:#A6ACCD;">select username,age from &lt;表名&gt; where age&gt;30</span></span>
<span class="line"><span style="color:#A6ACCD;">-- 查询指定列数据并且age&gt;30</span></span>
<span class="line"><span style="color:#A6ACCD;">select * from &lt;表名&gt; order by age desc;</span></span>
<span class="line"><span style="color:#A6ACCD;">-- 降序</span></span>
<span class="line"><span style="color:#A6ACCD;">select * from &lt;表名&gt; order by age asc;</span></span>
<span class="line"><span style="color:#A6ACCD;">-- 升序</span></span>
<span class="line"><span style="color:#A6ACCD;">select * from &lt;表名&gt; limit 0,5;</span></span>
<span class="line"><span style="color:#A6ACCD;">-- 显示多少条数据（跳过0 条数据显示 5条数据）</span></span>
<span class="line"><span style="color:#A6ACCD;">select count(*) from &lt;表名&gt; where age&gt;30</span></span>
<span class="line"><span style="color:#A6ACCD;">-- 查询某个结果中有多少条数据</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div>`,9),r=[p];function t(c,o,i,m,b,C){return n(),a("div",null,r)}const d=s(l,[["render",t]]);export{A as __pageData,d as default};
