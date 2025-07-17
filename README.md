# 🚀 LearnCode Website

<div align="center">

![LearnCode Logo](https://img.shields.io/badge/LearnCode-Online%20Learning%20Platform-blue?style=for-the-badge&logo=education&logoColor=white)

**A modern, full-stack learning platform for online courses**

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎓 **For Students**
- 📝 User registration & profile management
- 🔍 Browse comprehensive course catalog
- 📊 Track learning progress
- ⭐ Rate & review courses
- 🛒 Shopping cart functionality
- 📧 Email notifications

</td>
<td width="50%">

### 👨‍🏫 **For Instructors**
- 📚 Create & manage courses
- 🎥 Upload video content
- 📑 Organize course sections
- 💰 Payment integration
- 📈 Dashboard analytics
- 👥 Student management

</td>
</tr>
</table>

## 🏗️ Project Architecture

<div align="center">

```mermaid
graph TB
    A[👤 User Interface] --> B[⚛️ React Frontend]
    B --> C[🌐 Express API]
    C --> D[🍃 MongoDB Database]
    C --> E[💳 Payment Gateway]
    C --> F[☁️ Cloudinary Storage]
    C --> G[📧 Email Service]
```

</div>

### 📁 High-Level Structure

```
🏠 LearnCode-Website/
├── 🎨 frontend/learning-platfrom/     # React application
│   ├── 📦 src/
│   │   ├── 🧩 components/           # Reusable UI components
│   │   ├── 📄 pages/               # Application pages
│   │   ├── 🎛️ Dashboard/           # Admin & instructor panels
│   │   ├── 🛍️ catalogs/            # Course catalog features
│   │   └── 🔧 utils/               # Helper functions
│   └── 🏗️ build/                   # Production build
└── 🖥️ server/                       # Node.js backend
    ├── 🎯 controllers/              # Business logic
    ├── 📊 models/                   # Database schemas
    ├── 🛣️ router/                   # API endpoints
    ├── ⚙️ config/                   # App configuration
    └── 🔧 utils/                    # Server utilities
```

## 🚀 Quick Start

### 📋 Prerequisites

<div align="center">

| Tool | Version | Purpose |
|------|---------|---------|
| 📦 Node.js | v16+ | Runtime environment |
| 🐙 Git | Latest | Version control |
| 🍃 MongoDB | 4.4+ | Database |

</div>

### ⚡ Installation

<details>
<summary>📥 <strong>1. Clone Repository</strong></summary>

```powershell
git clone https://github.com/azad52786/LearnCode-website.git
cd LearnCode-website
```

</details>

<details>
<summary>📦 <strong>2. Install Dependencies</strong></summary>

```powershell
# Install frontend dependencies
cd frontend/learning-platfrom
npm install

# Install backend dependencies
cd ../../server
npm install
```

</details>

<details>
<summary>⚙️ <strong>3. Environment Setup</strong></summary>

Create `.env` file in `server/` directory:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret

# Payment Gateways
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
CASHFREE_APP_ID=your_cashfree_app_id
CASHFREE_SECRET_KEY=your_cashfree_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
```

</details>

<details>
<summary>🏃‍♂️ <strong>4. Run Development Servers</strong></summary>

```powershell
# Start backend server (Terminal 1)
cd server
npm run dev

# Start frontend server (Terminal 2)
cd frontend/learning-platfrom
npm start
```

**🌐 Access URLs:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

</details>

## 🛠️ Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

### Payment & Services
![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-339933?style=for-the-badge&logo=nodemailer&logoColor=white)

</div>

---

## 📚 Key Components

<table>
<tr>
<td width="33%">

### 🎨 **Frontend**
- **React 18** - Modern UI framework
- **TailwindCSS** - Utility-first styling
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Hook Form** - Form handling

</td>
<td width="33%">

### ⚙️ **Backend**
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads

</td>
<td width="33%">

### 🔌 **Integrations**
- **Razorpay/CashFree** - Payments
- **Cloudinary** - Media storage
- **Nodemailer** - Email service
- **OTP Generator** - Verification
- **CORS** - Cross-origin requests

</td>
</tr>
</table>

## 🤝 Contributing

We welcome contributions! Here's how you can help:

<div align="center">

[![Contributors](https://img.shields.io/badge/Contributors-Welcome-brightgreen?style=for-the-badge)](https://github.com/azad52786/LearnCode-website/issues)

</div>

### 🔄 Process

1. **🍴 Fork** the repository
2. **🌿 Create** your feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **💻 Commit** your changes
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **🚀 Push** to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. **📝 Open** a Pull Request

### 🐛 Found a Bug?

- Open an [issue](https://github.com/azad52786/LearnCode-website/issues)
- Describe the bug and steps to reproduce
- Include screenshots if applicable

---

## 📄 License

<div align="center">

![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

</div>

---

## 📞 Contact & Support

<div align="center">

### 👨‍💻 Developer

[![GitHub](https://img.shields.io/badge/GitHub-azad52786-181717?style=for-the-badge&logo=github)](https://github.com/azad52786)
[![Email](https://img.shields.io/badge/Email-Contact%20Me-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:azad52786@example.com)

### 🆘 Need Help?

- 📖 [Documentation](https://github.com/azad52786/LearnCode-website/wiki)
- 🐛 [Report Issues](https://github.com/azad52786/LearnCode-website/issues)
- 💬 [Discussions](https://github.com/azad52786/LearnCode-website/discussions)

</div>

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

[![Stars](https://img.shields.io/github/stars/azad52786/LearnCode-website?style=social)](https://github.com/azad52786/LearnCode-website/stargazers)
[![Forks](https://img.shields.io/github/forks/azad52786/LearnCode-website?style=social)](https://github.com/azad52786/LearnCode-website/network/members)

**Made with ❤️ for the learning community**

</div>
