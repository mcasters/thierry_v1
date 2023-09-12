import s from '../../styles/Header.module.css';
import Nav from './Nav';
import useElementIsUpTo from '@/components/hooks/useElementIsUpTo';
import LAYOUT from '@/constants/layout';

export default function Header({ isHome, introduction }) {
  const [stickyNav, introRef] = useElementIsUpTo(0);

  return (
    <header className={s.container}>
      {isHome && (
        <div ref={introRef} className={s.intro}>
          <h1 className={s.title}>Thierry Casters</h1>
          <div className={s.text}>{introduction}</div>
        </div>
      )}
      <Nav isFix={isHome ? stickyNav : true} />
      <div
        style={{
          display: stickyNav ? 'block' : 'none',
          height: LAYOUT.NAV_HEIGHT,
        }}
      />
    </header>
  );
}
