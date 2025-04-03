import React from "react";
import styles from "./Prices.module.scss";
import { plans } from "../../../utils/Prices";

export const Prices = () => {
  return (
    <section className={styles.prices}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Pricing</p>
        <h2>Choose the right EasyFWD plan for you!</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <div className={styles.toggle}>
          <button className={styles.active}>Consumer</button>
          <button>Business</button>
        </div>
      </div>

      <div className={styles.cards}>
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`${styles.card} ${
              plan.highlight ? styles.highlighted : ""
            }`}
          >
            <h3>{plan.name}</h3>
            <p className={styles.description}>{plan.description}</p>
            <p className={styles.price}>
              <strong>{plan.price}</strong>/year
            </p>
            <button
              className={
                plan.buttonColor === "primary"
                  ? styles.blackBtn
                  : styles.whiteBtn
              }
            >
              Get started
            </button>
            <div className={styles.features}>
              <p>Features</p>
              <p>Everything in our brons plan:</p>
              <ul>
                {plan.features.map((f, i) => (
                  <li key={i}>✔ {f}</li>
                ))}
              </ul>
            </div>
            <a href="#">Learn More →</a>
          </div>
        ))}
      </div>

      <div className={styles.largeTeams}>
        <p>For teams larger than 100 members.</p>
        <button className={styles.quoteBtn}>Request a quote</button>
      </div>
    </section>
  );
};
