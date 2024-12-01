import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
       <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/icons/quiz.png"/>
        <meta name="theme-color" content="#0078d7" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}