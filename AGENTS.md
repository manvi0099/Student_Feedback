# AGENTS.md

Repository instructions for AI coding agents (Codex, Claude Code, etc.) working on this project.

## 1. Project Overview

**Student Feedback Collector** is a small, client-side web application that allows students to submit feedback on a course — including their name, email, course, a 1–5 rating, and written comments. Submitted feedback is displayed as a list of cards, each with a delete option, and a running total count of entries is shown. All data is persisted locally in the browser using LocalStorage. The project has no backend, no build tooling, and no external frameworks — it is intentionally minimal.

## 2. Tech Stack and File Responsibilities

| File | Responsibility |
|---|---|
| `index.html` | Page structure only — the form markup, summary section, and list container. No logic, no inline styles or scripts. |
| `style.css` | All visual styling — layout, form design, card styling, validation error styling, responsive behavior. No logic. |
| `manvi.ts` | **All application logic** — interfaces, validation, LocalStorage read/write, DOM rendering, and form event handling. |
| `tsconfig.json` | TypeScript compiler configuration (target, module, strict mode, output settings). |

Stack: TypeScript, HTML5, CSS3, browser LocalStorage. No frameworks, no external libraries.

## 3. Commands

- **Compile TypeScript:**
  ```bash
  tsc
  ```
  Reads `tsconfig.json` and outputs `manvi.js` next to `index.html`.

- **Type-check without emitting output:**
  ```bash
  tsc --noEmit
  ```

- **Preview the app:**
  Open `index.html` directly in a browser, or use a Live Server (e.g. VS Code's "Live Server" extension) for auto-reload during development.

There is no separate build, test, or start script — the app runs directly as static files once `manvi.js` is compiled.

## 4. Coding Conventions

- Use **strict TypeScript** at all times — do not use `any`. If a type is genuinely unknown, use a specific union type or `unknown` with proper narrowing.
- Keep functions **small and single-purpose**, with clear, descriptive names (e.g. `validateEmail`, `renderFeedbackList`, `deleteFeedback`).
- Keep **all logic inside `manvi.ts`** unless explicitly told to split it into additional files.
- Add a short comment above any new function explaining its purpose.
- Follow the existing section structure in `manvi.ts` (Interfaces → Validation → LocalStorage → Render → Form Handling → Initialization). Place new code in the matching section rather than appending randomly.
- Do not introduce external libraries, frameworks, or build tools without explicit approval.

## 5. Boundaries — Do Not Change Without Asking

- Do **not** remove or weaken existing validation rules (name, email format, course selection, rating range 1–5, non-empty feedback).
- Do **not** change the shape of the `Feedback` interface without also updating every function that reads or writes it (`getAllFeedback`, `saveFeedback`, `deleteFeedback`, render functions) so LocalStorage data stays consistent.
- Do **not** change existing DOM element `id` attributes in `index.html` without updating the corresponding references in `manvi.ts`, and vice versa.
- Do **not** delete or bypass the LocalStorage persistence logic.
- Do **not** add a backend, database, or network calls — this project is intentionally client-side only.

## 6. Verification Steps Before Marking a Task Done

1. Run `tsc` (or `tsc --noEmit`) and confirm there are **zero TypeScript errors**.
2. Open `index.html` in a browser and manually test:
   - Submitting a valid feedback entry — it should appear in the list and the total count should update.
   - Submitting an invalid entry (empty fields, bad email, missing rating) — errors should display next to the correct fields and the entry should **not** be saved.
   - Deleting an entry — it should be removed from the list, the count should update, and it should stay removed after a page refresh.
3. Confirm no console errors appear in the browser DevTools.
4. Briefly summarize what was changed and why before considering the task complete.
