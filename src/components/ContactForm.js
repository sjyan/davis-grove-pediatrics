import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import EmailRule from '@util/EmailRule';
import SerializeForm from '@util/SerializeForm';

const elementMargin = 30;
const inputHeight = 45;
const required = 'This field is required.';
const formName = 'Contact';

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    errors,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: SerializeForm({
          'form-name': formName,
          ...data,
        }),
      });
      setSubmitted(true);
      reset();
    } catch (error) {
      setError(
        'submit',
        'submitError',
        `Oops! There seems to be an issue! ${error.message}`
      );
    }
  };

  const showSubmitError = (msg) => <p className="paragraph">{msg}</p>;

  const showThankYou = (
    <div className="msg-confirm">
      <p className="paragraph">We got your message. Thanks!</p>
      <button
        className="reset"
        type="button"
        onClick={() => setSubmitted(false)}
      >
        Send another one
      </button>
    </div>
  );

  const showForm = (
    <form
      className="form"
      onSubmit={handleSubmit(onSubmit)}
      name={formName}
      method="post"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      margin={elementMargin}
    >
      <div hidden>
        <label className="label" htmlFor="bot-field">
          Honeypot
        </label>
        <input
          className="input"
          type="hidden"
          id="bot-field"
          name="bot-field"
        />
        <label className="label" htmlFor="form-name">
          Form name
        </label>
        <input
          className="input"
          type="hidden"
          id="form-name"
          name="form-name"
          value={formName}
          disabled={true}
        />
      </div>
      <div className="field half first">
        <label className="label" htmlFor="name" margin={elementMargin}>
          Name
        </label>
        <input
          className="input"
          type="text"
          name="name"
          id="name"
          height={inputHeight}
          ref={register({ required })}
          disabled={isSubmitting}
          error={errors.name}
        />
        {errors.name && (
          <span className="field-error">{errors.name.message}</span>
        )}
      </div>
      <div className="field half">
        <label className="label" htmlFor="email" margin={elementMargin}>
          Email
        </label>
        <input
          className="input"
          type="text"
          name="email"
          id="email"
          height={inputHeight}
          ref={register({
            required,
            pattern: { value: EmailRule.regex, message: EmailRule.message },
          })}
          disabled={isSubmitting}
          error={errors.email}
        />
        {errors.email && (
          <span className="field-error">{errors.email.message}</span>
        )}
      </div>
      <div className="field">
        <label className="label" htmlFor="message" margin={elementMargin}>
          Message
        </label>
        <textarea
          className={errors.message && 'errors'}
          name="message"
          id="message"
          rows="6"
          ref={register({ required })}
          disabled={isSubmitting}
          error={errors.message}
        ></textarea>
        {errors.message && (
          <span className="field-error">{errors.message.message}</span>
        )}
      </div>
      <ul className="actions">
        <li className="action-item">
          <input
            type="submit"
            value="Send Message"
            className="special submit"
            disabled={isSubmitting}
          />
        </li>
        <li className="action-item">
          <input className="clear" type="reset" value="Clear" onClick={reset} />
        </li>
      </ul>
    </form>
  );

  return (
    <>
      <h1>Get in touch.</h1>
      {errors && errors.submit && showSubmitError(errors.submit.message)}
      <div>{submitted ? showThankYou : showForm}</div>
    </>
  );
};

export default ContactForm;
