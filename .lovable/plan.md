## Goal
Backend `create-checkout-session` now rejects requests without `customerEmail` (400). Add it to the frontend payload.

## Change
One file: `src/utils/stripeUtils.js`

In `handleCheckout`, resolve the current user's email from Supabase auth and include it in the function body. If no session exists, fall back to prompting (or pull from a known lead-form field if available) — but the simplest and safest approach is the authenticated user's email.

```js
// Before invoking the function, get the user
const { data: { user } } = await supabase.auth.getUser();
const customerEmail = user?.email;

if (!customerEmail) {
  throw new Error('Please sign in (or provide your email) before checking out.');
}

const { data, error } = await supabase.functions.invoke('create-checkout-session', {
  body: {
    priceId,
    productName: name,
    paymentType: isSubscription ? 'subscription' : 'one-time',
    customerEmail,                       // ← new, required by backend
    recipientEmail: 'troy@enteraustralia.tech'
  }
});
```

## Notes
- No backend, no other files. Pure frontend payload addition.
- If the site supports anonymous checkout (no login), confirm whether to:
  (a) pull email from the lead form state, or
  (b) add a lightweight email prompt before redirect.
  Default in this plan: use the authenticated user's email and surface a clear error if missing.

## Verification
1. Click any paid plan while signed in → request body contains `customerEmail`; Stripe session created; redirect succeeds.
2. Signed out → user sees the "please sign in / provide email" error instead of a silent 400.