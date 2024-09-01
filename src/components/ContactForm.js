import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import EmailRule from '@util/EmailRule';
import SerializeForm from '@util/SerializeForm';
import useTranslations from '../components/useTranslations';

const elementMargin = 30;
const inputHeight = 45;
const formName = 'Contact';

const ContactForm = () => {
  const {
    contact_error,
    got_your_message,
    send_another,
    get_in_touch,
    contact_name,
    contact_email,
    contact_message,
    contact_submit,
    contact_clear,
    contact_field_required,
    contact_field_email,
  } = useTranslations();

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
      setError('submit', 'submitError', `${contact_error} ${error.message}`);
    }
  };

  const showSubmitError = (msg) => <p className="paragraph">{msg}</p>;

  const showThankYou = (
    <div className="msg-confirm">
      <p className="paragraph">{got_your_message}</p>
      <button
        className="reset"
        type="button"
        onClick={() => setSubmitted(false)}
      >
        {send_another}
      </button>
    </div>
  );

  const showForm = (
    <form
      className="form"
      onSubmit={handleSubmit(onSubmit)}
      name={formName}
      method="post"
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
          {contact_name}
        </label>
        <input
          className="input"
          type="text"
          name="name"
          id="name"
          height={inputHeight}
          ref={register({ required: contact_field_required })}
          disabled={isSubmitting}
          error={errors.name}
        />
        {errors.name && (
          <span className="field-error">{errors.name.message}</span>
        )}
      </div>
      <div className="field half">
        <label className="label" htmlFor="email" margin={elementMargin}>
          {contact_email}
        </label>
        <input
          className="input"
          type="text"
          name="email"
          id="email"
          height={inputHeight}
          ref={register({
            required: contact_field_required,
            pattern: { value: EmailRule.regex, message: contact_field_email },
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
          {contact_message}
        </label>
        <textarea
          className={errors.message && 'errors'}
          name="message"
          id="message"
          rows="6"
          ref={register({ required: contact_field_required })}
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
            value={contact_submit}
            className="special submit"
            disabled={isSubmitting}
          />
        </li>
        <li className="action-item">
          <input
            className="clear"
            type="reset"
            value={contact_clear}
            onClick={reset}
          />
        </li>
      </ul>
    </form>
  );

  return (
    <>
      <h1>{get_in_touch}</h1>
      {errors && errors.submit && showSubmitError(errors.submit.message)}
      <div>{submitted ? showThankYou : showForm}</div>
      <br />
      <p>
        Dial 911 in the case of a medical emergency. If you need to speak with
        us or our provider, please call 919-363-3437.
      </p>
      <p>
        Our email messages are <strong>NOT</strong> monitored on weekends,
        holidays, or during non-business hours.
      </p>
      <p>
        <strong>DO NOT</strong> send messages via email or the website if you
        need immediate assistance. Thank you.
      </p>
    </>
  );
};

export default ContactForm;
