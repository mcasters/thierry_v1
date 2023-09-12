import { useRouter } from 'next/router';

import { ROUTES } from '@/constants/routes';
import Header from './Header';
import s from '@/styles/Layout.module.css';
import Footer from '@/components/layout-components/Footer';

export default function Layout({ introduction, children }) {
  const router = useRouter();
  const isLarge = router.pathname === ROUTES.HOME;
  const isDark = router.pathname === ROUTES.PAINTING || ROUTES.SCULPTURE;

  return (
    <>
      <div className={s.line}></div>
      <Header introduction={introduction} isHome={isLarge} />
      {!isLarge && (
        <main className={isDark ? `${s.main} ${s.dark}` : `${s.main}`}>
          <div className={s.wrapper}>{children}</div>
        </main>
      )}
      {isLarge && <main>{children}</main>}
      <Footer />
    </>
  );
}
