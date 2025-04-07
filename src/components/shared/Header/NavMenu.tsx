"use client";

import React, { useState } from "react";
import { navItems } from "app/utils/NavData";
import { NavButton } from "./NavButton";
import Link from "next/link";
import styles from "./Header.module.scss";
import { AnimatePresence, motion } from "framer-motion";

export const NavMenu = () => {
  // save the state of the menu
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.NavMenu}>
      <NavButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className={styles.NavMenu__line}
          >
            <ul className={styles.MenuList}>
              {navItems.map(({ label, path }) => (
                <li key={label}>
                  <Link href={path}>{label}</Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
