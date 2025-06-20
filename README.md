# Vemos Vamos

Vemos Vamos is a bilingual, creatively-driven web platform designed to foster entrepreneurial success through community, resources, and innovative solutions. The site features a fluid, animated interface built with Next.js and GSAP, offering content in both English and Spanish.

## Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) (with App Router & Turbopack)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Animation:** [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/) & [Framer Motion](https://www.framer.com/motion/)
-   **Backend Services:**
    -   [Airtable](https://airtable.com/): For newsletter subscriptions.
    -   [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/): For spam protection.
-   **Deployment:** Vercel

## Folder Structure

The project follows the standard Next.js App Router structure.

```
.
├── app/                  # Main application source code
│   ├── api/              # API routes (e.g., newsletter)
│   ├── components/       # Reusable React components
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Main landing page
│   └── globals.css       # Global styles
├── public/               # Static assets (images, svgs)
├── next.config.ts        # Next.js configuration
└── package.json          # Project dependencies and scripts
```

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

-   Node.js (v20 or later)
-   npm, yarn, or pnpm

### 1. Clone the Repository

First, clone the repository to your local machine:

```sh
git clone https://github.com/your-username/next-vemosvamos.git
cd next-vemosvamos
```

### 2. Install Dependencies

Install the project dependencies using npm:

```sh
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of the project and add the necessary environment variables. You will need credentials for Airtable and Cloudflare Turnstile.

```env
# .env.local

# Airtable
AIRTABLE_API_KEY=your_airtable_api_key
AIRTABLE_BASE_ID=your_airtable_base_id

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
```

### 4. Run the Development Server

Start the local development server with Turbopack:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Available Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Builds the application for production.
-   `npm run start`: Starts the production server.
-   `npm run lint`: Runs the linter to check for code quality issues.

## GitHub Workflow & Contribution Process

We follow a standard feature-branch workflow.

1.  **Create a Branch**: Create a new branch from the `main` branch for your feature or bug fix. Use a descriptive name.
    ```sh
    # Example for a new feature
    git checkout -b feature/add-contact-form

    # Example for a bug fix
    git checkout -b fix/newsletter-api-error
    ```

2.  **Make Changes**: Implement your changes, additions, or fixes on your branch.

3.  **Commit Your Changes**: Commit your work with a clear and descriptive commit message.
    ```sh
    git add .
    git commit -m "feat: Add contact form component and API endpoint"
    ```

4.  **Push to GitHub**: Push your branch to the remote repository.
    ```sh
    git push origin feature/add-contact-form
    ```

5.  **Create a Pull Request (PR)**: Open a Pull Request on GitHub, comparing your branch to the `main` branch. Provide a summary of your changes in the PR description.

6.  **Review and Merge**: A team member will review your code. Once approved, the PR will be merged into the `main` branch, and your changes will be