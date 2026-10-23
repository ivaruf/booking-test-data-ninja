# Booking Test Data Ninja 🥷

![The ninja asleep, a shuriken, and the ninja awake](docs/banner.png)

A Chrome extension for the origo-booking admin. A chibi ninja sleeps at the bottom of the
"ny booking på vegne av" page (`/ny-booking/pa-vegne-av`). Click him and he wakes up, leaps
straight up to the top of the screen with a double somersault, and peppers the form with shurikens while
the page scrolls beneath him. Each field he hits gets random but valid test data. Then he drops
down into a superhero landing and goes straight back to sleep.

He fills the form but never submits it. You check the result and click **Opprett booking** yourself.

## Install

1. Clone this repo, or unzip a copy someone shared with you.
2. Open `chrome://extensions` and turn on **Developer mode** (top right).
3. Click **Load unpacked** and pick the folder that contains `manifest.json`.
4. Open a booking on a `/ny-booking/pa-vegne-av?bookingId=…` page and click the ninja.
   You can also focus him with Tab and press Enter.

To update, pull the latest changes and click the reload icon on the extension's card in `chrome://extensions`.

## Where he shows up

The extension runs on these sites:

- `https://*.booking-narnia-dev.oslo.systems/*`, which covers both `admin.booking-narnia-dev…`
  and PR previews like `admin-pr-6391.preview.booking-narnia-dev…`
- `http://localhost/*` on any port

He's only visible on paths that start with `/ny-booking/pa-vegne-av`. The admin is a
single-page app, so he appears and disappears as you navigate.

## What gets filled

The fields mirror `SchoolForm.tsx` and `LoppemarkedForm.tsx` in origo-booking
(`frontends/booking-client/common/src/forms/forms/`).

| Field | Test data |
| --- | --- |
| Hva slags aktivitet | Random option. If he picks *Annet*, he also fills "Hvilken aktivitet" |
| Målgruppe | Random option |
| Antall deltakere | 4–60 |
| Kort beskrivelse | A short sentence that says it's test data |
| Lånt rom tidligere | Random option |
| Hvem søker | Random applicant type, except *Organisasjon med organisasjonsnummer* |
| Navn, e-post, telefon | Norwegian name, `fornavn.etternavnNNN@example.com`, 8 digits starting with 4 or 9 |
| Navn på aktør / virksomhet | Made-up volunteer group, or a real Oslo kommune agency |
| Adresse, postnummer, poststed | Oslo street with house number, and a real Oslo postcode |

He skips organisations because the Brreg lookup in dev rejects real organisation numbers. The loppemarked
version of the form always needs one, so there he fills in the applicant details and leaves the organisation number for you.

## Customising

- **Test data** lives in `data.js`: names, streets, postcodes, organisations and descriptions.
- **Speed:** change `SPEED` at the top of `content.js`. Lower is faster, so `0.4` is frantic and `1` is leisurely.
- **New form fields:** add a `text(id, value)` or `radio(name)` line to `plan` in `content.js`.
  Text fields are found by their `id`, and radio groups by their `name`.
- After you edit anything, reload the extension in `chrome://extensions` and refresh the page.

## How it works

- `content.js` mounts the ninja in a shadow root, so the page's CSS can't affect him and his CSS can't leak onto the page.
- Animations use the Web Animations API, and the ninja and shuriken are inline SVG.
- Values are set with the native input value setter and a real `input` event, so React and
  react-hook-form register the changes. Radio buttons get a real click.
- All random choices are made up front. He throws at every visible field in one volley, and fields
  that only appear after a choice, like the applicant details, are hit in the next volley.
- If your system is set to reduce motion, he skips the animations and fills the form instantly.

## Troubleshooting

- **He's not there:** check that the URL path starts with `/ny-booking/pa-vegne-av` and that
  the extension is enabled. Reload the page after installing.
- **He says "Hmm… finner ikke skjemaet":** the form hasn't loaded yet, or its markup changed. Wait a moment and try again.
- **He says "Au! Noe gikk galt":** the browser console has the error, tagged `[Booking Test Data Ninja]`.

## Sharing

To send a copy to a colleague, zip the extension files and have them follow the install steps:

```sh
zip -r booking-test-data-ninja.zip manifest.json content.js data.js icons
```
