## Quantum Store: Microservices E-Commerce
A robust, full-stack e-commerce platform built with a Microservices Architecture. This project was designed as a technical case for Software Architecture, focusing on service segregation, containerization, and reliable data consistency.

### Architecture Overview
This project implements a Distributed System pattern consisting of five main components:
- Frontend: A modern SPA built with React, TypeScript, and Mantine UI.
- API Gateway (NestJS): The entry point for all client requests. It handles routing and delegates tasks to internal services via TCP.
- Auth Service (NestJS): Dedicated service for user identity, registration, and JWT issuance.
- E-commerce Service (NestJS): Manages the core business logic, including Product CRUD and Order Management.
- Database (MySQL): A centralized relational database managed via Prisma ORM.

### Tech Stack
| Layer | Technology |
| :--- | :---: |
| Frontend | "React, TypeScript, Mantine UI, Axios, Lucide Icons" |
| Backend | "NestJS, Microservices (TCP), JWT" |
| Database | "MySQL, Prisma ORM" |
| DevOps | "Docker, Docker Compose" |

### Key Features
- Role-Based Access Control (RBAC): Distinct permissions for Admin (Product CRUD, Global Order Management) and User (Browsing, Checkout, Personal Order Tracking).
- Inventory Integrity: Implements a transaction-safe checkout and cancellation flow. If an order is canceled, stock is automatically returned to the inventory.
- Centralized Gateway: Secured via JWT Guards to ensure internal microservices are protected from unauthorized access.
- Responsive UI: Fully adaptive design using Mantine's grid system.

### Getting Started
Prerequisites
- Docker & Docker Desktop
- Node.js (for local development, though not strictly required as it runs in Docker)

### Installation
1. **Clone the repository**:
```bash
git clone https://github.com/yourusername/quantum-store.git
cd quantum-store
```

2. **Spin up the infrastructure**:
```bash
docker-compose up --build
```

3. **Initialize the Database**: Open a new terminal and run the following setup commands to sync your schema and seed the initial data:
```bash
docker-compose exec auth-service npx prisma db push
docker-compose exec ecommerce-service npx prisma db push
docker-compose exec api-gateway npx prisma db push
docker-compose exec api-gateway npx prisma db seed
```

4. **Access the Application**:
- Frontend : `http://localhost`
- Admin Credentials : `admin@quantum.com` / `password123`

### Database Schema
The project uses a relational structure optimized for order tracking:
- User: Manages identity and roles.
- Product: Tracks inventory and pricing.
- Order: Main order header.
- OrderItem: A join-table that tracks specific product snapshots (price and quantity) at the time of purchase, allowing for historical data accuracy.

## Project Notice

This repository is published for **portfolio and educational viewing purposes only**.

Copyright © 2025  
Ownership of this project and its materials is shared with / belongs to  
**Bina Nusantara University**, according to academic policy.

Reuse, redistribution, or commercial use is **not permitted** without
explicit permission from the copyright holder(s).

## - Saputra Tanuwijaya ( AT )
