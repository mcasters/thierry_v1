'use client';

import { PaintingCategory, SculptureCategory } from '@prisma/client';
import useElementIsUpTo from '@/components/hooks/useElementIsUpTo';
import LAYOUT from '@/constants/layout';
import Nav_1 from './Nav_1';
import Nav_2 from '@/components/layout-components/Nav_2';
import s from '../../styles/Header.module.css';

interface Props {
  isHome: boolean;
  introduction?: string;
  title: string;
  paintingCategories: PaintingCategory[];
  sculptureCategories: SculptureCategory[];
}
export default function Header({
  isHome,
  introduction,
  title,
  paintingCategories,
  sculptureCategories,
}: Props) {
  const { isUpTo: titleDisappear, ref: titleRef } = useElementIsUpTo(
    LAYOUT.LINE_HEIGHT,
  );
  const { isUpTo: introDisappear, ref: introRef } = useElementIsUpTo(
    LAYOUT.NAV_1_HEIGHT + LAYOUT.LINE_HEIGHT,
  );

  return (
    <header className={s.container}>
      {isHome && (
        <div ref={titleRef}>
          <h1 className={s.title}>{title}</h1>
        </div>
      )}
      <Nav_1
        isHome={isHome}
        isFix={isHome ? titleDisappear : true}
        paintingCategories={paintingCategories}
        sculptureCategories={sculptureCategories}
      />
      <div
        className={s.spaceNav1}
        style={{
          display: titleDisappear ? 'block' : 'none',
        }}
      />
      {isHome && introduction && (
        <div ref={introRef} className={s.intro}>
          <p>{introduction}</p>
        </div>
      )}
      <Nav_2 isHome={isHome} isFix={isHome ? introDisappear : true} />
      <div
        className={s.spaceNav2}
        style={{
          display: introDisappear ? 'block' : 'none',
        }}
      />
    </header>
  );
}
