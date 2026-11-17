# Contact form email delivery

The portfolio is exported as a static site and deployed to Vercel, so it does
not run a private server-side mail API. The contact form sends submissions to
FormSubmit's hosted AJAX endpoint, which forwards them to the address in
`PROFILE.email` (`src/lib/data.ts`).

## Activate delivery

1. Deploy the portfolio, or run it locally and submit a real message from the
   Contact section.
2. Open the FormSubmit activation email sent to `kiran.nxt19@gmail.com` and
   confirm the form. Check spam if it is not in the inbox.
3. Submit the form again. New submissions will then be delivered to that inbox;
   replies use the sender's email address.

FormSubmit's AJAX endpoint and reply-to field are documented at
<https://formsubmit.co/ajax-documentation> and
<https://formsubmit.co/documentation>.
