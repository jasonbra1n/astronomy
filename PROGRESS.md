# Project Progress

This document tracks the major features and milestones completed during the development of the Astronomy Information Web Page.

## Version 1.1 (Styling & Integration Update)

This update focused on aligning the tool with the LAB Digital Workshop's visual identity and improving its functionality as both a standalone page and an embedded component.

### Features Implemented:

-   **Standardized Styling**: Replaced the original custom theme with the official CSS variables and component styles from the `styling_guide.md`.
-   **Light/Dark Theme Toggle**: Implemented a theme toggle button for users to switch between light and dark modes.
-   **Theme Synchronization**: Added logic to `theme.js` to listen for `postMessage` events, allowing the theme to sync automatically when the tool is embedded in the main LAB application.
-   **UI Enhancements**: Added a dropdown menu with popular world cities for quick location setting.
-   **Code Refactoring**: Broke down the main `updateInfo` function in `script.js` into smaller, more manageable pieces for better readability and maintenance.

## Version 1.0 (Initial Release)

The first version of the project established the core functionality and user interface.

### Features Implemented:

-   **Moon Phase Calculation**:
    -   Display of the general moon phase for the selected day (e.g., "Full Moon").
    -   Display of the exact moon phase angle at the selected time.
-   **Rise/Set Times**: Calculation of moonrise, moonset, sunrise, and sunset times based on user location.
-   **Major Celestial Events**:
    -   Date and time of the next Full Moon.
    -   Date and time of the next New Moon.
-   **Eclipse Information**: Date and type of the next solar or lunar eclipse.
-   **User Interface**:
    -   Interactive date/time picker with a "Reset to Now" feature.
    -   Geolocation API support and manual coordinate input for location.
    -   Initial responsive, dark-themed design.