import { useRouter } from 'next/router';

import { ROUTES } from '@/constants/routes';
import Header from './Header';
import s from '../../styles/Layout.module.css';
import LAYOUT from '@/constants/layout';

export default function Layout({ introduction, children }) {
  const router = useRouter();
  const isHome = router.pathname === ROUTES.HOME;

  return (
    <>
      <div className={s.line}></div>
      <Header introduction={introduction} isHome={isHome} />
      {!isHome && (
        <main className={s.main}>
          <div className={s.wrapper}>{children}</div>
        </main>
      )}
      {isHome && <main>{children}</main>}
    </>
  );
}
