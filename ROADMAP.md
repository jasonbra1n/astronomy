# Project Roadmap & To-Do

This document outlines the planned features and tasks for future versions of the Astronomy Information Web Page.

## Future Enhancements

These are the major features planned for implementation:

-   **Local Eclipse Visibility**: Enhance the eclipse feature to indicate whether an eclipse will be visible from the user's specified location, and if so, provide local event times.
-   **Planetary Positions**: Add a new section to display the current positions of major planets (e.g., visibility, constellation).
-   **Enhanced Moon Visualization**: Replace the current emoji-based moon phase display with a more detailed, dynamically rendered graphic (e.g., using HTML Canvas).
-   **Additional Celestial Events**: Include information about meteor showers, solstices, and equinoxes.

## Technical To-Do List

These are smaller-scale technical improvements and refactoring tasks.

-   [x] **Code Refactoring**: Break down the main `script.js` file into smaller, more manageable modules (e.g., `ui.js`, `calculations.js`). *(Initial refactoring of `updateInfo` complete).*
-   [ ] **Add Unit Tests**: Implement the browser-based testing framework defined in `TESTING_PLAN.md` to verify core calculation functions.
-   [ ] **Improve Accessibility**: Review and enhance the HTML structure with appropriate ARIA attributes to improve screen reader support.
-   [ ] **Configuration File**: Move hardcoded values (like moon phase name thresholds) into a separate configuration object or file.
-   [x] **Theme Synchronization**: Implement logic to sync the theme when embedded in the LAB Digital Workshop parent application. *(Complete).*