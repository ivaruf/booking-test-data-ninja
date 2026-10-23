# Booking Test Data Ninja 🥷

A Chrome extension for the origo-booking admin. A chibi ninja sleeps at the bottom of the
"ny booking på vegne av" page (`/ny-booking/pa-vegne-av`). Click him and he wakes up, runs
around, and throws shurikens at the form. Each field he hits gets random but valid test data.

## Install

1. Open `chrome://extensions` and turn on **Developer mode**.
2. Click **Load unpacked** and pick this folder.
3. Open a booking in `https://*.booking-narnia-dev.oslo.systems/ny-booking/pa-vegne-av?bookingId=…`
   (or on `localhost`), then click the ninja.

The ninja fills the form but never submits it. You check the result and click **Opprett booking** yourself.

## What gets filled

The fields mirror `SchoolForm.tsx` and `LoppemarkedForm.tsx` in origo-booking
(`frontends/booking-client/common/src/forms/forms/`):

- Activity type (and the free-text field when it picks *Annet*), target audience, participants,
  description, and whether the applicant has used the location before
- Applicant type, picked at random: organisation, volunteer, municipal or private person
- Name, email (`@example.com`), an 8-digit phone number, and an address with a real Oslo postcode
- For organisations: a real organisation number, so the Brreg lookup succeeds

The test data lives in `data.js`. If a field gets added to the form, update `fillForm` in `content.js` as well.
