<div align="center">
  <img src="https://i.ibb.co/ymD8z3w6/logo-design.png" alt="EduManage Logo" width="120" />
  <h1><b>EduManage - A Modern E-Learning Platform</b></h1>
  <p>A full-stack MERN application designed to revolutionize the online learning experience, providing a seamless interface for students, teachers, and administrators.</p>
  
  <div>
    <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Badge" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js Badge" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js Badge" />
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Badge" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS Badge" />
  </div>
</div>

<br />

## 🚀 Live Demo

🔗 **[Visit Website](https://chatbot-project-007.web.app)**

---

## 📋 Table of Contents
- [Admin Credentials](#-admin-credentials)
- [Key Features](#-key-features)
- [Sneak Peek](#-sneak-peek)
- [Technology Stack](#-technology-stack)
- [API Endpoints](#-api-endpoints)
- [Local Setup](#-local-setup)

---

## 🔑 Admin Credentials
- **Email:** `poroshislamtarek@gmail.com`
- **Password:** `********`

---

## ✨ Key Features

✅ **Role-Based Dashboards**  
Separate dashboards for Students, Teachers, and Admins with specific privileges and UI.

✅ **Class Lifecycle Management**  
Teachers can create classes, and Admins can approve/reject them.

✅ **Stripe Payment Integration**  
Secure checkout system using Stripe (Test Mode).

✅ **Teacher Application System**  
Users can apply to become instructors; Admins review and approve them.

✅ **Admin Control Panel**  
Admins can manage users, promote roles, and monitor all class & teacher activities.

✅ **Assignment Workflow**  
Teachers can assign tasks, and students can submit them directly from their dashboards.

✅ **Student Feedback & Ratings**  
Students can rate and review classes after enrollment.

✅ **Dynamic Homepage**  
Displays Popular Classes, Real Testimonials, and Site Stats.

✅ **Modern UI/UX**  
Responsive design with Tailwind CSS, DaisyUI, Framer Motion, and Swiper.js.

✅ **JWT Authentication**  
Secured APIs using JSON Web Tokens.

✅ **PDF Invoice Generator**  
Students can view & download their enrollment history as PDF invoices.

---

## 📸 Sneak Peek

<table>
  <tr>
    <td><img src="https://i.ibb.co/1t52XB8q/Screenshot-2025-07-16-011004.png" alt="Homepage Screenshot"></td>
    <td><img src="https://i.ibb.co/jv9Hw7bz/Screenshot-2025-07-16-011529.png" alt="Admin Dashboard Screenshot"></td>
  </tr>
  <tr>
    <td align="center"><b>Homepage</b></td>
    <td align="center"><b>Admin Dashboard</b></td>
  </tr>
</table>

---

## 🛠️ Technology Stack

| Category      | Technologies                                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Frontend**  | React, React Router, TanStack Query, Axios, Framer Motion, Swiper.js, React Hook Form, Tailwind CSS, DaisyUI      |
| **Backend**   | Node.js, Express.js, MongoDB, JWT                                                                                 |
| **Database**  | MongoDB Atlas                                                                                                     |
| **Auth**      | Firebase Authentication                                                                                           |
| **Payments**  | Stripe                                                                                                            |

---

## 🔗 API Endpoints

| Method | Endpoint                                 | Description                                | Access Level |
|--------|------------------------------------------|--------------------------------------------|--------------|
| POST   | `/api/auth/jwt`                          | Generate or verify JWT                     | Public       |
| GET    | `/api/classes/approved`                  | Get approved classes                       | Public       |
| GET    | `/api/classes/:id`                       | Get class details                          | Private      |
| POST   | `/api/payments/create-payment-intent`    | Create Stripe payment intent               | Private      |
| POST   | `/api/enrollments/confirm`               | Confirm class enrollment                   | Private      |
| GET    | `/api/admin/all-classes`                 | View all classes                           | Admin        |
| PATCH  | `/api/admin/status/:id`                  | Approve or reject class                    | Admin        |
| GET    | `/api/users`                             | Get all users                              | Admin        |
| PATCH  | `/api/users/admin/:id`                   | Promote user to admin                      | Admin        |

---

## 🧑‍💻 Local Setup

### ✅ Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB Atlas Account

### 🔧 Installation Guide

1.  **Clone the repository:**
    ```bash
    git clone []
    ```

2.  **Setup Backend:**
    ```bash
    cd server
    npm install
    ```
    Create a `.env` file in the `server` directory and add your credentials:
    ```
    PORT=5000
    MONGODB_URI=[Your MongoDB URI]
    JWT_SECRET=[Your JWT Secret]
    STRIPE_SECRET_KEY=[Your Stripe Secret Key]
    ```
    Run the server:
    ```bash
    npm run dev
    ```

3.  **Setup Frontend:**
    ```bash
    cd client
    npm install
    ```
    Create a `.env.local` file in the `client` directory and add your keys:
    ```
    VITE_API_URL=http://localhost:5000
    VITE_STRIPE_PUBLISHABLE_KEY=[Your Stripe Publishable Key]
    VITE_FIREBASE_...=[All your Firebase configuration keys]
    ```
    Run the client:
    ```bash
    npm run dev
    ```

The application should now be running on `http://localhost:5173`.

