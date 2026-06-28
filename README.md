# 🍔 FoodDash

FoodDash is a full-stack food ordering web application where users can browse restaurants, order meals, manage their cart, and track their orders. Administrators can manage foods, monitor orders, and view dashboard analytics.

## Features

### Customer
- User registration and login
- JWT authentication
- Browse restaurants
- View restaurant menus
- Add food to cart
- Update cart quantity
- Remove items from cart
- Checkout
- View order history
- Track order status

### Admin
- Admin authentication
- Dashboard analytics
- Manage foods
- Mark foods as available/unavailable
- View all customer orders
- Update order status

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- React Router
- Axios
- React Hot Toast

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication

### Database
- PostgreSQL (Neon)

## Screenshots

(Add screenshots after deployment)

## Installation

### Backend

```bash
npm install
npm run dev
```

### Frontend

```bash
npm install
npm run dev
```

## Environment Variables

Backend

```env
DATABASE_URL=
JWT_SECRET=
```

Frontend

```env
VITE_API_URL=
```

## Future Improvements

- Restaurant search
- Food search
- User profile
- Payment integration
- Reviews and ratings
- Favorites