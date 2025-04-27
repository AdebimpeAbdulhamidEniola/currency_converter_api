# Currency Converter API

A Node.js REST API for **currency conversion**, **exchange rate fetching**, and **rate alerts** — designed for **learning** and **real-world usage**.

Built with **Node.js**, **Express**, **PostgreSQL**, and **Redis**.

---

## ✨ Features

- Convert between major world currencies
- Fetch the latest exchange rates
- Set alerts when exchange rates cross a threshold
- Scheduled rate updates with cron jobs
- Modular, scalable folder structure (production-ready)
- API documentation with Swagger (OpenAPI)

---

## 📂 Project Structure

```bash
src/
 ├── config/         # Database configuration
 ├── controllers/    # Handle incoming API requests
 ├── cron/           # Cron jobs to update exchange rates and send alerts
 ├── data/           # SQL queries used to create tables
 ├── middlewares/    # Authentication, error handling
 ├── models/         # Database models and queries
 ├── routes/         # API endpoints
 ├── services/       # Logic of the code resides here
 └── index.js        # App entry point
swaggerConfig.js # Swagger documentation setup
```

---

## 🚀 Technologies Used

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **Redis**
- **Nodemailer**
- **Swagger (OpenAPI)**

---

## 🛠 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/AdebimpeAbdulhamidEniola/currency_converter_api.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file with these variables:

```bash
DATABASE_URL=your_postgresql_database_url
REDIS_URL=your_redis_url
EMAIL=your_email_for_alerts
PASSKEY=your_email_password_or_app_password
PORT=5000  # or any preferred port
```

### 4. Run the server

- **For local development:**

```bash
npm run dev
```

- **For production build:**

```bash
npm start
```

---

## 📄 API Documentation

After deployemnet.

```
https://currency-converter-api-zks2.onrender.com/api-docs
```

---

## 🤝 Open for Collaboration

I'm open to collaborating, especially with **frontend developers** who can build a beautiful UI for this API.

Also open to **new opportunities** — actively **open to work**.

---

## 📧 Contact

- GitHub: [AdebimpeAbdulhamidEniola](https://github.com/AdebimpeAbdulhamidEniola)
- Email: adebimpeabdulhamid5@gmail.com
- Phone Number: +2347052968938
---

# 🚀 Let's make something awesome together!

