# E-Commerce Store

This project implements a simple e-commerce store where users can add items to a cart and checkout to place orders.
Every Nth order generates a 10% discount coupon that can be applied to a subsequent order.

## Features Implemented

### User APIs
- Add items to cart
- View cart
- Checkout with optional discount code
- Validate discount code during checkout
- Clear cart after successful checkout

### Discount Logic
- Every Nth order generates a 10% discount code
- Discount code:
    - Applies to the entire order
    - Can be used only once
    - Is available only after the qualifying Nth order
    - Only one active discount code exists at a time

### Admin APIs
- Generate discount code if eligible (Nth order reached)
- View store-wide metrics:
   - Total orders
   - Total items purchased
   - Total purchase amount
   - Discount codes generated
   - Total discount amount applied

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
- Data is stored in-memory (no database).
- No authentication is implemented.
- Discount codes are shared globally and not user-specific.
- Only one active discount code exists at any time.
- Admin metrics are global (across all users).
- Frontend tests are minimal and focus on UI rendering.

## Screenshots

### Backend (Postman)
**Add Item to Cart**
<img width="2325" height="1362" alt="image" src="https://github.com/user-attachments/assets/e53071ce-2b08-423d-97b0-f40f7aa7a48f" />

**Checkout – Discount Generated**
<img width="2325" height="1362" alt="image" src="https://github.com/user-attachments/assets/9246ce8d-0ed3-4666-bd99-e3051bf3ec8c" />

### Frontend (React UI)
**Shop Page**
<img width="2325" height="1362" alt="image" src="https://github.com/user-attachments/assets/537b85dc-3b90-4942-a0e8-683bb9c2afab" />

**Cart Page**
<img width="2325" height="1362" alt="image" src="https://github.com/user-attachments/assets/b13bcc8d-cd40-44ef-bdb5-19befe5c5d90" />

**Checkout Page**
<img width="2325" height="1362" alt="image" src="https://github.com/user-attachments/assets/ff126de1-b5f1-4365-944a-ade7f0446e84" />

**Admin Page**
<img width="2325" height="1362" alt="image" src="https://github.com/user-attachments/assets/3868539f-c1eb-4546-b414-a4d298057ba8" />








