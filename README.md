# 🍔 Food Hub – Online Food Ordering Platform

Food Hub is a modern full-stack food ordering web application built using the MERN Stack. Users can browse delicious food items, place orders, manage their accounts, and track orders through a clean and responsive interface.

🚀 Fast, responsive, and user-friendly food ordering experience.

---

## ✨ Features

### 👤 User Features

* 🔐 Secure Authentication (Register/Login)
* 🍽️ Browse Food Menu
* 🔍 Search Food Items
* 🛒 Add to Cart
* 💳 Place Orders
* 📦 View Order History
* 👤 Manage User Profile
* 📱 Fully Responsive Design

### 🛠️ Admin Features

* 📊 Admin Dashboard
* 🍔 Manage Food Items
* 📦 Manage Orders
* 👥 Manage Users
* ✏️ Update Order Status
* 🗑️ Delete Food Items

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Redux Toolkit
* React Router DOM
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs

### Tools

* Git & GitHub
* Postman
* Vite

---

## 📂 Project Structure

```bash
food_hub/
│
├── client/                 # React Frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/                 # Express Backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

## 🚀 Installation

### 1. Clone Repository

```bash
git clone https://github.com/intikhabaalam/food_hub.git
cd food_hub
```

### 2. Install Dependencies

Backend:

```bash
npm install
```

Frontend:

```bash
cd client
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

---

## ▶️ Run Application

Backend:

```bash
npm run server
```

Frontend:

```bash
cd client
npm run dev
```

---

## 🔑 Authentication

Food Hub uses JWT Authentication.

Features:

* User Registration
* User Login
* Protected Routes
* Admin Authorization
* Secure Password Hashing

---

## 📦 API Routes

### Authentication

```bash
/api/auth
```

### Menu

```bash
/api/menu
```

### Orders

```bash
/api/orders
```

### Booking

```bash
/api/booking
```

### Admin

```bash
/api/admin
```

---

## 🌟 Future Enhancements

* Online Payment Gateway
* Real-Time Order Tracking
* Push Notifications
* Coupon System
* Reviews & Ratings
* Food Categories
* Wishlist Feature

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Intikhab Aalam**

MERN Stack Developer

GitHub: https://github.com/intikhabaalam
