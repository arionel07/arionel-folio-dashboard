#Arionel FOLIO DASHBOARD APP

**Folio Dashboard** — is a full-stack fintech app for personal finance
management:  
income and expense tracking, analytics, monthly goals, notifications, and a
modern dashboard UI.

The project was created with the goal of practicing a **real production stack**.

---

🖼️Frontend + 🖥️Backend

## 🧩 Key Features

### 🔐 Authentication

- User registration
- Login with JWT (httpOnly cookies)
- Logout
- Protected routes
- Getting the current user (`/me`)

---

### 💸 Transactions

- Transaction creation (income / expense)
- Categories (food, salary, travel, etc.)
- Statuses: `PENDING / COMPLETED / CANCELED`
- Pagination
- Filtering
- Transfer logic support (expense → income)

---

### 📈 Analytics

- Balance (income / expense / total)
- Monthly summary
- Income and expense chart by month (Bar Chart)
- Category breakdown
- Monthly support

---

### 🔔 Notifications

- Email notifications
- Sending an email when a transaction is created
- Implementation via **Mailtrap + Nodemailer**

---

### 👤 Profile

- Update username
- Update avatar
- Get profile

---

### ⚙️ Settings

- Dark / Light mode (saving to localStorage)
- Logout

---

## 🖥️ Frontend

### 🛠 Stack

- **React**
- **Vite**
- **React Router DOM**
- **Axios**
- **@tanstack/react-query**
- **React Hook Form**
- **Tailwind CSS**
- **Recharts**
- **React Icons**

---

## 🧪 Backend

### 🛠 Stack

- **Node.js**
- **Express**
- **Prisma ORM**
- **PostgreSQL**
- **JWT**
- **bcryptjs**
- **Nodemailer**
- **Mailtrap**

---

## 🗄️ Database (Prisma)

### Main models:

- `User`
- `Transaction`
- `MonthlyGoal`
- `NotificationSettings`

Used Prisma migrations + PostgreSQL.
