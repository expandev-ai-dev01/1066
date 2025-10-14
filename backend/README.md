# Sistema de TO DO List - Backend API

## Description
Backend REST API for task management system (TO DO List).

## Technology Stack
- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: Microsoft SQL Server
- **Validation**: Zod

## Project Structure
```
src/
├── api/                    # API controllers
│   └── v1/                 # API Version 1
│       ├── external/       # Public endpoints
│       └── internal/       # Authenticated endpoints
├── routes/                 # Route definitions
│   └── v1/                 # Version 1 routes
├── middleware/             # Express middleware
├── services/               # Business logic
├── utils/                  # Utility functions
├── constants/              # Application constants
├── instances/              # Service instances
├── tests/                  # Global test utilities
└── server.ts               # Application entry point
```

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- SQL Server instance available
- npm or yarn package manager

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and configure:
   ```bash
   cp .env.example .env
   ```
4. Update `.env` with your database credentials

### Development
Run development server with hot reload:
```bash
npm run dev
```

### Build
Compile TypeScript to JavaScript:
```bash
npm run build
```

### Production
Start production server:
```bash
npm start
```

### Testing
Run test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

### Linting
Check code quality:
```bash
npm run lint
```

Fix linting issues:
```bash
npm run lint:fix
```

## API Endpoints

### Health Check
- **GET** `/health` - Server health status

### API Version 1
Base URL: `/api/v1`

#### External Routes (Public)
- `/api/v1/external/*` - Public endpoints

#### Internal Routes (Authenticated)
- `/api/v1/internal/*` - Authenticated endpoints

## Environment Variables

### Server Configuration
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 3000)
- `API_VERSION` - API version (default: v1)

### Database Configuration
- `DB_HOST` - Database host
- `DB_PORT` - Database port (default: 1433)
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name
- `DB_ENCRYPT` - Enable encryption (true/false)

### CORS Configuration
- `CORS_ORIGINS` - Allowed origins (comma-separated)

### Security
- `BCRYPT_ROUNDS` - Password hashing rounds (default: 10)

### Cache
- `CACHE_TTL` - Cache time-to-live in seconds (default: 3600)
- `CACHE_CHECK_PERIOD` - Cache check period in seconds (default: 600)

## Features
This backend supports the following features:

1. Task Management (CRUD operations)
2. Task Listing with filters
3. Task Editing
4. Task Deletion
5. Task Completion marking
6. Task Categorization
7. Priority Definition
8. Deadline Management
9. Notifications and Reminders
10. Calendar View

## Development Guidelines

### Code Style
- Follow TypeScript strict mode
- Use ESLint configuration
- Maximum line length: 120 characters
- Use single quotes for strings
- Always use semicolons

### Naming Conventions
- Files: camelCase for TypeScript files
- API routes: kebab-case
- Functions: descriptive names with action verbs
- Variables: camelCase
- Constants: UPPER_SNAKE_CASE
- Types/Interfaces: PascalCase

### Testing
- Write unit tests for services
- Write integration tests for API endpoints
- Maintain test coverage above 80%
- Use colocated test files (*.test.ts)

## License
ISC

## Support
For issues and questions, please contact the development team.