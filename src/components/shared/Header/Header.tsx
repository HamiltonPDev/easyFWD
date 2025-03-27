"use client";
import Link from "next/link";
import styles from "./Header.module.scss";
import Image from "next/image";
import { Button } from "../button/Button";

export const Header = () => {
  return (
    <header>
      <nav className={styles.Header}>
        <Link href="/">
          <Image
            src="/images/logo_easyfwd.png"
            alt="EasyFWD"
            className={styles.Header__logo}
            width={155}
            height={40}
            loading="eager"
          />
        </Link>
        <div className={styles.Header__nav}>
          <ul className={styles.Header__list}>
            <li>
              <Link href="/">EasyFWD</Link>
            </li>
            <li>
              <Link href="/store">EasyFlux</Link>
            </li>
            <li>
              <Link href="/test">EasyAnalyse</Link>
            </li>
            <li>
              <Link href="/">About Us</Link>
            </li>
            <li>
              <Link href="/">FAQ</Link>
            </li>
            <li>
              <Link href="/">Contact</Link>
            </li>
          </ul>
          <div className={styles.Header__buttons}>
            <Button
              text="Login"
              color="primary"
              size="medium"
              onClick={() => {
                /* handle click */
              }}
            />
            <Button
              text="Book Demo"
              color="secondary"
              size="medium"
              onClick={() => {
                /* handle click */
              }}
            />
          </div>
        </div>
      </nav>
    </header>
  );
};
