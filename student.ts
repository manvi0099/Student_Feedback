/* ============================================================
   Student Feedback Collector — student.ts
   Compiles to student.js, loaded as a module in index.html
   ============================================================ */

/* ============================================================
   1. INTERFACES / TYPE ALIASES
   ============================================================ */

interface Feedback {
  id: string;
  studentName: string;
  email: string;
  course: string;
  rating: number; // 1 to 5
  feedback: string;
  createdAt: string;
}

const STORAGE_KEY = "studentFeedbackEntries";

/* ============================================================
   2. VALIDATION FUNCTIONS
   ============================================================ */

function validateName(name: string): string | null {
  if (name.trim().length === 0) {
    return "Name is required.";
  }
  return null;
}

function validateEmail(email: string): string | null {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.trim().length === 0) {
    return "Email is required.";
  }
  if (!emailPattern.test(email)) {
    return "Please enter a valid email address.";
  }
  return null;
}

function validateCourse(course: string): string | null {
  if (course.trim().length === 0) {
    return "Please select a course.";
  }
  return null;
}

function validateFeedback(feedback: string): string | null {
  if (feedback.trim().length === 0) {
    return "Feedback cannot be empty.";
  }
  return null;
}

function validateRating(rating: number): string | null {
  if (Number.isNaN(rating) || rating < 1 || rating > 5) {
    return "Please select a rating between 1 and 5.";
  }
  return null;
}

interface FormValues {
  studentName: string;
  email: string;
  course: string;
  rating: number;
  feedback: string;
}

interface ValidationErrors {
  studentName?: string;
  email?: string;
  course?: string;
  rating?: string;
  feedback?: string;
}

function validateForm(values: FormValues): ValidationErrors {
  const errors: ValidationErrors = {};

  const nameError = validateName(values.studentName);
  if (nameError) errors.studentName = nameError;

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  const courseError = validateCourse(values.course);
  if (courseError) errors.course = courseError;

  const ratingError = validateRating(values.rating);
  if (ratingError) errors.rating = ratingError;

  const feedbackError = validateFeedback(values.feedback);
  if (feedbackError) errors.feedback = feedbackError;

  return errors;
}

/* ============================================================
   3. LOCALSTORAGE FUNCTIONS
   ============================================================ */

function getAllFeedback(): Feedback[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }
  try {
    const parsed: Feedback[] = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveFeedback(feedback: Feedback): void {
  const entries = getAllFeedback();
  entries.push(feedback);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function deleteFeedback(id: string): void {
  const entries = getAllFeedback();
  const filtered = entries.filter((entry) => entry.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

/* ============================================================
   4. RENDER FUNCTIONS
   ============================================================ */

function buildStarString(rating: number): string {
  const filled = "★".repeat(rating);
  const empty = "☆".repeat(5 - rating);
  return filled + empty;
}

function createFeedbackCard(entry: Feedback): HTMLDivElement {
  const card = document.createElement("div");
  card.className = "feedback-item";
  card.dataset.id = entry.id;

  const nameEl = document.createElement("p");
  nameEl.innerHTML = `<strong>Name:</strong> ${escapeHtml(entry.studentName)}`;

  const emailEl = document.createElement("p");
  emailEl.innerHTML = `<strong>Email:</strong> ${escapeHtml(entry.email)}`;

  const courseEl = document.createElement("p");
  courseEl.innerHTML = `<strong>Course:</strong> ${escapeHtml(entry.course)}`;

  const ratingEl = document.createElement("p");
  ratingEl.innerHTML = `<strong>Rating:</strong> <span class="rating-stars">${buildStarString(
    entry.rating
  )}</span>`;

  const feedbackEl = document.createElement("p");
  feedbackEl.innerHTML = `<strong>Feedback:</strong> ${escapeHtml(entry.feedback)}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.type = "button";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    deleteFeedback(entry.id);
    renderFeedbackList();
    renderTotalCount();
  });

  card.append(nameEl, emailEl, courseEl, ratingEl, feedbackEl, deleteBtn);
  return card;
}

function escapeHtml(value: string): string {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

function renderFeedbackList(): void {
  const listContainer = document.getElementById("feedback-list");
  if (!listContainer) return;

  const entries = getAllFeedback();
  listContainer.innerHTML = "";

  if (entries.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.textContent = "No feedback submitted yet.";
    listContainer.appendChild(emptyState);
    return;
  }

  entries.forEach((entry) => {
    listContainer.appendChild(createFeedbackCard(entry));
  });
}

function renderTotalCount(): void {
  const countEl = document.getElementById("total-count");
  if (!countEl) return;
  const entries = getAllFeedback();
  countEl.textContent = entries.length.toString();
}

/* ============================================================
   5. FORM HANDLING
   ============================================================ */

function clearFieldErrors(form: HTMLFormElement): void {
  const errorEls = form.querySelectorAll(".error-message");
  errorEls.forEach((el) => {
    el.textContent = "";
  });
}

function showFieldError(fieldId: string, message: string): void {
  const errorEl = document.getElementById(`${fieldId}-error`);
  if (!errorEl) return;
  errorEl.textContent = message;
}

function getFormValues(form: HTMLFormElement): FormValues {
  const studentName = (form.elements.namedItem("student-name") as HTMLInputElement).value;
  const email = (form.elements.namedItem("email") as HTMLInputElement).value;
  const course = (form.elements.namedItem("course") as HTMLSelectElement).value;
  const ratingRaw = (form.elements.namedItem("rating") as HTMLSelectElement).value;
  const feedback = (form.elements.namedItem("feedback") as HTMLTextAreaElement).value;

  return {
    studentName,
    email,
    course,
    rating: parseInt(ratingRaw, 10),
    feedback,
  };
}

function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Date.now().toString();
}

function handleFormSubmit(event: SubmitEvent): void {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  clearFieldErrors(form);

  const values = getFormValues(form);
  const errors = validateForm(values);

  const fieldIdMap: Record<keyof ValidationErrors, string> = {
    studentName: "student-name",
    email: "email",
    course: "course",
    rating: "rating",
    feedback: "feedback",
  };

  const errorKeys = Object.keys(errors) as (keyof ValidationErrors)[];

  if (errorKeys.length > 0) {
    errorKeys.forEach((key) => {
      const message = errors[key];
      if (message) {
        showFieldError(fieldIdMap[key], message);
      }
    });
    return;
  }

  const newEntry: Feedback = {
    id: generateId(),
    studentName: values.studentName.trim(),
    email: values.email.trim(),
    course: values.course,
    rating: values.rating,
    feedback: values.feedback.trim(),
    createdAt: new Date().toISOString(),
  };

  saveFeedback(newEntry);
  form.reset();
  renderFeedbackList();
  renderTotalCount();
}

/* ============================================================
   6. INITIALIZATION
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  renderFeedbackList();
  renderTotalCount();

  const form = document.getElementById("feedback-form") as HTMLFormElement | null;
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }
});