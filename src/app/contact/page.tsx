import Link from "next/link";

import { getContentsFull } from "@/app/api/content/getContents";
import s from "@/styles/contact.module.css";
import {
  getAddressText,
  getContactText,
  getEmailText,
  getPhoneText,
} from "@/utils/commonUtils";
import InstagramIcon from "@/components/icons/InstagramIcon";

export default async function Contact() {
  const contents = await getContentsFull();
  const email = getEmailText(contents);

  return (
    <>
      <address>
        <p>Thierry Casters</p>
        <p className={s.preLine}>{getAddressText(contents)}</p>
        <br />
        <p>
          <Link href={`tel:+33${getPhoneText(contents)}`}>
            {getPhoneText(contents)}
          </Link>
        </p>
        <br />

        <p>
          <Link className={s.email} href={`mailto:${email}`}>
            {email}
          </Link>
        </p>
        <br />
        <br />
        <br />
        <br />
        <a
          href="https://www.instagram.com/thierrycasters/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon />
        </a>
      </address>
      <div className={s.text}>
        <p className={s.preLine}>{getContactText(contents)}</p>
      </div>
    </>
  );
}
