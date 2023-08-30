import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap" rel="stylesheet" />
      <link rel="shortcut icon" href="/icon.ico" />
      <meta name="monetag" content="b236c97ee6297480b90a9cad31f50302"/>
      {/* @ts-ignore */}
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9453766584853046" crossorigin="anonymous"></script>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
