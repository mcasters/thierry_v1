"use client";

import s from "@/styles/Footer.module.css";
import { ROUTES } from "@/constants/specific/routes";
import { META } from "@/constants/specific";
import { useSession } from "@/app/context/sessionProvider";
import Link from "next/link";
import { useTheme } from "@/app/context/themeProvider";

type Props = {
  path: string | null;
  metaMap: { [index: string]: string };
};

export default function Footer({ path, metaMap }: Props) {
  const session = useSession();
  const theme = useTheme();
  const isPainting = path === ROUTES.PAINTING;
  const isSculpture = path === ROUTES.SCULPTURE;
  const isDrawing =
    metaMap[META.SITE_TITLE] === "Marion Casters"
      ? path === ROUTES.DRAWING
      : false;
  const isDark = isPainting || isSculpture || isDrawing;

  return (
    <>
      <footer
        className={isDark ? `${s.footer} ${s.dark}` : s.footer}
        style={isDark ? { color: theme.colorItem } : { color: theme.color }}
      >
        <p>{metaMap[META.FOOTER]}</p>
        <br />
        <br />
        {!session?.user && <Link href={ROUTES.LOGIN}>Admin</Link>}
      </footer>
    </>
  );
}
