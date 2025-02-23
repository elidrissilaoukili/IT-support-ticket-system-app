# IT Support Ticket System

## Overview

The IT Support Ticket System is a web-based application designed to help employees report and track IT issues while providing IT support personnel with tools to manage and resolve tickets efficiently.

## Features

- **User Roles & Authentication**:
  - **Employees** can create, view, update, and delete their own tickets.
  - **IT Support** can create employees, manage all tickets, add comments, and change ticket statuses.
- **Ticket Management**:
  - Create, update, and delete tickets.
  - Set ticket priority (Low, Medium, High) and category (Network, Hardware, Software, Other).
  - Track ticket status (New, In Progress, Resolved).
- **Audit Log**:
  - Track status changes and comments.
- **Search & Filter**:
  - Search tickets by ID and status.

## Technology Stack

- **Frontend**: React.js
- **Backend**: Java, Spring Boot (RESTful API)
- **Database**: MySQL (`it_support`, user: `root`, no password)

## Prerequisites

Ensure you have the following installed:

- Node.js (for frontend)
- npm or yarn (for frontend package management)
- JDK 17 (for backend)
- Maven (for backend dependency management)
- MySQL (for database)

## Installation & Setup

### 1. Clone the Repository

```sh
git clone https://github.com/your-repo/it-support-ticket-system.git
cd it-support-ticket-system
```

### 2. Setup & Run the Backend

#### Configure the Database

Ensure MySQL is running and create the database manually if not already created:

```sql
CREATE DATABASE it_support;
```

#### Run the Backend Application

Navigate to the backend directory:

```sh
cd backend
```

Install dependencies and build the project:

```sh
mvn clean install
```

Run the Spring Boot application:

```sh
mvn spring-boot:run
```

By default, the backend will run on `http://localhost:8080/`.

### 3. Setup & Run the Frontend

Navigate to the frontend directory:

```sh
cd frontend
```

Install dependencies:

```sh
npm install
```

Run the React application:

```sh
npm run dev
```

The frontend will be accessible at `http://localhost:3000/`.

## API Endpoints

### Authentication

| Method | Endpoint                   | Description               |
| ------ | -------------------------- | ------------------------- |
| GET    | `/api/auth/users/me`       | Get authenticated user    |
| PUT    | `/api/auth/users/me`       | Update authenticated user |
| PUT    | `/api/auth/users/password` | Update password           |
| DELETE | `/api/auth/users/destroy`  | Delete authenticated user |
| GET    | `/api/auth/role`           | Get user role             |
| POST   | `/api/auth/login`          | Login                     |
| POST   | `/api/auth/register`       | Register                  |

### Employee Management

| Method | Endpoint                   | Description         |
| ------ | -------------------------- | ------------------- |
| POST   | `/api/auth/employees`      | Create employee     |
| GET    | `/api/auth/employees/{id}` | Get employee by ID  |
| PUT    | `/api/auth/employees/{id}` | Edit employee       |
| DELETE | `/api/auth/employees/{id}` | Delete employee     |
| GET    | `/api/auth/employees`      | Get all employees   |
| DELETE | `/api/auth/employees`      | Delete all employees |

### Ticket Management

| Method | Endpoint                 | Description         |
| ------ | ------------------------ | ------------------- |
| POST   | `/api/auth/tickets`      | Create a ticket     |
| GET    | `/api/auth/tickets`      | Get all tickets     |
| GET    | `/api/auth/tickets/{id}` | Get a single ticket |
| PUT    | `/api/auth/tickets/{id}` | Update a ticket     |
| DELETE | `/api/auth/tickets/{id}` | Delete a ticket     |

### Comment Management

| Method | Endpoint             | Description               |
| ------ | -------------------- | ------------------------- |
| POST   | `/api/auth/comments` | Add a comment to a ticket |

## Deployment

This project is not configured for Docker deployment or standalone JAR execution.

## Documentation

- **README** (this file) for setup instructions.
- API documentation is provided in a separate Markdown file.

<!-- ## License

[MIT License](LICENSE) -->

