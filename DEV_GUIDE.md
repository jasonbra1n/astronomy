# Developer Guide

This guide provides instructions for setting up and contributing to the Astronomy Information Web Page project.

## Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/jasonbra1n/astronomy.git
    cd astronomy
    ```

2.  **Open `index.html`**:
    You can open the `index.html` file directly in your web browser to see the project running locally. A local web server is recommended for development to avoid potential issues with file loading.

## Project Structure

The repository contains the following key files:

-   `index.html`: The main HTML file that defines the structure of the web page.
-   `styles.css`: Contains all the CSS for styling the page, including the dark theme and responsive design.
-   `script.js`: The core JavaScript file that handles user interactions, date/time management, and astronomical calculations.
-   `theme.js`: Handles theme switching (light/dark) and synchronization with the parent application when embedded in an iframe.
-   `astronomy.browser.js`: The Astronomy Engine library used for all celestial calculations.
-   `README.markdown`, `ROADMAP.md`, `PROGRESS.md`: Project documentation.

## Dependencies

The project relies on two main external dependencies:

1.  **Astronomy Engine**: The `astronomy.browser.js` file is included directly in the repository. It provides the functions for calculating moon phases, eclipses, and rise/set times.
2.  **Flatpickr**: This is a lightweight date/time picker library loaded via a CDN in `index.html`. It is used for the main date and time input field.

## Core Logic (`script.js`)

-   **Initialization**: On `DOMContentLoaded`, the script initializes the Flatpickr instance, sets up event listeners for all buttons, and performs an initial calculation using the current date and time.
-   **Calculations**: The `updateAstronomyData()` function is the heart of the application. It reads the selected date, time, and location, then calls various Astronomy Engine functions to get the required data.
-   **Time Zones**: All calculations are performed based on the user's local time zone. The `Date` object is used to manage time, which inherently handles local time zone offsets.
-   **UI Updates**: Helper functions are used to update specific parts of the DOM with the calculated astronomical data.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new feature branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes and commit them with a clear message.
4.  Push your branch to your fork.
5.  Create a pull request to the `main` branch of the original repository.