import { Html, Head, Main, NextScript } from 'next/document';
import bcrypt from 'bcryptjs';

export default function Document() {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync('site.test.123', salt);
  console.log('//// hash : ');
  console.log(hash);
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
