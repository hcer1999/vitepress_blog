## 1. 简单描述从输入网址到页面显示的过程

**参考答案：**

很多大公司面试喜欢问这样一道面试题，输入URL到看见页面发生了什么？

简单来说，共有以下几个过程：

- DNS解析

- 发起TCP连接

- 发送HTTP请求

- 服务器处理请求并返回HTTP报文

- 浏览器解析渲染页面

- 连接结束

下面我们来看看具体的细节。 &#x20;

**DNS解析**

DNS解析实际上就是寻找你所需要的资源的过程。假设你输入`www.baidu.com`，而这个网址并不是百度的真实地址，互联网中每一台机器都有唯一标识的IP地址，这个才是关键，但是它不好记，乱七八糟一串数字谁记得住啊，所以就需要一个网址和IP地址的转换，也就是DNS解析。

DNS解析其实是一个递归的过程。 &#x20;

输入`www.google.com`网址后，首先在本地的域名服务器中查找，没找到去根域名服务器查找，没有再去com顶级域名服务器查找，，如此的类推下去，直到找到IP地址，然后把它记录在本地，供下次使用。大致过程就是.-> .com ->google.com. -> <span style="color: rgb(36,91,219); background-color: inherit">www.google.com</span> <span style="color: rgb(36,91,219); background-color: inherit">.。</span> (最后这个.对应的就是根域名服务器，默认情况下所有的网址的最后一位都是.，为了方便用户，通常都会省略，浏览器在请求DNS的时候会自动加上)

**DNS优化**

既然已经懂得了解析的具体过程，我们可以看到上述一共经过了N个过程，每个过程有一定的消耗和时间的等待，因此我们得想办法解决一下这个问题！

- DNS缓存

DNS存在着多级缓存，从离浏览器的距离排序的话，有以下几种: 浏览器缓存，系统缓存，路由器缓存，ISP服务器缓存，根域名服务器缓存，顶级域名服务器缓存，主域名服务器缓存。

- DNS负载均衡

比如访问baidu.com的时候，每次响应的并非是同一个服务器（IP地址不同），一般大公司都有成百上千台服务器来支撑访问。DNS可以返回一个合适的机器的IP给用户，例如可以根据每台机器的负载量，该机器离用户地理位置的距离等等，这种过程就是DNS负载均衡。

**发起TCP连接**

TCP提供一种可靠的传输，这个过程涉及到三次握手，四次挥手。

![](<images/7. 计算机网络（71题）-image-11.png>)

- 第一次握手：

客户端发送syn包(Seq=x)到服务器，并进入SYN_SEND状态，等待服务器确认；

- 第二次握手：

服务器收到syn包，必须确认客户的SYN（ack=x+1），同时自己也发送一个SYN包（Seq=y），即SYN+ACK包，此时服务器进入SYN_RECV状态；

- 第三次握手：

客户端收到服务器的SYN＋ACK包，向服务器发送确认包ACK(ack=y+1)，此包发送完毕，客户端和服务器进入ESTABLISHED状态，完成三次握手。

握手过程中传送的包里不包含数据，三次握手完毕后，客户端与服务器才正式开始传送数据。理想状态下，TCP连接一旦建立，在通信双方中的任何一方主动关闭连接之前，TCP 连接都将被一直保持下去。

**四次挥手**

数据传输完毕后，双方都可释放连接。最开始的时候，客户端和服务器都是处于ESTABLISHED状态，假设客户端主动关闭，服务器被动关闭。

- 第一次挥手：

客户端发送一个FIN，用来关闭客户端到服务器的数据传送，也就是客户端告诉服务器：我已经不 会再给你发数据了(当然，在fin包之前发送出去的数据，如果没有收到对应的ack确认报文，客户端依然会重发这些数据)，但是，此时客户端还可以接受数据。

FIN=1，其序列号为seq=u（等于前面已经传送过来的数据的最后一个字节的序号加1），此时，客户端进入FIN-WAIT-1（终止等待1）状态。 TCP规定，FIN报文段即使不携带数据，也要消耗一个序号。

- 第二次挥手：

服务器收到FIN包后，发送一个ACK给对方并且带上自己的序列号seq，确认序号为收到序号+1（与SYN相同，一个FIN占用一个序号）。此时，服务端就进入了CLOSE-WAIT（关闭等待）状态。TCP服务器通知高层的应用进程，客户端向服务器的方向就释放了，这时候处于半关闭状态，即客户端已经没有数据要发送了，但是服务器若发送数据，客户端依然要接受。这个状态还要持续一段时间，也就是整个CLOSE-WAIT状态持续的时间。

此时，客户端就进入FIN-WAIT-2（终止等待2）状态，等待服务器发送连接释放报文（在这之前还需要接受服务器发送的最后的数据）。

- 第三次挥手：

服务器发送一个FIN，用来关闭服务器到客户端的数据传送，也就是告诉客户端，我的数据也发送完了，不会再给你发数据了。由于在半关闭状态，服务器很可能又发送了一些数据，假定此时的序列号为seq=w，此时，服务器就进入了LAST-ACK（最后确认）状态，等待客户端的确认。

- 第四次挥手：

主动关闭方收到FIN后，发送一个ACK给被动关闭方，确认序号为收到序号+1，此时，客户端就进入了TIME-WAIT（时间等待）状态。注意此时TCP连接还没有释放，必须经过2∗MSL（最长报文段寿命）的时间后，当客户端撤销相应的TCB后，才进入CLOSED状态。

服务器只要收到了客户端发出的确认，立即进入CLOSED状态。同样，撤销TCB后，就结束了这次的TCP连接。可以看到，服务器结束TCP连接的时间要比客户端早一些。

至此，完成四次挥手。

**发送HTTP请求**

发送HTTP请求，就是构建HTTP请求报文，并通过TCP协议，发送到服务器指定端口。

请求报文由`请求行`，`请求报头`，`请求正文`组成。

**服务器处理请求并返回HTTP报文**

对TCP连接进行处理，对HTTP协议进行解析，并按照报文格式进一步封装成HTTP Request对象，供上层使用。这一部分工作一般是由Web服务器去进行，比如Tomcat, Nginx和Apache等Web服务器。

HTTP报文也分成三段：`状态码`，`响应报头`和`响应报文`。

**浏览器解析渲染页面**

![](<images/7. 计算机网络（71题）-image-14.png>)

这个图就是Webkit解析渲染页面的过程。

- 解析HTML形成DOM树

- 解析CSS形成CSSOM 树

- 合并DOM树和CSSOM树形成渲染树

- 浏览器开始渲染并绘制页面

---

## 2. 说说WebSocket和HTTP的区别

**参考答案：**

**HTTP协议**

`HTTP`是单向的，客户端发送请求，服务器发送响应。举例来说，当客户端向服务器发送请求时，该请求以`HTTP`或`HTTPS`的形式发送，在接收到请求后，服务器会将响应发送给客户端。

每个请求都与一个对应的响应相关联，在发送响应后客户端与服务器的连接会被关闭。每个`HTTP`或`HTTPS`请求每次都会新建与服务器的连接，并且在获得响应后，连接将自行终止。 `HTTP`是在`TCP`之上运行的无状态协议，`TCP`是一种面向连接的协议，它使用三向握手方法保证数据包传输的传递并重新传输丢失的数据包。

`HTTP`可以运行在任何可靠的面向连接的协议（例如`TCP`，`SCTP`）的上层。当客户端将`HTTP`请求发送到服务器时，客户端和服务器之间将打开`TCP`连接，并且在收到响应后，`TCP`连接将终止，每个`HTTP`请求都会建立单独的`TCP`连接到服务器，例如如果客户端向服务器发送10个请求，则将打开10个单独的`HTTP`连接。并在获得响应后关闭。

理解上面这段关于 `HTTP`的描述时我觉得还要了解一下`HTTP`长连接的概念，以及`HTTP`与`TCP`的关系，简单概括一下就是：

- `HTTP`协议的长连接和短连接，实质上是`TCP`协议的长连接和短连接。

- 每个`HTTP`连接完成后，其对应的`TCP`连接并不是每次都会关闭。从 `HTTP/1.1`起，默认使用长连接，用以保持连接特性。使用长连接的`HTTP`协议，会在响应头有加入这个头部字段：`Connection:keep-alive`

- 在使用长连接的情况下，当一个网页打开完成后，客户端和服务器之间用于传输`HTTP`数据的`TCP`连接不会关闭，如果客户端再次访问这个服务器上的网页，会继续使用这一条已经建立的连接。`Keep-Alive`不会永久保持连接，它有一个保持时间，可以在不同的服务器软件（如`Apache`，`Nginx`，`Nginx`中这个默认时间是 75s）中设定这个时间。实现长连接要客户端和服务端都支持长连接。

- `HTTP`属于应用层协议，在传输层使用`TCP`协议，在网络层使用`IP`协议。`IP`协议主要解决网络路由和寻址问题，`TCP`协议主要解决如何在`IP`层之上可靠的传递数据包，使在网络上的另一端收到发端发出的所有包，并且顺序与发出顺序一致。`TCP`有可靠，面向连接的特点。

HTTP消息信息是用`ASCII`编码的，每个`HTTP`请求消息均包含`HTTP`协议版本（`HTTP/1.1`，`HTTP/2`），`HTTP`方法（`GET`/`POST`等），`HTTP`标头（`Content-Type`，`Content-Length`），主机信息等。以及包含要传输到服务器的实际消息的正文（请求主体）。`HTTP`标头的大小从200字节到2`KB`不等，`HTTP`标头的常见大小是700-800字节。当`Web`应用程序在客户端使用更多`cookie`和其他工具扩展代理的存储功能时，它将减少`HTTP`标头的荷载。

**WebSocket协议**

`WebSocket`是双向的，在客户端-服务器通信的场景中使用的全双工协议，与`HTTP`不同，它以`ws://`或`wss://`开头。它是一个有状态协议，这意味着客户端和服务器之间的连接将保持活动状态，直到被任何一方（客户端或服务器）终止。在通过客户端和服务器中的任何一方关闭连接之后，连接将从两端终止。

让我们以客户端-服务器通信为例，每当我们启动客户端和服务器之间的连接时，客户端-服务器进行握手随后创建一个新的连接，该连接将保持活动状态，直到被他们中的任何一方终止。建立连接并保持活动状态后，客户端和服务器将使用相同的连接通道进行通信，直到连接终止。

新建的连接被称为`WebSocket`。一旦通信链接建立和连接打开后，消息交换将以双向模式进行，客户端-服务器之间的连接会持续存在。如果其中任何一方（客户端服务器）宕掉或主动关闭连接，则双方均将关闭连接。套接字的工作方式与`HTTP`的工作方式略有不同，状态代码`101`表示`WebSocket`中的交换协议。

**何时使用WebSocket**

- 即时`Web`应用程序：即时`Web`应用程序使用一个`Web`套接字在客户端显示数据，这些数据由后端服务器连续发送。在`WebSocke`t中，数据被连续推送/传输到已经打开的同一连接中，这就是为什么`WebSocket`更快并提高了应用程序性能的原因。 例如在交易网站或比特币交易中，这是最不稳定的事情，它用于显示价格波动，数据被后端服务器使用Web套接字通道连续推送到客户端。

- 游戏应用程序：在游戏应用程序中，你可能会注意到，服务器会持续接收数据，而不会刷新用户界面。屏幕上的用户界面会自动刷新，而且不需要建立新的连接，因此在`WebSocket`游戏应用程序中非常有帮助。

- 聊天应用程序：聊天应用程序仅使用`WebSocket`建立一次连接，便能在订阅户之间交换，发布和广播消息。它重复使用相同的`WebSocket`连接，用于发送和接收消息以及一对一的消息传输。

**不能使用WebSocket的场景**

如果我们需要通过网络传输的任何实时更新或连续数据流，则可以使用`WebSocket`。如果我们要获取旧数据，或者只想获取一次数据供应用程序使用，则应该使用`HTTP`协议，不需要很频繁或仅获取一次的数据可以通过简单的`HTTP`请求查询，因此在这种情况下最好不要使用`WebSocket`。

注意：如果仅加载一次数据，则`RESTful` `Web`服务足以从服务器获取数据。

---

## 3. 说说 https 的握手过程

**参考答案：**

**https的详细握手过程**

https在七层协议里面属于应用层，他基于tcp协议，所以，https握手的过程，一定先经过tcp的三次握手，tcp链接建立好之后，才进入https的对称密钥协商过程，对称密钥协商好之后，就开始正常的收发数据流程。

接下来拿实际网络数据包来解释https的整个详细的握手过程

打开wireshark抓包工具，并随手打开命令行，输入了如下一行命令

```plaintext
curl https://www.baidu.com
```

上面其实涉及到两个问题：

1. 为什么是wireshark，而不是fiddler 或者 charles

> <span style="color: rgb(36,91,219); background-color: inherit">fiddler 和charles主要是用于抓取应用层协议https/http等上层的应用数据，都是建立链接成功后的数据，而wireshark是可以抓取所有协议的数据包（直接读取网卡数据）,我们的目的是抓取https建立链接成功前的过程，所以我们选择wireshark</span>

1. 为什么是用curl， 而不是在浏览器打开[<span style="color: rgb(36,91,219); background-color: inherit">https://www.baidu.com</span>](https://www.baidu.com/)

> <span style="color: rgb(36,91,219); background-color: inherit">curl是只发送一个请求，如果是用浏览器打开百度，那百度页面里面的各种资源也会发送请求，容易造成很多不必要的数据包</span>

好，重点来了，开始上图：

![](<images/7. 计算机网络（71题）-image-7.png>)

![](<images/7. 计算机网络（71题）-image-9.png>)

遇到凡事不要慌，接下来待我给你慢慢道来（ack消息属于tcp协议里面的确认报文，不做解释）

**第一步**

![](<images/7. 计算机网络（71题）-image-10.png>)

<span style="color: rgb(36,91,219); background-color: inherit">解释说明：tcp三次握手，这个不做解释，如果这块不清楚，比如ack，seq,mss,win都代表什么意思，这个可以在互动区留言，我视情况专门写几篇tcp的文章（这块太大了，没几篇是介绍不完的）</span>

**第二步：客户端发送client_hello**

![](<images/7. 计算机网络（71题）-image-8.png>)

<span style="color: rgb(36,91,219); background-color: inherit">解释说明：客户端发送client_hello，包含以下内容（请自行对照上图） 1. 包含TLS版本信息 2. 随机数（用于后续的密钥协商）random_C 3. 加密套件候选列表 4. 压缩算法候选列表 5. 扩展字段 6. 其他</span>

**第三步：服务端发送server_hello**

![](<images/7. 计算机网络（71题）-image-12.png>)

<span style="color: rgb(36,91,219); background-color: inherit">解释说明：服务端收到客户端的client_hello之后，发送server_hello，并返回协商的信息结果 1. 选择使用的TLS协议版本 version 2. 选择的加密套件 cipher suite 3. 选择的压缩算法 compression method 4. 随机数 random_S 5. 其他</span>

**第四步：服务端发送证书**

![](<images/7. 计算机网络（71题）-image-5.png>)

> <span style="color: rgb(36,91,219); background-color: inherit">解释说明：服务端发送完server_hello后，紧接着开始发送自己的证书（不清楚证书是什么的，可以移步到</span>[<span style="color: rgb(36,91,219); background-color: inherit">上一篇文章</span>](https://juejin.cn/post/6845166890675863559)<span style="color: rgb(36,91,219); background-color: inherit">），从图可知：因包含证书的报文长度是3761，所以此报文在tcp这块做了分段，分了3个报文把证书发送完了</span>
>
> <span style="color: rgb(36,91,219); background-color: inherit">问自己： 1. 分段的标准是什么？ 2. 什么时候叫分段，什么时候叫分片？ 3. 什么是MTU，什么是MSS</span>

**第五步：服务端发送Server Key Exchange**

![](<images/7. 计算机网络（71题）-image-13.png>)

<span style="color: rgb(36,91,219); background-color: inherit">解释说明:对于使用DHE/ECDHE非对称密钥协商算法的SSL握手，将发送该类型握手。RSA算法不会进行该握手流程（DH、ECDH也不会发送server key exchange）,也就是说此报文不一定要发送，视加密算法而定</span>

**第六步：服务端发送Server Hello Done**

![](<images/7. 计算机网络（71题）-image-3.png>)

<span style="color: rgb(36,91,219); background-color: inherit">解释说明:通知客户端 server_hello 信息发送结束</span>

**第七步：客户端发送.client_key_exchange+change_cipher_spec+encrypted_handshake_message**

![](<images/7. 计算机网络（71题）-image-4.png>)

<span style="color: rgb(36,91,219); background-color: inherit">解释说明: 1. client_key_exchange，合法性验证通过之后，向服务器发送自己的公钥参数，这里客户端实际上已经计算出了密钥 2. change_cipher_spec，客户端通知服务器后续的通信都采用协商的通信密钥和加密算法进行加密通信 3. encrypted_handshake_message，主要是用来测试密钥的有效性和一致性</span>

**第八步：服务端发送New Session Ticket**

![](<images/7. 计算机网络（71题）-image-6.png>)

<span style="color: rgb(36,91,219); background-color: inherit">解释说明:服务器给客户端一个会话，用处就是在一段时间之内（超时时间到来之前），双方都以协商的密钥进行通信。</span>

**第九步：服务端发送change_cipher_spec**

![](<images/7. 计算机网络（71题）-image-2.png>)

<span style="color: rgb(36,91,219); background-color: inherit">解释说明:服务端解密客户端发送的参数，然后按照同样的算法计算出协商密钥，并通过客户端发送的encrypted_handshake_message验证有效性，验证通过，发送该报文，告知客户端，以后可以拿协商的密钥来通信了</span>

**第十步：服务端发送encrypted_handshake_message**

![](<images/7. 计算机网络（71题）-image.png>)

<span style="color: rgb(36,91,219); background-color: inherit">解释说明:目的同样是测试密钥的有效性，客户端发送该报文是为了验证服务端能正常解密，客户端能正常加密，相反：服务端发送该报文是为了验证客户端能正常解密，服务端能正常加密</span>

**第十一步：完成密钥协商，开始发送数据**

![](<images/7. 计算机网络（71题）-image-1.png>)

<span style="color: rgb(36,91,219); background-color: inherit">解释说明：数据同样是分段发送的</span>

**第十二步：完成数据发送，4次tcp挥手**

![](<images/7. 计算机网络（71题）-image-26.png>)

<span style="color: rgb(36,91,219); background-color: inherit">解释说明：红框的意思是：客户端或服务器发送的，意味着加密通信因为某些原因需要中断，警告对方不要再发送敏感的数据,服务端数据发送完成也会有此数据包，可不关注</span>

**结语**

最后用一张图来说明以下过程

![](<images/7. 计算机网络（71题）-image-27.png>)

---

## 4. **HTTP2中，多路复用的原理是什么？**

**参考答案：**

HTTP/2是一个二进制协议，其基于“帧”的结构设计，改进了很多HTTP/1.1痛点问题。

**什么是多路复用？**

![](<images/7. 计算机网络（71题）-image-22.png>)

HTTP/1.1协议的请求-响应模型大家都是熟悉的，我们用“HTTP消息”来表示一个请求-响应的过程，那么HTTP/1.1中的消息是“管道串形化”的：只有等一个消息完成之后，才能进行下一条消息；而HTTP/2中多个消息交织在了一起，这无疑提高了“通信”的效率。这就是多路复用：在一个HTTP的连接上，多路“HTTP消息”同时工作。

**为什么 `HTTP/1.1` 不能实现“多路复用”？**

简单回答就是：`HTTP/2` 是基于二进制“帧”的协议，HTTP/1.1是基于“文本分割”解析的协议。

`HTTP/1.1` 发送请求消息的文本格式：以换行符分割每一条 `key:value` 的内容，解析这种数据用不着什么高科技，相反的，解析这种数据往往速度慢且容易出错。“服务端”需要不断的读入字节，直到遇到分隔符（这里指换行符，代码中可能使用/n或者/r/n表示），这种解析方式是可行的，并且 `HTTP/1.1` 已经被广泛使用了二十多年，这事已经做过无数次了，问题一直都是存在的：

- 一次只能处理一个请求或响应，因为这种以分隔符分割消息的数据，在完成之前不能停止解析。

- 解析这种数据无法预知需要多少内存，这会带给“服务端”很大的压力，因为它不知道要把一行要解析的内容读到多大的“缓冲区”中，在保证解析效率和速度的前提下：内存该如何分配？

**HTTP/2帧结构设计和多路复用实现**

前边提到：HTTP/2设计是基于“二进制帧”进行设计的，这种设计无疑是一种“高超的艺术”，因为它实现了一个目的：一切可预知，一切可控。

帧是一个数据单元，实现了对消息的封装。下面是HTTP/2的帧结构：

![](<images/7. 计算机网络（71题）-image-24.png>)

帧的字节中保存了不同的信息，前9个字节对于每个帧都是一致的，“服务器”解析HTTP/2的数据帧时只需要解析这些字节，就能准确的知道整个帧期望多少字节数来进行处理信息。

如果使用HTTP/1.1的话，你需要发送完上一个请求，才能发送下一个；由于HTTP/2是分帧的，请求和响应可以交错甚至可以复用。 为了能够发送不同的“数据信息”，通过帧数据传递不同的内容，HTTP/2中定义了10种不同类型的帧。

有了以上对HTTP/2帧的了解，我们就可以解释多路复用是怎样实现的了，不过在这之前我们先来了解“流”的概念：HTTP/2连接上独立的、双向的帧序列交换。流ID（帧首部的6-9字节）用来标识帧所属的流

下面两张图分别表示了HTTP/2协议上POST请求数据流“复用”的过程，很容易看的明白：

![](<images/7. 计算机网络（71题）-image-23.png>)

---

## 5. 说说你对“三次握手”、“四次挥手”的理解

**参考答案：**

我们都知道TCP是面向连接的，`三次握手`就是用来建立连接的，`四次握手`就是用来断开连接的。

**三次握手**

![](<images/7. 计算机网络（71题）-image-25.png>)

我们来看一下三次握手的过程：

- 一开始，客户端和服务端都处于 `CLOSED` 状态。客户端主动打开连接，服务端被动打卡连接，结束`CLOSED` z状态，开始监听，进入 `LISTEN `状态。

一次握手

- 客户端会随机初始化序号（`client_isn`），将此序号置于 TCP 首部的「序号」字段中，同时把 `SYN` 标志位置为 `1` ，表示 `SYN` 报文。接着把第一个 SYN 报文发送给服务端，表示向服务端发起连接，该报文不包含应用层数据，之后客户端处于 `SYN-SENT` 状态。

二次握手

- 服务端收到客户端的 `SYN` 报文后，首先服务端也随机初始化自己的序号（`server_isn`），将此序号填入 TCP 首部的「序号」字段中，其次把 TCP 首部的「确认应答号」字段填入 `client_isn + 1`, 接着把 `SYN` 和 `ACK` 标志位置为 `1`。最后把该报文发给客户端，该报文也不包含应用层数据，之后服务端处于 `SYN-RCVD` 状态。

三次握手

- 客户端收到服务端报文后，还要向服务端回应最后一个应答报文，首先该应答报文 TCP 首部 `ACK` 标志位置为 `1` ，其次「确认应答号」字段填入 `server_isn + 1` ，最后把报文发送给服务端，这次报文可以携带客户到服务器的数据，之后客户端处于 `ESTABLISHED` 状态。

好了，经过三次握手的过程，客户端和服务端之间的确定连接正常，接下来进入`ESTABLISHED`状态，服务端和客户端就可以快乐地通信了。

这里有个小细节，第三次握手是可以携带数据的，这是面试常问的点。

> <span style="color: rgb(36,91,219); background-color: inherit">那么为什么要三次握手呢？两次不行吗？</span>

- 为了防止服务器端开启一些无用的连接增加服务器开销

- 防止已失效的连接请求报文段突然又传送到了服务端，因而产生错误。

由于网络传输是有延时的(要通过网络光纤和各种中间代理服务器)，在传输的过程中，比如客户端发起了 SYN=1 的第一次握手。

如果服务器端就直接创建了这个连接并返回包含 SYN、ACK 和 Seq 等内容的数据包给客户端，这个数据包因为网络传输的原因丢失了，丢失之后客户端就一直没有接收到服务器返回的数据包。

如果没有第三次握手告诉服务器端客户端收的到服务器端传输的数据的话，服务器端是不知道客户端有没有接收到服务器端返回的信息的。服务端就认为这个连接是可用的，端口就一直开着，等到客户端因超时重新发出请求时，服务器就会重新开启一个端口连接。

这样一来，就会有很多无效的连接端口白白地开着，导致资源的浪费。

这个过程可理解为：

![](<images/7. 计算机网络（71题）-image-20.png>)

还有一种情况是已经失效的客户端发出的请求信息，由于某种原因传输到了服务器端，服务器端以为是客户端发出的有效请求，接收后产生错误。

![](<images/7. 计算机网络（71题）-image-19.png>)

所以我们需要“第三次握手”来确认这个过程：

通过第三次握手的数据告诉服务端，客户端有没有收到服务器“第二次握手”时传过去的数据，以及这个连接的序号是不是有效的。若发送的这个数据是“`收到且没有问题`”的信息，接收后服务器就正常建立 TCP 连接，否则建立 TCP 连接失败，服务器关闭连接端口。由此减少服务器开销和接收到失效请求发生的错误。

**四次挥手**

还是先上图：

![](<images/7. 计算机网络（71题）-image-21.png>)

聚散终有时，TCP 断开连接是通过四次挥手方式。

`双方`都可以主动断开连接，断开连接后主机中的「资源」将被释放。

上图是客户端主动关闭连接 ：

一次挥手

- 客户端打算关闭连接，此时会发送一个 TCP 首部 `FIN` 标志位被置为 `1` 的报文，也即 `FIN` 报文，之后客户端进入 `FIN_WAIT_1` 状态。

二次挥手

- 服务端收到该报文后，就向客户端发送 `ACK` 应答报文，接着服务端进入 `CLOSED_WAIT` 状态。

三次挥手

- 客户端收到服务端的 `ACK` 应答报文后，之后进入 `FIN_WAIT_2` 状态。等待服务端处理完数据后，也向客户端发送 `FIN` 报文，之后服务端进入 `LAST_ACK` 状态。

四次挥手

- 客户端收到服务端的 `FIN` 报文后，回一个 `ACK` 应答报文，之后进入 `TIME_WAIT` 状态

- 服务器收到了 `ACK` 应答报文后，就进入了 `CLOSED` 状态，至此服务端已经完成连接的关闭。

- 客户端在经过 `2MSL` 一段时间后，自动进入 `CLOSED` 状态，至此客户端也完成连接的关闭。

你可以看到，每个方向都需要一个 FIN 和一个 ACK，因此通常被称为四次挥手。

> <span style="color: rgb(36,91,219); background-color: inherit">为什么要挥手四次？</span>

再来回顾下四次挥手双方发 `FIN` 包的过程，就能理解为什么需要四次了。

- 关闭连接时，客户端向服务端发送 `FIN` 时，仅仅表示客户端不再发送数据了但是还能接收数据。

- 服务器收到客户端的 `FIN` 报文时，先回一个 `ACK` 应答报文，而服务端可能还有数据需要处理和发送，等服务端不再发送数据时，才发送 `FIN` 报文给客户端来表示同意现在关闭连接。

从上面过程可知，服务端通常需要等待完成数据的发送和处理，所以服务端的 `ACK` 和 `FIN` 一般都会分开发送，从而比三次握手导致多了一次。

> <span style="color: rgb(36,91,219); background-color: inherit">为什么客户端在TIME-WAIT阶段要等2MSL？</span>

为的是确认服务器端是否收到客户端发出的 ACK 确认报文，当客户端发出最后的 ACK 确认报文时，并不能确定服务器端能够收到该段报文。

所以客户端在发送完 ACK 确认报文之后，会设置一个时长为 2MSL 的计时器。

MSL 指的是 Maximum Segment Lifetime：一段 TCP 报文在传输过程中的最大生命周期。

2MSL 即是服务器端发出为 FIN 报文和客户端发出的 ACK 确认报文所能保持有效的最大时长。

服务器端在 1MSL 内没有收到客户端发出的 ACK 确认报文，就会再次向客户端发出 FIN 报文：

- 如果客户端在 2MSL 内，再次收到了来自服务器端的 FIN 报文，说明服务器端由于各种原因没有接收到客户端发出的 ACK 确认报文。

客户端再次向服务器端发出 ACK 确认报文，计时器重置，重新开始 2MSL 的计时。

- 否则客户端在 2MSL 内没有再次收到来自服务器端的 FIN 报文，说明服务器端正常接收了 ACK 确认报文，客户端可以进入 CLOSED 阶段，完成“四次挥手”。

所以，客户端要经历时长为 2SML 的 TIME-WAIT 阶段;这也是为什么客户端比服务器端晚进入 CLOSED 阶段的原因。

---

## 6. 为什么推荐将静态资源放到cdn上？

**参考答案：**

**静态资源是什么**

静态资源

静态资源是指在不同请求中访问到的数据都相同的静态文件。例如：图片、视频、网站中的文件（html、css、js）、软件安装包、apk文件、压缩包文件等。

动态资源

动态资源是指在不同请求中访问到的数据不相同的动态内容。例如：网站中的文件（asp、jsp、php、perl、cgi）、API接口、数据库交互请求等。

**CDN是什么**

内容分发网络，Content Delivery Network或Content Ddistribute Network，简称CDN，是建立并覆盖在承载网之上，由分布在不同区域的边缘节点服务器群组成的分布式网络。

CDN加速的本质是缓存加速。将服务器上存储的静态内容缓存在CDN节点上，当访问这些静态内容时，无需访问服务器源站，就近访问CDN节点即可获取相同内容，从而达到加速的效果，同时减轻服务器源站的压力。

CDN应用广泛，解决因分布、带宽、服务器性能带来的访问延迟问题，适用于站点加速、点播、直播等场景。使用户可就近取得所需内容，解决 Internet网络拥挤的状况，提高用户访问网站的响应速度和成功率。

由于访问动态内容时，每次都需要访问服务器，由服务器动态生成实时的数据并返回。因此CDN的缓存加速不适用于加速动态内容，CDN无法缓存实时变化的动态内容。对于动态内容请求，CDN节点只能转发回服务器源站，没有加速效果。

**CDN的作用**

1. 加速网站的访问

2. 为了实现跨运营商、跨地域的全网覆盖

互联不互通、区域ISP地域局限、出口带宽受限制等种种因素都造成了网站的区域性无法访问。CDN加速可以覆盖全球的线路，通过和运营商合作，部署IDC资源，在全国骨干节点商，合理部署CDN边缘分发存储节点，充分利用带宽资源，平衡源站流量。

- 为了保障你的网站安全

CDN的负载均衡和分布式存储技术，可以加强网站的可靠性，相当无无形中给你的网站添加了一把保护伞，应对绝大部分的互联网攻击事件。防攻击系统也能避免网站遭到恶意攻击。

- 为了异地备援

当某个服务器发生意外故障时，系统将会调用其他临近的健康服务器节点进行服务，进而提供接近100%的可靠性，这就让你的网站可以做到永不宕机。

- 为了节约成本投入

使用CDN加速可以实现网站的全国铺设，你根据不用考虑购买服务器与后续的托管运维，服务器之间镜像同步，也不用为了管理维护技术人员而烦恼，节省了人力、精力和财力。

- 为了让你更专注业务本身

CDN加速厂商一般都会提供一站式服务，业务不仅限于CDN，还有配套的云存储、大数据服务、视频云服务等，而且一般会提供7x24运维监控支持，保证网络随时畅通，你可以放心使用。并且将更多的精力投入到发展自身的核心业务之上。

**CDN工作原理**

- 当用户点击网站页面上的内容URL，经过本地DNS系统解析，DNS系统会最终将域名的解析权交给CNAME指向的CDN专用DNS服务器。

- CDN的DNS服务器将CDN的全局负载均衡设备IP地址返回用户。

- 用户向CDN的全局负载均衡设备发起内容URL访问请求。

- CDN全局负载均衡设备根据用户IP地址，以及用户请求的内容URL，选择一台用户所属区域的区域负载均衡设备，告诉用户向这台设备发起请求。

- 区域负载均衡设备会为用户选择一台合适的缓存服务器提供服务，选择的依据包括：根据用户IP地址，判断哪一台服务器距用户最近；根据用户所请求的URL中携带的内容名称，判断哪一台服务器上有用户所需内容；查询各个服务器当前的负载情况，判断哪一台服务器尚有服务能力。基于以上这些条件的综合分析之后，区域负载均衡设备会向全局负载均衡设备返回一台缓存服务器的IP地址。

- 全局负载均衡设备把服务器的IP地址返回给用户。

- 用户向缓存服务器发起请求，缓存服务器响应用户请求，将用户所需内容传送到用户终端。如果这台缓存服务器上并没有用户想要的内容，而区域均衡设备依然将它分配给了用户，那么这台服务器就要向它的上一级缓存服务器请求内容，直至追溯到网站的源服务器将内容拉到本地。

DNS服务器根据用户IP地址，将域名解析成相应节点的缓存服务器IP地址，实现用户就近访问。使用CDN服务的网站，只需将其域名解析权交给CDN的GSLB设备，将需要分发的内容注入CDN，就可以实现内容加速了。

**当没有CDN时**

今天我们看到的网站系统基本上都是基于B/S架构的。B/S架构，即Browser-Server（浏览器 服务器）架构。

用户通过浏览器等方式访问网站的过程：

- 用户在自己的浏览器中输入要访问的网站域名。

- 浏览器向本地DNS服务器请求对该域名的解析。

- 本地DNS服务器中如果缓存有这个域名的解析结果，则直接响应用户的解析请求。

- 本地DNS服务器中如果没有关于这个域名的解析结果的缓存，则以递归方式向整个DNS系统请求解析，获得应答后将结果反馈给浏览器。

- 浏览器得到域名解析结果，就是该域名相应的服务设备的IP地址。

- 浏览器向服务器请求内容。

- 服务器将用户请求内容传送给浏览器。

---

## 7. 什么是DNS劫持？

**参考答案：**

DNS 劫持作为最常见的网络攻击方式，是每个站长或者运维团队最为头疼的事情。苦心经营的网站受到 DNS 劫持后，不仅会影响网站流量、权重，还会让用户置身于危险之中，泄露隐私造成财产损失。

就是这样一个简单到不能再简单的攻击方式，在 2009 年制造了轰动全球的“银行劫持案”，导致巴西最大银行 Banco Bradesco 银行近 1% 客户受到攻击而导致账户被盗。黑客利用宽带路由器缺陷对用户 DNS 进行篡改——用户浏览黑客所制作的 Web 页面，其宽带路由器 DNS 就会被黑客篡改，由于该 Web 页面设有巧妙设计的恶意代码，成功躲过安全软件检测，导致大量用户被 DNS 钓鱼诈骗。

![](<images/7. 计算机网络（71题）-image-18.png>)

网站被黑、被歹意镜像、被植入垃圾代码，现象屡见不鲜，其危害还包括：

- 钓鱼诈骗网上购物,网上支付有可能会被恶意指向别的网站，更加加大了个人账户泄密的风险；

- 网站内出现恶意广告；

- 轻则影响网速，重则不能上网。

但面对DNS劫持时，只能束手就擒吗？

**知己知彼，什么是 DNS？**

DNS 即 Domain Name System 的缩写，域名系统以分布式数据库的形式将域名和 IP 地址相互映射。简单的说，DNS 是用来解析域名的，在正常环境下，用户的每一个上网请求会通过 DNS 解析指向到与之相匹配的 IP 地址，从而完成一次上网行为。DNS 作为应用层协议，主要是为其他应用层协议工作的，包括不限于 HTTP、SMTP、FTP，用于将用户提供的主机名解析为 IP 地址，具体过程如下：

（1）用户主机（PC 端或手机端）上运行着 DNS 的客户端；

（2）浏览器将接收到的 URL 中抽取出域名字段，即访问的主机名，比如 [<span style="color: rgb(36,91,219); background-color: inherit">http://www.aliyun.com/</span>](http://www.aliyun.com/) , 并将这个主机名传送给 DNS 应用的客户端；

（3）DNS 客户机端向 DNS 服务器端发送一份查询报文，报文中包含着要访问的主机名字段（中间包括一些列缓存查询以及分布式 DNS 集群的工作）；

（4）该 DNS 客户机最终会收到一份回答报文，其中包含有该主机名对应的 IP 地址；

（5）一旦该浏览器收到来自 DNS 的 IP 地址，就可以向该 IP 地址定位的 HTTP 服务器发起 TCP 连接。

![](<images/7. 计算机网络（71题）-image-17.png>)

可以看到想要获取目标网站 IP，除了在本机中查找行为，还需要第三方服务器(DNS)参与。但只要经过第三方服务，网络就不属于可控制范围，那么就有可能产生 DNS 挟持，比如获取的 IP 并不是实际想要的 IP，从而打开非目标网站。网站在经过本地 DNS 解析时，黑客将本地 DNS 缓存中的目标网站替换成其他网站的 IP 返回，而客户端并不知情，依旧按照正常流程寻址建并立连接。如果一些黑客想要盗取用户账号及密码时，黑客可以做跟目标网站一模一样的木马页面，让用户登录，当用户输入完密码提交的时候就中招了。

**常见 DNS 劫持手段又有哪些？**

（1）利用 DNS 服务器进行 DDoS 攻击

正常 DNS 服务器递归询问过程被利用，变成 DDoS 攻击。假设黑客知晓被攻击机器 IP 地址，攻击者使用该地址作为发送解析命令的源地址。当使用 DNS 服务器递归查询后会响应给最初用户。如果黑客控制了足够规模的肉鸡进行上述操作。那么，这个最初用户就会受到来自于 DNS 服务器的响应信息 DDoS 攻击，成为被攻击者。

（2）DNS 缓存感染

黑客使用 DNS 请求将数据注入具有漏洞的 DNS 服务器缓存中。这些缓存信息会在客户进行 DNS 访问时返回给用户，把用户对正常域名的访问引导到入侵者所设置挂马、钓鱼等页面上，或通过伪造邮件和其他服务获取用户口令信息，导致客户遭遇进一步侵害。

（3）DNS 信息劫持

原则上 TCP/IP 体系通过序列号等多种方式避免仿冒数据插入，但黑客通过监听客户端和 DNS 服务器对话，就可以解析服务器响应给客户端的 DNS 查询 ID。每个 DNS 报文包括一个相关联的 16 位 ID，DNS 服务器根据这个 ID 获取请求源位置。黑客在 DNS 服务器之前将虚假响应交给用户，欺骗客户端去访问恶意网站。假设当提交给某个域名服务器域名解析请求的数据包被截获，然后按黑客的意图将虚假 IP 地址作为应答信息返回给请求者。这时，原始请求者就会把这个虚假 IP 地址作为它所要请求的域名而进行连接，显然它被引导到了别处而根本连接不上自己想要连接的那个域名。

（4）ARP 欺骗

通过伪造 IP 地址和 MAC 地址实现 ARP 欺骗，在网络中产生大量 ARP 通信量使网络阻塞，黑客只要持续不断发出伪造的 ARP 响应包就能更改目标主机 ARP 缓存中的 IP-MAC 条目，造成网络中断或中间人攻击。ARP 攻击主要是存在于局域网网络中，局域网中若有一台计算机感染 ARP 木马，则感染该 ARP 木马的系统将会试图通过"ARP 欺骗”手段截获所在网络内其它计算机的通信信息，并因此造成网内其它计算机的通信故障。ARP 欺骗通常是在用户局网中，造成用户访问域名的错误指向，但在 IDC 机房被入侵后，则也可能出现攻击者采用 ARP 包压制正常主机、或者压制 DNS 服务器，以使访问导向错误指向。

**DNS 劫持对业务造成哪些影响？**

一旦被劫持，相关用户查询就没办法获取到正确 IP 解析，这就很容易造成：

（1）很多用户习惯依赖书签或者易记域名进入，一旦被劫持会使这类用户无法打开网站，更换域名又没办法及时告知变更情况，导致用户大量流失。

（2）用户流量主要是通过搜索引擎 SEO 进入，DNS 被劫持后会导致搜索引擎蜘蛛抓取不到正确 IP，网站就可能会被百度 ban 掉。

（3）一些域名使用在手机应用 APP 调度上，这些域名不需要可以给客户访问，但这些域名的解析关系到应用 APP 访问，如果解析出现劫持就会导致应用 APP 无法访问。这时候更换域名就可能会导致 APP 的下架，重新上架需要审核并且不一定可以重新上架。这就会导致应用 APP 会有用户无法访问或者下载的空窗期。

可以看到，DNS 劫持对业务有着巨大影响，不仅仅是用户体验的损失，更是对用户资产安全、数据安全的造成潜在的巨大风险。

---

## 8. TLS 1.3 做了哪些改进？

**参考答案：**

TLS 1.2 虽然存在了 10 多年，经历了无数的考验，但历史的车轮总是不断向前的，为了获得更强的安全、更优秀的性能，在2018年就推出了 TLS1.3，对于TLS1.2做了一系列的改进，主要分为这几个部分:强化安全、提高性能。

**强化安全**

在 TLS1.3 中废除了非常多的加密算法，最后只保留五个加密套件:

- TLS_AES_128_GCM_SHA256

- TLS_AES_256_GCM_SHA384

- TLS_CHACHA20_POLY1305_SHA256

- TLS_AES_128_GCM_SHA256

- TLS_AES_128_GCM_8_SHA256

可以看到，最后剩下的对称加密算法只有 `AES` 和 `CHACHA20`，之前主流的也会这两种。分组模式也只剩下 `GCM` 和 `POLY1305`, 哈希摘要算法只剩下了 `SHA256` 和 `SHA384` 了。

那你可能会问了, 之前`RSA`这么重要的非对称加密算法怎么不在了？

我觉得有两方面的原因:

- 2015年发现了`FREAK`攻击，即已经有人发现了 RSA 的漏洞，能够进行破解了。

- 一旦私钥泄露，那么中间人可以通过私钥计算出之前所有报文的`secret`，破解之前所有的密文。

为什么？回到 RSA 握手的过程中，客户端拿到服务器的证书后，提取出服务器的公钥，然后生成`pre_random`并用`公钥`加密传给服务器，服务器通过`私钥`解密，从而拿到真实的`pre_random`。当中间人拿到了服务器私钥，并且截获之前所有报文的时候，那么就能拿到`pre_random`、`server_random`和`client_random`并根据对应的随机数函数生成`secret`，也就是拿到了 TLS 最终的会话密钥，每一个历史报文都能通过这样的方式进行破解。

但`ECDHE`在每次握手时都会生成临时的密钥对，即使私钥被破解，之前的历史消息并不会收到影响。这种一次破解并不影响历史信息的性质也叫`前向安全性`。

`RSA` 算法不具备前向安全性，而 `ECDHE` 具备，因此在 TLS1.3 中彻底取代了`RSA`。

**提升性能**

**握手改进**

流程如下:

![](<images/7. 计算机网络（71题）-002dbd99fb60f3bf17d82b98b982158.png>)

大体的方式和 TLS1.2 差不多，不过和 TLS 1.2 相比少了一个 RTT， 服务端不必等待对方验证证书之后才拿到`client_params`，而是直接在第一次握手的时候就能够拿到, 拿到之后立即计算`secret`，节省了之前不必要的等待时间。同时，这也意味着在第一次握手的时候客户端需要传送更多的信息，一口气给传完。

这种 TLS 1.3 握手方式也被叫做`1-RTT握手`。但其实这种`1-RTT`的握手方式还是有一些优化的空间的，接下来我们来一一介绍这些优化方式。

**会话复用**

会话复用有两种方式: `Session ID`和`Session Ticket`。

先说说最早出现的`Seesion ID`，具体做法是客户端和服务器首次连接后各自保存会话的 ID，并存储会话密钥，当再次连接时，客户端发送`ID`过来，服务器查找这个 ID 是否存在，如果找到了就直接复用之前的会话状态，会话密钥不用重新生成，直接用原来的那份。

但这种方式也存在一个弊端，就是当客户端数量庞大的时候，对服务端的存储压力非常大。

因而出现了第二种方式——`Session Ticket`。它的思路就是: 服务端的压力大，那就把压力分摊给客户端呗。具体来说，双方连接成功后，服务器加密会话信息，用`Session Ticket`消息发给客户端，让客户端保存下来。下次重连的时候，就把这个 Ticket 进行解密，验证它过没过期，如果没过期那就直接恢复之前的会话状态。

这种方式虽然减小了服务端的存储压力，但与带来了安全问题，即每次用一个固定的密钥来解密 Ticket 数据，一旦黑客拿到这个密钥，之前所有的历史记录也被破解了。因此为了尽量避免这样的问题，密钥需要定期进行更换。

总的来说，这些会话复用的技术在保证`1-RTT`的同时，也节省了生成会话密钥这些算法所消耗的时间，是一笔可观的性能提升。

**PSK**

刚刚说的都是`1-RTT`情况下的优化，那能不能优化到`0-RTT`呢？

答案是可以的。做法其实也很简单，在发送`Session Ticket`的同时带上应用数据，不用等到服务端确认，这种方式被称为`Pre-Shared Key`，即 PSK。

这种方式虽然方便，但也带来了安全问题。中间人截获`PSK`的数据，不断向服务器重复发，类似于 TCP 第一次握手携带数据，增加了服务器被攻击的风险。

**总结**

TLS1.3 在 TLS1.2 的基础上废除了大量的算法，提升了安全性。同时利用会话复用节省了重新生成密钥的时间，利用 PSK 做到了`0-RTT`连接。

---

## 9. TLS1.2 握手的过程是怎样的？

**参考答案：**

HTTP 是明文传输的协议，传输保文对外完全透明，非常不安全，那如何进一步保证安全性呢？

由此产生了 `HTTPS`，其实它并不是一个新的协议，而是在 HTTP 下面增加了一层 SSL/TLS 协议，简单的讲，`HTTPS = HTTP + SSL/TLS`。

那什么是 SSL/TLS 呢？

SSL 即安全套接层（Secure Sockets Layer），在 OSI 七层模型中处于会话层(第 5 层)。之前 SSL 出过三个大版本，当它发展到第三个大版本的时候才被标准化，成为 TLS（传输层安全，Transport Layer Security），并被当做 TLS1.0 的版本，准确地说，`TLS1.0 = SSL3.1`。

现在主流的版本是 TLS/1.2, 之前的 TLS1.0、TLS1.1 都被认为是不安全的，在不久的将来会被完全淘汰。

**传统 RSA 握手**

先来说说传统的 TLS 握手，也是大家在网上经常看到的。之所以称它为 RSA 版本，是因为它在加解密`pre_random`的时候采用的是 RSA 算法。

**TLS 1.2 握手过程**

现在我们来讲讲主流的 TLS 1.2 版本所采用的方式。

![](<images/7. 计算机网络（71题）-e727b8d799ce9d529a2ec11789fbd46.png>)

刚开始你可能会比较懵，先别着急，过一遍下面的流程再来看会豁然开朗。

**step 1: Client Hello**

首先，浏览器发送 client_random、TLS版本、加密套件列表。

client_random 是什么？用来最终 secret 的一个参数。

加密套件列表是什么？我举个例子，加密套件列表一般长这样:

```plaintext
TLS_ECDHE_WITH_AES_128_GCM_SHA256
```

意思是`TLS`握手过程中，使用`ECDHE`算法生成`pre_random`，128位的`AES`算法进行对称加密，在对称加密的过程中使用主流的`GCM`分组模式，因为对称加密中很重要的一个问题就是如何分组。最后一个是哈希摘要算法，采用`SHA256`算法。

其中值得解释一下的是这个哈希摘要算法，试想一个这样的场景，服务端现在给客户端发消息来了，客户端并不知道此时的消息到底是服务端发的，还是中间人伪造的消息呢？现在引入这个哈希摘要算法，将服务端的证书信息通过`这个算法`生成一个摘要(可以理解为`比较短的字符串`)，用来`标识`这个服务端的身份，用私钥加密后把`加密后的标识`和`自己的公钥`传给客户端。客户端拿到`这个公钥`来解密，生成另外一份摘要。两个摘要进行对比，如果相同则能确认服务端的身份。这也就是所谓`数字签名`的原理。其中除了哈希算法，最重要的过程是`私钥加密，公钥解密`。

**step 2: Server Hello**

可以看到服务器一口气给客户端回复了非常多的内容。

`server_random`也是最后生成`secret`的一个参数, 同时确认 TLS 版本、需要使用的加密套件和自己的证书，这都不难理解。那剩下的`server_params`是干嘛的呢？

我们先埋个伏笔，现在你只需要知道，`server_random`到达了客户端。

**step 3: Client 验证证书，生成secret**

客户端验证服务端传来的`证书`和`签名`是否通过，如果验证通过，则传递`client_params`这个参数给服务器。

接着客户端通过`ECDHE`算法计算出`pre_random`，其中传入两个参数:`server_params`和`client_params`。现在你应该清楚这个两个参数的作用了吧，由于`ECDHE`基于`椭圆曲线离散对数`，这两个参数也称作`椭圆曲线的公钥`。

客户端现在拥有了`client_random`、`server_random`和`pre_random`，接下来将这三个数通过一个伪随机数函数来计算出最终的`secret`。

**step4: Server 生成 secret**

刚刚客户端不是传了`client_params`过来了吗？

现在服务端开始用`ECDHE`算法生成`pre_random`，接着用和客户端同样的伪随机数函数生成最后的`secret`。

**注意事项**

TLS的过程基本上讲完了，但还有两点需要注意。

第一、实际上 TLS 握手是一个`双向认证`的过程，从 step1 中可以看到，客户端有能力验证服务器的身份，那服务器能不能验证客户端的身份呢？

当然是可以的。具体来说，在 `step3`中，客户端传送`client_params`，实际上给服务器传一个验证消息，让服务器将相同的验证流程(哈希摘要 + 私钥加密 + 公钥解密)走一遍，确认客户端的身份。

第二、当客户端生成`secret`后，会给服务端发送一个收尾的消息，告诉服务器之后的都用对称加密，对称加密的算法就用第一次约定的。服务器生成完`secret`也会向客户端发送一个收尾的消息，告诉客户端以后就直接用对称加密来通信。

这个收尾的消息包括两部分，一部分是`Change Cipher Spec`，意味着后面加密传输了，另一个是`Finished`消息，这个消息是对之前所有发送的数据做的`摘要`，对摘要进行加密，让对方验证一下。

当双方都验证通过之后，握手才正式结束。后面的 HTTP 正式开始传输加密报文。

**RSA 和 ECDHE 握手过程的区别**

- ECDHE 握手，也就是主流的 TLS1.2 握手中，使用`ECDHE`实现`pre_random`的加密解密，没有用到 RSA。

- 使用 ECDHE 还有一个特点，就是客户端发送完收尾消息后可以提前`抢跑`，直接发送 HTTP 报文，节省了一个 RTT，不必等到收尾消息到达服务器，然后等服务器返回收尾消息给自己，直接开始发请求。这也叫`TLS False Start`。

---

## 10. HTTP 报文结构是怎样的？

**参考答案：**

对于 TCP 而言，在传输的时候分为两个部分:TCP头和数据部分。

而 HTTP 类似，也是header + body的结构，具体而言:

> <span style="color: rgb(36,91,219); background-color: inherit">起始行 + 头部 + 空行 + 实体</span>

由于 http 请求报文和响应报文是有一定区别，因此我们分开介绍。

**起始行**

对于请求报文来说，起始行类似下面这样:

> <span style="color: rgb(36,91,219); background-color: inherit">GET /home HTTP/1.1</span>

也就是方法 + 路径 + http版本。

对于响应报文来说，起始行一般长这个样:

> <span style="color: rgb(36,91,219); background-color: inherit">HTTP/1.1 200 OK</span>

响应报文的起始行也叫做状态行，由http版本、状态码和原因三部分组成。

值得注意的是，在起始行中，每两个部分之间用空格隔开，最后一个部分后面应该接一个换行，严格遵循ABNF语法规范。

**头部**

展示一下请求头和响应头在报文中的位置:

![](<images/7. 计算机网络（71题）-image-15.png>)

![](<images/7. 计算机网络（71题）-image-16.png>)

不管是请求头还是响应头，其中的字段是相当多的，而且牵扯到http非常多的特性，这里就不一一列举的，重点看看这些头部字段的格式：

- 字段名不区分大小写

- 字段名不允许出现空格，不可以出现下划线\_

- 字段名后面必须紧接着冒号 :

**空行**

很重要，用来区分开头部和实体。

如果说在头部中间故意加一个空行，那么空行后的内容全部被视为实体。

**实体**

就是具体的数据了，也就是body部分。请求报文对应请求体, 响应报文对应响应体。

---

## 11. HTTPS 为什么是安全的？

**参考答案：**

以一个故事来学习 HTTPS：

来自中国的张大胖和位于米国的 Bill 进行通信。

由于张大胖和 Bill 都是使用 HTTP 进行通信，HTTP 是明文的，所以他们的聊天都是可被窥视的。于是，二人准备想要改变现状，所以 HTTPS 首先要解决的问题就是要保证传输的内容只有这两个人能看懂。

**plan1：使用对称密钥**

![](<images/7. 计算机网络（71题）-image-40.png>)

两人商量了一下，可以使用对称密钥进行加密。（对称密钥也就是加密和解密使用的是同一个密钥）

但是问题又来了\~既然网络是不安全的，那么最开始的时候怎么将这个对称密钥发送出去呢？如果对称密钥在发送的时候就已经被拦截，那么发送的信息还是会被篡改和窥视啊\~\~

所以这种对称密钥的弊端就是，可能被中间人拦截，这样中间人就可以获取到了密钥，就可以对传输的信息就行窥视和篡改。

plan2：使用非对称密钥

![](<images/7. 计算机网络（71题）-image-42.png>)

RSA（非对称加密算法）：双方必须协商一对密钥，一个私钥一个公钥。用私钥加密的数据，只有对应的公钥才能解密，用公钥加密的数据， 只有对应的私钥才能解密。

![](<images/7. 计算机网络（71题）-image-41.png>)

这样的话 Bill 将自己的公钥给张大胖，张大胖发送的信息使用 Bill 的公钥加密，这样，只有 Bill 使用自己的私钥才能获取

但是这样有个弊端：

RSA 算法很慢

所以为了解决这个问题，我们使用非对称密钥+对称密钥结合的方式

**plan3：非对称密钥+对称密钥**

使用对称密钥的好处是速度比较快，使用非对称密钥的好处是可以使得传输的内容不能被破解，因为就算你拦截到了数据，但是没有 Bill 的私钥，也是不能破解内容的。就比如说你抢了一个保险柜，但是没有保险柜的钥匙也不能打开保险柜。

所以我们要结合两者的优点。使用 RSA 的方法将加密算法的对称密钥发送过去，之后就可以使用使用这个密钥，利用对称密钥来通信了。就比如说我将钥匙放进了保险柜，然后将保险柜寄给对方。

**中间人攻击**

还有一个问题就是在使用非对称密钥的时候，首先需要将 Bill 的公钥给张大胖，那么在这个过程中，安全是没有保障的，中间人可以拦截到 Bill 的公钥，就可以对拦截到的公钥进行篡改。

这也就是相当于我有手机号，虽然是公开的，谁都可以给我打电话，但是刚开始你并不知道我的手机号，我需要将我的手机号发给你，在我发给你我的手机号的时候，被中间人拦截了，然后将我正确的手机号换成了错误的手机号，比如：110，然后，你收到的就是错误的手机号：110，但是你自己还不知道你收到的是错的手机号，这时候，你要是给我打电话，就尴尬了\~\~

**确认身份 —— 数字证书**

所以以上的步骤都是可行的，只需要最后一点就可以了，要确定 Bill 给张大胖的公钥确实是 Bill。 的公钥，而不是别人的。（刚刚电话号码的那个例子，也就是说，需要确定我给你发的电话号码是我的，没有被修改的）

那怎么确认 Bill 给张大胖的公钥确实是 Bill 的呢？

这个时候就需要公证处的存在了。也就是说我需要先将我的电话号码到公证处去公证一下，然后我将电话号码传给你之后，你在将你收到的电话号码和公证处的比对下，就知道是不是我的了。

对应到计算机世界，那就是数字签名

![](<images/7. 计算机网络（71题）-image-39.png>)

数字签名也就是相当于公证处在公证书上盖章。

![](<images/7. 计算机网络（71题）-image-38.png>)

数字签名和原始信息合在一起称为数字证书，Bill 只需将数字证书发送给张大胖就可以了。

在拿到数字证书之后，就用同样的Hash 算法， 再次生成消息摘要，然后用CA的公钥对数字签名解密， 得到CA创建的消息摘要， 两者一比，就知道有没有人篡改了！

![](<images/7. 计算机网络（71题）-image-37.png>)

以上你全部看完并且理解了，那么对于 HTTPS 你也就大概有个了解了。

---

## 12. Axios的原理是什么？

**参考答案：**

**一、axios的使用**

关于`axios`的基本使用，上篇文章已经有所涉及，这里再稍微回顾下：

发送请求

```javascript
import axios from 'axios';

axios(config) // 直接传入配置
axios(url[, config]) // 传入url和配置
axios[method](url[, option]) // 直接调用请求方式方法，传入url和配置
axios[method](url[, data[, option]]) // 直接调用请求方式方法，传入data、url和配置
axios.request(option) // 调用 request 方法

const axiosInstance = axios.create(config)
// axiosInstance 也具有以上 axios 的能力

axios.all([axiosInstance1, axiosInstance2]).then(axios.spread(response1, response2))
// 调用 all 和传入 spread 回调
```

**请求拦截器**

```javascript
axios.interceptors.request.use(
  function (config) {
    // 这里写发送请求前处理的代码
    return config
  },
  function (error) {
    // 这里写发送请求错误相关的代码
    return Promise.reject(error)
  },
)
```

**响应拦截器**

```javascript
axios.interceptors.response.use(
  function (response) {
    // 这里写得到响应数据后处理的代码
    return response
  },
  function (error) {
    // 这里写得到错误响应处理的代码
    return Promise.reject(error)
  },
)
```

**取消请求**

```javascript
// 方式一
const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.get('xxxx', {
  cancelToken: source.token,
})
// 取消请求 (请求原因是可选的)
source.cancel('主动取消请求')

// 方式二
const CancelToken = axios.CancelToken
let cancel

axios.get('xxxx', {
  cancelToken: new CancelToken(function executor(c) {
    cancel = c
  }),
})
cancel('主动取消请求')
```

**二、实现一个简易版axios**

构建一个`Axios`构造函数，核心代码为`request`

```javascript
class Axios {
  constructor() {}

  request(config) {
    return new Promise((resolve) => {
      const { url = '', method = 'get', data = {} } = config
      // 发送ajax请求
      const xhr = new XMLHttpRequest()
      xhr.open(method, url, true)
      xhr.onload = function () {
        console.log(xhr.responseText)
        resolve(xhr.responseText)
      }
      xhr.send(data)
    })
  }
}
```

导出`axios`实例

```javascript
// 最终导出axios的方法，即实例的request方法
function CreateAxiosFn() {
  let axios = new Axios()
  let req = axios.request.bind(axios)
  return req
}

// 得到最后的全局变量axios
let axios = CreateAxiosFn()
```

上述就已经能够实现`axios({ })`这种方式的请求

下面是来实现下`axios.method()`这种形式的请求

```javascript
// 定义get,post...方法，挂在到Axios原型上
const methodsArr = ['get', 'delete', 'head', 'options', 'put', 'patch', 'post']
methodsArr.forEach((met) => {
  Axios.prototype[met] = function () {
    console.log('执行' + met + '方法')
    // 处理单个方法
    if (['get', 'delete', 'head', 'options'].includes(met)) {
      // 2个参数(url[, config])
      return this.request({
        method: met,
        url: arguments[0],
        ...(arguments[1] || {}),
      })
    } else {
      // 3个参数(url[,data[,config]])
      return this.request({
        method: met,
        url: arguments[0],
        data: arguments[1] || {},
        ...(arguments[2] || {}),
      })
    }
  }
})
```

将`Axios.prototype`上的方法搬运到`request`上

首先实现个工具类，实现将`b`方法混入到`a`，并且修改`this`指向

```javascript
const utils = {
  extend(a, b, context) {
    for (let key in b) {
      if (b.hasOwnProperty(key)) {
        if (typeof b[key] === 'function') {
          a[key] = b[key].bind(context)
        } else {
          a[key] = b[key]
        }
      }
    }
  },
}
```

修改导出的方法

```javascript
function CreateAxiosFn() {
  let axios = new Axios()

  let req = axios.request.bind(axios)
  // 增加代码
  utils.extend(req, Axios.prototype, axios)

  return req
}
```

构建拦截器的构造函数

```javascript
class InterceptorsManage {
  constructor() {
    this.handlers = []
  }

  use(fullfield, rejected) {
    this.handlers.push({
      fullfield,
      rejected,
    })
  }
}
```

实现`axios.interceptors.response.use`和`axios.interceptors.request.use`

```javascript
class Axios {
    constructor() {
        // 新增代码
        this.interceptors = {
            request: new InterceptorsManage,
            response: new InterceptorsManage
        }
    }

    request(config) {
                 ...
    }
}
```

执行语句`axios.interceptors.response.use`和`axios.interceptors.request.use`的时候，实现获取`axios`实例上的`interceptors`对象，然后再获取`response`或`request`拦截器，再执行对应的拦截器的`use`方法

把`Axios`上的方法和属性搬到`request`过去

```javascript
function CreateAxiosFn() {
  let axios = new Axios()

  let req = axios.request.bind(axios)
  // 混入方法， 处理axios的request方法，使之拥有get,post...方法
  utils.extend(req, Axios.prototype, axios)
  // 新增代码
  utils.extend(req, axios)
  return req
}
```

现在`request`也有了`interceptors`对象，在发送请求的时候，会先获取`request`拦截器的`handlers`的方法来执行

首先将执行`ajax`的请求封装成一个方法

```javascript
request(config) {
    this.sendAjax(config)
}
sendAjax(config){
    return new Promise(resolve => {
        const {url = '', method = 'get', data = {}} = config;
        // 发送ajax请求
        console.log(config);
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.onload = function() {
            console.log(xhr.responseText)
            resolve(xhr.responseText);
        };
        xhr.send(data);
    })
}
```

获得`handlers`中的回调

```javascript
request(config) {
    // 拦截器和请求组装队列
    let chain = [this.sendAjax.bind(this), undefined] // 成对出现的，失败回调暂时不处理

    // 请求拦截
    this.interceptors.request.handlers.forEach(interceptor => {
        chain.unshift(interceptor.fullfield, interceptor.rejected)
    })

    // 响应拦截
    this.interceptors.response.handlers.forEach(interceptor => {
        chain.push(interceptor.fullfield, interceptor.rejected)
    })

    // 执行队列，每次执行一对，并给promise赋最新的值
    let promise = Promise.resolve(config);
    while(chain.length > 0) {
        promise = promise.then(chain.shift(), chain.shift())
    }
    return promise;
}
```

`chains`大概是`['fulfilled1','reject1','fulfilled2','reject2','this.sendAjax','undefined','fulfilled2','reject2','fulfilled1','reject1']`这种形式

这样就能够成功实现一个简易版`axios`

**三、源码分析**

首先看看目录结构

![](<images/7. 计算机网络（71题）-image-34.png>)

`axios`发送请求有很多实现的方法，实现入口文件为`axios.js`

```javascript
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig)

  // instance指向了request方法，且上下文指向context，所以可以直接以 instance(option) 方式调用
  // Axios.prototype.request 内对第一个参数的数据类型判断，使我们能够以 instance(url, option) 方式调用
  var instance = bind(Axios.prototype.request, context)

  // 把Axios.prototype上的方法扩展到instance对象上，
  // 并指定上下文为context，这样执行Axios原型链上的方法时，this会指向context
  utils.extend(instance, Axios.prototype, context)

  // Copy context to instance
  // 把context对象上的自身属性和方法扩展到instance上
  // 注：因为extend内部使用的forEach方法对对象做for in 遍历时，只遍历对象本身的属性，而不会遍历原型链上的属性
  // 这样，instance 就有了  defaults、interceptors 属性。
  utils.extend(instance, context)
  return instance
}

// Create the default instance to be exported 创建一个由默认配置生成的axios实例
var axios = createInstance(defaults)

// Factory for creating new instances 扩展axios.create工厂函数，内部也是 createInstance
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig))
}

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises)
}

axios.spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr)
  }
}
module.exports = axios
```

主要核心是 `Axios.prototype.request`，各种请求方式的调用实现都是在 `request` 内部实现的， 简单看下 `request` 的逻辑

```javascript
Axios.prototype.request = function request(config) {
  // Allow for axios('example/url'[, config]) a la fetch API
  // 判断 config 参数是否是 字符串，如果是则认为第一个参数是 URL，第二个参数是真正的config
  if (typeof config === 'string') {
    config = arguments[1] || {}
    // 把 url 放置到 config 对象中，便于之后的 mergeConfig
    config.url = arguments[0]
  } else {
    // 如果 config 参数是否是 字符串，则整体都当做config
    config = config || {}
  }
  // 合并默认配置和传入的配置
  config = mergeConfig(this.defaults, config)
  // 设置请求方法
  config.method = config.method ? config.method.toLowerCase() : 'get'
  /*
    something... 此部分会在后续拦截器单独讲述
  */
}

// 在 Axios 原型上挂载 'delete', 'get', 'head', 'options' 且不传参的请求方法，实现内部也是 request
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  Axios.prototype[method] = function (url, config) {
    return this.request(
      utils.merge(config || {}, {
        method: method,
        url: url,
      }),
    )
  }
})

// 在 Axios 原型上挂载 'post', 'put', 'patch' 且传参的请求方法，实现内部同样也是 request
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  Axios.prototype[method] = function (url, data, config) {
    return this.request(
      utils.merge(config || {}, {
        method: method,
        url: url,
        data: data,
      }),
    )
  }
})
```

`request`入口参数为`config`，可以说`config`贯彻了`axios`的一生

`axios` 中的 `config `主要分布在这几个地方：

- 默认配置 `defaults.js`

- `config.method`默认为 `get`

- 调用 `createInstance` 方法创建 `axios `实例，传入的`config`

- 直接或间接调用 `request` 方法，传入的 `config`

```javascript
// axios.js
// 创建一个由默认配置生成的axios实例
var axios = createInstance(defaults)

// 扩展axios.create工厂函数，内部也是 createInstance
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig))
}

// Axios.js
// 合并默认配置和传入的配置
config = mergeConfig(this.defaults, config)
// 设置请求方法
config.method = config.method ? config.method.toLowerCase() : 'get'
```

从源码中，可以看到优先级：默认配置对象`default` < `method:get` < `Axios`的实例属性`this.default` < `request`参数

下面重点看看`request`方法

```javascript
Axios.prototype.request = function request(config) {
  /*
    先是 mergeConfig ... 等，不再阐述
  */
  // Hook up interceptors middleware 创建拦截器链. dispatchRequest 是重中之重，后续重点
  var chain = [dispatchRequest, undefined]

  // push各个拦截器方法 注意：interceptor.fulfilled 或 interceptor.rejected 是可能为undefined
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    // 请求拦截器逆序 注意此处的 forEach 是自定义的拦截器的forEach方法
    chain.unshift(interceptor.fulfilled, interceptor.rejected)
  })

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    // 响应拦截器顺序 注意此处的 forEach 是自定义的拦截器的forEach方法
    chain.push(interceptor.fulfilled, interceptor.rejected)
  })

  // 初始化一个promise对象，状态为resolved，接收到的参数为已经处理合并过的config对象
  var promise = Promise.resolve(config)

  // 循环拦截器的链
  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift()) // 每一次向外弹出拦截器
  }
  // 返回 promise
  return promise
}
```

拦截器`interceptors`是在构建`axios`实例化的属性

```javascript
function Axios(instanceConfig) {
  this.defaults = instanceConfig
  this.interceptors = {
    request: new InterceptorManager(), // 请求拦截
    response: new InterceptorManager(), // 响应拦截
  }
}
```

`InterceptorManager`构造函数

```javascript
// 拦截器的初始化 其实就是一组钩子函数
function InterceptorManager() {
  this.handlers = []
}

// 调用拦截器实例的use时就是往钩子函数中push方法
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
  })
  return this.handlers.length - 1
}

// 拦截器是可以取消的，根据use的时候返回的ID，把某一个拦截器方法置为null
// 不能用 splice 或者 slice 的原因是 删除之后 id 就会变化，导致之后的顺序或者是操作不可控
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null
  }
}

// 这就是在 Axios的request方法中 中循环拦截器的方法 forEach 循环执行钩子函数
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h)
    }
  })
}
```

请求拦截器方法是被 `unshift`到拦截器中，响应拦截器是被`push`到拦截器中的。最终它们会拼接上一个叫`dispatchRequest`的方法被后续的 `promise` 顺序执行

```javascript
var utils = require('./../utils')
var transformData = require('./transformData')
var isCancel = require('../cancel/isCancel')
var defaults = require('../defaults')
var isAbsoluteURL = require('./../helpers/isAbsoluteURL')
var combineURLs = require('./../helpers/combineURLs')

// 判断请求是否已被取消，如果已经被取消，抛出已取消
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}

module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config)

  // 如果包含baseUrl, 并且不是config.url绝对路径，组合baseUrl以及config.url
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    // 组合baseURL与url形成完整的请求路径
    config.url = combineURLs(config.baseURL, config.url)
  }

  config.headers = config.headers || {}

  // 使用/lib/defaults.js中的transformRequest方法，对config.headers和config.data进行格式化
  // 比如将headers中的Accept，Content-Type统一处理成大写
  // 比如如果请求正文是一个Object会格式化为JSON字符串，并添加application/json;charset=utf-8的Content-Type
  // 等一系列操作
  config.data = transformData(config.data, config.headers, config.transformRequest)

  // 合并不同配置的headers，config.headers的配置优先级更高
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {},
  )

  // 删除headers中的method属性
  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method]
    },
  )

  // 如果config配置了adapter，使用config中配置adapter的替代默认的请求方法
  var adapter = config.adapter || defaults.adapter

  // 使用adapter方法发起请求（adapter根据浏览器环境或者Node环境会有不同）
  return adapter(config).then(
    // 请求正确返回的回调
    function onAdapterResolution(response) {
      // 判断是否以及取消了请求，如果取消了请求抛出以取消
      throwIfCancellationRequested(config)

      // 使用/lib/defaults.js中的transformResponse方法，对服务器返回的数据进行格式化
      // 例如，使用JSON.parse对响应正文进行解析
      response.data = transformData(response.data, response.headers, config.transformResponse)

      return response
    },
    // 请求失败的回调
    function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config)

        if (reason && reason.response) {
          reason.response.data = transformData(
            reason.response.data,
            reason.response.headers,
            config.transformResponse,
          )
        }
      }
      return Promise.reject(reason)
    },
  )
}
```

再来看看`axios`是如何实现取消请求的，实现文件在`CancelToken.js`

```javascript
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.')
  }
  // 在 CancelToken 上定义一个 pending 状态的 promise ，将 resolve 回调赋值给外部变量 resolvePromise
  var resolvePromise
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve
  })

  var token = this
  // 立即执行 传入的 executor函数，将真实的 cancel 方法通过参数传递出去。
  // 一旦调用就执行 resolvePromise 即前面的 promise 的 resolve，就更改promise的状态为 resolve。
  // 那么xhr中定义的 CancelToken.promise.then方法就会执行, 从而xhr内部会取消请求
  executor(function cancel(message) {
    // 判断请求是否已经取消过，避免多次执行
    if (token.reason) {
      return
    }
    token.reason = new Cancel(message)
    resolvePromise(token.reason)
  })
}

CancelToken.source = function source() {
  // source 方法就是返回了一个 CancelToken 实例，与直接使用 new CancelToken 是一样的操作
  var cancel
  var token = new CancelToken(function executor(c) {
    cancel = c
  })
  // 返回创建的 CancelToken 实例以及取消方法
  return {
    token: token,
    cancel: cancel,
  }
}
```

实际上取消请求的操作是在 `xhr.js` 中也有响应的配合的

```javascript
if (config.cancelToken) {
  config.cancelToken.promise.then(function onCanceled(cancel) {
    if (!request) {
      return
    }
    // 取消请求
    request.abort()
    reject(cancel)
  })
}
```

巧妙的地方在 `CancelToken`中 `executor` 函数，通过`resolve`函数的传递与执行，控制`promise`的状态

**小结**

![](<images/7. 计算机网络（71题）-image-36.png>)

---

## 13. 说说对 HTTP3 的了解

**参考答案：**

**HTTP/3的来源**

由于TCP和UDP两者在运输层存在一定差异，TCP的传递效率与UDP相比有天然劣势，于是Google基于UDP开发出了新的协议QUIC(Quick UDP Internet Connections)，希望取代TCP提高传输效率，后经过协商将QUIC协议更名为HTTP/3。

**QUIC概述**

TCP、UDP是我们所熟悉的传输层协议，UDP比TCP相比效率更高但并不具备传输可靠性。而QUIC便是看中UDP传输效率这一特性，并结合了TCP、TLS、HTTP/2的优势，加以优化。

于是在QUIC上层的应用层所运行的HTTP协议也就被称为HTTP/3。

HTTP over QUIC is HTTP/3

![](<images/7. 计算机网络（71题）-image-31.png>)

**HTTP/3新特性**

**1. 零RTT建立连接**

如下图，传统HTTP/2(所有HTTP/2的浏览器均基于HTTPS)传输数据前需要三次RTT，即使将第一次TLS握手的对称秘钥缓存也需要两次RTT才能传递数据。

![](<images/7. 计算机网络（71题）-image-35.png>)

对于HTTP/3而言，仅仅需要一次RTT即可传递数据，如果将其缓存，就可将RTT减少至零。

其核心就是DH秘钥交换算法。

- 客户端向服务端请求数据。

- 服务端生成g、p、a三个随机数，用三个随机数生成A。将a保留后，将g、p、A(Server Config)传递到客户端。

- 客户端生成随机数b，将b保留后，用g、p、b三个随机数生成B。

- 客户端再使用A、b、p生成秘钥K，用K加密HTTP数据并与B一同发送到服务端。

- 服务端再使用B、a、p得到相同秘钥K，并解密HTTP数据。

![](<images/7. 计算机网络（71题）-image-33.png>)

至此即可完成一次RTT对连接的建立，当缓存Server Config后零RTT即可进行数据传递。

**2. 连接迁移**

传统连接通过源IP、源端口、目的IP、目的端口进行连接，当网络发生更换后连接再次建立时延较长。

HTTP/3使用Connection ID对连接保持，只要Connection ID不改变，连接仍可维持。

![](<images/7. 计算机网络（71题）-image-32.png>)

**3. 队头阻塞/多路复用**

- TCP作为面向连接的协议，对每次请求序等到ACK才可继续连接，一旦中间连接丢失将会产生队头阻塞。

- HTTP/1.1中提出Pipelining的方式，单个TCP连接可多次发送请求，但依旧会有中间请求丢失产生阻塞的问题。

![](<images/7. 计算机网络（71题）-image-30.png>)

- HTTP/2中将请求粒度减小，通过Frame的方式进行请求的发送。但在TCP层Frame组合得到Stream进行传输，一旦出现Stream中的Frame丢失，其后方的Stream都将会被阻塞。

![](<images/7. 计算机网络（71题）-image-29.png>)

- 对于HTTP/2而言，浏览器会默认采取TLS方式传输，TLS基于Record组织数据，每个Record包含16K，其中有12个TCP的包，一旦其中一个TCP包出现问题将会导致整个Record无法解密。这也是网络环境较差时HTTP/2的传输速度比HTTP/1.1更慢的原因。

![](<images/7. 计算机网络（71题）-image-28.png>)

- HTTP/3基于UDP的传输，不保证连接可靠性，也就没有对头阻塞的后果。同样传输单元与加密单元为Packet，在TLS下也可避免对头阻塞的问题。

**4. 拥塞控制**

- 热拔插：TCP对于拥塞控制在于传输层，QUIC可在应用层操作改变拥塞控制方法。

- 前向纠错(FEC)：将数据切割成包后可对每个包进行异或运算，将运算结果随数据发送。一旦丢失数据可据此推算。(带宽换时间)

- 单调递增的Packet Number：TCP在超时重传后的两次ACK接受情况并不支持的很好。导致RTT和RTO的计算有所偏差。HTTP/3对此进行改进，一旦重传后的Packet N会递增。

![](<images/7. 计算机网络（71题）-image-44.png>)

- ACK Delay

- HTTP/3在计算RTT时健壮的考虑了服务端的ACK处理时延。

![](<images/7. 计算机网络（71题）-image-43.png>)

- 更多地ACK块

- 一般每次请求都会对应一个ACK，但这样也会浪费(下载场景只需返回数据即可)。

- 于是可设计成每次返回3个ACK block。在HTTP/3将其扩充成最多可携带256 个ACK block。

**5. 流量控制**

TCP使用滑动窗口的方式对发送方的流量进行控制。而对接收方并无限制。在QUIC中便补齐了这一短板。

QUIC中接收方从单挑Stream和整条连接两个角度动态调整接受的窗口大小。

---

## 14. 跨域时怎么处理 cookie？

**参考答案：**

在默认情况下，跨域请求是不会携带 Cookie 的，这是为了保护用户隐私和安全考虑。然而，如果确实需要在跨域请求中携带 Cookie，可以通过以下方式进行处理：

设置 withCredentials 属性：在发送跨域请求的客户端代码中，将 `withCredentials` 属性设置为 `true`。例如，在使用 XMLHttpRequest 或 Fetch API 发起请求时，可以添加如下配置：

```javascript
// XMLHttpRequest
const xhr = new XMLHttpRequest()
xhr.withCredentials = true
xhr.open('GET', 'https://example.com', true)
xhr.send()

// Fetch API
fetch('https://example.com', { credentials: 'include' })
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error))
```

服务端处理 CORS（跨域资源共享）请求：在服务器端，需要对来自其他域的请求进行特殊的处理，以允许跨域请求携带 Cookie。具体的方法取决于所使用的后端技术。

- 对于 Express 框架，可以使用 `cors` 中间件，并将 `credentials` 设置为 `true`：

```javascript
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors({ origin: 'http://example.com', credentials: true }))
```

对于其他后端框架或原生 Node.js，需要在响应头中设置适当的 CORS 头部：

```javascript
response.setHeader('Access-Control-Allow-Origin', 'http://example.com')
response.setHeader('Access-Control-Allow-Credentials', 'true')
```

需要注意，启用跨域请求携带 Cookie 的设置需谨慎，确保服务端和客户端都进行了适当的安全措施，以防止潜在的安全风险。此外，还要注意遵循同源策略，并只允许受信任的域名访问和携带 Cookie。

---

## 15. POST请求的 Content-Type 常见的有哪几种？

**参考答案：**

POST 请求的 Content-Type 可以有多种类型，常见的包括：

1. `application/x-www-form-urlencoded`：用于普通的 HTML 表单提交，在请求正文中将表单字段编码为键值对。

2. `multipart/form-data`：用于上传文件或二进制数据的表单提交，请求正文以多部分形式进行编码。

3. `application/json`：用于发送 JSON 格式的数据，请求正文中的数据将以 JSON 形式进行传输。

4. `text/plain`：纯文本格式，适用于发送纯文本数据。

5. `application/xml`：用于发送 XML 数据。

6. `text/html`：用于发送 HTML 数据。

7. `application/octet-stream`：用于发送二进制数据，如文件下载时使用。

8. `application/graphql`：用于发送 GraphQL 查询或请求。

9. `application/x-www-form-urlencoded;charset=UTF-8`：类似于 `application/x-www-form-urlencoded`，但指定了字符编码为 UTF-8。

10. 其他自定义的 Content-Type 类型。

服务器根据 Content-Type 来解析和处理请求数据，具体选择哪种 Content-Type 取决于请求所携带的数据类型和服务器端的要求。

---

## 16. Blob，ArrayBuffer，Base64 分别有哪些使用场景？

**参考答案：**

Blob、ArrayBuffer和Base64在Web开发中有各自的使用场景：

1. Blob：

   - 文件上传和下载：Blob对象可以用于将文件数据存储为二进制形式，并进行上传或下载操作。

   - 图片处理：可以将图像数据存储为Blob对象，并进行处理、显示或上传。

   - 多媒体处理：可用于处理音频和视频等多媒体数据。

   - 生成临时URL：可以使用Blob对象创建临时URL，用于在浏览器中显示或分享文件。

2. ArrayBuffer：

   - 图像处理：可以使用ArrayBuffer来处理图像数据，例如图像解码、图像滤镜等操作。

   - 网络请求：可用于处理二进制数据的网络请求，例如WebSocket通信或二进制协议的数据传输。

   - 数据加密：ArrayBuffer可以用于加密算法的处理和操作。

   - Web Workers：ArrayBuffer可用于在Web Worker中进行多线程数据处理。

3. Base64：

   - 图片嵌入：Base64编码可以将图片数据转换为字符串，可用于将图片嵌入到HTML、CSS或JavaScript中，减少网络请求。

   - 图片传输：在文本协议中，如JSON或XML，可以使用Base64编码将图片数据传输到服务器或其他系统。

   - 数据URL：可以将Base64编码的数据作为数据URL嵌入到HTML中，用于显示图像或其他媒体内容。

   - 数据存储：某些浏览器API或本地存储机制支持Base64编码的数据存储。

选择适当的数据表示方式取决于具体的需求，例如处理的数据类型、数据大小、数据传输方式等。

---

## 17. Blob，ArrayBuffer，Base64 有什么区别？

**参考答案：**

Blob、ArrayBuffer和Base64是在Web开发中处理二进制数据的不同表示和操作方式。

1. Blob（Binary Large Object）： Blob是一种表示二进制数据的对象，可以存储大量的数据。它常用于处理文件、图像、音频和视频等媒体数据。Blob对象可以通过`new Blob()`构造函数创建，也可以从其他数据源（例如，通过XMLHttpRequest下载的数据）生成。Blob提供了一些方法和属性，用于读取和操作二进制数据。

2. ArrayBuffer： ArrayBuffer是一种用于表示通用的二进制数据缓冲区的对象。它在内存中分配一块连续的、固定大小的原始二进制数据，并提供了一些方法和属性来读取和操作这些数据。ArrayBuffer不直接访问二进制数据，而是通过TypedArray视图或DataView对象来读写数据。

3. Base64： Base64是一种将二进制数据转换为可打印字符的编码方式。它通过将二进制数据按照一定规则进行编码，生成由A-Z、a-z、0-9和一些特殊字符组成的字符串。Base64编码后的数据可以用于在文本协议中传输二进制数据，例如在网络请求中传递图片数据或在HTML中嵌入图片。

区别：

- Blob和ArrayBuffer都是用于表示和处理二进制数据的对象，但Blob通常用于处理大量数据和文件，而ArrayBuffer用于处理更小粒度的数据。

- Blob对象提供了一些方法和属性，用于操作和读取二进制数据，而ArrayBuffer本身并不直接提供数据访问方法，需要通过TypedArray视图或DataView对象来读写数据。

- Base64是一种编码方式，用于将二进制数据转换为可打印字符，以便在文本协议中传输。Base64编码后的数据可以作为字符串进行处理，而Blob和ArrayBuffer是二进制数据的对象表示。

需要根据具体的使用场景和需求选择适合的数据表示和处理方式。

---

## 18. TCP 和 UDP的区别是什么？

**参考答案：**

TCP（传输控制协议）和 UDP（用户数据报协议）是两种常见的网络传输协议。它们之间的主要区别如下：

1. 连接方式：TCP 是面向连接的协议，需要在通信前建立连接，而 UDP 是无连接的协议，可以直接发送数据包。

2. 可靠性：TCP 保证传输数据的可靠性，能够保证所有数据到达目的地且顺序正确；UDP 不保证传输数据的可靠性，可能会出现数据丢失或乱序等问题。

3. 开销：TCP 在传输过程中要维护连接状态、进行流量控制、拥塞控制等操作，因此开销较大；UDP 没有这些机制，传输开销较小。

4. 速度：由于 TCP 需要保证数据的可靠性，因此传输速度可能会受到一定的影响；UDP 没有这个限制，传输速度快。

5. 适用场景：TCP 适用于对可靠性要求较高的应用场景，如文件传输、邮件传输等；而 UDP 适用于实时性要求较高的应用场景，如语音、视频、游戏等。

TCP 和 UDP 在连接方式、可靠性、开销、速度和适用场景等方面都有所不同。在实际应用中，需要根据具体的需求和场景选择合适的网络传输协议。

---

## 19. Http 3.0 是基于 udp 的，那么它是如何保证传输可靠性的?

**参考答案：**

HTTP/3 使用的底层传输协议 QUIC 是基于 UDP 的，因此需要在应用层实现可靠的数据传输。QUIC 协议使用了以下几种机制来保证数据的可靠性：

1. 连接迁移：QUIC 允许在网络切换或 IP 变更时迁移连接，而不需要重新建立新的连接，从而避免了连接中断和数据丢失的问题。

2. 可靠性流控制：QUIC 在每个流上都实现了可靠的流控制机制，可以根据发送方和接收方的负载情况动态调整数据发送速率，从而优化传输效率和可靠性。

3. 数据重传：QUIC 中每个数据包都带有唯一标识符（Packet Number），接收方可以根据这个标识符进行数据包的确认和重传，以保证数据传输的可靠性。

4. 拥塞控制：QUIC 采用了基于 TCP 的拥塞控制机制，可以根据网络拥塞程度自适应调整发送速率，以避免网络拥塞和丢包等问题。

在基于 UDP 的 HTTP/3 协议中，通过 QUIC 实现了多种机制来保证数据传输的可靠性，如连接迁移、可靠性流控制、数据重传、拥塞控制等，从而有效解决了 UDP 协议本身的可靠性问题，提高了传输效率和安全性。

---

## 20. 说下 websocket 的连接原理

**参考答案：**

WebSocket 是一种基于 TCP 协议的双向通信协议，它可以在客户端和服务器之间建立持久性的连接，实现实时的数据传输和交互。其主要原理如下：

1. 利用 HTTP 建立连接：WebSocket 的连接需要通过 HTTP 请求首先建立握手（Handshaking）过程，该过程类似于普通的 HTTP 请求，但包含了一些特殊的头部字段，例如 Upgrade 和 Connection 等。

2. 建立 TCP 连接：建立 HTTP 连接之后，客户端和服务器之间会建立一个 TCP 连接，并交换协商的加密和压缩参数等。

3. 双向通信：建立好 TCP 连接之后，就可以进行双向通信了。客户端和服务器都可以在任意时刻发送消息，并且不需要发送 HTTP 请求或响应，而是直接通过已经建立好的连接进行数据的传递和处理。

4. 断开连接：当双方其中一方决定关闭连接时，会发送一个特殊的控制帧（Close Frame），告知对方关闭连接。

需要注意的是，在 WebSocket 的连接过程中，由于需要进行 Handshaking 过程，因此第一次连接较慢。同时，在建立连接之后，需要保持长时间的连接状态，因此需要考虑网络稳定性、负载均衡和错误重试等问题，以保证连接的可靠性和稳定性。

WebSocket 是一种基于 TCP 的双向通信协议，通过建立长时间的持久连接来实现客户端和服务器之间的实时数据传输和交互。它在实时性、效率和安全性等方面都有很大的优势，适用于在线游戏、即时聊天、实时监控等领域。

---

## 21. https是如何保证安全的，又是如何保证不被中间人攻击的？

HTTPS 是一种基于 TLS/SSL 协议的安全传输协议，它可以通过加密和认证等措施来保护数据传输过程中的安全性和隐私性。其主要保证方式如下：

1. 加密传输：使用公钥加密技术对数据进行加密，并使用私钥进行解密，以保证在传输过程中数据不会被窃取、篡改或伪造。

2. 身份认证：使用数字证书对服务器和客户端身份进行认证，防止恶意攻击者伪装成合法用户或服务器进行攻击。

3. 完整性校验：使用消息摘要算法对传输数据进行校验，确保数据的完整性和准确性，防止数据在传输过程中被篡改或损坏。

4. 防止重放攻击：使用时间戳和随机数等技术对请求和响应进行标记，以防止恶意攻击者利用重放攻击进行攻击。

至于如何防止中间人攻击，HTTPS 主要采用以下几种方式：

1. 数字证书验证：在握手阶段，客户端会向服务器请求数字证书，然后对证书进行验证，以确认服务器身份的真实性和合法性。如果证书验证失败，则会拒绝连接，从而避免了中间人攻击的风险。

2. 主机名验证：客户端在验证数字证书时，会对证书中包含的域名信息进行匹配验证，以确保请求的是正确的服务器地址和域名。如果主机名验证失败，则同样会拒绝连接。

3. 对称加密：使用对称密钥加密算法可以提高传输效率，但需要注意在传输过程中保护密钥的安全性，以避免被中间人获取密钥并进行攻击。

4. 证书固定：一些应用程序可以将服务器证书的指纹或公钥等信息内置到客户端中，从而避免了恶意攻击者替换证书或伪造数字证书的风险。

HTTPS 可以通过加密和认证等措施来保证数据传输过程的安全性和隐私性，并防止中间人攻击等风险。但需要注意，在实际应用中，需要选择合适的加密算法、证书颁发机构和证书验证方式，并进行有效的密钥保护和网络安全管控，以保证 HTTPS 的可靠性和稳定性。

---

## 22. websocket 中的 Handshaking 是什么？

Handshaking 是 WebSocket 建立连接的第一步，它是一个类似于 HTTP 请求的过程，在客户端和服务器之间交换握手信息，以确定双方是否支持 WebSocket 协议，并建立起 WebSocket 连接。其主要步骤如下：

1. 客户端向服务器发送升级协议请求：客户端通过普通的 HTTP GET 请求向服务器发送一个包含特殊头部字段 `Upgrade` 和 `Connection` 的HTTP 请求。

2. 服务器相应升级协议请求：当服务器收到客户端的升级协议请求后，会对该请求进行处理，并返回一个特殊的响应头部字段 `Upgrade` 和 `Connection`，并附上一个随机生成的字符串（Sec-WebSocket-Key）作为握手口令。

3. 客户端发送握手确认请求：客户端接收到服务器的响应之后，会对该响应进行处理，并根据约定的算法将服务器返回的 Sec-WebSocket-Key 字符串与一个魔术字符串拼接起来，然后进行 SHA1 加密，并将结果转换成 Base64 编码格式，最后将加密后的结果作为 `Sec-WebSocket-Accept` 字段值附在新的请求头部中，再次发送给服务器。

4. 服务器确认握手请求：当服务器收到客户端的握手确认请求后，会对请求头中的 `Sec-WebSocket-Accept` 字段进行验证，如果验证通过，则表示握手成功，并且服务器会返回一个状态码为 101 的 HTTP 响应，表示 WebSocket 连接已经建立。

5. WebSocket 连接建立：当客户端收到服务器的确认响应之后，WebSocket 连接就正式建立了，此时客户端和服务器都可以通过 WebSocket 协议进行双向通信。

在 Handshaking 过程中，需要交换的头部字段包括 `Upgrade`、`Connection`、`Sec-WebSocket-Key` 和 `Sec-WebSocket-Accept` 等，其中 `Sec-WebSocket-Key`、`Sec-WebSocket-Accept` 是握手过程的关键参数，用于实现加密和验证。同时，在 Handshaking 过程中，需要保证请求和响应头部的正确性和完整性，以防止出现安全漏洞和错误数据。

---

## 23. cookie 怎么设置只在 https 时携带？

答案：设置 `cookie` 的 `secure` 属性。

`secure`选项用来设置`cookie`只在确保安全的请求中才会发送。当请求是`HTTPS`或者其他安全协议时，包含 `secure` 选项的 `cookie` 才能被发送至服务器。

默认情况下，cookie不会带secure选项(即为空)。所以默认情况下，不管是HTTPS协议还是HTTP协议的请求，cookie 都会被发送至服务端。

但要注意一点，secure选项只是限定了在安全情况下才可以传输给服务端，但并不代表你不能看到这个 cookie。

---

## 24. HTTP1.0，HTTP1.1，HTTP2.0之间有什么区别？

**参考答案：**

**HTTP1.0 和 HTTP1.1 的一些区别**

**缓存处理**

在 HTTP1.0 中主要使用 header 里的 `If-Modified-Since`（比较资源最后的更新时间是否一致）,`Expires`（资源的过期时间（取决于客户端本地时间）） 来做为缓存判断的标准。

HTTP1.1 则引入了更多的缓存控制策略：

- `Entity tag`：资源的匹配信息

- `If-Unmodified-Since`：比较资源最后的更新时间是否不一致

- `If-Match`：比较 ETag 是否一致

- `If-None-Match`：比较 ETag 是否不一致

等更多可供选择的缓存头来控制缓存策略。

**带宽优化**

HTTP1.0 中，存在一些浪费带宽的现象，例如客户端只是需要某个对象的一部分，而服务器却将整个对象送过来了，并且不支持断点续传功能。

HTTP 1.1默认支持断点续传。

**Host 头处理**

在 HTTP1.0 中认为每台服务器都绑定一个唯一的 IP 地址，因此，请求消息中的 URL 并没有传递主机名（hostname）。但随着虚拟主机技术的发展，在一台物理服务器上可以存在多个虚拟主机，并且它们共享一个 IP 地址。HTTP1.1 的请求消息和响应消息都应支持 Host 头域，且请求消息中如果没有 Host 头域会报告一个错误（400 Bad Request）。

**长连接**

HTTP1.0 需要使用`keep-alive`参数来告知服务器端要建立一个长连接，而 HTTP1.1 默认支持长连接，一定程度上弥补了 HTTP1.0 每次请求都要创建连接的缺点。

HTTP 是基于 TCP/IP 协议的，创建一个 TCP 连接是需要经过三次握手的,有一定的开销，如果每次通讯都要重新建立连接的话，对性能有影响。因此最好能维持一个长连接，可以用个长连接来发多个请求。

HTTP1.1 支持长连接（PersistentConnection）和请求的流水线（Pipelining）处理，在一个 TCP 连接上可以传送多个 HTTP 请求和响应，减少了建立和关闭连接的消耗和延迟。

**错误通知的管理**

在 HTTP1.1 中新增了 24 个错误状态响应码，如 409（Conflict）表示请求的资源与资源的当前状态发生冲突；410（Gone）表示服务器上的某个资源被永久性的删除。

新增请求方式

- PUT：请求服务器存储一个资源

- DELETE：请求服务器删除标识的资源

- OPTIONS：请求查询服务器的性能，或者查询与资源相关的选项和需求

- CONNECT：保留请求以供将来使用

- TRACE：请求服务器回送收到的请求信息，主要用于测试或诊断

HTTP2.0 与 HTTP1.X 的区别

HTTP1.X 版本的缺陷概括来说是：线程阻塞，在同一时间，同一域名的请求有一定的数量限制，超过限制数目的请求会被阻塞。

**二进制分帧**

HTTP1.x 的解析是基于文本。基于文本协议的格式解析存在天然缺陷，文本的表现形式有多样性，要做到健壮性考虑的场景必然很多，二进制则不同，只认 0 和 1 的组合。基于这种考虑 HTTP2.0 的协议解析决定采用二进制格式，实现方便且健壮。

HTTP2.0 在 应用层(HTTP2.0)和传输层(TCP/UDP)之间增加一个二进制分帧层。在不改动 HTTP1.X 的语义、方法、状态码、URI 以及首部字段的情况下, 解决了 HTTP1.1 的性能限制，改进传输性能，实现低延迟和高吞吐量。在二进制分帧层中，HTTP2.0 会将所有传输的信息分割为更小的消息和帧（frame）,并对它们采用二进制格式的编码 ，其中 HTTP1.X 的首部信息会被封装到 HEADER frame，而相应的 Request Body 则封装到 DATA frame 里面。

- 帧：HTTP2.0 数据通信的最小单位消息：指 HTTP2.0 中逻辑上的 HTTP 消息。例如请求和响应等，消息由一个或多个帧组成。

- 流：存在于连接中的一个虚拟通道。流可以承载双向消息，每个流都有一个唯一的整数 ID。

**多路复用（MultiPlexing）**

多路复用允许同时通过单一的 HTTP2.0 连接发起多重的请求-响应消息。即是连接共享，提高了连接的利用率，降低延迟。即每一个 request 都是是用作连接共享机制的。一个 request 对应一个 id，这样一个连接上可以有多个 request，每个连接的 request 可以随机的混杂在一起，接收方可以根据 request 的 id 将 request 再归属到各自不同的服务端请求里面。

在 HTTP1.1 协议中浏览器客户端在同一时间，针对同一域名下的请求有一定数量限制。超过限制数目的请求会被阻塞。这也是为何一些站点会有多个静态资源 CDN 域名的原因之一。

当然 HTTP1.1 也可以多建立几个 TCP 连接，来支持处理更多并发的请求，但是创建 TCP 连接本身也是有开销的。

TCP 连接有一个预热和保护的过程，先检查数据是否传送成功，一旦成功过，则慢慢加大传输速度。因此对应瞬时并发的连接，服务器的响应就会变慢。所以最好能使用一个建立好的连接，并且这个连接可以支持瞬时并发的请求。

HTTP2.0 可以很容易的去实现多流并行而不用依赖建立多个 TCP 连接，同个域名只需要占用一个 TCP 连接，消除了因多个 TCP 连接而带来的延时和内存消耗。HTTP2.0 把 HTTP 协议通信的基本单位缩小为一个一个的帧，这些帧对应着逻辑流中的消息。并行地在同一个 TCP 连接上双向交换消息。

**header 压缩**

HTTP1.x 的 header 带有大量信息，而且每次都要重复发送，HTTP2.0 使用 HPACK 算法对 header 的数据进行压缩，减少需要传输的 header 大小，通讯双方各自 cache 一份 header fields 表，差量更新 HTTP 头部，既避免了重复 header 的传输，又减小了需要传输的大小。

header 采取的压缩策略：

- HTTP2.0 在客户端和服务器端使用“首部表”来跟踪和存储之前发送的键－值对，对于相同的数据，不再通过每次请求和响应发送；

- 首部表在 HTTP2.0 的连接存续期内始终存在，由客户端和服务器共同渐进地更新;

- 每个新的首部键－值对要么被追加到当前表的末尾，要么替换表中之前的值。

**服务端推送（server push）**

服务端推送是一种在客户端请求之前发送数据的机制。

服务端可以在发送页面 HTML 时主动推送其它资源，而不用等到浏览器解析到相应位置，发起请求再响应。例如服务端可以主动把 JS 和 CSS 文件推送给客户端，而不需要客户端解析 HTML 时再发送这些请求。

服务器端推送的这些资源其实存在客户端的某处地方，客户端直接从本地加载这些资源就可以了，不用走网络，速度自然是快很多的。

---

## 25. DNS 预解析是什么？怎么实现？

**DNS优化**

在介绍`dns-prefetch`之前，先要提下当前对于DNS优化主流方法。

一般来说，一次DNS解析需要耗费 20-120ms，所以为了优化DNS，我们可以考虑两个方向：

1. 减少DNS请求次数

2. 缩短DNS解析时间`dns-prefetch`

什么是dns-prefetch？

`dns-prefetch`(DNS预获取)是前端网络性能优化的一种措施。它根据浏览器定义的规则，提前解析之后可能会用到的域名，使解析结果缓存到系统缓存中，缩短DNS解析时间，进而提高网站的访问速度。

为什么要用dns-prefetch？

每当浏览器从（第三方）服务器发送一次请求时，都要先通过DNS解析将该跨域域名解析为 IP地址，然后浏览器才能发出请求。

如果某一时间内，有多个请求都发送给同一个服务器，那么DNS解析会多次并且重复触发。这样会导致整体的网页加载有延迟的情况。

我们知道，虽然DNS解析占用不了多大带宽，但是它会产生很高的延迟，尤其是对于移动网络会更为明显。

因此，为了减少DNS解析产生的延迟，我们可以通过`dns-prefetch`预解析技术有效地缩短DNS解析时间。

```plaintext
<link rel="dns-prefetch" href="https://baidu.com/">
```

**dns-prefetch背后原理**

当浏览器访问一个域名的时候，需要解析一次DNS，获得对应域名的ip地址。 在解析过程中，按照:

- 浏览器缓存

- 系统缓存

- 路由器缓存

- ISP(运营商)DNS缓存

- 根域名服务器

- 顶级域名服务器

- 主域名服务器

的顺序逐步读取缓存，直到拿到IP地址。

`dns-prefetch`就是在将解析后的IP缓存在系统中。

这样，`dns-prefetch`就有效地缩短了DNS解析时间。因为，在本地操作系统做了DNS缓存，使得DNS在解析的过程中，提前在系统缓存中找到了对应IP。

这样一来， 后续的解析步骤就不用执行了，进而也就缩短了DNS解析时间。

假如浏览器首次将一个域名解析为IP地址，并缓存至操作系统，那么下一次DNS解析时间可以低至0-1ms。

倘若结果不缓存在系统，那么就需要读取路由器的缓存，进而后续的解析时间最小也要约15ms。

如果路由器缓存也不存在，则需要读取ISP（运营商）DNS缓存，一般像`taobao.com`、`baidu.com`这些常见的域名，读取ISP（运营商）DNS缓存需要的时间在80-120ms，如果是不常见的域名，平均需要200-300ms。

一般来说，大部分的网站到运营商这块都能找到IP。

那也就是说，`dns-prefetch`可以给DNS解析过程带来15-300ms的提升，尤其是一些大量引用很多其他域名资源的网站，提升效果就更加明显了

**浏览器DNS缓存与dns-prefetch**

现代浏览器为了优化DNS解析，也设有了浏览器DNS缓存。

每当在首次DNS解析后会对其IP进行缓存。至于缓存时长，每种浏览器都不一样，比如Chrome的过期时间是1分钟，在这个期限内不会重新请求DNS。

> <span style="color: rgb(36,91,219); background-color: inherit">Tip:</span>
> <span style="color: rgb(36,91,219); background-color: inherit">每当Chrome浏览器启动的时候，就会自动的快速解析浏览器最近一次启动时记录的前10个域名。所以经常访问的网址就不存在DNS解析的延迟，进而打开速度更快。</span>

而`dns-prefetch` 相当于在浏览器缓存之后，在本地操作系统中做了DNS缓存，个人理解，为的是给浏览器缓存做保障，尽量让DNS解析出本地，以此来做了又一层DNS解析优化。

一般来说，DNS在系统的缓存时间是大于浏览器的。

**浏览器与系统DNS缓存时间**

> <span style="color: rgb(36,91,219); background-color: inherit">TTL(Time-To-Live)，就是一条域名解析记录在DNS服务器中的存留时间</span>

- 浏览器DNS缓存的时间跟DNS服务器返回的TTL值无关, 它的缓存时间取决于浏览器自身设置。

- 系统缓存会参考DNS服务器响应的TTL值，但是不完全等于TTL值。

国内和国际上很多平台的TTL值都是以秒为单位的，很多的默认值都是3600，也就是默认缓存1小时。

`dns-prefetch`缺点

`dns-prefetch`最大的缺点就是使用它太多。

过多的预获取会导致过量的DNS解析，对网络是一种负担。

最佳实践

请记住以下三点：

1. `dns-prefetch` 仅对[<span style="color: rgb(36,91,219); background-color: inherit">跨域</span>](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)域上的 DNS查找有效，因此请避免使用它来指向相同域。这是因为，到浏览器看到提示时，您站点域背后的IP已经被解析。

2. 除了link 还可以通过使用 [<span style="color: rgb(36,91,219); background-color: inherit">HTTP链接字段</span>](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Link)将 `dns-prefetch`（以及其他资源提示）指定为 [<span style="color: rgb(36,91,219); background-color: inherit">HTTP标头</span>](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)：

```plaintext
Link: https://fonts.gstatic.com/; rel=dns-prefetch
```

1. 考虑将 `dns-prefetch` 与 `preconnect(`预连接`)`提示配对。

由于`dns-prefetch` 仅执行 DNS查找，不像`preconnect` 会建立与服务器的连接。

如果站点是通过HTTPS服务的，两者的组合会涵盖DNS解析，建立TCP连接以及执行TLS握手。将两者结合起来可提供进一步减少[<span style="color: rgb(36,91,219); background-color: inherit">跨域请求</span>](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)的感知延迟的机会。如下所示：

```plaintext
<link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
<link rel="dns-prefetch" href="https://fonts.gstatic.com/">
```

Note: 如果页面需要建立与许多第三方域的连接，则将它们预先连接会适得其反。 `preconnect` 提示最好仅用于最关键的连接。对于其他的，只需使用 `<link rel="dns-prefetch">` 即可节省第一步的时间DNS查找。

---

## 26. 你知道哪些应用层协议？

应用层常见的协议：

- 超文本传输 Http、Https

- 文本传输：FTP

- 电子邮件：SMTP、POP3、IMAP

- 动态主机配置：DHCP

- 域名系统：DNS

---

## 27. TCP是怎么判断丢包的？

TCP协议传输的特点主要就是面向字节流、传输可靠、面向连接。

TCP协议保证数据传输可靠性的方式主要有：

- 校验和

- 序列号

- 确认应答

- 超时重传

- 连接管理

- 流量控制

- 拥塞控制

**确认应答与序列号**

序列号：TCP传输时将每个字节的数据都进行了编号，这就是序列号。

确认应答：TCP传输的过程中，每次接收方收到数据后，都会对传输方进行确认应答。也就是发送ACK报文。这个ACK报文当中带有对应的确认序列号，告诉发送方，接收到了哪些数据，下一次的数据从哪里发。

序列号的作用不仅仅是应答的作用，有了序列号能够将接收到的数据根据序列号排序，并且去掉重复序列号的数据。这也是TCP传输可靠性的保证之一

**超时重传**

在进行TCP传输时，由于确认应答与序列号机制，也就是说发送方发送一部分数据后，都会等待接收方发送的ACK报文，并解析ACK报文，判断数据是否传输成功。如果发送方发送完数据后，迟迟没有等到接收方的ACK报文，这该怎么办呢？而没有收到ACK报文的原因可能是什么呢？

发送方没有接收到ACK响应的原因：其中一方出现了网络问题。

- 数据发送方：数据发送过程中有由于网络问题全体丢包，接收方根本没有收到数据。

- 数据接收方：数据拿到了。但是发送ACK报文的时候由于网络问题，发送失败。

为了解决丢包问题导致的【确认应答、序列号】机制失效，TCP引入了超时重传机制。简单的理解就是在发送方发送数据后的一段时候内，如果没有接收到接收方的ACK响应，那么刚刚发送的数据需要重新发送。对应上面说到的两种原因，如果是数据发方的问题，数据重新发送，数据接收方进行响应ACK;如果是数据接收方的问题，数据发送过来之后，接收方根据序列号判断是否是重复数据，如果是直接丢弃，然后继续返回ack响应。

那么发送方发送完毕后等待的时间是多少呢？如果这个等待的时间过长，那么会影响TCP传输的整体效率，如果等待时间过短，又会导致频繁的发送重复的包。如何权衡？

由于TCP传输时保证能够在任何环境下都有一个高性能的通信，因此这个最大超时时间（也就是等待的时间）是动态计算的。

**流量控制**

接收端在接收到数据后，对其进行处理。如果发送端的发送速度太快，导致接收端的结束缓冲区很快的填充满了。此时如果发送端仍旧发送数据，那么接下来发送的数据都会丢包，继而导致丢包的一系列连锁反应，超时重传呀什么的。而TCP根据接收端对数据的处理能力，决定发送端的发送速度，这个机制就是流量控制。

在TCP协议的报头信息当中，有一个16位字段的窗口大小。在介绍这个窗口大小时我们知道，窗口大小的内容实际上是接收端接收数据缓冲区的剩余大小。这个数字越大，证明接收端接收缓冲区的剩余空间越大，网络的吞吐量越大。接收端会在确认应答发送ACK报文时，将自己的即时窗口大小填入，并跟随ACK报文一起发送过去。而发送方根据ACK报文里的窗口大小的值的改变进而改变自己的发送速度。如果接收到窗口大小的值为0，那么发送方将停止发送数据。并定期的向接收端发送窗口探测数据段，让接收端把窗口大小告诉发送端。

**拥塞控制**

TCP传输的过程中，发送端开始发送数据的时候，如果刚开始就发送大量的数据，那么就可能造成一些问题。网络可能在开始的时候就很拥堵，如果给网络中在扔出大量数据，那么这个拥堵就会加剧。拥堵的加剧就会产生大量的丢包，就对大量的超时重传，严重影响传输。

所以TCP引入了慢启动的机制，在开始发送数据时，先发送少量的数据探路。探清当前的网络状态如何，再决定多大的速度进行传输。这时候就引入一个叫做拥塞窗口的概念。发送刚开始定义拥塞窗口为 1，每次收到ACK应答，拥塞窗口加 1。在发送数据之前，首先将拥塞窗口与接收端反馈的窗口大小比对，取较小的值作为实际发送的窗口。

拥塞窗口的增长是指数级别的。慢启动的机制只是说明在开始的时候发送的少，发送的慢，但是增长的速度是非常快的。为了控制拥塞窗口的增长，不能使拥塞窗口单纯的加倍，设置一个拥塞窗口的阈值，当拥塞窗口大小超过阈值时，不能再按照指数来增长，而是线性的增长。在慢启动开始的时候，慢启动的阈值等于窗口的最大值，一旦造成网络拥塞，发生超时重传时，慢启动的阈值会为原来的一半（这里的原来指的是发生网络拥塞时拥塞窗口的大小），同时拥塞窗口重置为 1。

---

## 28. TCP和HTTP请求之间有什么关系？

我们知道开启一个TCP链接之后，HTTP请求就会并行发出。 首先我们来思考一个问题，浏览器与服务器建立一个TCP链接之后，会不会在完成一个HTTP请求后立马断开？

- HTTP/1.0的时候是会的，需要手动设置`Connection: keep-alive`。

- HTTP/1.1的时候`Connection`默认为`keep-alive` 。

一般情况下，复用的 TCP连接在等待设置的超时时间之后还没有被任何连接使用的话，就会主动断开。

**一个TCP链接可以对应多少个HTTP请求？**

一个TCP链接可以对应多个HTTP请求，只要这个TCP链接没有断开，就可以发送HTTP请求。

**这些HTTP请求可以同时发送，同时响应么，在一个TCP链接中？比如：三个HTTP请求同时发送，同时接收响应。**

在HTTP/1.1中，单个TCP链接在同一时刻只能处理一个请求，意思就是：任意两个 HTTP 请求从开始到结束的时间在同一个 TCP链接里不能重叠。HTTP/1.1 规范中规定了 Pipelining 来试图解决这个问题， 但是浏览器默认关闭了这个功能。

原因：

- 一些代理服务器不能正确的处理 HTTP Pipelining。

- 正确的流水线实现是复杂的。

- Head-of-line Blocking 连接头阻塞：在建立起一个 TCP 连接之后，假设客户端在这个连接连续向服务器发送了几个请求。按照标准，服务器应该按照收到请求的顺序返回结果，假设服务器在处理首个请求时花费了大量时间，那么后面所有的请求都需要等着首个请求结束才能响应。

HTTP/2.0 提供了Multiplexing 多路传输（多路复用）。可以在一个TCP链接中同时发起多个HTTP请求，同时响应多个HTTP请求。

所以，解决办法也就出现了：

- HTTP/1.1 中可以利用 Pipelining。

- 重用TCP

**浏览器http请求的并发性是如何体现的？并发请求的数量有没有限制？**

有人会说，我们客户端发起HTTP请求明明是异步，并行发送的。怎么到你这里就一个一个发送，一个一个响应了？

其实浏览器会同时与服务器建立多个TCP链接，来支持多个HTTP同时请求的。

就例如：Chrome浏览器最多允许对同一个域名Host建立6个TCP连接，不同的浏览器有所区别。

**补充**

关于HTTPS如果图片都是HTTPS的连接，并且在同一域名下，浏览器会先和服务器协商使用`HTTP2`的`Multiplexing`功能进行多路传输，不过未必所有的挂在这个域名下的资源都会使用同一个TCP连接。如果用不了HTTPS或者HTTP2（HTTP2是在HTTPS上实现的），那么浏览器会就在同一个host建立多个TCP连接，每一个TCP连接进行顺序请求资源。

---

## 29. 从存储位置看，浏览器缓存分为哪几种？

从存储位置来看，浏览器缓存一共分为四种，并且各自有优先级，当依次查找缓存且都没有命中的时候，才会去请求网络。

- Service Worker

- Memory Cache

- Disk Cache

- Push Cache

**Service Worker**

Service Worker 是运行在浏览器背后的独立线程，一般可以用来实现缓存功能。使用 Service Worker的话，传输协议必须为 HTTPS。因为 Service Worker 中涉及到请求拦截，所以必须使用 HTTPS 协议来保障安全。Service Worker 的缓存与浏览器其他内建的缓存机制不同，它可以让我们自由控制缓存哪些文件、如何匹配缓存、如何读取缓存，并且缓存是持续性的。

Service Worker 实现缓存功能一般分为三个步骤：

- 首先需要先注册 Service Worker

- 然后监听到 install 事件以后就可以缓存需要的文件

- 那么在下次用户访问的时候就可以通过拦截请求的方式查询是否存在缓存，存在缓存的话就可以直接读取缓存文件，否则就去请求数据。

- 当 Service Worker 没有命中缓存的时候，我们需要去调用 fetch 函数获取数据。也就是说，如果我们没有在 Service Worker 命中缓存的话，会根据缓存查找优先级去查找数据。但是不管我们是从 Memory Cache 中还是从网络请求中获取的数据，浏览器都会显示我们是从 Service Worker 中获取的内容。

**Memory Cache**

Memory Cache 也就是内存中的缓存，主要包含的是当前中页面中已经抓取到的资源,例如页面上已经下载的样式、脚本、图片等。读取内存中的数据肯定比磁盘快,内存缓存虽然读取高效，可是缓存持续性很短，会随着进程的释放而释放。 一旦我们关闭 Tab 页面，内存中的缓存也就被释放了。

内存缓存在缓存资源时并不关心返回资源的HTTP缓存头Cache-Control是什么值，同时资源的匹配也并非仅仅是对URL做匹配，还可能会对Content-Type，CORS等其他特征做校验。

**Disk Cache**

Disk Cache 也就是存储在硬盘中的缓存，读取速度慢点，但是什么都能存储到磁盘中，比之 Memory Cache 胜在容量和存储时效性上。它会根据 HTTP Herder 中的字段判断哪些资源需要缓存，哪些资源可以不请求直接使用，哪些资源已经过期需要重新请求。并且即使在跨站点的情况下，相同地址的资源一旦被硬盘缓存下来，就不会再次去请求数据。绝大部分的缓存都来自 Disk Cache。

**Push Cache**

Push Cache（推送缓存）是 HTTP/2 中的内容，当以上三种缓存都没有命中时，它才会被使用。它只在会话（Session）中存在，一旦会话结束就被释放，并且缓存时间也很短暂，在Chrome浏览器中只有5分钟左右，同时它也并非严格执行HTTP头中的缓存指令。他有如下的一些特性：

- 所有的资源都能被推送，并且能够被缓存,但是 Edge 和 Safari 浏览器支持相对比较差。

- Push Cache 中的缓存只能被使用一次

- 可以给其他域名推送资源

- 浏览器可以拒绝接受已经存在的资源推送

- 一旦连接被关闭，Push Cache 就被释放

- 可以推送 no-cache 和 no-store 的资源

- 多个页面可以使用同一个HTTP/2的连接，也就可以使用同一个Push Cache。这主要还是依赖浏览器的实现而定，出于对性能的考虑， 有的浏览器会对相同域名但不同的tab标签使用同一个HTTP连接。

---

## 30. Cache-Control 有哪些常见配置值？

Cache-Control的值有十几种，其中包含了请求首部可携带的和响应首部携带的。

咱们先看看 request首部 Cache-Control的值

- no-cache

当客户端请求时携带这个首部字段的时候，通过中间的缓存服务器时，会不去拿缓存资源，而是让中间服务器转发给资源服务器，资源服务器看看一下这个资源过期没有，如果没有就会告知中间服务器，可以使用缓存资源。否则资源服务器就会直接返回新的资源。

- no-store

这个字段非常有意思，就是告知服务器或者客户端以及中间服务器，我请求或者响应的内容里面有机密信息，这些响应的内容是永远不会得到响应的。

- max-age

`max-age`指令标示了客户端不愿意接收一个`age`大于设定时间的响应，这个字段表达是最大缓存时长，请求中单单添加这个字段，实现不了缓存时长，必须结合响应的max-age。一会，会在响应中的max-age 详细说明

- max-stale

这个指令表达的是缓存时长过期以后，还可以有效。比如现在max-age：60秒，那么max-stale：60秒，现在的缓存时长就是120秒，

- min-fresh

设定能够容忍的最小新鲜度（缓存时长）。`min-fresh`标示了客户端不愿意接受新鲜度不多于当前的`age`加上`min-fresh`设定的时间之和的响应。

- no-transfrom

使用 no-transform 指令规定无论是在请求还是响应中，缓存都不能改 变实体主体的媒体类型。

- only-if-cache

使用 only-if-cached 指令表示客户端仅在缓存服务器本地缓存目标资源的情况下，才会要求其返回。换言之，该指令要求缓存服务器不重新加载响应，也不会再次确认资源有效性。若发生请求缓存服务器的本 地缓存无响应，则返回状态码 504 Gateway Timeout。

- cache-extension

通过 cache-extension 标记（token），可以扩展 Cache-Control 首部字 段内的指令。

咱们再看看 response首部 Cache-Control的值

- pulic

这个字段和private是相对的，Cache-Control: public时，则表明所有的用户在通过缓存服务器的时候，都可以缓存这个资源。

- private

这个字段和pulic是相对的，Cache-Control: private时，则表明只有某个在通过缓存服务器的时候，得到缓存资源

- no-cache

如果服务器返回的响应中包含 no-cache 指令，那么缓存服务器不能对 资源进行缓存。源服务器以后也将不再对缓存服务器请求中提出的资 源有效性进行确认，且禁止其对响应资源进行缓存操作。

- no-store

同请求首部的no-store指令一样

- no-transfrom

同请求首部的no-transfrom指令一样

- max-age

在Response中设置max-age的时间信息，可以在客户端生成缓存文件，在缓存不过期的情况下，客户端不会直接向服务器请求数据，在缓存过期的情况下，客户端会向服务器直接请求生成新的缓存。

如果同时设置了Response和Request中的max-age 缓存时间，如果Request中的max-age时间小于Response中的max-age时间，客户端会根据Request中max-age时间周期去直接进行网络请求，如果碰到断网或者网络请求不通的情况，即使缓存还在有效期内（Response中设置的max-age时间足够大），在Request设置的max-age过期之后，APP也会直接去进行网络请求。 因此可以考虑在客户端的设计中一个和好的网络缓存场景，用Response的max-age控制缓存的时间，用Request中max-age控制刷新的时间和机制

应用 HTTP/1.1 版本的缓存服务器遇到同时存在 Expires 首部字段的情 况时，会优先处理 max-age 指令，而忽略掉 Expires 首部字段。而 HTTP/1.0 版本的缓存服务器的情况却相反，max-age 指令会被忽略

- s-max-age

和max-age类似，它们的不同点是 s- maxage 指令只适用于供多位用户使用的公共缓存服务器

- must-revalidate

使用 must-revalidate 指令，代理会向源服务器再次验证即将返回的响 应缓存目前是否仍然有效。

若代理无法连通源服务器再次获取有效资源的话，缓存必须给客户端 一条 504（Gateway Timeout）状态码。

另外，使用 must-revalidate 指令会忽略请求的 max-stale 指令（即使已 经在首部使用了 max-stale，也不会再有效果）。

- proxy-revalidate

proxy-revalidate 指令要求所有的缓存服务器在接收到客户端带有该指 令的请求返回响应之前，必须再次验证缓存的有效性。

- cache-extension

同请求首部的cache-extension指令一样

---

## 31. 说说对TCP/IP协议的了解

`TCP/IP`（`Transmission Control Protocol/Internet Protocol`，传输控制协议/网际协议）是指能够在多个不同网络间实现信息传输的协议簇。TCP/IP协议不仅仅指的是TCP 和IP两个协议，而是指一个由 `FTP、SMTP、TCP、UDP、IP`等协议构成的协议簇， 只是因为在TCP/IP协议中TCP协议和IP协议最具代表性，所以被称为TCP/IP协议。

TCP/IP传输协议是在网络的使用中的最基本的通信协议。TCP/IP传输协议对互联网中各部分进行通信的标准和方法进行了规定。并且，TCP/IP传输协议是保证网络数据信息及时、完整传输的两个重要的协议。TCP/IP传输协议是严格来说是一个四层的体系结构，应用层 、传输层、网络层 和 数据链路层 都包含其中。

TCP/IP通讯协议采用了4层的层级结构，每一层都呼叫它的下一层所提供的网络来完成自己的需求。这4层分别为:

- 应用层:应用程序间沟通的层，如简单电子邮件传输(SMTP)、文件传输协议(FTP)、网络远程访问协议(Telnet)等。

- 传输层:在此层中，它提供了节点间的数据传送，应用程序之间的通信服务，主要功能是数据格式化、数据确认和丢失重传等。如传输控制协议(TCP)、用户数据报协议(UDP)等，TCP和UDP给数据包加入传输数据并把它传输到下一层中，这一层负责传送数据，并且确定数据已被送达并接收。

- 网络层:负责提供基本的数据封包传送功能，让每一块数据包都能够到达目的主机(但不检查是否被正确接收)，如网际协议(IP)。

- 数据链路层(主机-网络层):接收IP数据报并进行传输，从网络上接收物理帧，抽取IP数据报转交给下一层，对实际的网络媒体的管理，定义如何使用实际网络(如Ethernet、Serial Line等)来传送数据。

---

## 32. 介绍下304过程

首先304状态码是对客户端有缓存情况下服务端的一种响应。

客户端在请求一个文件的时候，发现自己缓存的文件有 `Last Modified` ，那么在请求中会包含 `If Modified Since` ，这个时间就是缓存文件的 Last Modified 。

因此，如果请求中包含 `If Modified Since`，就说明已经有缓存在客户端。服务端只要判断这个时间和当前请求的文件的修改时间就可以确定是返回 304 还是 200 。

对于静态文件，例如：CSS、图片，服务器会自动完成 Last Modified 和 If Modified Since 的比较，完成缓存或者更新。但是对于动态页面，就是动态产生的页面，往往没有包含 Last Modified 信息，这样浏览器、网关等都不会做缓存，也就是在每次请求的时候都完成一个 200 的请求。

因此，对于动态页面做缓存加速，首先要在 Response 的 HTTP Header 中增加 Last Modified 定义，其次根据 Request 中的 `If Modified Since` 和被请求内容的更新时间来返回 200 或者 304 。虽然在返回 304 的时候已经做了一次数据库查询，但是可以避免接下来更多的数据库查询，并且没有返回页面内容而只是一个 HTTP Header，从而大大的降低带宽的消耗，对于用户的感觉也是提高。

通常来说,缓存是个好东西.如果你想提高自己网站的访问速度,缓存是必须要考虑的。可是在调试的时候,有时候需要阻止缓存,这样才能确保你所访问到的资源是最新的。

---

## 33. 301、302、303、307、308 这些状态码有什么区别？

3xx开头的状态码都表示重定向。

先说明一些版本问题， 301和302都是http1.0就定义好的，在http1.1中才新增了其余的状态码。

**301 Moved Permanently 永久重定向**

> <span style="color: rgb(36,91,219); background-color: inherit">在请求的 URL 已被移除时使用。响应的 Location 首部中应该包含 资源现在所处的 URL。</span>

默认情况下，永久重定向是会被浏览器缓存的。

**302 Found 临时重定向**

> <span style="color: rgb(36,91,219); background-color: inherit">与 301 状态码类似；但是，客户端应该使用 Location 首部给出的 URL 来临时定位资源。将来的请求仍应使用老的 URL。</span>

在浏览器的实现中，302默认以get重新发出请求。比如以post访问 a.com ,用302重定向到b.com，浏览器会使用get请求b.com。但这样就会导致之前的post请求数据丢失，相对的 307不允许修改请求方法，这也是302和307最大的区别

在[<span style="color: rgb(36,91,219); background-color: inherit">rfc1945</span>](https://tools.ietf.org/html/rfc1945) 中规定：

> <span style="color: rgb(36,91,219); background-color: inherit">If the 302 status code is received in response to a request using the POST method, the user agent must not automatically redirect the request unless it can be confirmed by the user, since this might change the conditions under which the request was issued.</span>

这段英文大意：如果对post请求返回了302状态码, 在未经用户确认的情况下不允许擅自发送请求，因为可能会修改请求条件。

在post数据量大的情况下从post改为get，肯定会丢失很多参数。但是很多浏览器都是以get方式重定向的，所以在后来的[<span style="color: rgb(36,91,219); background-color: inherit">rfc7231</span>](https://tools.ietf.org/html/rfc7231#section-6.4.4) 中取消了这一段强制要求，并将此要求放在了307状态码中。

**303 See Other 临时重定向**

303 是为了区分302而存在的。

> <span style="color: rgb(36,91,219); background-color: inherit">维基百科:</span>
> <span style="color: rgb(36,91,219); background-color: inherit">虽然 </span>[<span style="color: rgb(36,91,219); background-color: inherit">RFC 1945</span>](https://tools.ietf.org/html/rfc1945)<span style="color: rgb(36,91,219); background-color: inherit"> 和 </span>[<span style="color: rgb(36,91,219); background-color: inherit">RFC 2068</span>](https://tools.ietf.org/html/rfc2068)<span style="color: rgb(36,91,219); background-color: inherit"> 规范不允许客户端在重定向时改变请求的方法，但是很多现存的浏览器在收到302响应时，直接使用GET方式访问在Location中规定的URI，而无视原先请求的方法。因此状态码303被添加了进来，用以明确服务器期待客户端进行何种反应。
> </span> <span style="color: rgb(36,91,219); background-color: inherit">重定向到新地址时，客户端必须使用GET方法请求新地址。</span>

**307 Temporary Redirect**

这个状态码和302相似，有一个唯一的区别是不允许将请求方法从post改为get。

在[<span style="color: rgb(36,91,219); background-color: inherit">rfc7231</span>](https://tools.ietf.org/html/rfc7231#section-6.4.4)的原话如下：

> <span style="color: rgb(36,91,219); background-color: inherit">Note: This status code is similar to 302 (Found), except that it does not allow changing the request method from POST to GET</span>

**308 Permanent Redirect 永久重定向**

[<span style="color: rgb(36,91,219); background-color: inherit">rfc7538</span>](https://tools.ietf.org/html/rfc7538) 新增的状态码

> <span style="color: rgb(36,91,219); background-color: inherit">此状态码类似于301（永久移动），但不允许更改从POST到GET的请求方法。</span>

308是307的永久版本，和307是一对

**来个总结：**

永久重定向有两个： 301和308。

- 两者都默认缓存，

- 但是308不允许将请求方法从POST修改到GET, 301允许。

临时重定向三个：302，303，307

- 303强制浏览器可以将请求方法从POST修改到GET

- 307不允许浏览器修改请求方法。

- 302一开始的标准是不允许修改POST方法，但是浏览器的实现不遵循标准，标准就向现实妥协而做了修改。

另外，关于默认缓存的响应头：

> <span style="color: rgb(36,91,219); background-color: inherit">Responses with status codes that are defined as cacheable by default (e.g., 200, 203, 204, 206, 300, 301, 404, 405, 410, 414, and 501 in this specification) can be reused by a cache with heuristic expiration unless otherwise indicated by the method definition or explicit cache controls all other status codes are not cacheable by default.</span>

这一段是在rfc7231中说明的，在 rfc7538又说明了 308是默认缓存的。

---

## 34. 如何理解 HTTP 代理？

我们知道在 HTTP 是基于`请求-响应`模型的协议，一般由客户端发请求，服务器来进行响应。

当然，也有特殊情况，就是代理服务器的情况。引入代理之后，作为代理的服务器相当于一个中间人的角色，对于客户端而言，表现为服务器进行响应；而对于源服务器，表现为客户端发起请求，具有`双重身份`。

那代理服务器到底是用来做什么的呢？

**功能**

- `负载均衡`。客户端的请求只会先到达代理服务器，后面到底有多少源服务器，IP 都是多少，客户端是不知道的。因此，这个代理服务器可以拿到这个请求之后，可以通过特定的算法分发给不同的源服务器，让各台源服务器的负载尽量平均。当然，这样的算法有很多，包括`随机算法`、`轮询`、`一致性hash`、`LRU``(最近最少使用)`等等，不过这些算法并不是本文的重点，大家有兴趣自己可以研究一下。

- `保障安全`。利用`心跳`机制监控后台的服务器，一旦发现故障机就将其踢出集群。并且对于上下行的数据进行过滤，对非法 IP 限流，这些都是代理服务器的工作。

- `缓存代理`。将内容缓存到代理服务器，使得客户端可以直接从代理服务器获得而不用到源服务器那里。下一节详细拆解。

**相关头部字段**

**Via**

代理服务器需要标明自己的身份，在 HTTP 传输中留下自己的痕迹，怎么办呢？

通过`Via`字段来记录。举个例子，现在中间有两台代理服务器，在客户端发送请求后会经历这样一个过程:

```plaintext
客户端 -> 代理1 -> 代理2 -> 源服务器
```

在源服务器收到请求后，会在`请求头`拿到这个字段:

```plaintext
Via: proxy_server1, proxy_server2
```

而源服务器响应时，最终在客户端会拿到这样的`响应头`:

```plaintext
Via: proxy_server2, proxy_server1
```

可以看到，`Via`中代理的顺序即为在 HTTP 传输中报文传达的顺序。

**X-Forwarded-For**

字面意思就是`为谁转发`, 它记录的是`请求方`的`IP`地址(注意，和`Via`区分开，`X-Forwarded-For`记录的是请求方这一个IP)。

**X-Real-IP**

是一种获取用户真实 IP 的字段，不管中间经过多少代理，这个字段始终记录最初的客户端的IP。

相应的，还有`X-Forwarded-Host`和`X-Forwarded-Proto`，分别记录`客户端`(注意哦，不包括代理)的`域名`和`协议名`。

**X-Forwarded-For产生的问题**

前面可以看到，`X-Forwarded-For`这个字段记录的是请求方的 IP，这意味着每经过一个不同的代理，这个字段的名字都要变，从`客户端`到`代理1`，这个字段是客户端的 IP，从`代理1`到`代理2`，这个字段就变为了代理1的 IP。

但是这会产生两个问题:

- 意味着代理必须解析 HTTP 请求头，然后修改，比直接转发数据性能下降。

- 在 HTTPS 通信加密的过程中，原始报文是不允许修改的。

由此产生了`代理协议`，一般使用明文版本，只需要在 HTTP 请求行上面加上这样格式的文本即可:

```plaintext
// PROXY + TCP4/TCP6 + 请求方地址 + 接收方地址 + 请求端口 + 接收端口
PROXY TCP4 1 2 1111 2222
GET / HTTP/1
...
```

这样就可以解决`X-Forwarded-For`带来的问题了。

---

## 35. 说说你对cookie的理解

**Cookie 简介**

HTTP 是一个无状态的协议，每次 http 请求都是独立、无关的，默认不需要保留状态信息。但有时候需要保存一些状态，怎么办呢？

HTTP 为此引入了 Cookie。Cookie 本质上就是浏览器里面存储的一个很小的文本文件，内部以键值对的方式来存储(在chrome开发者面板的Application这一栏可以看到)。向同一个域名下发送请求，都会携带相同的 Cookie，服务器拿到 Cookie 进行解析，便能拿到客户端的状态。而服务端可以通过响应头中的`Set-Cookie`字段来对客户端写入`Cookie`。举例如下:

```plaintext
// 请求头
Cookie: a=xxx;b=xxx
// 响应头
Set-Cookie: a=xxx
set-Cookie: b=xxx
```

**Cookie 属性**

**生存周期**

Cookie 的有效期可以通过`Expires`和`Max-Age`两个属性来设置。

- `Expires`即`过期时间`

- `Max-Age`用的是一段时间间隔，单位是秒，从浏览器收到报文开始计算。

若 Cookie 过期，则这个 Cookie 会被删除，并不会发送给服务端。

**作用域**

关于作用域也有两个属性: `Domain`和`path`, 给 `Cookie` 绑定了域名和路径，在发送请求之前，发现域名或者路径和这两个属性不匹配，那么就不会带上 Cookie。值得注意的是，对于路径来说，`/`表示域名下的任意路径都允许使用 Cookie。

**安全相关**

如果带上`Secure`，说明只能通过 HTTPS 传输 cookie。

如果 cookie 字段带上`HttpOnly`，那么说明只能通过 HTTP 协议传输，不能通过 JS 访问，这也是预防 XSS 攻击的重要手段。

相应的，对于 CSRF 攻击的预防，也有`SameSite`属性。

`SameSite`可以设置为三个值，`Strict`、`Lax`和`None`。

- 在`Strict`模式下，浏览器完全禁止第三方请求携带Cookie。比如请求`sanyuan.com`网站只能在`sanyuan.com`域名当中请求才能携带 Cookie，在其他网站请求都不能。

- 在`Lax`模式，就宽松一点了，但是只能在 `get 方法提交表单`况或者`a 标签发送 get 请求`的情况下可以携带 Cookie，其他情况均不能。

- 在`None`模式下，也就是默认模式，请求会自动携带上 Cookie。

**Cookie 的缺点**

- 容量缺陷。Cookie 的体积上限只有`4KB`，只能用来存储少量的信息。

- 性能缺陷。Cookie 紧跟域名，不管域名下面的某一个地址需不需要这个 Cookie ，请求都会携带上完整的 Cookie，这样随着请求数的增多，其实会造成巨大的性能浪费的，因为请求携带了很多不必要的内容。但可以通过`Domain`和`Path`指定`作用域`来解决。

- 安全缺陷。由于 Cookie 以纯文本的形式在浏览器和服务器中传递，很容易被非法用户截获，然后进行一系列的篡改，在 Cookie 的有效期内重新发送给服务器，这是相当危险的。另外，在`HttpOnly`为 false 的情况下，Cookie 信息能直接通过 JS 脚本来读取。

---

## 36. HTTP1.1 中如何解决 HTTP 的队头阻塞问题？

**什么是 HTTP 队头阻塞？**

HTTP 传输是基于`请求-应答`的模式进行的，报文必须是一发一收，但值得注意的是，里面的任务被放在一个任务队列中串行执行，一旦队首的请求处理太慢，就会阻塞后面请求的处理。这就是著名的 HTTP队头阻塞 问题。

**并发连接**

对于一个域名允许分配多个长连接，那么相当于增加了任务队列，不至于一个队伍的任务阻塞其它所有任务。在RFC2616规定过客户端最多并发 2 个连接，不过事实上在现在的浏览器标准中，这个上限要多很多，Chrome 中是 6 个。

但其实，即使是提高了并发连接，还是不能满足人们对性能的需求。

**域名分片**

一个域名不是可以并发 6 个长连接吗？那我就多分几个域名。

比如 static1.test.com 、static2.test.com。

这样一个 test.com 域名下可以分出非常多的二级域名，而它们都指向同样的一台服务器，能够并发的长连接数更多了，事实上也更好地解决了队头阻塞的问题。

---

## 37. HTTP 中如何处理表单数据的提交？

在 http 中，有两种主要的表单提交的方式，体现在两种不同的Content-Type取值:

- application/x-www-form-urlencoded

- multipart/form-data

由于表单提交一般是POST请求，很少考虑GET，因此这里我们将默认提交的数据放在请求体中。

application/x-www-form-urlencoded

**对于`application/x-www-form-urlencoded`格式的表单内容，有以下特点:**

- 其中的数据会被编码成以&分隔的键值对

- 字符以URL编码方式编码。

如：

```plaintext
// 转换过程: {a: 1, b: 2} -> a=1&b=2 -> 如下(最终形式)
"a%3D1%26b%3D2"
```

**multipart/form-data**

对于 `multipart/form-data` 而言:

- 请求头中的 `Content-Type` 字段会包含 `boundary` ，且 `boundary` 的值有浏览器默认指定。例: `Content-Type: multipart/form-data;boundary=----WebkitFormBoundaryRRJKeWfHPGrS4LKe`。

- 数据会分为多个部分，每两个部分之间通过分隔符来分隔，每部分表述均有 HTTP 头部描述子包体，如Content-Type，在最后的分隔符会加上--表示结束。

相应的请求体是下面这样:

```plaintext
Content-Disposition: form-data;name="data1";
Content-Type: text/plain
data1
----WebkitFormBoundaryRRJKeWfHPGrS4LKe
Content-Disposition: form-data;name="data2";
Content-Type: text/plain
data2
----WebkitFormBoundaryRRJKeWfHPGrS4LKe--
```

**小结**

值得一提的是，`multipart/form-data` 格式最大的特点在于:每一个表单元素都是独立的资源表述。另外，你可能在写业务的过程中，并没有注意到其中还有boundary的存在，如果你打开抓包工具，确实可以看到不同的表单元素被拆分开了，之所以在平时感觉不到，是以为浏览器和 HTTP 给你封装了这一系列操作。

而且，在实际的场景中，对于图片等文件的上传，基本采用`multipart/form-data`而不用`application/x-www-form-urlencoded`，因为没有必要做 URL 编码，带来巨大耗时的同时，也占用了更多的空间。

---

## 38. 对于定长和不定长的数据，HTTP 是怎么传输的？

**定长包体**

对于定长包体而言，发送端在传输的时候一般会带上 `Content-Length`，来指明包体的长度。

**不定长包体**

介绍另外一个 http 头部字段：`Transfer-Encoding: chunked`。

表示分块传输数据，设置这个字段后会自动产生两个效果:

- Content-Length 字段会被忽略

- 基于长连接持续推送动态内容

---

## 39. 为什么说HTTP是无状态的协议？

因为它的每个请求都是完全独立的，每个请求包含了处理这个请求所需的完整的数据。

无状态协议是指协议对务处理没有记忆能力。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的数据量增大。另一方面，在服务器不需要先前信息时它的应答就较快。 Http协议不像建立了socket连接的两个终端，双方是可以互相通信的，http的客户端只能通过请求服务器来获取相关内容或文件信息。

http协议这种特性有优点也有缺点，优点在于解放了服务器，每一次请求“点到为止”不会造成不必要连接占用，缺点在于每次请求会传输大量重复的内容信息。

在同一个连接允许传输多个HTTP请求的情况下，如果第一个请求出错了，后面的请求一般也能够继续处理（当然，如果导致协议解析失败、消息分片错误之类的自然是要除外的）可以看出，这种协议的结构是要比有状态的协议更简单的。

---

## 40. get 和 post 请求在缓存方面有什么区别？

缓存一般只适用于那些不会更新服务端数据的请求。

一般 get 请求都是查找请求，不会对服务器资源数据造成修改，而 post 请求一般都会对服务器数据造成修改，所以，一般会对 get 请求进行缓存，很少会对 post 请求进行缓存。

---

## 41. get 请求是否限制了传参长度？

1. HTTP 协议未规定 GET 和 POST 的长度限制

2. GET 的最大长度显示是因为浏览器和 web 服务器限制了 URI 的长度

3. 不同的浏览器和 WEB 服务器，限制的最大长度不一样

4. 要支持 IE，则最大长度为 2083byte，若只支持 Chrome，则最大长度 8182byte

---

## 42. 协商缓存中，有了 Last-Modified，为什么还会出现 ETag？

ETag的出现，主要是为了解决 Last-Modified 无法解决的一些问题：

- 某些服务器不能精确得到文件的最后修改时间， 这样就无法通过最后修改时间来判断文件是否更新了。

- 某些文件的修改非常频繁，在秒以下的时间内进行修改. Last-Modified只能精确到秒。

- 一些文件的最后修改时间改变了，但是内容并未改变。 我们不希望客户端认为这个文件修改了。

---

## 43. Nginx支持哪些负载均衡调度算法？

- weight轮询（默认，常用，具有HA功效！）：接收到的请求按照权重分配到不同的后端服务器，即使在使用过程中，某一台后端服务器宕机，Nginx会自动将该服务器剔除出队列，请求受理情况不会受到任何影响。 这种方式下，可以给不同的后端服务器设置一个权重值(weight)，用于调整不同的服务器上请求的分配率；权重数据越大，被分配到请求的几率越大；该权重值，主要是针对实际工作环境中不同的后端服务器硬件配置进行调整的。

- ip_hash（常用）：每个请求按访问ip的hash结果分配，这样每个访客固定访问一个后端服务器，这也在一定程度上解决了集群部署环境下session共享的问题。

- fair：智能调整调度算法，动态的根据后端服务器的请求处理到响应的时间进行均衡分配，响应时间短处理效率高的服务器分配到请求的概率高，响应时间长处理效率低的服务器分配到的请求少；结合了前两者的优点的一种调度算法。但是需要注意的是Nginx默认不支持fair算法，如果要使用这种调度算法，请安装upstream_fair模块。

- url_hash：按照访问的url的hash结果分配请求，每个请求的url会指向后端固定的某个服务器，可以在Nginx作为静态服务器的情况下提高缓存效率。同样要注意Nginx默认不支持这种调度算法，要使用的话需要安装Nginx的hash软件包。

---

## 44. 什么是负载均衡？

客户端发送的、Nginx反向代理服务器接收到的请求数量，就是我们说的负载量。请求数量按照一定的规则进行分发到不同的服务器处理的规则，就是一种均衡规则。将服务器接收到的请求按照规则分发的过程，称为负载均衡。

负载均衡在实际项目操作过程中，有硬件负载均衡和软件负载均衡两种。

- 硬件负载均衡也称为硬负载，如F5负载均衡，相对造价昂贵成本较高，但是数据的稳定性安全性等等有非常好的保障，如中国移动、中国联通这样的公司才会选择硬负载进行操作；

- 更多的公司考虑到成本原因，会选择使用软件负载均衡，软件负载均衡是利用现有的技术结合主机硬件实现的一种消息队列分发机制。

---

## 45. 正向代理和反向代理分别是什么？

说到代理，首先我们要明确一个概念，所谓代理就是一个代表、一个渠道；

此时就涉及到两个角色，一个是被代理角色，一个是目标角色，被代理角色通过这个代理访问目标角色完成一些任务的过程称为代理操作过程；如同生活中的专卖店\~客人到adidas专卖店买了一双鞋，这个专卖店就是代理，被代理角色就是adidas厂家，目标角色就是用户。

**正向代理**

正向代理也是大家最常接触的到的代理模式。

在如今的网络环境下，我们如果由于技术需要要去访问国外的某些网站，此时你会发现位于国外的某网站我们通过浏览器是没有办法访问的，此时大家可能都会用一个代理工具进行访问，这个代理工具就是找到一个可以访问国外网站的代理服务器，我们将请求发送给代理服务器，代理服务器去访问国外的网站，然后将访问到的数据传递给我们！

上述这样的代理模式称为正向代理，正向代理最大的特点是客户端非常明确要访问的服务器地址；服务器只清楚请求来自哪个代理服务器，而不清楚来自哪个具体的客户端；正向代理模式屏蔽或者隐藏了真实客户端信息。

总结来说：正向代理，"它代理的是客户端，代客户端发出请求"，是一个位于客户端和原始服务器(origin server)之间的服务器，为了从原始服务器取得内容，客户端向代理发送一个请求并指定目标(原始服务器)，然后代理向原始服务器转交请求并将获得的内容返回给客户端。客户端必须要进行一些特别的设置才能使用正向代理。

正向代理的用途：

- 访问原来无法访问的资源，如Google

- 可以做缓存，加速访问资源

- 对客户端访问授权，上网进行认证

- 代理可以记录用户访问记录（上网行为管理），对外隐藏用户信息

**反向代理**

明白了什么是正向代理，我们继续看关于反向代理的处理方式。

例如某宝网站，每天同时连接到网站的访问人数已经爆表，单个服务器远远不能满足人民日益增长的购买欲望了，此时就出现了一个大家耳熟能详的名词：分布式部署；

也就是通过部署多台服务器来解决访问人数限制的问题；某宝网站中大部分功能也是直接使用Nginx进行反向代理实现的，并且通过封装Nginx和其他的组件之后起了个高大上的名字：Tengine，有兴趣的童鞋可以访问Tengine的官网查看具体的信息：[<span style="color: rgb(36,91,219); background-color: inherit">http://tengine.taobao.org/</span> <span style="color: rgb(36,91,219); background-color: inherit">。</span>](http://tengine.taobao.org/%E3%80%82)

多个客户端给服务器发送的请求，Nginx服务器接收到之后，按照一定的规则分发给了后端的业务处理服务器进行处理了。此时，请求的来源（也就是客户端）是明确的，但是请求具体由哪台服务器处理的并不明确了，Nginx扮演的就是一个反向代理角色。

客户端是无感知代理的存在的，反向代理对外都是透明的，访问者并不知道自己访问的是一个代理。因为客户端不需要任何配置就可以访问。

反向代理，"它代理的是服务端，代服务端接收请求"，主要用于服务器集群分布式部署的情况下，反向代理隐藏了服务器的信息。

反向代理的作用：

- 保证内网的安全，通常将反向代理作为公网访问地址，Web服务器是内网

- 负载均衡，通过反向代理服务器来优化网站的负载

---

## 46. nginx是什么？

**Nginx的产生**

没有听过Nginx？那么一定听过它的"同行"Apache吧！Nginx同Apache一样都是一种WEB服务器，基于REST架构风格，以统一资源描述符(Uniform Resources Identifier)URI或者统一资源定位符(Uniform Resources Locator)URL作为沟通依据，通过HTTP协议提供各种网络服务。

然而，这些服务器在设计之初受到当时环境的局限，例如当时的用户规模，网络带宽，产品特点等局限并且各自的定位和发展都不尽相同。这也使得各个WEB服务器有着各自鲜明的特点。

Apache的发展时期很长，而且是毫无争议的世界第一大服务器。它有着很多优点：稳定、开源、跨平台等等。它出现的时间太长了，它兴起的年代，互联网产业远远比不上现在。所以它被设计为一个重量级的。它是不支持高并发的服务器。在Apache上运行数以万计的并发访问，会导致服务器消耗大量内存。操作系统对其进行进程或线程间的切换也消耗了大量的CPU资源，导致HTTP请求的平均响应速度降低。

这些都决定了Apache不可能成为高性能WEB服务器，轻量级高并发服务器Nginx就应运而生了。

俄罗斯的工程师Igor Sysoev，他在为Rambler Media工作期间，使用C语言开发了Nginx。Nginx作为WEB服务器一直为Rambler Media提供出色而又稳定的服务。然后呢，Igor Sysoev将Nginx代码开源，并且赋予自由软件许可证。

**Nginx的用途**

Nginx是一款自由的、开源的、高性能的HTTP服务器和反向代理服务器；同时也是一个IMAP、POP3、SMTP代理服务器；Nginx可以作为一个HTTP服务器进行网站的发布处理，另外Nginx可以作为反向代理进行负载均衡的实现。

---

## 47. 为什么部分请求中，参数需要使用 encodeURIComponent 进行转码？

一般来说，URL只能使用英文字母、阿拉伯数字和某些标点符号，不能使用其他文字和符号。

这是因为网络标准RFC 1738做了硬性规定：

> <span style="color: rgb(36,91,219); background-color: inherit">&quot;...Only alphanumerics [0-9a-zA-Z], the special characters &quot;$-\_.+!\*&#39;(),&quot; [not including the quotes - ed], and reserved characters used for their reserved purposes may be used unencoded within a URL.&quot;</span>

这意味着，如果URL中有汉字，就必须编码后使用。但是麻烦的是，RFC 1738没有规定具体的编码方法，而是交给应用程序（浏览器）自己决定。这导致"URL编码"成为了一个混乱的领域。

不同的操作系统、不同的浏览器、不同的网页字符集，将导致完全不同的编码结果。如果程序员要把每一种结果都考虑进去，是不是太恐怖了？有没有办法，能够保证客户端只用一种编码方法向服务器发出请求？

就是使用Javascript先对URL编码，然后再向服务器提交，不要给浏览器插手的机会。因为Javascript的输出总是一致的，所以就保证了服务器得到的数据是格式统一的。

Javascript语言用于编码的函数，一共有三个，最古老的一个就是escape()。虽然这个函数现在已经不提倡使用了，但是由于历史原因，很多地方还在使用它，所以有必要先从它讲起。

它的具体规则是，除了ASCII字母、数字、标点符号"@ \* \_ + - . /"以外，对其他所有字符进行编码。

encodeURI()是Javascript中真正用来对URL编码的函数。

它着眼于对整个URL进行编码，因此除了常见的符号以外，对其他一些在网址中有特殊含义的符号"; / ? : @ & = + $ , #"，也不进行编码。编码后，它输出符号的utf-8形式，并且在每个字节前加上%。

最后一个Javascript编码函数是encodeURIComponent()。与encodeURI()的区别是，它用于对URL的组成部分进行个别编码，而不用于对整个URL进行编码。

因此，"; / ? : @ & = + $ , #"，这些在encodeURI()中不被编码的符号，在encodeURIComponent()中统统会被编码。至于具体的编码方法，两者是一样。

它对应的解码函数是decodeURIComponent()。

---

## 48. WebSocket 中的心跳是为了解决什么问题？

- 为了定时发送消息，使连接不超时自动断线，避免后端设了超时时间自动断线。所以需要定时发送消息给后端，让后端服务器知道连接还在通消息不能断。

- 为了检测在正常连接的状态下，后端是否正常。如果我们发了一个定时检测给后端，后端按照约定要下发一个检测消息给前端，这样才是正常的。如果后端没有正常下发，就要根据设定的超时进行重连。

---

## 49. 说说对 WebSocket 的了解

**什么是WebSocket**

HTML5开始提供的一种浏览器与服务器进行全双工通讯的网络技术，属于应用层协议。它基于TCP传输协议，并复用HTTP的握手通道。

**优点**

说到优点，这里的对比参照物是HTTP协议，概括地说就是：支持双向通信，更灵活，更高效，可扩展性更好。

- 支持双向通信，实时性更强。

- 更好的二进制支持。

- 较少的控制开销。连接创建后，ws客户端、服务端进行数据交换时，协议控制的数据包头部较小。在不包含头部的情况下，服务端到客户端的包头只有2\~10字节（取决于数据包长度），客户端到服务端的的话，需要加上额外的4字节的掩码。而HTTP协议每次通信都需要携带完整的头部。

- 支持扩展。ws协议定义了扩展，用户可以扩展协议，或者实现自定义的子协议。（比如支持自定义压缩算法等）

---

## 50. 简单说下你对 HTTP2 的理解

**HTTP/1.1 存在的问题**

- TCP 连接数限制

对于同一个域名，浏览器最多只能同时创建 6\~8 个 TCP 连接 (不同浏览器不一样)。为了解决数量限制，出现了 域名分片 技术，其实就是资源分域，将资源放在不同域名下 (比如二级子域名下)，这样就可以针对不同域名创建连接并请求，以一种讨巧的方式突破限制，但是滥用此技术也会造成很多问题，比如每个 TCP 连接本身需要经过 DNS 查询、三步握手、慢启动等，还占用额外的 CPU 和内存，对于服务器来说过多连接也容易造成网络拥挤、交通阻塞等，对于移动端来说问题更明显。

- 线头阻塞 (Head Of Line Blocking) 问题

每个 TCP 连接同时只能处理一个请求 - 响应，浏览器按 FIFO 原则处理请求，如果上一个响应没返回，后续请求 - 响应都会受阻。为了解决此问题，出现了 管线化 - pipelining 技术，但是管线化存在诸多问题，比如第一个响应慢还是会阻塞后续响应、服务器为了按序返回相应需要缓存多个响应占用更多资源、浏览器中途断连重试服务器可能得重新处理多个请求、还有必须客户端 - 代理 - 服务器都支持管线化。

- Header 内容多，而且每次请求 Header 不会变化太多，没有相应的压缩传输优化方案

- 为了尽可能减少请求数，需要做合并文件、雪碧图、资源内联等优化工作，但是这无疑造成了单个请求内容变大延迟变高的问题，且内嵌的资源不能有效地使用缓存机制

- 明文传输不安全

HTTP2 的优势

二进制分帧层 (Binary Framing Layer)

帧是数据传输的最小单位，以二进制传输代替原本的明文传输，原本的报文消息被划分为更小的数据帧。

**多路复用 (MultiPlexing)**

在一个 TCP 连接上，我们可以向对方不断发送帧，每帧的 stream identifier 的标明这一帧属于哪个流，然后在对方接收时，根据 stream identifier 拼接每个流的所有帧组成一整块数据。

把 HTTP/1.1 每个请求都当作一个流，那么多个请求变成多个流，请求响应数据分成多个帧，不同流中的帧交错地发送给对方，这就是 HTTP/2 中的多路复用。

流的概念实现了单连接上多请求 - 响应并行，解决了线头阻塞的问题，减少了 TCP 连接数量和 TCP 连接慢启动造成的问题 所以 http2 对于同一域名只需要创建一个连接，而不是像 http/1.1 那样创建 6\~8 个连接。

**服务端推送 (Server Push)**

浏览器发送一个请求，服务器主动向浏览器推送与这个请求相关的资源，这样浏览器就不用发起后续请求。 Server-Push 主要是针对资源内联做出的优化，相较于 http/1.1 资源内联的优势:

- 客户端可以缓存推送的资源

- 客户端可以拒收推送过来的资源

- 推送资源可以由不同页面共享

- 服务器可以按照优先级推送资源

**Header 压缩 (HPACK)**

使用 HPACK 算法来压缩首部内容

**应用层的重置连接**

对于 HTTP/1 来说，是通过设置 tcp segment 里的 reset flag 来通知对端关闭连接的。这种方式会直接断开连接，下次再发请求就必须重新建立连接。HTTP/2 引入 RST_STREAM 类型的 frame，可以在不断开连接的前提下取消某个 request 的 stream，表现更好。

**请求优先级设置**

HTTP/2 里的每个 stream 都可以设置依赖 (Dependency) 和权重，可以按依赖树分配优先级，解决了关键请求被阻塞的问题

**流量控制**

每个 http2 流都拥有自己的公示的流量窗口，它可以限制另一端发送数据。对于每个流来说，两端都必须告诉对方自己还有足够的空间来处理新的数据，而在该窗口被扩大前，另一端只被允许发送这么多数据。

**HTTP/1 的几种优化可以弃用**

合并文件、内联资源、雪碧图、域名分片对于 HTTP/2 来说是不必要的，使用 h2 尽可能将资源细粒化，文件分解地尽可能散，不用担心请求数多

---

## 51. 强缓存和协商缓存分别是什么？

这里说的缓存是指浏览器（客户端）在本地磁盘中对访问过的资源保存的副本文件。

浏览器缓存主要有以下几个优点：

- 减少重复数据请求，避免通过网络再次加载资源，节省流量。

- 降低服务器的压力，提升网站性能。

- 加快客户端加载网页的速度， 提升用户体验。

浏览器缓存分为强缓存和协商缓存，两者有两个比较明显的区别：

- 如果浏览器命中强缓存，则不需要给服务器发请求；而协商缓存最终由服务器来决定是否使用缓存，即客户端与服务器之间存在一次通信。

- 在 chrome 中强缓存（虽然没有发出真实的 http 请求）的请求状态码返回是 200 (from cache)；而协商缓存如果命中走缓存的话，请求的状态码是 304 (not modified)。 不同浏览器的策略不同，在 Fire Fox中，from cache 状态码是 304.

**请求流程**

浏览器在第一次请求后缓存资源，再次请求时，会进行下面两个步骤：

- 浏览器会获取该缓存资源的 header 中的信息，根据 response header 中的 expires 和 cache-control 来判断是否命中强缓存，如果命中则直接从缓存中获取资源。

- 如果没有命中强缓存，浏览器就会发送请求到服务器，这次请求会带上 IF-Modified-Since 或者 IF-None-Match, 它们的值分别是第一次请求返回 Last-Modified或者 Etag，由服务器来对比这一对字段来判断是否命中。如果命中，则服务器返回 304 状态码，并且不会返回资源内容，浏览器会直接从缓存获取；否则服务器最终会返回资源的实际内容，并更新 header 中的相关缓存字段。

**强缓存**

强缓存是根据返回头中的 Expires 或者 Cache-Control 两个字段来控制的，都是表示资源的缓存有效时间。

- Expires 是 http 1.0 的规范，值是一个GMT 格式的时间点字符串，比如 Expires:Mon,18 Oct 2066 23:59:59 GMT 。这个时间点代表资源失效的时间，如果当前的时间戳在这个时间之前，则判定命中缓存。有一个缺点是，失效时间是一个绝对时间，如果服务器时间与客户端时间偏差较大时，就会导致缓存混乱。而服务器的时间跟用户的实际时间是不一样是很正常的，所以 Expires 在实际使用中会带来一些麻烦。

- Cache-Control这个字段是 http 1.1 的规范，一般常用该字段的 max-age 值来进行判断，它是一个相对时间，比如 .Cache-Control:max-age=3600 代表资源的有效期是 3600 秒。并且返回头中的 Date 表示消息发送的时间，表示当前资源在 Date \~ Date +3600s 这段时间里都是有效的。不过我在实际使用中常常遇到设置了 max-age 之后，在 max-age 时间内重新访问资源却会返回 304 not modified ，这是由于服务器的时间与本地的时间不同造成的。当然 Cache-Control 还有其他几个值可以设置， 不过相对来说都很少用了：

  - no-cache 不使用本地缓存。需要使用协商缓存。

  - no-store直接禁止浏览器缓存数据，每次请求资源都会向服务器要完整的资源， 类似于 network 中的 disabled cache。

  - public 可以被所有用户缓存，包括终端用户和 cdn 等中间件代理服务器。

  - private 只能被终端用户的浏览器缓存。

如果 Cache-Control与 Expires 同时存在的话， Cache-Control 的优先级高于 Expires 。

**协商缓存**

协商缓存是由服务器来确定缓存资源是否可用。 主要涉及到两对属性字段，都是成对出现的，即第一次请求的响应头带上某个字, Last-Modified 或者 Etag，则后续请求则会带上对应的请求字段 If-Modified-Since或者 If-None-Match，若响应头没有 Last-Modified 或者 Etag 字段，则请求头也不会有对应的字段。

- Last-Modified/If-Modified-Since 二者的值都是 GMT 格式的时间字符串， Last-Modified 标记最后文件修改时间， 下一次请求时，请求头中会带上 If-Modified-Since 值就是 Last-Modified 告诉服务器我本地缓存的文件最后修改的时间，在服务器上根据文件的最后修改时间判断资源是否有变化， 如果文件没有变更则返回 304 Not Modified ，请求不会返回资源内容，浏览器直接使用本地缓存。当服务器返回 304 Not Modified 的响应时，response header 中不会再添加的 Last-Modified 去试图更新本地缓存的 Last-Modified， 因为既然资源没有变化，那么 Last-Modified 也就不会改变；如果资源有变化，就正常返回返回资源内容，新的 Last-Modified 会在 response header 返回，并在下次请求之前更新本地缓存的 Last-Modified，下次请求时，If-Modified-Since会启用更新后的 Last-Modified。

- Etag/If-None-Match， 值都是由服务器为每一个资源生成的唯一标识串，只要资源有变化就这个值就会改变。服务器根据文件本身算出一个哈希值并通过 ETag字段返回给浏览器，接收到 If-None-Match 字段以后，服务器通过比较两者是否一致来判定文件内容是否被改变。与 Last-Modified 不一样的是，当服务器返回 304 Not Modified 的响应时，由于在服务器上ETag 重新计算过，response header中还会把这个 ETag 返回，即使这个 ETag 跟之前的没有变化。

HTTP 中并没有指定如何生成 ETag，可以由开发者自行生成，哈希是比较理想的选择。

---

## 52. Http 缓存策略，有什么区别，分别解决了什么问题

1）浏览器缓存策略

浏览器每次发起请求时，先在本地缓存中查找结果以及缓存标识，根据缓存标识来判断是否使用本地缓存。如果缓存有效，则使

用本地缓存；否则，则向服务器发起请求并携带缓存标识。根据是否需向服务器发起HTTP请求，将缓存过程划分为两个部分：

强制缓存和协商缓存，强缓优先于协商缓存。

- 强缓存，服务器通知浏览器一个缓存时间，在缓存时间内，下次请求，直接用缓存，不在时间内，执行比较缓存策略。

- 协商缓存，让客户端与服务器之间能实现缓存文件是否更新的验证、提升缓存的复用率，将缓存信息中的Etag和Last-Modified
  通过请求发送给服务器，由服务器校验，返回304状态码时，浏览器直接使用缓存。

HTTP缓存都是从第二次请求开始的：

- 第一次请求资源时，服务器返回资源，并在response header中回传资源的缓存策略；

- 第二次请求时，浏览器判断这些请求参数，击中强缓存就直接200，否则就把请求参数加到request header头中传给服务器，看是否击中协商缓存，击中则返回304，否则服务器会返回新的资源。这是缓存运作的一个整体流程图：

2）强缓存

- 强缓存命中则直接读取浏览器本地的资源，在network中显示的是from memory或者from disk

- 控制强制缓存的字段有：Cache-Control（http1.1）和Expires（http1.0）

- Cache-control是一个相对时间，用以表达自上次请求正确的资源之后的多少秒的时间段内缓存有效。

- Expires是一个绝对时间。用以表达在这个时间点之前发起请求可以直接从浏览器中读取数据，而无需发起请求

- Cache-Control的优先级比Expires的优先级高。前者的出现是为了解决Expires在浏览器时间被手动更改导致缓存判断错误的问题。
  如果同时存在则使用Cache-control。

3）强缓存-expires

- 该字段是服务器响应消息头字段，告诉浏览器在过期时间之前可以直接从浏览器缓存中存取数据。

- Expires 是 HTTP 1.0 的字段，表示缓存到期时间，是一个绝对的时间 (当前时间+缓存时间)。在响应消息头中，设置这个字段之后，就可以告诉浏览器，在未过期之前不需要再次请求。

- 由于是绝对时间，用户可能会将客户端本地的时间进行修改，而导致浏览器判断缓存失效，重新请求该资源。此外，即使不考虑修改，时差或者误差等因素也可能造成客户端与服务端的时间不一致，致使缓存失效。

- 优势特点

  - 1、HTTP 1.0 产物，可以在HTTP 1.0和1.1中使用，简单易用。

  - 2、以时刻标识失效时间。

- 劣势问题

  - 1、时间是由服务器发送的(UTC)，如果服务器时间和客户端时间存在不一致，可能会出现问题。

  - 2、存在版本问题，到期之前的修改客户端是不可知的。

4）强缓存-cache-control

- 已知Expires的缺点之后，在HTTP/1.1中，增加了一个字段Cache-control，该字段表示资源缓存的最大有效时间，在该时间内，客户端不需要向服务器发送请求。

- 这两者的区别就是前者是绝对时间，而后者是相对时间。下面列举一些 `Cache-control` 字段常用的值：(完整的列表可以查看MDN)

  - `max-age`：即最大有效时间。

  - `must-revalidate`：如果超过了 `max-age` 的时间，浏览器必须向服务器发送请求，验证资源是否还有效。

  - `no-cache`：不使用强缓存，需要与服务器验证缓存是否新鲜。

  - `no-store`: 真正意义上的“不要缓存”。所有内容都不走缓存，包括强制和对比。

  - `public`：所有的内容都可以被缓存 (包括客户端和代理服务器， 如 CDN)

  - `private`：所有的内容只有客户端才可以缓存，代理服务器不能缓存。默认值。

- Cache-control 的优先级高于 Expires，为了兼容 HTTP/1.0 和 HTTP/1.1，实际项目中两个字段都可以设置。

- 该字段可以在请求头或者响应头设置，可组合使用多种指令：

  - 可缓存性：

    - public：浏览器和缓存服务器都可以缓存页面信息

    - private：default，代理服务器不可缓存，只能被单个用户缓存

    - no-cache：浏览器器和服务器都不应该缓存页面信息，但仍可缓存，只是在缓存前需要向服务器确认资源是否被更改。可配合private，
      过期时间设置为过去时间。

    - only-if-cache：客户端只接受已缓存的响应

- 到期

  - max-age=：缓存存储的最大周期，超过这个周期被认为过期。

  - s-maxage=：设置共享缓存，比如can。会覆盖max-age和expires。

  - max-stale\[=]：客户端愿意接收一个已经过期的资源

  - min-fresh=：客户端希望在指定的时间内获取最新的响应

  - stale-while-revalidate=：客户端愿意接收陈旧的响应，并且在后台一部检查新的响应。时间代表客户端愿意接收陈旧响应
    的时间长度。

  - stale-if-error=：如新的检测失败，客户端则愿意接收陈旧的响应，时间代表等待时间。

- 重新验证和重新加载

  - must-revalidate：如页面过期，则去服务器进行获取。

  - proxy-revalidate：用于共享缓存。

  - immutable：响应正文不随时间改变。

- 其他

  - no-store：绝对禁止缓存

  - no-transform：不得对资源进行转换和转变。例如，不得对图像格式进行转换。

- 优势特点

  - 1、HTTP 1.1 产物，以时间间隔标识失效时间，解决了Expires服务器和客户端相对时间的问题。

  - 2、比Expires多了很多选项设置。

- 劣势问题

  - 1、存在版本问题，到期之前的修改客户端是不可知的。

5）协商缓存

- 协商缓存的状态码由服务器决策返回200或者304

- 当浏览器的强缓存失效的时候或者请求头中设置了不走强缓存，并且在请求头中设置了If-Modified-Since 或者 If-None-Match 的时候，会将这两个属性值到服务端去验证是否命中协商缓存，如果命中了协商缓存，会返回 304 状态，加载浏览器缓存，并且响应头会设置 Last-Modified 或者 ETag 属性。

- 对比缓存在请求数上和没有缓存是一致的，但如果是 304 的话，返回的仅仅是一个状态码而已，并没有实际的文件内容，因此 在响应体体积上的节省是它的优化点。

- 协商缓存有 2 组字段(不是两个)，控制协商缓存的字段有：Last-Modified/If-Modified-since（http1.0）和Etag/If-None-match（http1.1）

- Last-Modified/If-Modified-since表示的是服务器的资源最后一次修改的时间；Etag/If-None-match表示的是服务器资源的唯一标
  识，只要资源变化，Etag就会重新生成。

- Etag/If-None-match的优先级比Last-Modified/If-Modified-since高。

6）协商缓存-协商缓存-Last-Modified/If-Modified-since

- 1.服务器通过 `Last-Modified` 字段告知客户端，资源最后一次被修改的时间，例如 `Last-Modified: Mon, 10 Nov 2018 09:10:11 GMT`

- 2.浏览器将这个值和内容一起记录在缓存数据库中。

- 3.下一次请求相同资源时时，浏览器从自己的缓存中找出“不确定是否过期的”缓存。因此在请求头中将上次的 `Last-Modified` 的值写入到请求头的 `If-Modified-Since` 字段

- 4.服务器会将 `If-Modified-Since` 的值与 `Last-Modified` 字段进行对比。如果相等，则表示未修改，响应 304；反之，则表示修改了，响应 200 状态码，并返回数据。

- 优势特点

  - 1、不存在版本问题，每次请求都会去服务器进行校验。服务器对比最后修改时间如果相同则返回304，不同返回200以及资源内容。

- 劣势问题

  - 2、只要资源修改，无论内容是否发生实质性的变化，都会将该资源返回客户端。例如周期性重写，这种情况下该资源包含的数据实际上一样的。

  - 3、以时刻作为标识，无法识别一秒内进行多次修改的情况。 如果资源更新的速度是秒以下单位，那么该缓存是不能被使用的，因为它的时间单位最低是秒。

  - 4、某些服务器不能精确的得到文件的最后修改时间。

  - 5、如果文件是通过服务器动态生成的，那么该方法的更新时间永远是生成的时间，尽管文件可能没有变化，所以起不到缓存的作用。

7）协商缓存-Etag/If-None-match

- 为了解决上述问题，出现了一组新的字段 `Etag` 和 `If-None-Match`

- `Etag` 存储的是文件的特殊标识(一般都是 hash 生成的)，服务器存储着文件的 `Etag` 字段。之后的流程和 `Last-Modified` 一致，只是 `Last-Modified` 字段和它所表示的更新时间改变成了 `Etag` 字段和它所表示的文件 hash，把 `If-Modified-Since` 变成了 `If-None-Match`。服务器同样进行比较，命中返回 304, 不命中返回新资源和 200。

- 浏览器在发起请求时，服务器返回在Response header中返回请求资源的唯一标识。在下一次请求时，会将上一次返回的Etag值赋值给If-No-Matched并添加在Request Header中。服务器将浏览器传来的if-no-matched跟自己的本地的资源的ETag做对比，如果匹配，则返回304通知浏览器读取本地缓存，否则返回200和更新后的资源。

- Etag 的优先级高于 Last-Modified。

- 优势特点

  - 1、可以更加精确的判断资源是否被修改，可以识别一秒内多次修改的情况。

  - 2、不存在版本问题，每次请求都回去服务器进行校验。

- 劣势问题

  - 1、计算ETag值需要性能损耗。

  - 2、分布式服务器存储的情况下，计算ETag的算法如果不一样，会导致浏览器从一台服务器上获得页面内容后到另外一台服务器上进行验证时现ETag不匹配的情况。

---

## 53. 什么是对象存储OSS？

对象存储OSS（Object Storage Service）是一种海量、安全、低成本、高持久的云存储服务。

OSS具有与平台无关的RESTful API接口，您可以在任何应用、任何时间、任何地点存储和访问任意类型的数据。

**OSS相关概念**

- 存储类型（Storage Class） OSS提供标准、低频访问、归档、冷归档四种存储类型，全面覆盖从热到冷的各种数据存储场景。其中标准存储类型提供高持久、高可用、高性能的对象存储服务，能够支持频繁的数据访问；低频访问存储类型适合长期保存不经常访问的数据（平均每月访问频率1到2次），存储单价低于标准类型；归档存储类型适合需要长期保存（建议半年以上）的归档数据；冷归档存储适合需要超长时间存放的极冷数据。更多信息，请参见存储类型介绍。

- 存储空间（Bucket） 存储空间是您用于存储对象（Object）的容器，所有的对象都必须隶属于某个存储空间。存储空间具有各种配置属性，包括地域、访问权限、存储类型等。您可以根据实际需求，创建不同类型的存储空间来存储不同的数据。

- 对象（Object） 对象是OSS存储数据的基本单元，也被称为OSS的文件。对象由元信息（Object Meta）、用户数据（Data）和文件名（Key）组成。对象由存储空间内部唯一的Key来标识。对象元信息是一组键值对，表示了对象的一些属性，例如最后修改时间、大小等信息，同时可以在元信息中存储一些自定义的信息。

- 地域（Region） 地域表示OSS的数据中心所在物理位置。您可以根据费用、请求来源等选择合适的地域创建Bucket。更多信息，请参见OSS已开通的地域。

- 访问域名（Endpoint） Endpoint表示OSS对外服务的访问域名。OSS以HTTP RESTful API的形式对外提供服务，当访问不同地域的时候，需要不同的域名。通过内网和外网访问同一个地域所需要的域名也是不同的。

- 访问密钥（AccessKey） AccessKey简称AK，指的是访问身份验证中用到的AccessKey ID和AccessKey Secret。OSS通过使用AccessKey ID和AccessKey Secret对称加密的方法来验证某个请求的发送者身份。AccessKey ID用于标识用户；AccessKey Secret是用户用于加密签名字符串和OSS用来验证签名字符串的密钥，必须保密。

---

## 54. 什么是CDN？

CDN的全称是Content Delivery Network，即内容分发网络。

CDN是构建在现有网络基础之上的智能虚拟网络，依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块，使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率。

CDN的关键技术主要有内容存储和分发技术。

---

## 55. 请说说cookie与session有什么区别？

- 由于HTTP协议是无状态的协议，所以服务端需要记录用户的状态时，就需要用某种机制来识具体的用户，这个机制就是Session。

典型的场景比如购物车，当你点击下单按钮时，由于HTTP协议无状态，所以并不知道是哪个用户操作的，所以服务端要为特定的用户创建了特定的Session，用用于标识这个用户，并且跟踪用户，这样才知道购物车里面有几本书。这个Session是保存在服务端的，有一个唯一标识。

在服务端保存Session的方法很多，内存、数据库、文件都有。

集群的时候也要考虑Session的转移，在大型的网站，一般会有专门的Session服务器集群，用来保存用户会话，这个时候 Session 信息都是放在内存的，使用一些缓存服务比如Memcached之类的来放 Session。

- 思考一下服务端如何识别特定的客户？

这个时候Cookie就登场了。每次HTTP请求的时候，客户端都会发送相应的Cookie信息到服务端。实际上大多数的应用都是用 Cookie 来实现Session跟踪的，第一次创建Session的时候，服务端会在HTTP协议中告诉客户端，需要在 Cookie 里面记录一个Session ID，以后每次请求把这个会话ID发送到服务器，我就知道你是谁了。

有人问，如果客户端的浏览器禁用了 Cookie 怎么办？

一般这种情况下，会使用一种叫做URL重写的技术来进行会话跟踪，即每次HTTP交互，URL后面都会被附加上一个诸如 sid=xxxxx 这样的参数，服务端据此来识别用户。

- Cookie其实还可以用在一些方便用户的场景下，设想你某次登陆过一个网站，下次登录的时候不想再次输入账号了，怎么办？

这个信息可以写到Cookie里面，访问网站的时候，网站页面的脚本可以读取这个信息，就自动帮你把用户名给填了，能够方便一下用户。

这也是Cookie名称的由来，给用户的一点甜头。

所以，总结一下：

- Session是在服务端保存的一个数据结构，用来跟踪用户的状态，这个数据可以保存在集群、数据库、文件中；

- Cookie是客户端保存用户信息的一种机制，用来记录用户的一些信息，也是实现Session的一种方式。

---

## 56. 即时通讯的实现：短轮询、长轮询、SSE 和 WebSocket 间的区别？

短轮询和长轮询的目的都是用于实现客户端和服务器端的一个即时通讯。

短轮询的基本思路是 浏览器每隔一段时间向浏览器发送 http 请求，服务器端在收到请求后，不论是否有数据更新，都直接进行响应。这种方式实现的即时通信，本质上还是浏览器发送请求，服务器接受请求的一个过程，通过让客户端不断的进行请求，使得客户端能够模拟实时地收到服务器端的数据的变化。这种方式的优点是比较简单，易于理解。缺点是这种方式由于需要不断的建立 http 连接，严重浪费了服务器端和客户端的资源。当用户增加时，服务器端的压力就会变大，这是很不合理的。

长轮询的基本思路是 首先由客户端向服务器发起请求，当服务器收到客户端发来的请求后，服务器端不会直接进行响应，而是先将这个请求挂起，然后判断服务器端数据是否有更新。如果有更新，则进行响应，如果一直没有数据，则到达一定的时间限制才返回。客户端 JavaScript 响应处理函数会在处理完服务器返回的信息后，再次发出请求，重新建立连接。长轮询和短轮询比起来，它的优点是明显减少了很多不必要的 http 请求次数，相比之下节约了资源。长轮询的缺点在于，连接挂起也会导致资源的浪费。

SSE 的基本思想是 服务器使用流信息向服务器推送信息。严格地说，http 协议无法做到服务器主动推送信息。但是，有一种变通方法，就是服务器向客户端声明，接下来要发送的是流信息。也就是说，发送的不是一次性的数据包，而是一个数据流，会连续不断地发送过来。这时，客户端不会关闭连接，会一直等着服务器发过来的新的数据流，视频播放就是这样的例子。SSE 就是利用这种机制，使用流信息向浏览器推送信息。它基于 http 协议，目前除了 IE/Edge，其他浏览器都支持。它相对于前面两种方式来说，不需要建立过多的 http 请求，相比之下节约了资源。

WebSocket 是 HTML5 定义的一个新协议议，与传统的 http 协议不同，该协议允许由服务器主动的向客户端推送信息。使用 WebSocket 协议的缺点是在服务器端的配置比较复杂。WebSocket 是一个全双工的协议，也就是通信双方是平等的，可以相互发送消息，而 SSE 的方式是单向通信的，只能由服务器端向客户端推送信息，如果客户端需要发送信息就是属于下一个 http 请求了。

上面的四个通信协议，前三个都是基于HTTP协议的。 对于这四种即使通信协议，从性能的角度来看： WebSocket > 长连接（SEE） > 长轮询 > 短轮询 但是，我们如果考虑浏览器的兼容性问题，顺序就恰恰相反了： 短轮询 > 长轮询 > 长连接（SEE） > WebSocket 所以，还是要根据具体的使用场景来判断使用哪种方式。

---

## 57. 介绍下WebSocket

1. WebSocket 是什么

WebSocket是HTML5提供的一种浏览器与服务器进行全双工通讯的网络技术，属于应用层协议。它基于TCP传输协议，并复用HTTP的握手通道。浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接， 并进行双向数据传输。

WebSocket 的出现就解决了半双工通信的弊端。它最大的特点是：服务器可以向客户端主动推动消息，客户端也可以主动向服务器推送消息。

WebSocket原理 ：客户端向 WebSocket 服务器通知（notify）一个带有所有接收者ID（recipients IDs）的事件（event），服务器接收后立即通知所有活跃的（active）客户端，只有ID在接收者ID序列中的客户端才会处理这个事件。

- WebSocket 特点

* 支持双向通信，实时性更强

* 可以发送文本，也可以发送二进制数据‘’

* 建立在TCP协议之上，服务端的实现比较容易

* 数据格式比较轻量，性能开销小，通信高效

* 没有同源限制，客户端可以与任意服务器通信

* 协议标识符是ws（如果加密，则为wss），服务器网址就是 URL

* 与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。

---

## 58. HTTP状态码

状态码的类别：

类别原因描述1xxInformational(信息性状态码)接受的请求正在处理2xxSuccess(成功状态码)请求正常处理完毕3xxRedirection(重定向状态码)需要进行附加操作一完成请求4xxClient Error (客户端错误状态码)服务器无法处理请求5xxServer Error(服务器错误状态码)服务器处理请求出错

1. 2XX (Success 成功状态码)

状态码2XX表示请求被正常处理了。

**（1）200 OK**

200 OK表示客户端发来的请求被服务器端正常处理了。

**（2）204 No Content**

该状态码表示客户端发送的请求已经在服务器端正常处理了，但是没有返回的内容，响应报文中不包含实体的主体部分。 一般在只需要从客户端往服务器端发送信息，而服务器端不需要往客户端发送内容时使用。

**（3）206 Partial Content**

该状态码表示客户端进行了范围请求，而服务器端执行了这部分的 GET 请求。响应报文中包含由 Content-Range 指定范围的实体内容。

- 3XX (Redirection 重定向状态码)

3XX 响应结果表明浏览器需要执行某些特殊的处理以正确处理请求。

**（1）301 Moved Permanently**

永久重定向。 该状态码表示请求的资源已经被分配了新的 URI，以后应使用资源指定的 URI。新的 URI 会在 HTTP 响应头中的 Location 首部字段指定。 若用户已经把原来的URI保存为书签，此时会按照 Location 中新的URI重新保存该书签。 同时，搜索引擎在抓取新内容的同时也将旧的网址替换为重定向之后的网址。

使用场景：

- 当我们想换个域名，旧的域名不再使用时，用户访问旧域名时用301就重定向到新的域名。其实也是告诉搜索引擎收录的域名需要对新的域名进行收录。

- 在搜索引擎的搜索结果中出现了不带www的域名，而带www的域名却没有收录，这个时候可以用301重定向来告诉搜索引擎我们目标的域名是哪一个。

**（2）302 Found**

临时重定向。 该状态码表示请求的资源被分配到了新的 URI，希望用户（本次）能使用新的 URI 访问资源。 和 301 Moved Permanently 状态码相似，但是 302 代表的资源不是被永久重定向，只是临时性质的。也就是说已移动的资源对应的 URI 将来还有可能发生改变。 若用户把 URI 保存成书签，但不会像 301 状态码出现时那样去更新书签，而是仍旧保留返回 302 状态码的页面对应的 URI。 同时，搜索引擎会抓取新的内容而保留旧的网址。因为服务器返回302代码，搜索引擎认为新的网址只是暂时的。

使用场景：

- 当我们在做活动时，登录到首页自动重定向，进入活动页面。

- 未登陆的用户访问用户中心重定向到登录页面。

- 访问404页面重新定向到首页。

**（3）303 See Other**

该状态码表示由于请求对应的资源存在着另一个 URI，应使用 GET 方法定向获取请求的资源。 303 状态码和 302 Found 状态码有着相似的功能，但是 303 状态码明确表示客户端应当采用 GET 方法获取资源。 303 状态码通常作为 PUT 或 POST 操作的返回结果，它表示重定向链接指向的不是新上传的资源，而是另外一个页面，比如消息确认页面或上传进度页面。而请求重定向页面的方法要总是使用 GET。 注意：

> <span style="color: rgb(36,91,219); background-color: inherit">当 301、302、303 响应状态码返回时，几乎所有的浏览器都会把 POST 改成GET，并删除请求报文内的主体，之后请求会再次自动发送。 301、302 标准是禁止将 POST 方法变成 GET方法的，但实际大家都会这么做。</span>

**（4）304 Not Modified**

浏览器缓存相关。 该状态码表示客户端发送附带条件的请求时，服务器端允许请求访问资源，但未满足条件的情况。304 状态码返回时，不包含任何响应的主体部分。304 虽然被划分在 3XX 类别中，但是和重定向没有关系。

带条件的请求（Http 条件请求）：使用 Get方法 请求，请求报文中包含（`if-match`、`if-none-match`、`if-modified-since`、`if-unmodified-since`、`if-range`）中任意首部。

状态码304并不是一种错误，而是告诉客户端有缓存，直接使用缓存中的数据。返回页面的只有头部信息，是没有内容部分的，这样在一定程度上提高了网页的性能。

**（5）307 Temporary Redirect**

临时重定向。 该状态码与 302 Found 有着相同含义，尽管 302 标准禁止 POST 变成 GET，但是实际使用时还是这样做了。 307 会遵守浏览器标准，不会从 POST 变成 GET。但是对于处理请求的行为时，不同浏览器还是会出现不同的情况。规范要求浏览器继续向 Location 的地址 POST 内容。规范要求浏览器继续向 Location 的地址 POST 内容。

- 4XX (Client Error 客户端错误状态码)

4XX 的响应结果表明客户端是发生错误的原因所在。

**（1）400 Bad Request**

该状态码表示请求报文中存在语法错误。当错误发生时，需修改请求的内容后再次发送请求。另外，浏览器会像 200 OK 一样对待该状态码。

**（2）401 Unauthorized**

该状态码表示发送的请求需要有通过 HTTP 认证(BASIC 认证、DIGEST 认证)的认证信息。若之前已进行过一次请求，则表示用户认证失败 返回含有 401 的响应必须包含一个适用于被请求资源的 WWW-Authenticate 首部用以质询(challenge)用户信息。当浏览器初次接收到 401 响应，会弹出认证用的对话窗口。 以下情况会出现401：

- 401.1 – 登录失败。

- 401.2 – 服务器配置导致登录失败。

- 401.3 – 由于 ACL 对资源的限制而未获得授权。

- 401.4 – 筛选器授权失败。

- 401.5 – ISAPI/CGI 应用程序授权失败。

- 401.7 – 访问被 Web 服务器上的 URL 授权策略拒绝。这个错误代码为 IIS 6.0 所专用。

**（3）403 Forbidden**

该状态码表明请求资源的访问被服务器拒绝了，服务器端没有必要给出详细理由，但是可以在响应报文实体的主体中进行说明。进入该状态后，不能再继续进行验证。该访问是永久禁止的，并且与应用逻辑密切相关。 IIS 定义了许多不同的 403 错误，它们指明更为具体的错误原因：

- 403.1 – 执行访问被禁止。

- 403.2 – 读访问被禁止。

- 403.3 – 写访问被禁止。

- 403.4 – 要求 SSL。

- 403.5 – 要求 SSL 128。

- 403.6 – IP 地址被拒绝。

- 403.7 – 要求客户端证书。

- 403.8 – 站点访问被拒绝。

- 403.9 – 用户数过多。

- 403.10 – 配置无效。

- 403.11 – 密码更改。

- 403.12 – 拒绝访问映射表。

- 403.13 – 客户端证书被吊销。

- 403.14 – 拒绝目录列表。

- 403.15 – 超出客户端访问许可。

- 403.16 – 客户端证书不受信任或无效。

- 403.17 – 客户端证书已过期或尚未生效

- 403.18 – 在当前的应用程序池中不能执行所请求的 URL。这个错误代码为 IIS 6.0 所专用。

- 403.19 – 不能为这个应用程序池中的客户端执行 CGI。这个错误代码为 IIS 6.0 所专用。

- 403.20 – Passport 登录失败。这个错误代码为 IIS 6.0 所专用。

**（4）404 Not Found**

该状态码表明服务器上无法找到请求的资源。除此之外，也可以在服务器端拒绝请求且不想说明理由时使用。 以下情况会出现404：

- 404.0 -（无） – 没有找到文件或目录。

- 404.1 – 无法在所请求的端口上访问 Web 站点。

- 404.2 – Web 服务扩展锁定策略阻止本请求。

- 404.3 – MIME 映射策略阻止本请求。

**（5）405 Method Not Allowed**

该状态码表示客户端请求的方法虽然能被服务器识别，但是服务器禁止使用该方法。 GET 和 HEAD 方法，服务器应该总是允许客户端进行访问。 客户端可以通过 OPTIONS 方法（预检）来查看服务器允许的访问方法, 如下

```javascript
Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE
```

- 5XX (Server Error 服务器错误状态码)

5XX 的响应结果表明服务器本身发生错误.

**（1）500 Internal Server Error**

该状态码表明服务器端在执行请求时发生了错误。也有可能是 Web 应用存在的 bug 或某些临时的故障。

**（2）502 Bad Gateway**

该状态码表明扮演网关或代理角色的服务器，从上游服务器中接收到的响应是无效的 注意，502 错误通常不是客户端能够修复的，而是需要由途经的 Web 服务器或者代理服务器对其进行修复 以下情况会出现502：

- 502.1 – CGI （通用网关接口）应用程序超时。

- 502.2 – CGI （通用网关接口）应用程序出错。

**（3）503 Service Unavailable**

该状态码表明服务器暂时处于超负载或正在进行停机维护，现在无法处理请求。如果事先得知解除以上状况需要的时间，最好写入 RetryAfter 首部字段再返回给客户端。 使用场景：

- 服务器停机维护时，主动用503响应请求；

- nginx 设置限速，超过限速，会返回503。

**（4）504 Gateway Timeout**

该状态码表示网关或者代理的服务器无法在规定的时间内获得想要的响应。他是HTTP 1.1中新加入的。 使用场景：代码执行时间超时，或者发生了死循环。

---

## 59. HTTP协议的优点和缺点

HTTP 是超文本传输协议，它定义了客户端和服务器之间交换报文的格式和方式，默认使用 80 端口。它使用 TCP 作为传输层协议，保证了数据传输的可靠性。

HTTP协议具有以下优点：

- 支持客户端/服务器模式

- 简单快速：客户向服务器请求服务时，只需传送请求方法和路径。由于 HTTP 协议简单，使得 HTTP 服务器的程序规模小，因而通信速度很快。

- 无连接：无连接的含义是限制每次链接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开链接，采用这种方式可以节省传输时间。

- 无状态：HTTP 协议是无状态协议，这里的状态是指通信过程的上下文信息。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能会导致每次连接传送的数据量增大。另一方面，在服务器不需要先前信息时它的应答就比较快。

- 灵活：HTTP 允许传输任意类型的数据对象。正在传输的类型由 Content-Type 加以标记。

HTTP协议具有以下缺点：

- 无状态： HTTP 是一个无状态的协议，HTTP 服务器不会保存关于客户的任何信息。

- 明文传输： 协议中的报文使用的是文本形式，这就直接暴露给外界，不安全。

- 不安全

（1）通信使用明文（不加密），内容可能会被窃听 （2）不验证通信方的身份，因此有可能遭遇伪装 （3）无法证明报文的完整性，所以有可能已遭篡改

---

## 60. HTTP 1.0和 HTTP 1.1 之间有哪些区别？

HTTP 1.0和 HTTP 1.1 有以下区别：

- 连接方面 的区别，http1.1 默认使用持久连接，而 http1.0 默认使用非持久连接。http1.1 通过使用持久连接来使多个 http 请求复用同一个 TCP 连接，以此来避免使用非持久连接时每次需要建立连接的时延。

- 资源请求方面 的区别，在 http1.0 中，存在一些浪费带宽的现象，例如客户端只是需要某个对象的一部分，而服务器却将整个对象送过来了，并且不支持断点续传功能，http1.1 则在请求头引入了 range 头域，它允许只请求资源的某个部分，即返回码是 206（Partial Content），这样就方便了开发者自由的选择以便于充分利用带宽和连接。

- 缓存方面 的区别，在 http1.0 中主要使用 header 里的 If-Modified-Since,Expires 来做为缓存判断的标准，http1.1 则引入了更多的缓存控制策略例如 Etag、If-Unmodified-Since、If-Match、If-None-Match 等更多可供选择的缓存头来控制缓存策略。

- http1.1 中还新增了 host 字段，用来指定服务器的域名。http1.0 中认为每台服务器都绑定一个唯一的 IP 地址，因此，请求消息中的 URL 并没有传递主机名（hostname）。但随着虚拟主机技术的发展，在一台物理服务器上可以存在多个虚拟主机，并且它们共享一个IP地址。因此有了 host 字段，就可以将请求发往同一台服务器上的不同网站。

- http1.1 相对于 http1.0 还新增了很多请求方法，如 PUT、HEAD、OPTIONS 等。

---

## 61. options请求方法及使用场景

OPTIONS是除了GET和POST之外的其中一种 HTTP请求方法。

OPTIONS方法是用于请求获得由`Request-URI`标识的资源在请求/响应的通信过程中可以使用的功能选项。通过这个方法，客户端可以在采取具体资源请求之前，决定对该资源采取何种必要措施，或者了解服务器的性能。该请求方法的响应不能缓存。

OPTIONS请求方法的主要用途有两个：

- 获取服务器支持的所有HTTP请求方法；

- 用来检查访问权限。例如：JS 的 XMLHttpRequest对象进行 CORS 跨域资源共享时，对于复杂请求，就是使用 OPTIONS 方法发送嗅探请求，以判断是否有对指定资源的访问权限。

---

## 62. HTTP Request Header和Response Header里面分别都有哪些比较重要的字段

通用首部字段：请求报文和响应报文两方都会使用的首部

- `Cache-Control` 告诉所有的缓存机制是否可以缓存及哪种类型

- `Connection` 表明是否需要持久连接

- `Transfer-Encoding` 文件传输编码

Request Header：

- `Accept` 指定客户端能够接收的内容类型，内容类型中的先后次序表示客户端接收的先后次序

- `Range` 实体的字节范围请求

- `Authorization` web的认证信息

- `Host` 请求资源所在服务器

- `User-Agent` 客户端程序信息

Response Header：

- `Location` 令客户端重定向的URI

- `ETag` 能够表示资源唯一资源的字符串

- `Server` 服务器的信息

实体首部字段：（Entity头域）

- `Last-Modified` 请求资源的最后修改时间

- `Expires` 响应过期的日期和时间

- `Allow` 资源可支持http请求的方法，不允许则返回405

- Content-Type 返回内容的媒体类型 Content-Type: text/html; charset=utf-8

---

## 63. HTTP和HTTPS的区别

- `HTTPS`是在`HTTP`的基础上加入了`SSL`协议，`SSL`依靠证书来验证服务器的身份，并为浏览器和服务器之间的通信加密（在传输层）
  `HTTP` 加密 + 认证 + 完整性保护 = `HTTPS`

1. `HTTPS`协议需要到CA申请证书或自制证书

2. `HTTP`的信息是明文传输；
   `HTTPS`则是具有安全性的ssl加密

3. `HTTP`是直接与TCP进行数据传输；
   而`HTTPS`运行在`SSL/TLS`(安全传输层协议)之上，`SSL/TLS`运行在`TCP`之上，用的端口也不一样，前者是80（需要国内备案），后者是443

4. `HTTP`的连接很简单，是无状态的；
   `HTTPS`协议是由`SSL+HTTP`协议构建的，可进行加密传输、身份认证的网络协议，比`HTTP`协议安全

---

## 64. HTTP 1.1和 HTTP 2.0 的区别

- 二进制协议：HTTP/2 是一个二进制协议。在 HTTP/1.1 版中，报文的头信息必须是文本（ASCII 编码），数据体可以是文本，也可以是 二进制。HTTP/2 则是一个彻底的二进制协议，头信息和数据体都是二进制，并且统称为”帧”，可以分为头信息帧和数据帧。 帧的概念是它实现多路复用的基础。

- 多路复用： HTTP/2 实现了多路复用，HTTP/2 仍然复用 TCP 连接，但是在一个连接里，客户端和服务器都可以同时发送多个请求或回 应，而且不用按照顺序一一发送，这样就避免了”队头堵塞”的问题。

- 数据流： HTTP/2 使用了数据流的概念，因为 HTTP/2 的数据包是不按顺序发送的，同一个连接里面连续的数据包，可能属于不同的 请求。因此，必须要对数据包做标记，指出它属于哪个请求。HTTP/2 将每个请求或回应的所有数据包，称为一个数据流。每 个数据流都有一个独一无二的编号。数据包发送的时候，都必须标记数据流 ID ，用来区分它属于哪个数据流。

- 头信息压缩： HTTP/2 实现了头信息压缩，由于 HTTP 1.1 协议不带有状态，每次请求都必须附上所有信息。所以，请求的很多字段都是 重复的，比如 Cookie 和 User Agent ，一模一样的内容，每次请求都必须附带，这会浪费很多带宽，也影响速度。HTTP/2 对这一点做了优化，引入了头信息压缩机制。一方面，头信息使用 gzip 或 compress 压缩后再发送；另一方面， 客户端和服务器同时维护一张头信息表，所有字段都会存入这个表，生成一个索引号，以后就不发送同样字段了，只发送索引 号，这样就能提高速度了。

- 服务器推送： HTTP/2 允许服务器未经请求，主动向客户端发送资源，这叫做服务器推送。使用服务器推送，提前给客户端推送必要的资源 ，这样就可以相对减少一些延迟时间。这里需要注意的是 http2 下服务器主动推送的是静态资源，和 WebSocket 以及使用 SSE 等方式向客户端发送即时数据的推送是不同的。

---

## 65. HTTP的长连接和短连接分别是什么？keep-alive是干什么的

`HTTP`的长连接和短连接实际上是`TCP`的长连接和短连接，`HTTP`属于应用层协议。
短连接：浏览器和服务器每进行一次`HTPP`操作，就建立一个连接，但任务结束就会中断这个连接
长连接：`HTTP1.1`规定了默认保持长连接，也称为持久连接。
意思就是，数据传输完成了保持`TCP`连接不断开（不发`RST`包、不四次握手），等待在同域名下继续用这个通道传输数据。
长连接好处:

1. 同一个客户端可以使用这个长连接处理其他请求，避免`HTTP`重新连接和断开所消耗的时间；

2. 服务器可以利用这个连接 主动推送 消息到客户端（重要的）。

`HTTP`头部有`了Connection: Keep-Alive`这个值，代表客户端期望这次请求是长连接的。但是并不代表一定会使用长连接，服务器端都可以无视这个值，也就是不按标准来。实现长连接要客户端和服务端都支持长连接。
`keep-alive`的优点：

- 较少的`CPU`和内存的使用（由于同时打开的连接的减少了）

- 允许请求和应答的`HTTP`管线化

- 降低拥塞控制 （`TCP`连接减少了）

- 减少了后续请求的延迟（无需再进行握手）

- 报告错误无需关闭`TCP`连接

---

## 66. 常见的HTTP请求方法

- GET: 向服务器获取数据

- POST：将实体提交到指定的资源，通常会造成服务器资源的修改。

- PUT：上传文件，修改数据

- DELETE：删除服务器上的对象

- HEAD：获取报文首部，与GET相比，不返回报文主体部分

- OPTIONS：询问支持的请求方法，用来跨域请求

- TRACE：追踪 请求—响应 的传输路径

- CONNECT：要求在与代理服务器通信时建立隧道，使用隧道进行TCP通信

---

## 67. GET和POST的请求的区别

Post 和 Get 是 HTTP 请求的两种方法。

- 应用场景：GET 请求是一个<u><span style="color: rgb(216,57,49); background-color: rgb(187,191,196)">幂等</span></u>的请求，一般 Get 请求用于对服务器资源不会产生影响的场景，比如说请求一个网页。而 Post 不是一个幂等的请求，一般用于对服务器资源会产生影响的情景。比如注册用户这一类的操作。

- 是否缓存：因为不同的应用场景，所以浏览器一般会对 Get 请求缓存，但很少对 Post 请求缓存。

- 发送的报文格式：Get 请求的报文中实体部分为空，Post 请求的报文中实体部分一般为向服务器发送的数据。

- 安全性：Get 请求可以将请求的参数放入 url 中向服务器发送，这样的做法相对于 Post 请求来说，一个方面是不太安全，因为请求的 url 会被保留在历史记录中。

- 请求长度：浏览器由于对 url 有一个长度上的限制，所以会影响 get 请求发送数据时的长度。<span style="color: rgb(216,57,49); background-color: inherit">这个限制是浏览器规定的，并不是 RFC 规定的。</span>

- 参数类型：post 的参数传递支持更多的数据类型。

---

## 68. DNS协议介绍

1. DNS 协议的概念

概念： DNS 是域名系统 (Domain Name System) 的缩写，提供的是一种主机名到 IP 地址的转换服务，就是我们常说的域名系统。它是一个由分层的 DNS 服务器组成的分布式数据库，是定义了主机如何查询这个分布式数据库的方式的应用层协议。能够使人更方便的访问互联网，而不用去记住能够被机器直接读取的IP数串。

作用： 将域名解析为IP地址，客户端向DNS服务器（DNS服务器有自己的IP地址）发送域名查询请求，DNS服务器告知客户机Web服务器的IP 地址。

- DNS同时使用TCP和UDP协议

DNS占用53号端口，同时使用TCP和UDP协议。

（1）在区域传输的时候使用TCP协议

- 辅域名服务器会定时（一般3小时）向主域名服务器进行查询以便了解数据是否有变动。如有变动，会执行一次区域传送，进行数据同步。区域传送使用TCP而不是UDP，因为数据同步传送的数据量比一个请求应答的数据量要多得多。

- TCP是一种可靠连接，保证了数据的准确性。

（2）在域名解析的时候使用UDP协议

- 客户端向DNS服务器查询域名，一般返回的内容都不超过512字节，用UDP传输即可。不用经过三次握手，这样DNS服务器负载更低，响应更快。理论上说，客户端也可以指定向DNS服务器查询时用TCP，但事实上，很多DNS服务器进行配置的时候，仅支持UDP查询包。

* DNS完整的查询过程

DNS服务器解析域名的过程：

- 首先会在浏览器的缓存中查找对应的IP地址，如果查找到直接返回，若找不到继续下一步

- 将请求发送给本地DNS服务器，在本地域名服务器缓存中查询，如果查找到，就直接将查找结果返回，若找不到继续下一步

- 本地DNS服务器向根域名服务器发送请求，根域名服务器会返回一个所查询域的顶级域名服务器地址

- 本地DNS服务器向顶级域名服务器发送请求，接受请求的服务器查询自己的缓存，如果有记录，就返回查询结果，如果没有就返回相关的下一级的权威域名服务器的地址

- 本地DNS服务器向权威域名服务器发送请求，域名服务器返回对应的结果

- 本地DNS服务器将返回结果保存在缓存中，便于下次使用

- 本地DNS服务器将返回结果返回给浏览器

比如我们如果想要查询 [<u><span style="color: rgb(36,91,219); background-color: inherit">www.baidu.com</span></u>](http://www.baidu.com/) 的 IP 地址，我们首先会在浏览器的缓存中查找是否有该域名的缓存，如果不存在就将请求发送到本地的 DNS 服务器中，本地DNS服务器会判断是否存在该域名的缓存，如果不存在，则向根域名服务器发送一个请求，根域名服务器返回负责 .com 的顶级域名服务器的 IP 地址的列表。然后本地 DNS 服务器再向其中一个负责 .com 的顶级域名服务器发送一个请求，负责 .com 的顶级域名服务器返回负责 .baidu 的权威域名服务器的 IP 地址列表。然后本地 DNS 服务器再向其中一个权威域名服务器发送一个请求，最后权威域名服务器返回一个对应的主机名的 IP 地址列表。

- 迭代查询与递归查询

实际上，DNS解析是一个包含迭代查询和递归查询的过程。

- 递归查询指的是查询请求发出后，域名服务器代为向下一级域名服务器发出请求，最后向用户返回查询的最终结果。使用递归 查询，用户只需要发出一次查询请求。

- 迭代查询指的是查询请求后，域名服务器返回单次查询的结果。下一级的查询由用户自己请求。使用迭代查询，用户需要发出 多次的查询请求。

一般我们向本地 DNS 服务器发送请求的方式就是递归查询，因为我们只需要发出一次请求，然后本地 DNS 服务器返回给我 们最终的请求结果。而本地 DNS 服务器向其他域名服务器请求的过程是迭代查询的过程，因为每一次域名服务器只返回单次 查询的结果，下一级的查询由本地 DNS 服务器自己进行。

- DNS 记录和报文

DNS 服务器中以资源记录的形式存储信息，每一个 DNS 响应报文一般包含多条资源记录。一条资源记录的具体的格式为

```http
（Name，Value，Type，TTL）
```

其中 TTL 是资源记录的生存时间，它定义了资源记录能够被其他的 DNS 服务器缓存多长时间。

常用的一共有四种 Type 的值，分别是 A、NS、CNAME 和 MX ，不同 Type 的值，对应资源记录代表的意义不同。

1. 如果 Type = A，则 Name 是主机名，Value 是主机名对应的 IP 地址。因此一条记录为 A 的资源记录，提供了标 准的主机名到 IP 地址的映射。

2. 如果 Type = NS，则 Name 是个域名，Value 是负责该域名的 DNS 服务器的主机名。这个记录主要用于 DNS 链式 查询时，返回下一级需要查询的 DNS 服务器的信息。

3. 如果 Type = CNAME，则 Name 为别名，Value 为该主机的规范主机名。该条记录用于向查询的主机返回一个主机名 对应的规范主机名，从而告诉查询主机去查询这个主机名的 IP 地址。主机别名主要是为了通过给一些复杂的主机名提供 一个便于记忆的简单的别名。

4. 如果 Type = MX，则 Name 为一个邮件服务器的别名，Value 为邮件服务器的规范主机名。它的作用和 CNAME 是一 样的，都是为了解决规范主机名不利于记忆的缺点。

---

## 69. TCP链接为什么会采用三次握手，而不是两次或者四次呢？

建立连接的过程是利用客户服务器模式，假设主机A为客户端，主机B为服务器端。

采用三次握手是为了防止失效的连接请求报文段突然又传送到主机B，因而产生错误。

失效的连接请求报文段是指：主机A发出的连接请求没有收到主机B的确认，于是经过一段时间后，主机A又重新向主机B发送连接请求，且建立成功，顺序完成数据传输。

考虑这样一种特殊情况，主机A第一次发送的连接请求并没有丢失，而是因为网络节点导致延迟达到主机B，主机B以为是主机A又发起的新连接，于是主机B同意连接，并向主机A发回确认，但是此时主机A根本不会理会，主机B就一直在等待主机A发送数据，导致主机B的资源浪费。

采用两次握手不行，原因就是上面说的失效的连接请求的特殊情况。

而在三次握手中，client和server都有一个发syn和收ack的过程，双方都是发后能收，表明通信则准备工作OK。

为什么不是四次握手呢？

因为通信不可能100%可靠，而上面的三次握手已经做好了通信的准备工作，再增加握手，并不能显著提高可靠性，而且也没有必要。

---

## 70. URI、URL、URN分别是什么？

URL代表资源的路径地址，而URI代表资源的名称。

- URI: Universal Resource Identifier 统一资源标志符

- URL: Universal Resource Locator 统一资源定位符 URL类似于住址，它告诉你一种寻找目标的方式(在这个例子中，是通过街道地址找到一个人)。要知道，上述定义同时也是一个URI。

- URN: Universal Resource Name 统一资源名称 我们可以把一个人的名字看作是URN;因此可以用URN来唯一标识一个实体

URL是URI的一个子集，告诉我们访问网络位置的方式

URN是URI的子集，包括名字(给定的命名空间内)，但是不包括访问方式

URN 和 URL 都是URI的子集。

---

## 71. 什么是跨域？

跨域本质是浏览器基于同源策略的一种安全手段

同源策略（Sameoriginpolicy），是一种约定，它是浏览器最核心也最基本的安全功能

所谓同源（即指在同一个域）具有以下三个相同点

- 协议相同（protocol）

- 主机相同（host）

- 端口相同（port）

反之非同源请求，也就是协议、端口、主机其中一项不相同的时候，这时候就会产生跨域

> <span style="color: rgb(36,91,219); background-color: inherit">一定要注意跨域是浏览器的限制，你用抓包工具抓取接口数据，是可以看到接口已经把数据返回回来了，只是浏览器的限制，你获取不到数据。用postman请求接口能够请求到数据。这些再次印证了跨域是浏览器的限制。</span>
