webpackJsonp([12,20],{781:function(s,a){s.exports={content:'<div class="picidae-toc">\n<ul>\n<li>\n<a href="#footer%E7%BB%9D%E5%AF%B9%E5%AE%9A%E4%BD%8D">footer绝对定位</a>\n</li>\n<li>\n<a href="#%E6%B7%BB%E5%8A%A0%E9%A2%9D%E5%A4%96%E6%A0%87%E7%AD%BE">添加额外标签</a>\n</li>\n</ul>\n</div>\n<p>定位是一个极其常见的需求，用到的css属性也是很基础的，像position，height等。但前些天写博客主题，接连定位博客footer不成功，才意识到即便是这么简单的属性，其中也蕴含着‘大道理’。\n当时自认为遇到了一些很奇怪的问题，查阅了相关资料后才发现其实是一些基本概念没弄清楚，比如：</p>\n<ul>\n<li>相对高度的相对是根据谁来计算的？</li>\n<li>怎么确定绝对定位元素的包含块？</li>\n<li>绝对定位和相对定位元素的相对高度计算规则是否一样？相对最小高度（min-height）呢？</li>\n<li>什么是 <code>initial containing block</code>, 初始包含块的大小怎么算？</li>\n</ul>\n<p>ok，先抛开这些问题，回到定位footer。</p>\n<p>为了便于叙述，我们把一个页面抽象为三部分，页面头部、页面底部和页面主体内容部分，下文中分别用header、footer和content来指代这三部分。</p>\n<p>通常情况下，footer的高度是固定的，content的高度不固定。footer的定位通常有两个要求：</p>\n<ol>\n<li>当页面高度小于视图(viewport)高度时，footer在视图底部</li>\n<li>当页面高度大于视图高度时，footer在页面底部</li>\n</ol>\n<p>考虑到以上，有两种思路</p>\n<ul>\n<li>footer使用绝对定位且<code>bottom: 0</code>，footer的包含块的高度 = max(视图高度，页面高度)</li>\n<li>用一个额外的标签包含header和content，footer使用margin负值</li>\n</ul>\n<h3 id="footer绝对定位"><a href="#footer%E7%BB%9D%E5%AF%B9%E5%AE%9A%E4%BD%8D" aria-hidden="true"><span class="icon icon-link"></span></a>footer绝对定位</h3>\n<p>绝对定位的语法没啥可说的，其位置（top/bottom/left/right）是相对该元素的包含块来说的，所以定好位的关键是找准元素的包含块。</p>\n<p>html结构如下</p>\n<pre><code class="hljs language-html" data-query="{}" data-lang="html"><span class="hljs-tag">&#x3C;<span class="hljs-name">body</span>></span>\n  <span class="hljs-tag">&#x3C;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap"</span>></span>\n    <span class="hljs-tag">&#x3C;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"header"</span>></span>This is header<span class="hljs-tag">&#x3C;/<span class="hljs-name">div</span>></span>\n    <span class="hljs-tag">&#x3C;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>></span>This is content<span class="hljs-tag">&#x3C;/<span class="hljs-name">div</span>></span>\n    <span class="hljs-tag">&#x3C;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footer"</span>></span>This is footer<span class="hljs-tag">&#x3C;/<span class="hljs-name">div</span>></span>\n  <span class="hljs-tag">&#x3C;/<span class="hljs-name">div</span>></span>\n<span class="hljs-tag">&#x3C;/<span class="hljs-name">body</span>></span></code></pre>\n<p>footer设置绝对定位</p>\n<pre><code class="hljs language-CSS" data-query="{}" data-lang="CSS"><span class="hljs-selector-class">.footer</span> {\n  <span class="hljs-attribute">position</span>: absolute;\n  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;\n  <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;\n  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;\n  <span class="hljs-attribute">background</span>: blue;\n}</code></pre>\n<p>若只是这样，footer总是在视图底部，即便页面高度大于视图高度，并没有达到我们想到的效果。</p>\n<p>为什么呢？</p>\n<p>分析一下，绝对定位元素的位置是相对其包含块来说的，那么绝对定位元素的包含块是谁？</p>\n<p><a href="https://www.w3.org/TR/CSS2/visudet.html#containing-block-details">w3.org 10.1节关于containing block的介绍：</a></p>\n<blockquote>\n<p>If the element has \'position: absolute\', the containing block is established by the nearest ancestor with a \'position\' of \'absolute\', \'relative\' or \'fixed\', in the following way:</p>\n<p>In the case that the ancestor is an inline element, the containing block is the bounding box around the padding boxes of the first and the last inline boxes generated for that element. In CSS 2.1, if the inline element is split across multiple lines, the containing block is undefined.</p>\n<p>Otherwise, the containing block is formed by the padding edge of the ancestor.</p>\n<p>If there is no such ancestor, the containing block is the initial containing block.</p>\n</blockquote>\n<p>简而言之，绝对定位元素的包含块是position为absolute/relative/fixed的最近的祖先元素，如果没有这样的祖先，那就是初始包含块。</p>\n<p><a href="https://www.w3.org/TR/CSS2/visudet.html#containing-block-details">w3c对初始包含块的介绍: </a></p>\n<blockquote>\n<p>The containing block in which the root element lives is a rectangle called the initial containing block. For continuous media, it has the dimensions of the viewport and is anchored at the canvas origin; it is the page area for paged media. </p>\n</blockquote>\n<p>根元素的包含块是初始包含块，对于<code>continuous media</code>来说，它的尺寸和视图尺寸一样大。</p>\n<p>回到footer定位\n可以发现footer现在的包含块就是初始包含块，所以footer会一直在视图底部。</p>\n<p>包含块可以是任意祖先元素，若其高度要等于max(视图高度，页面高度)，footer的位置即可满足条件。</p>\n<p>那就给footer找一个合适的祖先元素咯~</p>\n<pre><code class="hljs language-CSS" data-query="{}" data-lang="CSS"><span class="hljs-selector-tag">html</span>, <span class="hljs-selector-tag">body</span> {\n  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;\n}\n<span class="hljs-selector-class">.wrap</span> {\n  <span class="hljs-attribute">position</span>: relative;   <span class="hljs-comment">/* 使wrap成为footer的包含块，也可以是absolute/fixed */</span>\n  <span class="hljs-attribute">min-height</span>: <span class="hljs-number">100%</span>;     \n  <span class="hljs-attribute">padding-bottom</span>: <span class="hljs-number">100px</span>; <span class="hljs-comment">/* 给footer留空间 */</span>\n  <span class="hljs-attribute">box-sizing</span>: border-box;\n}</code></pre>\n<p><a href="https://codepen.io/Claiyre/pen/xYWXde">demo1</a></p>\n<p>这里的关键是给把html和body的高度指定为100%，MDN上对相对<code>min-height</code>有这样的介绍：</p>\n<blockquote>\n<p>The percentage is calculated with respect to the height of the generated box\'s containing block. If the height of the containing block is not specified explicitly (i.e., it depends on content height), and this element is not absolutely positioned, the percentage value is treated as 0.</p>\n</blockquote>\n<p>翻译过来就是相对高度是根据其包含块的高度计算的，若包含块的高度没有被明确指定，且该元素不是绝对定位元素，则这个相对高度被视作0</p>\n<p>这里相对定位元素wrap的包含块是它的父元素body，若不指定body的高度，wrap的min-height就相当于0，若不指定html的高度为100%，html的默认高度是其content高度，当content的高度不足时，footer在wrap底部但不在视图底部。</p>\n<p>但是在一些情况下，wrap和body之间有多个元素，即body并不是wrap的直接父元素，我们不便强制要求wrap的所有祖先元素都 <code>height: 100%</code>，这时该怎么办呢？</p>\n<p>考虑绝对定位呀！</p>\n<p>绝对定位元素的包含块，不总是其父元素，利用这点。</p>\n<pre><code class="hljs language-CSS" data-query="{}" data-lang="CSS"><span class="hljs-selector-class">.wrap</span> {\n  <span class="hljs-attribute">position</span>: absolute;\n  <span class="hljs-attribute">min-height</span>: <span class="hljs-number">100%</span>;\n  <span class="hljs-attribute">padding-bottom</span>: <span class="hljs-number">100px</span>;\n  <span class="hljs-attribute">box-sizing</span>: border-box;\n  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;\n}</code></pre>\n<p><a href="https://codepen.io/Claiyre/pen/ZrxXrq">demo2</a></p>\n<p>这样wrap的包含块就变成了初始包含块，其高度是视图高度，所以wrap的最小高度就是视图高度咯！\n完成~</p>\n<h3 id="添加额外标签"><a href="#%E6%B7%BB%E5%8A%A0%E9%A2%9D%E5%A4%96%E6%A0%87%E7%AD%BE" aria-hidden="true"><span class="icon icon-link"></span></a>添加额外标签</h3>\n<p>第二种思路是把除footer外的其他部分用一个父元素包裹起来，形成这样的结构</p>\n<pre><code class="hljs language-html" data-query="{}" data-lang="html"><span class="hljs-tag">&#x3C;<span class="hljs-name">body</span>></span>\n  <span class="hljs-tag">&#x3C;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>></span>\n    <span class="hljs-tag">&#x3C;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"header"</span>></span>This is header<span class="hljs-tag">&#x3C;/<span class="hljs-name">div</span>></span>\n    <span class="hljs-tag">&#x3C;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>></span>This is content<span class="hljs-tag">&#x3C;/<span class="hljs-name">div</span>></span>\n  <span class="hljs-tag">&#x3C;/<span class="hljs-name">div</span>></span>\n  <span class="hljs-tag">&#x3C;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footer"</span>></span>This is footer<span class="hljs-tag">&#x3C;/<span class="hljs-name">div</span>></span>\n<span class="hljs-tag">&#x3C;/<span class="hljs-name">body</span>></span></code></pre>\n<p>css样式</p>\n<pre><code class="hljs language-css" data-query="{}" data-lang="css"><span class="hljs-selector-tag">html</span>, <span class="hljs-selector-tag">body</span>{\n  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;\n}\n<span class="hljs-selector-class">.container</span> {\n  <span class="hljs-attribute">min-height</span>: <span class="hljs-number">100%</span>;\n  <span class="hljs-attribute">box-sizing</span>: border-box;\n  <span class="hljs-attribute">padding</span>: <span class="hljs-number">100px</span>;       <span class="hljs-comment">/* footer的高度 */</span>\n}\n<span class="hljs-selector-class">.footer</span> {\n  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;\n  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">100px</span>;\n  <span class="hljs-attribute">background</span>: blue;\n}</code></pre>\n<p>这种方法给header和content添加了一个额外的标签，语义化结构不如第一种好，但易于理解。</p>\n',extra:{}}}});