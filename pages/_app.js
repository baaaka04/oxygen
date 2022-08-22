import '../styles/global.css';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/favicon.ico" />
                <link rel="manifest" href="manifest.json" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
                <title>Accounting App</title>
            </Head>
            <Component {...pageProps} />
        </>
    )
}