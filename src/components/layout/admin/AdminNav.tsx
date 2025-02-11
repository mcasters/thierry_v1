"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_MENU } from "@/constants/specific/routes";
import s from "@/styles/admin/AdminNav.module.css";

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className={s.nav}>
      <span>Administration</span>
      <ul className={s.navItems}>
        {ADMIN_MENU.map((item) => {
          const isActive = pathname === item.ROUTE;

          return (
            <li key={item.TAG}>
              <Link
                href={item.ROUTE}
                key={item.TAG}
                className={isActive ? `${s.link} ${s.active}` : `${s.link}`}
                legacyBehavior={false}
              >
                {item.TAG}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
