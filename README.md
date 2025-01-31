# Beauty Service App

A platform for booking beauty services.

## Features
- Browse beauty professionals on a map.
- Book and manage appointments.
- Secure payments via Stripe.

## Tech Stack
- Frontend: React, TypeScript, TailwindCSS
- Backend: Node.js, Express, PostgreSQL
- APIs: Google Maps, Twilio, Stripe

## Getting Started
1. Clone the repo: `git clone https://github.com/YOUR_USERNAME/beauty-service-app.git`
2. Install dependencies: `npm install`
3. Start the app: `npm start`

## License
This project is licensed under the MIT License.

[View ER Diagram](https://dbdiagram.io/d/679b6b96263d6cf9a085d460)

This schema defines the database structure for a **beauty services platform** where beauty masters offer services, customers book appointments, and payments, reviews, and social interactions are managed.


## **📌 Breakdown of Each Table**

Each table represents a different **entity** in the system.

### **1️⃣ `users` (Main User Table)**

This table stores all **user accounts**, including **customers, beauty masters, and admins**.

- `id` → Unique user ID.
- `username` → The user’s display name.
- `email` → Unique email address.
- `password_hash` → Encrypted password.
- `role` → Defines whether the user is a **customer, beauty master, or admin**.
- `created_at` → Timestamp when the user registered.

---

### **2️⃣ `beauty_masters` (Beauty Professionals)**

This table **stores details about beauty masters** (professionals offering services).

- `id` → Unique beauty master ID.
- `user_id` → **Foreign key** linking to `users.id` (since a beauty master is a type of user).
- `bio` → Description about the beauty master.
- `location` → City/region where the master operates.
- `rating` → Average rating from customer reviews.
- `created_at` → Timestamp when the beauty master joined.

✅ **Relation:** `beauty_masters.user_id > users.id` (Every beauty master is a registered user).

---

### **3️⃣ `customers` (Clients Booking Services)**

This table stores **customers' details**.

- `id` → Unique customer ID.
- `user_id` → **Foreign key** linking to `users.id` (since a customer is a type of user).
- `contact_info` → Customer’s contact details.
- `created_at` → Timestamp when the customer joined.

✅ **Relation:** `customers.user_id > users.id` (Every customer is a registered user).

---

### **4️⃣ `services` (Beauty Services Offered)**

This table stores **different beauty services provided by masters**.

- `id` → Unique service ID.
- `beauty_master_id` → **Foreign key** linking to `beauty_masters.id` (who provides the service).
- `name` → Service name (e.g., "Haircut", "Makeup", "Nail Art").
- `description` → Details about the service.
- `price` → Cost of the service.
- `duration` → Time required (in minutes).
- `created_at` → Timestamp when the service was added.

✅ **Relation:** `services.beauty_master_id > beauty_masters.id` (A beauty master offers multiple services).

---

### **5️⃣ `appointments` (Service Bookings)**

This table stores **customer bookings**.

- `id` → Unique appointment ID.
- `customer_id` → **Foreign key** linking to `customers.id` (who booked the service).
- `beauty_master_id` → **Foreign key** linking to `beauty_masters.id` (who provides the service).
- `service_id` → **Foreign key** linking to `services.id` (which service was booked).
- `appointment_date` → When the appointment is scheduled.
- `status` → **Booked, completed, canceled**.
- `created_at` → Timestamp when the appointment was created.

✅ **Relation:**

- `appointments.customer_id > customers.id` (A customer books an appointment).
- `appointments.beauty_master_id > beauty_masters.id` (Each appointment belongs to a beauty master).
- `appointments.service_id > services.id` (Each appointment is linked to a service).

---

### **6️⃣ `payments` (Transactions)**

This table **tracks payments for appointments**.

- `id` → Unique payment ID.
- `appointment_id` → **Foreign key** linking to `appointments.id` (which appointment the payment is for).
- `amount` → Payment amount.
- `payment_date` → Date of transaction.
- `payment_method` → **Card, PayPal, etc.**.
- `status` → **Pending, completed, failed**.

✅ **Relation:** `payments.appointment_id > appointments.id` (Each payment is linked to an appointment).

---

### **7️⃣ `reviews` (Customer Ratings & Feedback)**

This table stores **customer reviews for beauty masters**.

- `id` → Unique review ID.
- `customer_id` → **Foreign key** linking to `customers.id` (who left the review).
- `beauty_master_id` → **Foreign key** linking to `beauty_masters.id` (who is being reviewed).
- `rating` → **1 to 5** star rating.
- `comment` → Customer's feedback.
- `created_at` → Timestamp when the review was posted.

✅ **Relation:**

- `reviews.customer_id > customers.id` (A customer leaves a review).
- `reviews.beauty_master_id > beauty_masters.id` (The review is for a beauty master).

---

### **8️⃣ `follows` (Social Feature - Following Beauty Masters)**

This table allows **users to follow beauty masters** (or other users).

- `following_user_id` → **User ID** who is following.
- `followed_user_id` → **User ID** being followed.
- `created_at` → Timestamp when the follow action occurred.

✅ **Relation:**

- `follows.following_user_id > users.id` (A user follows another user).
- `follows.followed_user_id > users.id` (A user is being followed).

---

### **9️⃣ `posts` (Social Media Posts)**

This table stores **posts made by users (beauty masters, customers, or admins)**.

- `id` → Unique post ID.
- `title` → Post title.
- `body` → Post content.
- `user_id` → **Foreign key** linking to `users.id` (who created the post).
- `status` → Post status.
- `created_at` → Timestamp when the post was published.

✅ **Relation:** `posts.user_id > users.id` (A post belongs to a user).

## **How This Works in the App**

1. **Users register** as either **customers** or **beauty masters**.
2. **Beauty masters list services** (e.g., Haircut, Makeup).
3. **Customers book appointments** with beauty masters.
4. **Payments are processed** for appointments.
5. **Customers leave reviews** after completed appointments.
6. **Users can follow beauty masters** to see their updates/posts.
7. **Beauty masters & customers can post** updates about services.

Roles: 
customer → Can book appointments, leave reviews, make payments.
beauty_master → Can list services, manage appointments, view reviews.
admin → Can manage users, delete beauty masters, approve/reject accounts.
