[![Build Status](https://github.com/jonaszb/kanban-next/actions/workflows/playwright.yml/badge.svg?event=pull_request)](https://github.com/jonaszb/kanban-next/actions/workflows/playwright.yml) [![Build Status](https://github.com/jonaszb/kanban-next/actions/workflows/chromatic.yml/badge.svg?event=pull_request)](https://github.com/jonaszb/kanban-next/actions/workflows/chromatic.yml) [![MIT License](https://badgen.net/badge/license/MIT/blue)](https://github.com/jonaszb/kanban-next/blob/main/LICENSE)

# Kanban

Kanban is a Kanban board application built using Next.js. It provides a user-friendly interface for managing tasks and organizing projects using the Kanban methodology. This readme file provides an overview of the project and its setup instructions.

## Features

-   **Kanban Board**: Create boards with customizable columns and cards to manage tasks efficiently.
-   **User Authentication**: Users can create accounts and log in using Google, GitHub, or email (magic link).
-   **Cloud Database**: Utilizes a cloud-hosted database on Supabase to store board and user data securely.
-   **Continuous Integration**: Integrates with GitHub Actions for automated testing and deployment.
-   **Automated Tests**: Includes unit tests, Playwright tests for API and UI, and Chromatic tests for visual regression.
-   **Documentation**: Utilizes Storybook to create interactive component documentation for easy reference.

## Getting Started

To get started with Kanban, follow these steps:

### Prerequisites

-   Node.js 23
-   yarn package manager

### Installation

1. Clone the project repository from GitHub:

    ```bash
    git clone https://github.com/jonaszb/kanban-next.git
    ```

2. Install the project dependencies:

    ```bash
    cd kanban-next
    yarn install
    ```

### Configuration

Before running the application, you need to set up the required environment variables. Create a `.env` file in the project root directory and add the following variables:

```
EMAIL_SERVER=smtp-server
SECRET=next-auth-secret
GITHUB_SECRET=github-oauth-secret
GITHUB_ID=github-oauth-id
GOOGLE_CLIENT_ID=google-client-id
GOOGLE_CLIENT_SECRET=google-client-secret
