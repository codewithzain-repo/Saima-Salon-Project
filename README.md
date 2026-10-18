# Saima's Salon — HTML, CSS & JavaScript

Static multi-page website made with HTML5, CSS3, and vanilla JavaScript only. No React, TypeScript, framework, build tool, backend, or database is required.

## Pages
- `index.html` — Home
- `about.html` — About
- `services.html` — Services with working category filters
- `gallery.html` — Gallery filters and accessible lightbox
- `book-appointment.html` — Validated form that prepares a WhatsApp message
- `contact.html` — Contact information and Google Maps directions
- `faqs.html` — FAQ accordion
- `privacy-policy.html` — Frontend-only privacy information

## Run
Open `index.html` in a browser, or use VS Code Live Server. No npm install or build command is required.

## Customize
Edit `config.js` for the business name, tagline, address, phone, and WhatsApp number. Replace illustrative image URLs in the HTML files with approved real salon photos. Service categories are suggestions and must be confirmed by the business. Add only verified social links and opening hours.

## Booking behavior
The form validates required fields and opens WhatsApp with a pre-filled request. It does not store bookings, send messages automatically, or confirm appointment availability. The customer must send the message in WhatsApp and wait for a response.

## Before production
Confirm business details and service menu, replace placeholder photos with approved salon images, verify WhatsApp and Maps links, test all pages on mobile and desktop, and review the privacy policy before publication.


## Booking cart and service search
- Service cards include demo prices and an Add to Booking button.
- The booking drawer and selected services use browser localStorage. This is only a convenience for the visitor, not a central booking database.
- Search includes matching services and a “You may also like” section.
- Checkout validates customer details and builds a structured booking payload.
- Email/HubSpot submission is intentionally not active until `bookingEndpoint` in `config.js` is configured. For HubSpot, create a form and use its public Forms submission endpoint, or submit to your own serverless endpoint. Never place a private HubSpot token in frontend code.
- Service names, prices, imagery, business address, and contact information must be verified by the salon owner before launch. The included catalog is illustrative.
