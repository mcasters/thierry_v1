import { useEffect } from 'react';

import useElementIsUpTo from '@/components/hooks/useElementIsUpTo';
import LAYOUT from '@/constants/layout';
import Nav_1 from './Nav_1';
import Nav_2 from '@/components/layout-components/Nav_2';
import s from '../../styles/Header.module.css';

interface Props {
  isHome: boolean;
  introduction?: string;
  handler: (arg0: boolean) => void;
  title: string;
}
export default function Header({
  isHome,
  introduction,
  handler,
  title,
}: Props) {
  const [titleDisappear, titleRef] = useElementIsUpTo(LAYOUT.LINE_HEIGHT);
  const [introDisappear, introRef] = useElementIsUpTo(
    LAYOUT.NAV_1_HEIGHT + LAYOUT.LINE_HEIGHT,
  );

  useEffect(() => {
    handler(introDisappear);
  }, [introDisappear, handler]);

  return (
    <header className={s.container}>
      {isHome && (
        <h1 ref={titleRef} className={s.title}>
          {title}
        </h1>
      )}
      <Nav_1 isFix={isHome ? titleDisappear : true} />
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
