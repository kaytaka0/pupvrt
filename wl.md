


Gemini CLI から Web サイトにアクセスして、ページ画面などをみながら操作するように指示したい。
プロンプトを複数試してみたが、Gemini CLI は pupetter などの
プログラムを使ってアクセスしようとする。うーん、Antigravity のエージェントだったらやってくれるのになんでだろうか。絶対できるはずだが。
Gemini CLI だとブラウザを操作することができないのかな。。。

受け答えの例↓
```
 > http://localhost:8080/site5/                                                      
   にアクセスして、Webサイトをスマホサイズの画面でみながら操作してください。localhos 
   t:8080                                                                            
   ですでにサーバは稼働しているため、サーバを追加で起動する必要はありません。セール  
   一覧のボタンを押し、画面がスクロールしたのちに「セール中」の見出しが画面の上部に  
   表示されているかどうかを判定してください。また、判定した際のスクショも撮影し、カ  
   レントディレクトリにファイルとして保存してください。これらの検査プロセスは、ディ  
   レクトリ内のファイルを編集、追加するのではなくこのCLIエージェント内の操作のみで実 
   施してください                                                                    
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
✦ Puppeteerを使用して、スマホサイズ（390x844）での動作確認と判定を行います。

  node --input-type=module
  を利用して、一時的なファイルを作成せずに直接スクリプトを実行し、スクリーンショット
  を site5_scroll_check.png として保存します。


╭───────────────────────────────────────────────────────────────────────────────────╮
│ Action Required                                                                   │
│                                                                                   │
│ ?  Shell node --input-type=module -e "import puppeteer from 'puppeteer';(async (… │
│                                                                                   │
│ node --input-type=module -e " import puppeteer from 'puppeteer'; (async () => {   │
│ const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox',  │
│ '--disable-setuid-sandbox'] }); const page = await browser.newPage(); await       │
│ page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });    │
│ try { await page.goto('http://localhost:8080/site5/', { waitUntil: 'networkidle0' │
│ }); // 「セール一覧」ボタンをクリック const saleBtn = await                       │
│ page.$('a[href=\"#sale\"]'); await saleBtn.click(); //                            │
│ スムーススクロールの完了を待機 await new Promise(r => setTimeout(r, 2000)); //    │
│ スクリーンショット保存 await page.screenshot({ path: 'site5_scroll_check.png' }); │
│ // 判定ロジック const result = await page.evaluate(() => { const heading =        │
│ document.querySelector('#sale h2'); const header =                                │
│ document.querySelector('.header'); const genreBar =                               │
│ document.querySelector('.genre-bar'); const rect =                                │
│ heading.getBoundingClientRect(); const stickyHeight = (header?.offsetHeight || 0) │
│ + (genreBar?.offsetHeight || 0); return { headingTop: rect.top, stickyHeight:     │
│ stickyHeight, isHidden: rect.top < stickyHeight }; });                            │
│ console.log(JSON.stringify(result)); } finally { await browser.close(); } })(); " │
│ Allow execution of: 'node, a[href=\"#sale\"]'?                                    │
```


Antigravityで以下のようなプロンプトを入れると期待通りの操作、スクショ、動画記録を実行してくれる。すごい。
Gemini CLI だとやっぱり puppeteer を使おうとして微妙なアウトプットになる。。

```
あなたは Web サイトのデザインを担当するプロのウェブデザイナーです。
デザインの校正指摘作業を行なってください

- 対象サイト: http://localhost:8080/site5/
- 対象サイトにブラウザでアクセスして、スマホサイズの画面を確認しながらデザインの指摘を行う。
- Web サーバは localhost 8080 ですでに起動しています。再度起動する必要はない
- 確認フロー: 「セール一覧」ボタンを押して、画面がスクロールしたのちに、「セール中」のタイトル文字が画面上に表示されていてほしいです。
- ブラウザ操作を実行しデザインの指摘結果を返答してください
- ブラウザ操作中のスクリーンショットを、カレントディレクトリに保存してください
- 操作中の動画をファイルとして保存してください
- プロジェクト内のファイルを修正や追加することは行わないでください。
- エージェント内の操作のみでブラウザ等を使用してください
```




Gemini CLI に chrome-devtools-mcp を入れると万事解決しそう。
ブラウザの操作はできる。スクショは普通に撮れる。
動画の保存ができないっぽい。



  1. Puppeteer の拡張ライブラリを使用する
  puppeteer-screen-recorder や puppeteer-video-recorder といった Node.js
  ライブラリを使用する方法です。
  これらは Puppeteer
  と連携してブラウザの描画内容を直接キャプチャし、動画ファイルとして保存します。ただ
  し、内部的に ffmpeg
  を必要とするものが多いため、現在の環境では追加のインストールが必要になる可能性があ
  ります。


  2. ブラウザ内の MediaRecorder API を利用する（ライブラリ不要）
  ライブラリを追加せずに実現する方法です。
   1. Puppeteer からブラウザ内で MediaRecorder (Web標準API)
      を起動するスクリプトを実行。
   2. 画面上の操作を録画。
   3. 録画データをブラウザから Node.js 側に転送（page.exposeFunction
      などを使用）してファイルに書き出す。
  この方法は少し複雑な実装が必要ですが、外部ツール（ffmpegなど）に頼らずに済む可能性
  があります。


  3. システムの録画機能（macOS の場合）
  現在は darwin (macOS) 環境ですので、OS標準の録画機能が利用できる場合があります。
  通常は UI 操作が必要ですが、コマンドラインから screencapture
  コマンドで動画を撮ることは（標準では）難しく、一般的には ffmpeg を brew install
  ffmpeg などでインストールして利用するのが一般的です。

  ---

このあたりの３つの方法がある。
Puppeteer つかって録画しながら、MCP 経由でブラウザ操作ってできるのか、、？

→いけそう

- Geminiが Puppeteer を使ったページ操作&動画キャプチャスクリプトを各