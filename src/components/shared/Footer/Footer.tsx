import Link from "next/link";
import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer>
      <div className={styles.footerSectionContainer}>
        <div className={styles.footerSection}>
          <address>
            <Link href="/">
              <img
                src="/images/logo_easyfwd.png"
                alt="EasyFWD logo"
                width="155"
                height="40"
              />
            </Link>
            <div>
              <div>
                <h1>Address:</h1>
                <p>Piet Heinkade 11,</p>
                <p>1019 BR Amsterdam</p>
              </div>
              <div>
                <h1>Contact:</h1>
                <p>
                  <a href="tel:+31651366382">+31(0) 6 51 36 63 82</a>
                </p>
                <p>
                  <a href="mailto:info@easyfwd.com">info@easyfwd.com</a>
                </p>
              </div>
            </div>
          </address>
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Products</th>
                <th>Follow Us</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Link
                    href="/about-us"
                  >
                    About Us
                  </Link>
                </td>
                <td>
                  <Link
                    href="easyfwd"
                  >
                    EasyFWD
                  </Link>
                </td>
                <td>
                  <Link
                    href="https://www.youtube.com/watch?v=xpyr28OoOjk&ab_channel=TomvanDijk"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div>
                      <img
                        src="/icons/Youtube.svg"
                        alt="Youtube Icon"
                        width="24"
                        height="24"
                      />
                      Youtube
                    </div>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link
                    href="/faq"
                  >
                    Frequently Asked Questions
                  </Link>
                </td>
                <td>
                  <Link
                    href="/easyflux"
                  >
                    EasyFlux
                  </Link>
                </td>
                {/* <td>Instagram</td> */}
              </tr>
              <tr>
                <td>
                  <Link
                    href="/contact-us"
                  >
                    Contact Us
                  </Link>
                </td>
                <td>
                  <Link
                    href="/easyanalyse"
                  >
                    EasyAnalyse
                  </Link>
                </td>
                {/* <td>LinkedIn</td> */}
              </tr>
              <tr>
                <td>
                  <Link
                    href="/privacy-policy"
                  >
                    Privacy Policy
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <p>© 2025 EasyFWD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
