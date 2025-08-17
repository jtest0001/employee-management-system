# Employee Management App - Local Setup

## Prerequisites

- [Node.js](https://nodejs.org/) (v22 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Getting Started

1. **Clone the repository**

   ```sh
   git clone https://github.com/jtest0001/employee-management-system.git
   cd employee-management-app
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Set up environment variables**

   The app uses a `.env` file for API configuration. By default, it uses a public mock API. The .env will be provided in the email

4. **Run the development server**

   ```sh
   npm run dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173).

5. **Run tests**
   - **E2E tests with Cypress:**

     ```sh
     npm run cypress:run
     ```

     ```sh
     npm run cypress:open
     ```

   - **Linting:**

     ```sh
     npm run lint
     ```

## Build for Production

To build the app for production:

```sh
npm run build
```

The output will be in the `dist/` directory.

## Notes

- The app uses [Vite](https://vitejs.dev/) for development and build.
- All API operations are performed against the mock API defined in `.env`.
- For any issues, please refer to the [requirements.md](requirements.md) file.

## Tech Stack & Key Decisions

- **React**: JavaScript library for building user interfaces.
- **Vite**: Fast build tool and development server.
- **TypeScript**: Type safety across the codebase.
- **React Query**: Efficient data fetching, caching, and synchronization with the API.
- **shadcn/ui**: Component library for accessible and customizable UI components.
- **Tailwind CSS**: Utility-first CSS framework for rapid and consistent styling.
- **React Hook Form**: Form state management, easily integrated with shadcn/ui form components.
- **Cypress**: End-to-end testing framework.
- **ESLint & Prettier**: Code linting and formatting.
- **Mock API**: Used for local development and testing via environment configuration.

**Decisions:**

- Chose React Query for robust server state management and caching.
- Adopted shadcn/ui for rapid UI development with accessible components.
- Integrated Tailwind CSS for efficient and consistent styling.
- Used React Hook Form for seamless form handling, especially with shadcn/ui components.
- Used Vite for fast development experience and optimized builds.
- TypeScript was selected for improved maintainability and developer experience.
- Cypress was integrated for reliable E2E testing.
- Public mock api provider
