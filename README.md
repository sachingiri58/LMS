# 📚 Learning Management System (LMS)

## 📌 Project Overview

The **Learning Management System (LMS)** is a full‑stack web application built to provide an interactive online learning platform for students, instructors, and administrators. The system supports **free and paid courses**, secure authentication, lifetime course access, progress tracking, and a powerful **Admin Panel** for course and revenue management.

This project is designed using **modern web technologies** and follows real‑world LMS architecture similar to platforms like Udemy or Coursera.

---

## 🎯 Key Objectives

* Provide students with an easy‑to‑use online learning platform
* Enable secure login before accessing paid content
* Allow lifetime access to purchased courses
* Track course progress in percentage format
* Provide admin with full control over courses, users, and revenue

---

## 🏠 Pages & Features

### 1️⃣ Home Page

📷 *Screenshot: Home Page*

* Landing section with platform introduction
* Navigation bar (Home, Courses, Faculty, About, Contact)
* Call‑to‑action buttons for course exploration

---

### 2️⃣ Courses Page

📷 *Screenshot: Courses Page*

* Displays **Free & Paid Courses**
* Course cards with title, duration, lectures, instructor
* Clicking a course redirects to **Course Detail Page**

---

### 3️⃣ Course Detail Page (Protected)

📷 *Screenshot: Course Detail Page*

When a student clicks a course:

* If **not logged in** → Login required
* If **logged in & enrolled** → Full course access

#### Example Course: React Masterclass

**Course Overview**

* Master React from fundamentals to advanced patterns
* Hooks, state management, performance optimization
* Real‑world scalable project architecture

**Course Details**

* Duration: 2h 2m
* Lectures: 4
* Instructor: Sophia Miller

**Course Content**

* Intro & Setup (12m – 2 chapters)
* JSX & Components (30m – 3 chapters)
* State & Hooks (46m – 4 chapters)
* Routing & Data (34m – 3 chapters)

**Pricing Section**

* ₹99 (Original ₹200 – 51% OFF)
* One‑time payment
* Lifetime access
* 30‑day money‑back guarantee

---

### 4️⃣ Student Dashboard – My Courses

📷 *Screenshot: My Courses Page*

* Purchased courses are added automatically
* Lifetime access to enrolled courses
* Progress tracking in percentage (%)
* Total duration displayed

---

### 5️⃣ Faculty Page

📷 *Screenshot: Faculty Page*

* List of instructors
* Instructor name, expertise, and profile
* Helps students trust course quality

---

### 6️⃣ About Page

📷 *Screenshot: About Page*

* Platform mission and vision
* Learning approach and goals
* Information about LMS development

---

### 7️⃣ Contact Page

📷 *Screenshot: Contact Page*

* Students can contact faculty for course‑related queries
* Free support provided
* Simple contact form interface

---

## 🛠️ Admin Panel (Second Panel)

📷 *Screenshots: Admin Dashboard & Sections*

The Admin Panel is accessible only by the administrator.

### 🔑 Admin Features

#### 📊 Dashboard

* Total users
* Total courses
* Purchased courses count
* Revenue analytics

#### 📚 Course Management

* Add new courses
* Update existing courses
* Manage free & paid courses

#### 📄 Course List

* View all courses
* Edit or delete courses

#### 📦 Bookings / Purchases

* Track who purchased which course
* Payment details
* Revenue insights

---

## 🔐 Authentication & Security

* Login required before course enrollment
* Protected routes for students and admin
* Secure access to paid content

---

## ⚙️ Technologies Used

### Frontend

* React.js
* React Router
* Tailwind CSS / CSS
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Authentication

* JWT / Clerk (as used)

### Deployment

* Frontend: Netlify / Vercel
* Backend: Render / Railway

---

## 🚀 Project Output

This LMS project delivers:

* Real‑world online course platform
* Secure authentication flow
* Paid course purchase system
* Student progress tracking
* Admin dashboard with revenue management

---

## 👨‍💻 Developed By

**Sachin Gajanan Giri**
Computer Science & Engineering Student
Web Developer | MERN Stack Enthusiast

---

## 📌 Conclusion

The Learning Management System is a complete, scalable, and user‑friendly solution for online education. It demonstrates real‑world application development skills, making it suitable for academic projects, portfolios, and startup‑level platforms.

---

⭐ *If you like this project, feel free to star the repository!*
