"use client";

import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { BASE_PATH } from "@/constants/routes";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { PaintingCategory, SculptureCategory } from "@prisma/client";
import s from "@/styles/Layout.module.css";
import { useTheme } from "@/app/context/themeProvider";

interface Props {
  introduction?: string;
  paintingCategories: PaintingCategory[];
  sculptureCategories: SculptureCategory[];
  children: ReactNode;
}

export default function Layout({
  introduction,
  paintingCategories,
  sculptureCategories,
  children,
}: Props) {
  const theme = useTheme();
  const pathname = usePathname();
  const basePath = pathname.split("/")[1];
  const isHome = basePath === BASE_PATH.HOME;
  const isPainting = basePath === "peintures";
  const isSculpture = basePath === "sculptures";
  const isAdmin = basePath === "admin";

  return (
    <div className={isPainting || isSculpture ? `itemWrapper` : `wrapper`}>
      <div className={`${s.line} line`}></div>
      {isHome && <div className={s.gradient}></div>}
      {isAdmin && (
        <>
          {children}
          <Footer />
        </>
      )}
      {!isAdmin && (
        <>
          <Header
            basePath={basePath}
            introduction={introduction}
            paintingCategories={paintingCategories}
            sculptureCategories={sculptureCategories}
          />
          <Main isHome={isHome}>{children}</Main>
          <Footer />
        </>
      )}
      <style jsx>{`
        .line {
          background-color: ${theme.lineColor};
        }
      `}</style>
      <style jsx global>{`
        .wrapper {
          background-color: ${theme.backgroundColor};
          color: ${theme.color};
        }
        .wrapper a,
        .wrapper .buttonLink,
        .wrapper .iconButton svg {
          color: ${theme.linkColor};
        }
        .wrapper a:hover,
        .wrapper a:focus,
        .wrapper .buttonLink:hover,
        .wrapper .buttonLink:focus,
        .wrapper .iconButton:hover svg,
        .wrapper .iconButton:focus svg {
          color: ${theme.linkHoverColor};
        }

        .itemWrapper {
          background-color: ${theme.backgroundColorItem};
          color: ${theme.colorItem};
        }
        .itemWrapper a,
        .itemWrapper .buttonLink,
        .itemWrapper .iconButton svg {
          color: ${theme.linkItemColor};
        }
        .itemWrapper a:hover,
        .itemWrapper a:focus,
        .itemWrapper .buttonLink:hover,
        .itemWrapper .buttonLink:focus,
        .itemWrapper .iconButton:hover svg,
        .itemWrapper .iconButton:focus svg {
          color: ${theme.linkHoverItemColor};
        }
      `}</style>
    </div>
  );
}
