import { Html, Head, Main, NextScript } from 'next/document';
import { hash } from 'bcrypt';
function createEncryptedPassword(password) {
  hash(password, 10, (err, hash) => {
    if (hash)
      console.log(
        'password : ' + password + ' // Password encrypted : ' + hash,
      );
  });
}

export default function Document() {
  createEncryptedPassword('admin');
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
