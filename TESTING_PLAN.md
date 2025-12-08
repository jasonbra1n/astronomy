# Testing Plan

This document outlines the testing strategy for the Astronomy Information tool to ensure its accuracy, reliability, and usability. The tool is designed to work offline with minimal dependencies, so the testing plan reflects this.

## 1. Unit Testing

Unit tests will verify the correctness of individual, pure functions within the application. These tests will be written in a new `tests.js` file and run in the browser using a simple `tests.html` runner.

**Key Functions to Test in `script.js`:**

-   **`getMoonPhaseName(phase)`**:
    -   Verify it returns the correct phase name for boundary values (e.g., 10°, 80°, 170°, 190°).
    -   Verify it returns the correct phase name for mid-range values (e.g., 45°, 120°).

-   **`calculateTimeDifference(startTime, endTime)`**:
    -   Test with a simple duration within the same day.
    -   Test a duration that crosses midnight (e.g., rise at 10 PM, set at 6 AM).
    -   Test with null or undefined inputs to ensure it returns null without crashing.

-   **`formatDate(date)`**:
    -   Test with a valid `Date` object.
    -   Test with a null or undefined input to ensure it returns 'Not available'.

**Implementation:**
1.  Create `tests.html` to load the necessary scripts and display test results.
2.  Create `tests.js` to contain the test cases and a simple assertion function (e.g., `assert(condition, message)`).

## 2. Integration Testing (Manual)

This involves testing how different parts of the application work together.

-   **Location Services**:
    -   Click "Get Current Location" and verify that latitude/longitude fields are populated and that rise/set times are calculated and displayed.
    -   Select a city from the "Choose a popular city" dropdown and verify that location fields and rise/set times update correctly.
    -   Manually enter coordinates, click "Set Location", and verify that rise/set times update.

-   **Date/Time Picker**:
    -   Select a new date/time and verify that all relevant data (moon phase, rise/set times, etc.) updates automatically.
    -   Click "Reset to Now" and verify the date picker and all data revert to the current time.

## 3. UI/UX Testing (Manual)

This ensures the user interface is behaving as expected across different scenarios.

-   **Theme Toggle**:
    -   Click the theme toggle emoji (✨/☀️/🌙) and verify the icon changes and the theme switches between light and dark modes.
    -   Reload the page and confirm the previously selected theme is preserved (via `localStorage`).

-   **Responsiveness**:
    -   Resize the browser window to a narrow (mobile) width.
    -   Confirm that the two-column grid layouts (`setup-grid`, `details-grid`) stack into a single, readable column.
    -   Confirm that all text and UI elements are legible and usable.

-   **Cross-Browser Check**:
    -   Perform a quick check on latest versions of Chrome, Firefox, and Safari (if possible) to ensure basic functionality and layout are consistent.

## 4. Offline Functionality

As you noted, the tool is designed to work offline.

-   **Test Procedure**:
    1.  Load the page while online.
    2.  Disconnect from the internet.
    3.  Verify that all calculation-based features continue to work (changing date/time, manual location input). The "Get Current Location" feature will likely fail, which is expected.