
# Restaurant Reservation System

This project is a **NestJS** application that provides a restaurant reservation system with the following features:
- **Customer Management**: Create, read, update, and delete customers.
- **Table Management**: Create, read, update, and delete restaurant tables.
- **Reservation Booking**: Book tables with validations for overlapping reservations and restaurant open hours.
- **Email Notifications**: Send confirmation emails for successful reservations.

The application is deployed on Heroku. Follow the instructions below to set up, run, and access the application.

---

## Features
1. Customer CRUD Operations
2. Table CRUD Operations
3. Booking Reservation
   - Ensure no overlapping reservations.
   - Validate reservations against restaurant open hours.
   - Email confirmation for successful reservations.
4. API Documentation using Swagger.

---

## Technologies Used
- **NestJS**: Backend framework.
- **TypeORM**: ORM for database interaction.
- **PostgreSQL**: Database (can be replaced with MySQL).
- **Swagger**: API documentation.
- **Mailchimp Transactional API**: Email notifications.

---

## Setup Instructions

### Prerequisites
1. **Node.js** (v16 or later)
2. **npm** (v8 or later)
3. **PostgreSQL** database instance.
4. **Heroku CLI** (if deploying).

### Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### Install Dependencies
```bash
npm install
```

### Environment Variables
Create a `.env` file in the root directory and add the following:
```env
API_KEY=md--6kYHyq7hO-J665pj2eVtQ
BASE_URL=https://mandrillapp.com/api/1.0
PORT=3000
```

### Build and Run Locally
1. Build the application:
   ```bash
   npm run build
   ```
2. Start the application:
   ```bash
   npm run start:prod
   ```

The application will be available at `http://localhost:3000`.

---

## Swagger API Documentation
The API documentation is available at:
```
http://localhost:3000/api
```
This provides an interactive UI for testing all endpoints.

---

## Testing
Run unit and integration tests:
```bash
npm run test
npm run test:e2e
```

## Contributors
- **Rivan Mohammad Akbar** - Developer

For questions or support, please contact [rivanakbar02@gmail.com](mailto:rivanakbar02@gmail.com).

---
