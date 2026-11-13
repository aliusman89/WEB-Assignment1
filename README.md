# WEB-Assignment1
# Leafwork – Volunteer Opportunity Board

**Assignment 1 (client-side prototype)** – Web Engineering, Idea #10: Volunteer Opportunity Board. Individual project, due 30 October 2026.

## Overview and problem
Students want to join community service but listings are scattered across posters and chat groups. Leafwork collects them in one board where students can search, filter, read details and apply.

## Target users
University students (primary), university societies, and nonprofit/community groups (represented by sample data in this assignment).

## Features
- Search by title, organization or description, combined with category, location and availability filters
- Clear Filters button and empty state
- Detail modal with full information; fully booked listings disable Apply Now
- Application form with HTML + JavaScript validation, duplicate prevention (per session) and live slot updates
- Contact form, responsive layout (768px and 1024px breakpoints), hamburger menu, keyboard-accessible

## Technologies
HTML5, CSS3, vanilla JavaScript. No frameworks or backend.

## Folder structure
```
VolunteerHub/
├── index.html
├── css/style.css
├── js/script.js
├── assets/images/hero.svg
├── docs/design-note.md, wireframe.png
└── README.md
```

## Run locally
Open `index.html` in a browser, or use VS Code **Live Server** (right-click `index.html` > Open with Live Server).

## Deploy to GitHub Pages
1. Create a GitHub repository and push the project files to the `main` branch.
2. Repository **Settings > Pages**.
3. Under *Build and deployment*, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
4. Open the URL shown after a minute. All paths are relative, so it works as-is.


## Known limitations
- Data lives in JavaScript; slot changes and applications reset on refresh.
- Application deadlines are displayed but not enforced.
- No login, backend or database (planned for Assignments 2 and 3).
- Sample statistics are illustrative.


## Attribution
Fonts: DM Sans and Inter via Google Fonts (SIL Open Font License). The hero illustration is an original SVG created for this project. Sample organizations and statistics are fictional demonstration data.
