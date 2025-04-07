"use client";
import Link from "next/link";
import styles from "./Header.module.scss";
import Image from "next/image";
import { ShoppingCartIcon } from "../../icons/ShoppingCartIcon";
import { navItems } from "app/utils/NavData";
import { usePathname } from "next/navigation";
import { Button } from "../button/Button";
import { NavMenu } from "./NavMenu";
import { FaRegUser } from "react-icons/fa";

export const Header = () => {
  const pathname = usePathname();
  const isEasyAnalyse = pathname.includes("/easyAnalyse");

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
            {navItems
              .filter(({ path }) => path) // Ensure path is not undefined
              .map(({ label, path }) => (
                <Link href={path as string} key={label}>
                  <li>{label}</li>
                </Link>
              ))}
          </ul>
          <div className={styles.Header__buttons}>
            <Button
              icon={<ShoppingCartIcon />}
              color="transparent"
              size="regular"
              border={true}
              onClick={() => {
                /* handle click */
              }}
            />
            {isEasyAnalyse && (
              <Button
                href="/"
                text="Login"
                color="primary"
                size="small"
                onClick={() => {}}
              />
            )}
            <Button
              href="/store"
              text="Book Demo"
              color="secondary"
              size="small"
              onClick={() => {}}
            />
          </div>
        </div>
        <div className={styles.Header__mobile}>
          <Button
            icon={<ShoppingCartIcon />}
            color="transparent"
            size="regular"
            onClick={() => {}}
          />
          {isEasyAnalyse && (
            <Button
              href="/store"
              icon={<FaRegUser />}
              color="primary"
              size="regular"
              onClick={() => {}}
            />
          )}
          <NavMenu />
        </div>
      </nav>
    </header>
  );
};
