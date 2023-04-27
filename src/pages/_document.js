import ErrorBoundary from '@/component/ErrorBoundary'
import { Html, Head, Main, NextScript } from 'next/document'
import Link from 'next/link'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon512.png"></link>
        <meta name="theme-color" content="#2f3d58" />
      </Head>
      <body>
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          <header class="p-4 shadow-sm">
            <div class="inline-block text-lg"><h1>KeepItSorted</h1></div>
            <div class="inline-block top-auto text-teal-800 float-right rounded-full mx-1 px-2"><Link href="/shared" class="align-middle">Shared</Link></div>
            <div class="inline-block top-auto text-teal-800 float-right rounded-full px-2 bg-teal-100"><Link href="/" class="align-middle">Home</Link></div>
          </header>
          <Main />
          <NextScript />
        </ErrorBoundary>
      </body>
    </Html>
  )
}
