"use client";
import Link from "next/link";
import styles from "./Header.module.scss";
import Image from "next/image";
import { ShoppingCartIcon } from "../../icons/ShoppingCartIcon";
import { navItems } from "app/utils/NavData";
import { Button } from "../button/Button";
import { NavMenu } from "./NavMenu";
import { FaRegUser } from "react-icons/fa";

export const Header = () => {
  return (
    <header>
      <nav className={styles.Header}>
        <Link href="/">
          <Image
            src="/images/logo_easyfwd.png"
            alt="EasyFWD"
            className={styles.Header__logo}
            quality={80}
            width={155}
            height={40}
            loading="eager"
          />
        </Link>
        <div className={styles.Header__nav}>
          <ul className={styles.Header__list}>
            {navItems.map(({ label }) => (
              <Link href="/" key={label}>
                <li>{label}</li>
              </Link>
            ))}
          </ul>
          <div className={styles.Header__buttons}>
            <Button
              icon={<ShoppingCartIcon />}
              color="transparent"
              size="regular"
              onClick={() => {
                /* handle click */
              }}
            />
            <Button
              href="/store"
              text="Login"
              color="primary"
              size="medium"
              onClick={() => {}}
            />
            <div className={styles["Header__button--demo"]}>
              <Button
                text="Book Demo"
                color="secondary"
                size="medium"
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
        <div className={styles.Header__mobile}>
          <Button
            icon={<ShoppingCartIcon />}
            color="transparent"
            size="regular"
            onClick={() => {}}
          />
          <Button
            href="/store"
            icon={<FaRegUser />}
            color="primary"
            size="regular"
            onClick={() => {}}
          />
          <NavMenu />
        </div>
      </nav>
    </header>
  );
};
