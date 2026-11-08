# Yacht Rental Website (Frontend Endterm Project)

## Team Members & Responsibilities

- **Alexandr Kolpakov**:
  - Booking form validation (Bootstrap `is-valid`/`is-invalid`, regex checks, error messages under fields) — `js/validation.js`, `contact.html`
  - Real-time form events (`input`, `blur`, `keydown`) and total price calculation (`calcTotal`)
  - Dynamic destinations rendering and region filtering (`All`, `Mediterranean`, `Caribbean`, `Indian Ocean`) — `js/destinations.js`, `destinations.html`
  - jQuery effects: FAQ accordion (`slideToggle`, `slideUp`, `siblings`), animated statistics counters (`animate`), DOM traversal (`closest`, `find`, `next`, `parent`), and form alerts (`fadeIn`/`fadeOut`) — `js/jq-effects.js`, `about.html`, `contact.html`
  - Endterm documentation and testing guide

- **Alimbayev Alisher**:
  - Fleet data arrays (`yachts`, `destinations`) — `js/data.js`
  - Dynamic yacht cards rendering and comparison table — `js/yachts.js`, `yachts.html`
  - Real-time yacht search (`input`), type filter, and price sorting (`change`)
  - Favorites system with `localStorage` persistence
  - Dark theme styling and toggle button across all pages — `js/theme.js`, `css/style.css`

---

## Pages Overview

| Page | Description | Key JavaScript Features |
|---|---|---|
| `index.html` | Home page | Dark mode switcher, responsive navigation |
| `yachts.html` | Yacht catalog | Dynamic cards, live search, type filter, price sorting, favorites list, comparison table |
| `destinations.html` | Destinations catalog | Dynamic cards rendered from array, region filter tabs |
| `about.html` | About the company | Animated stats counters, interactive FAQ accordion |
| `contact.html` | Booking page | Form validation, real-time price calculator, keyboard events |

---

## How to Test Each Feature

### 1. Booking Form & Price Calculator (`contact.html`)
- **Submit Empty Form**: Click **Send Request** without filling the form. All invalid fields get red borders and descriptive error messages under them.
- **Real-Time Validation (`input` / `blur`)**:
  - Type a single letter in **Full name** and blur/submit: error appears. Type 2 or more letters: field turns green (`is-valid`).
  - Enter an invalid email or short phone number: relevant error displays.
  - Pick a date earlier than today: shows "Date must be today or later".
  - Check the terms checkbox: marks valid.
- **Live Total Calculation (`calcTotal`)**:
  - Select a yacht (e.g., *Azure Spirit* — $5,200/day).
  - Enter number of days (e.g., `3`).
  - The **Estimated Total** box updates immediately to `$15,600`.
- **Keyboard & jQuery Effects**:
  - Submit the form with valid data: green success alert smoothly appears via `fadeIn(400)` and form fields reset.
  - Press `Escape`: the success alert fades out smoothly via `fadeOut(300)`.
  - Focusing on the **Email** input also fades out the old success message using DOM traversal (`closest('form').find('#booking-success')`).

### 2. Destinations & Region Filter (`destinations.html`)
- Open the page: 6 route cards are rendered dynamically from the `destinations` array in `js/data.js`.
- Click **Mediterranean**: only destinations with `region: "Mediterranean"` (Santorini, Amalfi Coast, French Riviera, Dubrovnik) are displayed.
- Click **Caribbean**: displays only the Bahamas card.
- Click **Indian Ocean**: displays only Maldives.
- Click **All**: resets the filter and shows all 6 destinations.
- The active button stays highlighted with Bootstrap styles.

### 3. FAQ Accordion & Stats Counters (`about.html`)
- **Animated Counters**: Refresh or open `about.html`. The numbers in the statistics block (`10`, `5`, `100`) smoothly count up from 0 to their target values using jQuery `.animate()`.
- **FAQ Accordion**:
  - Click any FAQ question: the answer slides down smoothly (`slideToggle`).
  - Click another question: the current answer slides down and previously opened answers automatically collapse (`siblings().find('.faq-answer').slideUp()`).
- **Hover Effect**: Hover over any FAQ card to see a soft hover shadow.

### 4. Yacht Catalog, Search, Sort & Favorites (`yachts.html`)
- **Search**: Type letters in the search bar: yachts filter on the fly via `input` event. If nothing matches, a "No yachts found" message is shown.
- **Type & Sort**: Change yacht type (Motor, Sailing, etc.) or price sort order (Low to High / High to Low).
- **Favorites**: Click the heart button (`♥`) on any yacht card. The yacht appears in the "Favorites" sidebar. Removing items or refreshing the page retains saved favorites via `localStorage`.
- **Comparison Table**: The comparison table at the bottom is built automatically from the yacht dataset.

### 5. Dark Mode Switcher (All Pages)
- Click the **🌙 Theme** button in the navbar.
- The site toggles between light and dark themes. The user preference is saved to `localStorage` and persists across page reloads.

---

## Project Structure

```
yacht-rent-website/
├── index.html
├── yachts.html
├── destinations.html
├── about.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   ├── data.js           # Shared datasets for yachts and destinations
│   ├── validation.js     # Form validation and price calculation
│   ├── destinations.js   # Dynamic destination cards and filter
│   ├── jq-effects.js     # jQuery accordion, animated counters, DOM traversal
│   ├── yachts.js         # Yacht cards, search, filter, sort, favorites, comparison
│   └── theme.js          # Dark theme toggle and localStorage handling
├── images/
└── README.md
```

## Live Demo

https://a1ish07.github.io/yacht-rent-frontend-midterm/
