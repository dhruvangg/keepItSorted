import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon512.png"></link>
        <meta name="theme-color" content="#2f3d58" />
      </Head>
      <body>
        <header>
          <h1 className='text-center font-bold text-3xl'>Keep_It_Sorted</h1>
        </header>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
