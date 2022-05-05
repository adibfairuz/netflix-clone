import {
    Html, Head, Main, NextScript,
} from 'next/document';

const Document = () => {
    return (
        <Html>
            <Head>
                <link rel="shortcut icon" href="/favicon.ico" />
                <title>Netflix Clone</title>
            </Head>
            <body>
                <Main />
                <div id="modal" />
                <NextScript />
            </body>
        </Html>
    );
};

export default Document;