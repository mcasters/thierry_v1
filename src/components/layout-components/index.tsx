import { useRouter } from 'next/router';

import { ROUTES } from '@/constants/routes';
import Header from './Header';
import s from '@/styles/Layout.module.css';
import Footer from '@/components/layout-components/Footer';

export default function Layout({ introduction, children }) {
  const router = useRouter();
  const path = router.pathname;
  const isHome = path === ROUTES.HOME;
  const isAdmin = path.split('/')[1] === 'admin';

  return (
    <>
      <div className={s.line}></div>
      {!isAdmin && <Header introduction={introduction} isHome={isHome} />}
      {!isHome && (
        <main className={isAdmin ? `${s.main} ${s.light}` : `${s.main}`}>
          <div className={s.wrapper}>{children}</div>
        </main>
      )}
      {isHome && <main>{children}</main>}
      <Footer />
    </>
  );
}
