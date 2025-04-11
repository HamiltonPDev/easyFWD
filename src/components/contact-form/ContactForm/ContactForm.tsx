"use client";

import styles from "./ContactForm.module.scss";
import content from "./contact-form.json";
import { Button } from "../../shared/button/Button";
import { MdEmail, MdLocalPhone, MdLocationOn } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useState } from "react";

export const ContactForm = () => {
  const { header, contactDetails, form } = content;
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccess(true);
        reset();
      } else {
        throw new Error("Failed to send mail");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(true);
    }
  };

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

          <form
            className={styles.ContactForm__form}
            onSubmit={handleSubmit(onSubmit)}
          >
            {form.fields.map((field, index) => {
              if (field.type === "textarea") {
                return (
                  <label
                    key={index}
                    className={styles.ContactForm__labelTextarea}
                  >
                    {field.label}
                    <textarea
                      {...register(field.name, { required: field.required })}
                      placeholder={field.placeholder}
                      rows={field.rows}
                    />
                    {errors[field.name] && (
                      <span className={styles.ContactForm__errorMessage}>
                        {field.errorMessage}
                      </span>
                    )}
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
                    <select
                      {...register(field.name, { required: field.required })}
                    >
                      <option value="" disabled>
                        {field.placeholder}
                      </option>
                      {field.options?.map((option: string, id: number) => (
                        <option key={id} value={option}>
                          {option}
                        </option>
                      ))}
                      {errors[field.name] && (
                        <span className={styles.ContactForm__errorMessage}>
                          {field.errorMessage}
                        </span>
                      )}
                    </select>
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
                          {...register(field.name, {
                            required: field.required,
                          })}
                          type="radio"
                          value={option}
                        />
                        {option}
                      </label>
                    ))}
                    {errors[field.name] && (
                      <span className={styles.ContactForm__errorMessage}>
                        {field.errorMessage}
                      </span>
                    )}
                  </fieldset>
                );
              }

              if (field.type === "checkbox") {
                return (
                  <label
                    key={index}
                    className={styles.ContactForm__labelCheckbox}
                  >
                    <div>
                      <input
                        type="checkbox"
                        {...register(field.name, {
                          required: field.required,
                        })}
                      />
                      {field.label}
                    </div>
                    {errors[field.name] && (
                      <span className={styles.ContactForm__errorMessage}>
                        {field.errorMessage}
                      </span>
                    )}
                  </label>
                );
              }

              return (
                <label key={index} className={styles.ContactForm__label}>
                  {field.label}
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    {...register(field.name, { required: field.required })}
                  />
                  {errors[field.name] && (
                    <span className={styles.ContactForm__errorMessage}>
                      {field.errorMessage}
                    </span>
                  )}
                </label>
              );
            })}
            <Button
              text={form["submit-button"].linkText}
              buttonType={form["submit-button"].type}
              color="secondary"
              size="medium"
              disabled={isSubmitting}
              onClick={() => {}}
            />

            {isSubmitSuccessful && success && (
              <p className={styles.ContactForm__successMessage}>
                Your message has been sent successfully!
              </p>
            )}
            {error && (
              <p className={styles.ContactForm__errorMessage}>
                There was an error sending your message. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
