# 🍽️ Menu – Multi-Tenant Restaurant Management Platform

A modern restaurant menu and ordering platform designed to help restaurants manage their digital menus, products, categories, offers, and customer orders through a dedicated dashboard.

The platform is built with a **multi-tenant architecture**, allowing multiple restaurants to manage their own menus and data independently while providing customers with a seamless online ordering experience.

## ✨ Features

### 🛍️ Customer Menu
- Dynamic restaurant menus.
- Browse products by categories.
- Search and explore menu items.
- Product details with customizable options.
- Support for different product sizes and prices.
- Additional extras and add-ons.
- Shopping cart with quantity management.
- Support for customized cart items.
- Order submission through WhatsApp.
- Responsive design for mobile and desktop.

### 📊 Restaurant Dashboard
- Manage restaurant products (Create, Read, Update, Delete).
- Manage product categories.
- Manage extras and add-ons.
- Create and manage promotional offers.
- Control product availability and publishing status.
- View and manage customer orders.
- Track order status.
- View complete order information, including customer details, address, phone number, and order notes.

### 🏢 Multi-Tenant Architecture
- Independent data for each restaurant.
- Tenant-based data isolation.
- Restaurant-specific dashboard access.
- Public access to published menu items.
- Secure database access using Supabase Row Level Security (RLS).

### 🛒 Cart & Ordering System
- Add products and offers to the cart.
- Customize products with sizes and extras.
- Automatically calculate item prices.
- Maintain separate cart items when product configurations differ.
- Manage quantities and order details.
- Prepare orders for WhatsApp submission.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend development |
| Vite | Development and build tooling |
| TypeScript | Type safety |
| Tailwind CSS | Styling and responsive layouts |
| Ant Design | UI components |
| Motion | Animations and transitions |
| React Router | Application routing |
| TanStack React Query | Server state and data fetching |
| Supabase | Backend and database |
| PostgreSQL | Relational database |
| Supabase Auth | Authentication |
| Supabase RLS | Database security |

## 🏗️ Architecture

The application separates customer-facing functionality from restaurant management.

**Customer Application**
- Accesses the public restaurant menu.
- Displays published products and offers.
- Handles product customization and cart operations.
- Collects customer order information.

**Restaurant Dashboard**
- Requires authentication.
- Manages restaurant-specific data.
- Handles products, categories, extras, offers, and orders.

**Backend**
- Supabase PostgreSQL database.
- Tenant-based data relationships.
- Row Level Security policies.
- Authentication and authorization.

## 🔐 Security

Database access is controlled through Supabase Row Level Security.

- Authenticated restaurant owners can manage their own data.
- Tenant isolation prevents access to other restaurants' private data.
- Public users can access published menu content.
- Administrative operations require authentication.

## 🚀 Getting Started

### Prerequisites
- Node.js
- npm
- A Supabase account and project

### Installation

Clone the repository:

```bash
git clone https://github.com/omarmohamedali225/menu.git
```

Navigate to the project directory:

```bash
cd menu
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run Development Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

## 👨‍💻 Author

**Omar Mohamed Ali**

Frontend Developer

- GitHub: [@omarmohamedali225](https://github.com/omarmohamedali225)

---

⭐ Built with React and Supabase.
