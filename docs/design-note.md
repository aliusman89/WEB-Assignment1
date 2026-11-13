# Design Note – Leafwork (Assignment 1)

## 1. User and problem
Users: university students looking for volunteering, societies running drives, and nonprofits needing volunteers. Problem: reliable information about opportunities is scattered. Leafwork lists them in one place with search, filters, details and an application form. Assignment 1 focuses on the student side.

## 2. Web Development Life Cycle
- **Planning and requirements:** Read the brief, listed users, the main workflow (browse, search, filter, view, apply, confirm) and the rubric.
- **Design and wireframing:** Chose a white palette with blue accents and orange call-to-action buttons, DM Sans + Inter, a single-page layout, and sketched `wireframe.png`.
- **Development:** Built semantic HTML, then CSS (Grid, Flexbox, two breakpoints), then JavaScript (data array, render, filter, validate, submit).
- **Testing:** Manually tested search, each filter, combined filters, empty state, validation errors, duplicate and fully booked cases, keyboard use and 3 screen sizes.
- **Deployment and maintenance:** Push to GitHub, publish with GitHub Pages; later assignments extend the same app.

## 3. Client-server architecture
**Browser (client):** shows the page, runs HTML/CSS/JS, searches and filters, validates forms, shows opportunities, processes demo applications and updates slots in the JavaScript array.

**Server:** none in Assignment 1. No PHP, database or API; data is a JavaScript array, so changes disappear on refresh. Assignment 2 adds PHP/PDO with a database; Assignment 3 adds React, Express and MongoDB for persistent, shared data.

## 4. Wireframe
See `wireframe.png`: navigation, hero, how it works, search/filters with opportunity grid, about, contact, footer.
