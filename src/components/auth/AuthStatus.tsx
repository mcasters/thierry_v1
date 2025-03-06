"use client";

import Link from "next/link";

import s from "./Auth.module.css";
import { ROUTES } from "@/constants/specific/routes";
import LogoutForm from "@/components/auth/LogoutForm";

type Props = {
  email: string;
};

export default function AuthStatus({ email }: Props) {
  return (
    <div className={s.authStatusWrapper}>
      <div className={s.container}>
        <p>
          <small>
            Signed in as :
            <br />
            <strong>{email}</strong>
          </small>
        </p>
        <br />
        <Link href={ROUTES.ADMIN}>Administration du site</Link>
        <br />
        <LogoutForm />
        <br />
        <Link href={ROUTES.HOME}>Home</Link>
      </div>
    </div>
  );
}
