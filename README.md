# Grocery Store - Fresh Grocery Products E-commerce

A modern, responsive e-commerce website for selling fresh grocery products. Built with React, Vite, and Tailwind CSS.

## Features

- 🥛 **Fresh Grocery Products**: Browse and order fresh fruits, vegetables, dairy, and other grocery products
- 🛒 **Shopping Cart**: Add products to cart and manage your orders
- 👤 **User Authentication**: Secure login and registration system
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- ⭐ **Product Reviews**: Customer reviews and ratings system
- 💳 **Payment Integration**: Secure payment processing
- 🚚 **Order Tracking**: Track your grocery product deliveries
- 👨‍💼 **Admin Dashboard**: Manage products, orders, and customers

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Payment**: Khalti Checkout

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd grocery-store
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── admin/          # Admin components
│   │   └── customer/       # Customer-facing components
│   ├── private/            # Protected routes
│   └── public/             # Public pages
├── assets/
│   └── images/             # Product and UI images
└── main.jsx               # App entry point
```

## Features Overview

### For Customers
- Browse grocery products by category
- Add products to favorites
- Place orders with secure checkout
- Track order status
- Leave product reviews
- Manage profile and preferences

### For Administrators
- Product management (add, edit, delete)
- Order management and status updates
- Customer management
- Sales analytics and reports
- Review moderation

## API Endpoints

The application connects to a backend API for:
- User authentication
- Product management
- Order processing
- Payment integration
- Review system

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For support or inquiries, please contact us at support@grocerystore.com
