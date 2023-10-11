'use client';

import Link from 'next/link';

import { SiInstagram } from '@react-icons/all-files/si/SiInstagram';
import s from './HomeContactPart.module.css';

interface Props {
  title: string;
  imageSrc: string;
}
export default function HomeContactPart({ title, imageSrc }: Props) {
  return (
    <>
      <h1>{title}</h1>
      <address>
        <span>
          <strong>Thierry Casters</strong>
        </span>

        <br />
        <span>46 rue de la Mare - 75020 PARIS</span>
        <br />
        <br />
        <span>+33 (0)6 75 22 38 85</span>
        <br />
        <Link href="mailto:contact@thierrycasters.fr">
          contact@thierrycasters.fr
        </Link>
      </address>
      <br />
      <br />
      <a
        href="https://www.instagram.com/thierrycasters/"
        className={s.instagram}
        target="_blank"
        rel="noopener noreferrer"
      >
        <SiInstagram />
      </a>
    </>
  );
}
