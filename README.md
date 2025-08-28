# Todo List App - Frontend

A modern, responsive Todo List application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Create, edit, delete, and toggle completion of tasks
- Color-coded task categories (red, blue, green, yellow, purple)
- Responsive design with modern UI/UX
- Real-time task management with backend API integration
- TypeScript for type safety and better development experience

## Prerequisites

- Node.js 18.0 or higher
- npm, yarn, pnpm, or bun package manager
- Backend API server running (separate repository)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd aghani2023-Front-End-Next.js-app-main
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

Edit `.env.local` and configure:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

**Note**: Make sure your backend server is running at the specified URL before starting the frontend.

## Development

Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── create/         # Create task page
│   ├── edit/[id]/      # Edit task page
│   └── page.tsx        # Home page with task list
├── components/          # Reusable UI components
│   ├── TaskCard.tsx    # Individual task display
│   └── TaskForm.tsx    # Task creation/editing form
└── lib/                # Utility functions and API
    └── api.ts          # Backend API integration
```

## Backend API Requirements

This frontend expects a backend API with the following endpoints:

- `GET /api/tasks` - Retrieve all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update an existing task
- `DELETE /api/tasks/:id` - Delete a task

Task object structure:
```typescript
interface Task {
  id: string;
  title: string;
  color: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL | `http://localhost:5000/api` |

## Building for Production

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

## Technologies Used

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **State Management**: React Hooks (useState, useEffect)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Submit a pull request

## License

This project is part of a take-home task assessment.
