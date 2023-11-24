import { Html, Head, Main, NextScript } from "next/document";
import React from "react";

export default function Document() {
	return (
    <Html dir="ltr">
      <Head>
        <link
          rel="icon"
          href="/assets/images/favicon.ico"
          type="image/x-icon"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
