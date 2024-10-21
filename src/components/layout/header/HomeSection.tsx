"use client";

import s from "../../../styles/Header.module.css";
import { GENERAL } from "@/constants/metaHtml";
import React, { useEffect, useRef, useState } from "react";
import { useAlert } from "@/app/context/AlertProvider";

interface Props {
  handleDisappear: (arg0: boolean) => void;
  yLimit: number;
  text?: string;
}

export default function HomeSection({
  handleDisappear,
  yLimit,
  text = "",
}: Props) {
  const [isGone, setIsGone] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const alert = useAlert();

  useEffect(() => {
    handleDisappear(isGone);
  }, [isGone, handleDisappear]);

  useEffect(() => {
    function handleScroll() {
      if (ref.current) {
        const _isGone = ref.current.getBoundingClientRect().bottom <= yLimit;
        setIsGone(_isGone);
      }
    }
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [isGone, yLimit]);

  return text === "" ? (
    <section ref={ref} className={s.siteTitle}>
      <h1 className={`${s.title} title`}>{GENERAL.SITE_TITLE}</h1>
    </section>
  ) : (
    <section ref={ref} className={s.intro}>
      <p>{text}</p>
    </section>
  );
}
