import Link from "next/link";

import { getContentsFull } from "@/app/api/content/getContents";
import s from "@/styles/contact.module.css";
import {
  getAddressText,
  getContactText,
  getEmailText,
  getPhoneText,
} from "@/utils/commonUtils";
import InstagramIcon from "@/components/admin/icons/InstagramIcon";

export default async function Contact() {
  const contents = await getContentsFull();
  const email = getEmailText(contents);

  return (
    <>
      <address>
        <h1 className={s.title}>Contacter Thierry Casters</h1>
        <p>Thierry Casters</p>
        <p className={s.preLine}>{getAddressText(contents)}</p>
        <br />
        <p>{getPhoneText(contents)}</p>
      </address>
      <Link className={s.email} href={`mailto:${email}`}>
        {email}
      </Link>
      <a
        href="https://www.instagram.com/thierrycasters/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <InstagramIcon />
      </a>
      <div className={s.text}>
        <p className={s.preLine}>{getContactText(contents)}</p>
      </div>
    </>
  );
}
