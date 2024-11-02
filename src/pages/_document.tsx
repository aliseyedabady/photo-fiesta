import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang={'en'}>
      <Head>
        <title>Photo Fiesta</title>
        <meta
          content={
            'Photo Fiesta is a place where you can share your photos with your friends and family.'
          }
          name={'description'}
        />
        <link href={'/favicon.jpg'} rel={'icon'} sizes={'32x32'} type={'image/png'} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
