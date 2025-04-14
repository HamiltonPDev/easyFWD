import Link from "next/link";
import styles from "./Footer.module.scss";
import { FaYoutube } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className={styles.footer} aria-labelledby="footer-title">
      <div className={styles.footerSectionContainer}>
        <div className={styles.footerSection}>
          <address>
            <Link href="/">
              <img
                src="/images/logo_easyfwd.png"
                alt="EasyFWD logo"
                width="255"
              />
            </Link>
            <div>
              <div>
                <h3>Address:</h3>
                <p>Piet Heinkade 11,</p>
                <p>1019 BR Amsterdam</p>
              </div>
              <div>
                <h3>Contact:</h3>
                <p>
                  <a href="tel:+31651366382">+31(0) 6 51 36 63 82</a>
                </p>
                <p>
                  <a href="mailto:info@easyfwd.com">info@easyfwd.com</a>
                </p>
              </div>
            </div>
          </address>
          <div className={styles.footerLinks}>
            <div>
              <h3>Company</h3>
              <ul>
                <li>
                  <Link href="/about-us">About Us</Link>
                </li>
                <li>
                  <Link href="/faq">Frequently Asked Questions</Link>
                </li>
                <li>
                  <Link href="/contact-us">Contact Us</Link>
                </li>
                <li>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3>Products</h3>
              <ul>
                <li>
                  <Link href="/easyfwd">EasyFWD</Link>
                </li>
                <li>
                  <Link href="/easyflux">easyFlux</Link>
                </li>
                <li>
                  <Link href="/easyanalyse">EasyAnalyse</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3>Follow Us</h3>
              <ul>
                <li>
                  <Link
                    href="https://www.youtube.com/watch?v=xpyr28OoOjk&ab_channel=TomvanDijk"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaYoutube className={styles.footerIcon} />
                    Youtube
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <p>© 2025 EasyFWD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
