# Footwear E-commerce Platform

A full-stack e-commerce application for footwear with Next.js frontend and Spring Boot backend.

## Features

- User Authentication and Authorization
- Product Management
- Shopping Cart
- Order Management
- Admin Dashboard
- Image Upload
- Payment Integration
- Email Notifications
- Order Tracking with OTP Verification
- Return Management

## Tech Stack

### Frontend
- Next.js 13+
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- JWT Authentication
- Responsive Design

### Backend
- Spring Boot 3.x
- Spring Security with JWT
- Spring Data JPA
- MySQL Database
- Email Service
- File Upload Management

## Prerequisites

- Node.js 18+ and npm/pnpm
- Java 17+
- MySQL 8+
- Maven

## Getting Started

### Backend Setup

1. Create MySQL database:
```sql
CREATE DATABASE footwear_ecommerce;
```

2. Configure application.properties:
- Update database username and password
- Set JWT secret key
- Configure email settings
- Set file upload directory

3. Run the Spring Boot application:
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend will start on http://localhost:8080

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
pnpm install
```

2. Create .env.local:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_UPLOAD_URL=http://localhost:8080/uploads
```

3. Run the development server:
```bash
pnpm dev
```

The frontend will start on http://localhost:3000

## API Endpoints

### Authentication
- POST /api/auth/signup - Register new user
- POST /api/auth/signin - User login

### Products
- GET /api/products - Get all products
- GET /api/products/{id} - Get product by ID
- GET /api/products/category/{category} - Get products by category
- GET /api/products/featured - Get featured products
- GET /api/products/search - Search products
- POST /api/products - Create product (Admin)
- PUT /api/products/{id} - Update product (Admin)
- DELETE /api/products/{id} - Delete product (Admin)
- POST /api/products/{id}/images - Upload product images (Admin)

### Orders
- GET /api/orders - Get user orders
- GET /api/orders/{id} - Get order by ID
- POST /api/orders - Create order
- PUT /api/orders/{id}/status - Update order status (Admin)
- POST /api/orders/{id}/return - Request return
- POST /api/orders/{id}/verify-otp - Verify delivery OTP
- GET /api/orders/admin/all - Get all orders (Admin)
- GET /api/orders/admin/status/{status} - Get orders by status (Admin)

## Security

- JWT based authentication
- Role-based access control (User/Admin)
- Password encryption
- Input validation
- CORS configuration
- Secure file upload

## Project Structure

### Backend
```
backend/
├── src/main/java/
│   └── com/footwear/ecommerce/
│       ├── controller/
│       ├── model/
│       ├── repository/
│       ├── service/
│       ├── security/
│       └── payload/
└── src/main/resources/
    └── application.properties
```

### Frontend
```
frontend/
├── app/
├── components/
├── lib/
├── hooks/
├── styles/
└── public/
```

## Environment Setup

### Required Environment Variables

Backend (application.properties):
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/footwear_ecommerce
spring.datasource.username=your-username
spring.datasource.password=your-password
app.jwt.secret=your-jwt-secret
spring.mail.username=your-email
spring.mail.password=your-email-password
```

Frontend (.env.local):
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_UPLOAD_URL=http://localhost:8080/uploads
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.#   b o o t 
 
 #   b o o t 
 
 
