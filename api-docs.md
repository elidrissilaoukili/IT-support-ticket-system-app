# API Endpoints For IT Support Ticket System

## Authentication

| Method | Endpoint                   | Description               |
| ------ | -------------------------- | ------------------------- |
| GET    | `/api/auth/users/me`       | Get authenticated user    |
| PUT    | `/api/auth/users/me`       | Update authenticated user |
| PUT    | `/api/auth/users/password` | Update password           |
| DELETE | `/api/auth/users/destroy`  | Delete authenticated user |
| GET    | `/api/auth/role`           | Get user role             |
| POST   | `/api/auth/login`          | Login                     |
| POST   | `/api/auth/register`       | Register                  |

## Employee Management

| Method | Endpoint                   | Description         |
| ------ | -------------------------- | ------------------- |
| POST   | `/api/auth/employees`      | Create employee     |
| GET    | `/api/auth/employees/{id}` | Get employee by ID  |
| PUT    | `/api/auth/employees/{id}` | Edit employee       |
| DELETE | `/api/auth/employees/{id}` | Delete employee     |
| GET    | `/api/auth/employees`      | Get all employees   |
| DELETE | `/api/auth/employees`      | Delete all employees |

## Ticket Management

| Method | Endpoint                 | Description         |
| ------ | ------------------------ | ------------------- |
| POST   | `/api/auth/tickets`      | Create a ticket     |
| GET    | `/api/auth/tickets`      | Get all tickets     |
| GET    | `/api/auth/tickets/{id}` | Get a single ticket |
| PUT    | `/api/auth/tickets/{id}` | Update a ticket     |
| DELETE | `/api/auth/tickets/{id}` | Delete a ticket     |

## Comment Management

| Method | Endpoint             | Description               |
| ------ | -------------------- | ------------------------- |
| POST   | `/api/auth/comments` | Add a comment to a ticket |