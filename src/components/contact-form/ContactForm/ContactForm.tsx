"use client";

import styles from "./ContactForm.module.scss";
import content from "./contact-form.json";
import { Button } from "../../shared/button/Button";
import { MdEmail, MdLocalPhone, MdLocationOn } from "react-icons/md";
import dynamic from "next/dynamic";

// Dynamically import react-select to avoid SSR issues
const Select = dynamic(() => import("react-select"), { ssr: false });

export const ContactForm = () => {
  const { header, contactDetails, form } = content;

  return (
    <section
      className={styles.ContactForm__section}
      aria-labelledby="contact-form-title"
    >
      <div className={styles.ContactForm__sectionContainer}>
        <div className={styles.ContactForm}>
          <header className={styles.ContactForm__header}>
            <div>
              <h2>{header.subheading}</h2>
              <div>
                <h1 id="contact-form-title">{header.title}</h1>
                <p>{header.description}</p>
              </div>
            </div>
            <ul className={styles.ContactForm__contactDetails}>
              <li>
                <MdEmail className={styles.contactIcons} />
                <a href={`mailto:${contactDetails.email}`}>
                  {contactDetails.email}
                </a>
              </li>
              <li>
                <MdLocalPhone className={styles.contactIcons} />
                <a href={`tel:${contactDetails.telephone}`}>
                  {contactDetails.telephone}
                </a>
              </li>
              <li>
                <MdLocationOn className={styles.contactIcons} />
                {contactDetails.address}
              </li>
            </ul>
          </header>

          <form className={styles.ContactForm__form}>
            {form.fields.map((field, index) => {
              if (field.type === "textarea") {
                return (
                  <label
                    key={index}
                    className={styles.ContactForm__labelTextarea}
                  >
                    {field.label}
                    <textarea
                      name={field.name}
                      placeholder={field.placeholder}
                      required={field.required}
                      rows={field.rows}
                    />
                  </label>
                );
              }

              if (field.type === "select") {
                return (
                  <label
                    key={index}
                    className={styles.ContactForm__labelSelect}
                  >
                    {field.label}
                    <Select
                      options={field.options?.map((option: string) => ({
                        value: option,
                        label: option,
                      }))}
                      placeholder={field.placeholder}
                      name={field.name}
                    />
                  </label>
                );
              }

              if (field.type === "radio") {
                return (
                  <fieldset
                    key={index}
                    className={styles.ContactForm__fieldset}
                  >
                    <legend className={styles.ContactForm__legend}>
                      {field.label}
                    </legend>
                    {field.options?.map((option: string, id: number) => (
                      <label
                        key={id}
                        className={styles.ContactForm__radioLabel}
                      >
                        <input
                          type="radio"
                          name={field.name}
                          value={option}
                          required={field.required}
                        />
                        {option}
                      </label>
                    ))}
                  </fieldset>
                );
              }

              if (field.type === "checkbox") {
                return (
                  <label
                    key={index}
                    className={styles.ContactForm__labelCheckbox}
                  >
                    <input
                      type="checkbox"
                      name={field.name}
                      required={field.required}
                    />{" "}
                    {field.label}
                  </label>
                );
              }

              return (
                <label key={index} className={styles.ContactForm__label}>
                  {field.label}
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                </label>
              );
            })}
            <Button
              text={form["submit-button"].linkText}
              color="secondary"
              size="medium"
              onClick={() => {}}
            />
          </form>
        </div>
      </div>
    </section>
  );
};
