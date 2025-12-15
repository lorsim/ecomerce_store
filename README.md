# E-Commerce Store

This project implements a simple e-commerce store where users can add items to a cart and checkout to place orders.
Every Nth order generates a 10% discount coupon that can be applied to a subsequent order.

## Features Implemented

### User APIs

Add items to cart
View cart
Checkout with optional discount code
Validate discount code during checkout
Clear cart after successful checkout

### Discount Logic

Every Nth order generates a 10% discount code
Discount code:
Applies to the entire order
Can be used only once
Is available only after the qualifying Nth order
Only one active discount code exists at a time

### Admin APIs

Generate discount code if eligible (Nth order reached)
View store-wide metrics:
Total orders
Total items purchased
Total purchase amount
Discount codes generated
Total discount amount applied

## Tech Stack

- Backend: Node.js, Express
- Frontend: React (Vite)
- Testing: Jest (backend), Vitest + React Testing Library (frontend)

## Project Structure

- backend
– API server (cart, checkout, admin)
- frontend
– React UI to demonstrate functionality

## Running the Backend

```bash
cd backend
npm install
npm run dev
```

Server runs on http://localhost:3000

## Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

UI runs on http://localhost:5173

## Running Tests

### Backend

```bash
cd backend
npm test
```

### Frontend

```bash
cd frontend
npm test
```

## Notes

Data is stored in-memory (no database).
No authentication is implemented
Discount codes are shared globally and not user-specific
Only one active discount code exists at any time
Admin metrics are global (across all users).
Frontend tests are minimal and focus on UI rendering.
