import { signIn, signOut, useSession } from 'next-auth/react';

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
          <span>
            <small>Signed in as</small>
            <br />
            <strong>{session.user.email}</strong>
          </span>
          <br />
          <button
            className="buttonLink"
            onClick={() => {
              signOut();
            }}
          >
            Admin out
          </button>
        </>
      )}
    </div>
  );
}
