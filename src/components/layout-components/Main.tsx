import { ReactNode } from 'react';

import useViewport from '@/components/hooks/useWindowSize';
import s from '@/styles/Main.module.css';

export type Props = {
  isHome: boolean;
  children: ReactNode;
};

export default function Main({ isHome, children }) {
  const { innerWidth, innerHeight } = useViewport();

  return isHome ? (
    <main
      className={s.mainHome}
      style={{
        backgroundImage:
          innerWidth / innerHeight < 1
            ? `url('/images/miscellaneous/7d14afd4eddc4df7dec6b5802.webp')`
            : `url('/images/miscellaneous/13dcfa5a658abd5b52e4fb100.webp')`,
      }}
    >
      {children}
    </main>
  ) : (
    <main className={s.main}>{children}</main>
  );
}
