"use client";
import React from "react";
import styles from "./Prices.module.scss";
import { plans } from "../../../utils/Prices";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "../../shared/button/Button";

export const Prices = () => {
  return (
    <section className={styles.Prices}>
      <div className={styles.Prices__container}>
        <div className={styles.SectionTitle}>
          <p className={styles.SectionTitle__subHeading}>Pricing</p>
          <div className={styles.SectionTitle__content}>
            <b>Choose the right EasyFWD plan for you!</b>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>

        <div className={styles.Toggle}>
          <div className={styles.Toggle__content}>
            <Button
              text="Consumer"
              color="primary"
              size="rounded"
              border={true}
              onClick={() => {}}
            />
            <Button
              text="Business"
              color="secondary"
              size="rounded"
              border={false}
              onClick={() => {}}
            />
          </div>
        </div>

        <div className={styles.Cards}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`${styles.Card} ${
                plan.highlight ? styles.Highlighted : ""
              }`}
            >
              <div className={styles.PriceTitle}>
                <b className={styles.PriceTitle__heading}>
                  <span>{plan.name}</span>
                </b>
                <div className={styles.PriceTitle__text}>
                  {plan.description}
                </div>
              </div>
              <div
                className={`${styles.Divider} ${
                  plan.highlight ? styles.HighlightedDivider : ""
                }`}
              />

              <div className={styles.Price}>
                <b>
                  <span className={styles.span}>{plan.price}</span>
                  <span className={styles.Price__year}>/year</span>
                </b>
                <div className={styles.text}>Lorem ipsum dolor sit amet</div>
              </div>
              <button
                className={
                  plan.buttonColor === "primary"
                    ? styles.BlackBtn
                    : styles.WhiteBtn
                }
              >
                Get started
              </button>
              <div className={styles.Features}>
                <p>Features</p>
                <p>Everything in our brons plan:</p>
                <ul>
                  {plan.features.map((f, i) => (
                    <li key={i}>
                      <FaCheckCircle /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#">Learn More →</a>
            </div>
          ))}
        </div>

        <div className={styles.LargeTeams}>
          <p>For teams larger than 100 members.</p>
          <button className={styles.QuoteBtn}>Request a quote</button>
        </div>
      </div>
    </section>
  );
};
