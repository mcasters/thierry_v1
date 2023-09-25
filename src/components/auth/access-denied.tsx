'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function AccessDenied() {
  return (
    <>
      <h1>Access Denied</h1>
      <p>
        <button
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          You must be signed in to view this page
        </button>
      </p>
    </>
  );
}
