import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700&display=swap"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#1b1a23" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <style jsx global>{`
          * {
            box-sizing: border-box;
            font-family: "Open Sans", sans-serif;
          }

          body {
            color: #ffffff;
            background-color: #1b1a23;
            min-height: 100vh;
            width: 100%;
            padding: 0;
            margin: 0;
          }
        `}</style>
      </Html>
    );
  }
}

export default MyDocument;
