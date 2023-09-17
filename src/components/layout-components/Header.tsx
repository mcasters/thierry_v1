import s from '../../styles/Header.module.css';
import Nav from './Nav';
import useElementIsUpTo from '@/components/hooks/useElementIsUpTo';
import LAYOUT from '@/constants/layout';
import { useRef } from 'react';

interface Props {
  isHome: boolean;
  introduction?: string;
}
export default function Header({ isHome, introduction }: Props) {
  const introRef = useRef<HTMLDivElement>(null);
  const [isUpTo] = useElementIsUpTo(0, introRef);

  return (
    <header className={s.container}>
      {isHome && introduction && (
        <div ref={introRef} className={s.intro}>
          <h1 className={s.title}>Thierry Casters</h1>
          <div className={s.text}>{introduction}</div>
        </div>
      )}
      <Nav isFix={isHome ? isUpTo : true} />
      <div
        style={{
          display: isUpTo ? 'block' : 'none',
          height: LAYOUT.NAV_HEIGHT,
        }}
      />
    </header>
  );
}
