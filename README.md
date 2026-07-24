# Student Feedback Collector

A simple, lightweight web app for collecting and managing student feedback on courses, built with plain TypeScript, HTML, and CSS.

## Features

- **Add Feedback** — Submit feedback with student name, email, course, rating, and comments through a validated form.
- **Delete Feedback** — Remove any submitted entry instantly with a single click.
- **View All Feedback** — All submitted entries are displayed as cards showing name, email, course, star rating, and feedback text.
- **LocalStorage Persistence** — Feedback data is saved in the browser's LocalStorage, so entries remain available after a page refresh.
- **Total Feedback Count** — A live counter displays the total number of feedback entries submitted.

## Tech Stack

- **TypeScript** — All application logic
- **HTML5** — Page structure and form markup
- **CSS3** — Styling (custom, no frameworks)
- **LocalStorage** — Client-side data persistence

No external libraries or frameworks are used.

## Folder / File Structure

```
student-feedback-collector/
├── index.html
├── style.css
├── manvi.ts
├── manvi.js       (generated after compiling)
├── tsconfig.json
└── README.md
```

| File | Purpose |
|---|---|
| `index.html` | Page structure: the feedback form, summary section, and the list container where submitted entries are displayed. |
| `style.css` | All visual styling — layout, form design, card styling, validation error styling, and responsive behavior. |
| `manvi.ts` | Core application logic — interfaces, validation functions, LocalStorage read/write, rendering, and form handling. Compiles to `manvi.js`. |
| `tsconfig.json` | TypeScript compiler configuration — defines target, module type, strict type-checking, and output settings. |

## How to Run Locally

1. **Install TypeScript** (if not already installed):
   ```bash
   npm install -g typescript
   ```

2. **Compile the TypeScript file:**
   ```bash
   tsc
   ```
   This reads `tsconfig.json` and generates `manvi.js` in the project folder.

3. **Open the app:**
   - Simplest way: double-click `index.html` to open it directly in your browser, **or**
   - Recommended: use a Live Server (e.g. the VS Code "Live Server" extension) for auto-reload during development.

4. The app should now be fully functional — submit feedback and see it appear in the list below the form.

## Validation Rules

| Field | Rule |
|---|---|
| Student Name | Required, cannot be empty |
| Email | Required, must match a valid email format |
| Course | Required, must select one option from the dropdown |
| Rating | Required, must be a number between 1 and 5 |
| Feedback | Required, cannot be empty |

If any field fails validation, an error message is displayed directly below that field, and the form is not submitted until all errors are resolved.

## Known Limitations

- Data is stored **only in the browser's LocalStorage** — it is not saved to a server or database.
- Feedback entries are **specific to the browser and device** used; they are not shared or synced across devices.
- Clearing browser data/cache will permanently delete all stored feedback entries.
- No authentication — anyone with access to the page can add or delete entries.

## Author / Intern Note

This project was built as part of the **Kidaura Intern Pre-Onboarding Guide**, as a small vibe-coded TypeScript project to practise working with AI coding agents, TypeScript fundamentals, form validation, and browser-based data persistence.
