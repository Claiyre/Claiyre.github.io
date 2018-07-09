webpackJsonp([19,20],{774:function(n,e){n.exports={content:'<div class="picidae-toc">\n<ul>\n<li>\n<a href="#%E5%89%8D%E8%A8%80">前言</a>\n<ul>\n<li>\n<ul>\n<li>\n<a href="#%E5%9F%BA%E6%9C%AC%E5%8E%9F%E7%90%86">基本原理</a>\n</li>\n<li>\n<a href="#xmlhttprequest%E5%AF%B9%E8%B1%A1">XMLHttpRequest对象</a>\n</li>\n<li>\n<a href="#%E8%AF%B7%E6%B1%82%E7%B1%BB%E5%9E%8B">请求类型</a>\n</li>\n<li>\n<a href="#ajax%E4%BC%98%E7%BC%BA%E7%82%B9">Ajax优缺点</a>\n</li>\n<li>\n<a href="#%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF">应用场景</a>\n</li>\n</ul>\n</li>\n</ul>\n</li>\n<li>\n<a href="#%E7%BB%93%E8%AF%AD">结语</a>\n</li>\n</ul>\n</div>\n<blockquote>\n<p>博客原文地址：<a href="https://claiyre.github.io/">Claiyre的个人博客 https://claiyre.github.io/</a>\n博客园地址：<a href="http://www.cnblogs.com/nuannuan7362/">http://www.cnblogs.com/nuannuan7362/</a>\n如需转载，请在文章开头注明原文地址</p>\n</blockquote>\n<h1 id="前言"><a href="#%E5%89%8D%E8%A8%80" aria-hidden="true"><span class="icon icon-link"></span></a>前言</h1>\n<p>Ajax的全称为Asynchronous JavaScript And Xml，是一种web客户端与服务器端异步通信的技术，如今，可以说是web开发人员必须掌握的的一项技能了。本文讲述了Ajax的基本原理、基础知识、优缺点以及应用场景。</p>\n<!--more-->\n<p>#正文</p>\n<h3 id="基本原理"><a href="#%E5%9F%BA%E6%9C%AC%E5%8E%9F%E7%90%86" aria-hidden="true"><span class="icon icon-link"></span></a>基本原理</h3>\n<p>Ajax的工作原理相当于在服务器和客户端之间加了一个中间层，由这个中间层操控，使用户操作与服务器端响应异步化。\nAjax技术的核心是XMLHttpRequest对象，简称为XHR，这是由微软首先引入的一个特性，其他浏览器供应商也先后提供了相同的实现。XHR为向服务器发送请求和解析服务器响应提供了流畅的接口。能以异步的方式为从服务器取得信息，意味着用户单击后（即请求），可以不必刷新页面就能取得数据，也就是说用XHR对象取得新的数据，然后再通过DOM将数据插入到页面中去。\nAjax可实现无需刷新页面即可胸服务器取得数据展示给用户，但这个数据不一定非要是XML，也可是json字符串等，不要被它的名字所迷惑。</p>\n<h3 id="xmlhttprequest对象"><a href="#xmlhttprequest%E5%AF%B9%E8%B1%A1" aria-hidden="true"><span class="icon icon-link"></span></a>XMLHttpRequest对象</h3>\n<ol>\n<li>创建xhr对象\nIE5是第一款引入XHR对象的浏览器，在IE5中XHR是通过MSXML库中的  ActiveX对象实现的，会遇到三个不同版本的XHR对象，因此创建起来也颇为麻烦。\n但幸运的是，IE7+，Firefox，Opera，chrome和Safari都支持原生的XHR对象，在这些浏览器中都可像下面这样直接使用XMLHttpRequest构造函数创建XHR对象。</li>\n</ol>\n<pre><code data-query="{}" data-lang="">var xhr = new XMLHttpRequest();\n</code></pre>\n<ol start="2">\n<li>发送请求\n发送请求一共分为两步。第一步，调用XHR对象的 <code>open()</code>函数，启动一个请求以备发送，调用后，请求并未真正发送。第二步，调用 <code>send()</code> 函数，真正地将请求发送出去。实例代码如下：</li>\n</ol>\n<pre><code data-query="{}" data-lang="">xhr.open("get","example.jsp",false);\nxhr.send(null);\n</code></pre>\n<p><code>open</code>方法接受三个参数：要发送的请求类型(常用的有get和post)，请求的url和表示是否异步的布尔值。<code>send()</code>方法接受一个参数，即要作为请求主体发送的数据。但是<strong> 不需要通过请求主体发送数据时，必须给send()方法传入 null </strong>。</p>\n<ol start="3">\n<li>异步请求\n多数情况下，我们不能像上面那样发送同步请求，而是需要发送异步请求，JavaScript可以继续执行而不必等待响应。这时，可以检测XHR对象的readyState属性，它有以下几个可能的值：</li>\n</ol>\n<ul>\n<li>0：未初始化。尚未调用open()</li>\n<li>1: 启动。已调用open()，未调用send()</li>\n<li>2: 发送。已调用send()，为未收到响应</li>\n<li>3：接受。已接受到部分数据</li>\n<li>4：完成。已接受全部数据</li>\n</ul>\n<p>readyState的值每次变化都会触发一次readystatechange事件。通常，我们只对最后一个状态感兴趣，只要readyState变为4，我们就可以开始处理响应了。因此可以这样写代码：</p>\n<pre><code data-query="{}" data-lang="">var xhr = new XMLHttpRequest();\nxhr.onreadystatechange = function (){\n    if(xhr.readyState == 4){\n        //处理响应\n    }\n};\nxhr.open("get","example.jsp",true);\nxhr.send(null);\n</code></pre>\n<p>注意因为调用open方法时也会触发readystatechange事件，所以<strong> 在调用open前就要注册eadystatechange事件 </strong>。</p>\n<p>4 . 异步请求\n在收到响应后，响应的数据会自动填充xhr对象的相关属性，因此我们只需判断处理这些属性即可。相关属性如下：</p>\n<ul>\n<li>responseText：作为响应被返回的主体</li>\n<li>responseXML：如果响应的类型是"text/xml"或"application/xml"，这个属性将保存着响应的xml文档</li>\n<li>status：响应的http状态</li>\n<li>statusText：http状态的说明</li>\n</ul>\n<p>收到响应后，我们首先应根据http的状态判断是否成功，一般状态码status = 200,被是做成功状态码为304表示内容未被修改，可使用本地缓存。可像下面这样检测这两种状态码：</p>\n<pre><code data-query="{}" data-lang="">var xhr = new XMLHttpRequest();\n\nxhr.onreadystatechange = function (){\n    if(xhr.readyState == 4){\n        if((xhr.status >= 200 &#x26;&#x26; xhr.status &#x3C; 300) || xhr.status == 304){\n            //响应成功返回 可做一定处理，比如\n            alert(xhr.responseText);\n        }else{\n            alert("Request was unsuccessful " + xhr.status);\n        }\n    }\n};\nxhr.open("get","example.jsp",true);\nxhr.send(null);\n</code></pre>\n<p>另外在接收到响应之前还可以调用abort()方法来取消异步操作：</p>\n<pre><code data-query="{}" data-lang="">xhr.abort()                                     \n</code></pre>\n<h3 id="请求类型"><a href="#%E8%AF%B7%E6%B1%82%E7%B1%BB%E5%9E%8B" aria-hidden="true"><span class="icon icon-link"></span></a>请求类型</h3>\n<p>常用的请求类型有get和post两种。get请求通常用于向服务器查询信息。必要时可以将查询字符串经正确编码后追加至URL末尾，示例如下：</p>\n<pre><code data-query="{}" data-lang="">xhr.open("get","example.php?name1=value1&#x26;name2=value2&#x26;name3=value3",true);\n</code></pre>\n<p>即路径和第一个查询字符串间用<code>?</code>分隔，多个查询字符串间用<code>&#x26;</code>分隔。\n下面这个函数可以辅助向url末尾添加查询字符串</p>\n<pre><code data-query="{}" data-lang="">function addURLParam (url,name,value) {\n    url += (url.indexOf("?") == -1) ? "?" : "&#x26;";\n    url += encodeURLComponent(name) + "=" + encodeURLComponent(value);\n    return url;\n}\n</code></pre>\n<p>post请求用于向服务器发送要保存的数据，这些数据传入send函数，由send函数发送给服务器。</p>\n<h3 id="ajax优缺点"><a href="#ajax%E4%BC%98%E7%BC%BA%E7%82%B9" aria-hidden="true"><span class="icon icon-link"></span></a>Ajax优缺点</h3>\n<ol>\n<li>优点</li>\n</ol>\n<ul>\n<li><strong> 无刷新更新数据 </strong>。AJAX最大优点就是能在不刷新整个页面的前提下与服务器通信维护数据。这使得Web应用程序更为迅捷地响应用户交互，并避免了在网络上发送那些没有改变的信息，减少用户等待时间，带来非常好的用户体验。</li>\n<li><strong> 异步与服务器通信 </strong>。AJAX使用异步方式与服务器通信，不需要打断用户的操作，具有更加迅速的响应能力。优化了Browser和Server之间的沟通，减少不必要的数据传输、时间及降低网络上数据流量。</li>\n<li><strong> 基于标准被广泛支持 </strong>。AJAX基于标准化的并被广泛支持的技术，不需要下载浏览器插件或者小程序，但需要客户允许JavaScript在浏览器上执行。随着Ajax的成熟，一些简化Ajax使用方法的程序库也相继问世。同样，也出现了另一种辅助程序设计的技术，为那些不支持JavaScript的用户提供替代功能。</li>\n<li><strong> 前端和后端负载平衡 </strong>。AJAX可以把以前一些服务器负担的工作转嫁到客户端，利用客户端闲置的能力来处理，减轻服务器和带宽的负担，节约空间和宽带租用成本。并且减轻服务器的负担，AJAX的原则是“按需取数据”，可以最大程度的减少冗余请求和响应对服务器造成的负担，提升站点性能</li>\n<li><strong> 界面与应用分离 </strong>。Ajax使WEB中的界面与应用分离（也可以说是数据与呈现分离），有利于分工合作、减少非技术人员对页面的修改造成的WEB应用程序错误、提高效率、也更加适用于现在的发布系统。</li>\n</ul>\n<ol start="2">\n<li>缺点</li>\n</ol>\n<ul>\n<li>阉割了浏览器的History和BACK功能 **。其一在动态更新页面的情况下，用户无法回到前一个页面状态，因为浏览器仅能记忆历史记录中的静态页面。一个被完整读入的页面与一个已经被动态修改过的页面之间的差别非常微妙；用户通常会希望单击后退按钮能够取消他们的前一次操作，但是在Ajax应用程序中，这将无法实现。其二，后退按钮是一个标准的web站点的重要功能，但是它没法和js进行很好的合作。这是Ajax所带来的两个比较严重的问题，虽然说这个问题是可以解决的，但是它所带来的开发成本是非常高的。</li>\n<li>AJAX的安全问题。AJAX技术给用户带来很好的用户体验的同时也对IT企业带来了新的安全威胁，Ajax技术就如同对企业数据建立了一个直接通道。这使得开发者在不经意间会暴露比以前更多的数据和服务器逻辑。Ajax的逻辑可以对客户端的安全扫描技术隐藏起来，允许黑客从远端服务器上建立新的攻击。还有Ajax也难以避免一些已知的安全弱点，诸如跨站点脚本攻击、SQL注入攻击和基于Credentials的安全漏洞等等。\n-客户端过肥，太多客户端代码造成开发上的成本。编写复杂、容易出错 ；冗余代码比较多（层层包含js文件是AJAX的通病，再加上以往的很多服务端代码现在放到了客户端）；破坏了Web的原有标准</li>\n</ul>\n<h3 id="应用场景"><a href="#%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF" aria-hidden="true"><span class="icon icon-link"></span></a>应用场景</h3>\n<ol>\n<li>Ajax适用场景</li>\n</ol>\n<ul>\n<li>表单驱动的交互</li>\n<li>深层次的树的导航</li>\n<li>快速的用户与用户间的交流响应</li>\n<li>类似投票、yes/no等无关痛痒的场景</li>\n<li>对数据进行过滤和操纵相关数据的场景</li>\n<li>普通的文本输入提示和自动完成的场景</li>\n</ul>\n<ol start="2">\n<li>Ajax不适用场景</li>\n</ol>\n<ul>\n<li>部分简单的表单</li>\n<li>搜索</li>\n<li>基本的导航</li>\n<li>替换大量的文本</li>\n<li>对呈现的操纵</li>\n</ul>\n<h1 id="结语"><a href="#%E7%BB%93%E8%AF%AD" aria-hidden="true"><span class="icon icon-link"></span></a>结语</h1>\n<p>关于Ajax的知识还有很多，比如超时设定、进度事件、跨域资源共享等。其中跨域也是web开发人员所应该掌握的一项技能，其常见的方法有JSONP、comet等，关于跨域的介绍，稍后更。</p>\n<p>参考：\n<a href="http://www.cnblogs.com/SanMaoSpace/archive/2013/06/15/3137180.html">AJAX工作原理及其优缺点</a>\n<a href="http://blog.csdn.net/yixiaotian1988/article/details/7821973">Ajax的工作原理</a>\nJavaScript高级程序设计</p>\n<p>以上仅我个人浅见，如有错误之处，欢迎指正。</p>\n',extra:{}}}});