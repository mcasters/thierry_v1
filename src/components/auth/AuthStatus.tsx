import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import s from './AuthStatus.module.css';

export default function AuthStatus() {
  const { data: session } = useSession();

  return (
    <div>
      {!session && (
        <button
          className="buttonLink"
          onClick={() => {
            signIn();
          }}
        >
          Admin in
        </button>
      )}
      {session?.user && (
        <>
          <p>
            <small>Signed in as :</small>
            <br />
            <strong>{session.user.email}</strong>
          </p>
          <Link href="/admin">Administration du site</Link>
          <span className={s.separator}>-</span>
          <button
            className="buttonLink"
            onClick={() => {
              signOut();
            }}
          >
            Admin out
          </button>
          <span className={s.separator}>-</span>
          <Link href="/">Home</Link>
        </>
      )}
    </div>
  );
}
