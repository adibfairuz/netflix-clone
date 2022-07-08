import {
    Html, Head, Main, NextScript,
} from 'next/document';

const Document = () => {
    return (
        <Html>
            <Head>
                <link rel="shortcut icon" href="/favicon.ico" />
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