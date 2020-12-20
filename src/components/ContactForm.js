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

  const showSubmitError = (msg) => <Paragraph>{msg}</Paragraph>;

  const showThankYou = (
    <div className="msg-confirm">
      <Paragraph>I got your message. Thanks!</Paragraph>
      <Reset type="button" onClick={() => setSubmitted(false)}>
        Send another one
      </Reset>
    </div>
  );

  const showForm = (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      name={formName}
      method="post"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      margin={elementMargin}
    >
      <div hidden>
        <Label htmlFor="bot-field">Honeypot</Label>
        <Input type="hidden" id="bot-field" name="bot-field" />
        <Label htmlFor="form-name">Form name</Label>
        <Input
          type="hidden"
          id="form-name"
          name="form-name"
          value={formName}
          disabled={true}
        />
      </div>
      <div className="field half first">
        <Label htmlFor="name" margin={elementMargin}>
          Name
        </Label>
        <Input
          type="text"
          name="name"
          id="name"
          height={inputHeight}
          ref={register({ required })}
          disabled={isSubmitting}
          error={errors.name ? true : false}
        />
        {errors.name && <FieldError>{errors.name.message}</FieldError>}
      </div>
      <div className="field half">
        <Label htmlFor="email" margin={elementMargin}>
          Email
        </Label>
        <Input
          type="text"
          name="email"
          id="email"
          height={inputHeight}
          ref={register({
            required: required,
            pattern: { value: EmailRule.regex, message: EmailRule.message },
          })}
          disabled={isSubmitting}
          error={errors.email ? true : false}
        />
        {errors.email && <FieldError>{errors.email.message}</FieldError>}
      </div>
      <div className="field">
        <Label htmlFor="message" margin={elementMargin}>
          Message
        </Label>
        <Textarea
          name="message"
          id="message"
          rows="6"
          ref={register({ required })}
          disabled={isSubmitting}
          error={errors.message ? true : false}
        ></Textarea>
        {errors.message && <FieldError>{errors.message.message}</FieldError>}
      </div>
      <Actions className="actions">
        <ActionItem>
          <Submit
            type="submit"
            value="Send Message"
            className="special"
            disabled={isSubmitting}
          />
        </ActionItem>
        <ActionItem>
          <Clear type="reset" value="Clear" onClick={reset} />
        </ActionItem>
      </Actions>
    </Form>
  );

  return (
    <Section id="contact">
      <Container>
        <h1>Get in touch.</h1>
        {errors && errors.submit && showSubmitError(errors.submit.message)}
        <div>{submitted ? showThankYou : showForm}</div>
      </Container>
    </Section>
  );
};

export default ContactForm;
