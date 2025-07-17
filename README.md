# LearnCode Website

A full-stack learning platform for online courses, featuring user authentication, course catalog, payment integration, and a modern frontend UI. Built with React (frontend) and Node.js/Express (backend).

## Features

- User registration, login, and profile management
- Browse and enroll in courses
- Course progress tracking
- Ratings and reviews for courses
- Secure payment integration (Razorpay, CashFree)
- Email notifications for enrollment, verification, and password updates
- Admin dashboard for managing courses, categories, and users

## Project Structure

```
frontend/
  learning-platfrom/
    src/
      App.css                    # Main app styles
      App.js                     # Root React component
      App.test.js               # App tests
      index.css                 # Global styles
      index.js                  # React app entry point
      logo.svg                  # App logo
      reportWebVitals.js        # Performance monitoring
      setupTests.js             # Test configuration
      assets/                   # Static assets
        Images/                 # Image files
        Logo/                   # Logo files
        TimeLineLogo/           # Timeline logo assets
        updated Images/         # Updated image assets
      catalogs/                 # Course catalog components
        CatagoryCourseSection.jsx
        CatagoryDifferentSection.jsx
        CatagoryTopCourseSection.jsx
        CatalogsHome.jsx
        CourseCard.jsx
        Loading.jsx
        RatingStars.jsx
        StyleCard.jsx
        TagHeadingSection.jsx
      component/                # Reusable components
        Cart Section/           # Shopping cart components
        common/                 # Common UI components
        core/                   # Core app components
        CoursePage Component/   # Course page components
        VideoSection/           # Video player components
      Dashboard/                # Dashboard components
        AddCourse/              # Course creation components
        Addsections/            # Section management
        Enrolled_Cources/       # Enrolled courses view
        Instructor DashBoard/   # Instructor dashboard
        MyCourseSection/        # My courses section
        PublishSection/         # Course publishing
        settings/               # User settings
        FileDetails.jsx
        Loader.jsx
        LogoutModal.jsx
        MyProfile.jsx
        Sidebar.jsx
      data/                     # Static data files
      Hook/                     # Custom React hooks
      pages/                    # Page components
        About.jsx
        Cart.jsx
        Contact.jsx
        CoursePage.jsx
        DashBoard.jsx
        ForgetPassword.jsx
        Home.jsx
        InstructorDashBoard.jsx
        Login.jsx
        PurchaseHistory.jsx
        Signup.jsx
        UpdatePassword.jsx
        VerifyEmail.jsx
        VideoPage.jsx
      service/                  # API service functions
      Store/                    # Redux store configuration
      utils/                    # Utility functions
    public/                     # Public assets
      favicon.ico
      index.html
      logo192.png
      logo512.png
      manifest.json
      robots.txt
      sFavIcon.png
      sholarBayLogo.png
    build/                      # Production build output
      asset-manifest.json
      favicon.ico
      index.html
      logo192.png
      logo512.png
      manifest.json
      robots.txt
      sFavIcon.png
      sholarBayLogo.png
      static/
        css/                    # Compiled CSS files
        js/                     # Compiled JavaScript files
        media/                  # Media assets
    package.json                # Frontend dependencies
    README.md                   # Frontend documentation
    tailwind.config.js          # Tailwind CSS configuration
    vercel.json                 # Vercel deployment config
server/
  index.js                      # Server entry point
  package.json                  # Backend dependencies
  payment.md                    # Payment integration docs
  config/                       # Configuration files
    cashFree.js                 # CashFree payment config
    cloudinary.js               # Cloudinary config
    database.js                 # MongoDB connection
    razorpay.js                 # Razorpay payment config
  controllers/                  # API route handlers
    Auth.controller.js          # Authentication logic
    Category.js                 # Category management
    Course.controller.js        # Course CRUD operations
    Payment.controller.js       # Payment processing
    Profile.controller.js       # User profile management
    RatingAndReview.controller.js # Course ratings/reviews
    reSetPassowrd.controller.js # Password reset
    section.controller.js       # Course sections
    Subsection.controller.js    # Course subsections
    tags.controller.js          # Tag management
    userDelete.controller.js    # User deletion
  mail/                         # Email templates (old)
    templates/
      courseEnrollmentEmail.js
      emailVerificationTemplate.js
      passwordUpdate.js
  mails/                        # Email templates (current)
    courseEnrollmentEmail.js
    emailVerificationTemplate.js
    passwordUpdate.js
    paymentSuccessEmail.js
  middlewares/                  # Express middlewares
    auth.middleware.js          # Authentication middleware
  models/                       # Mongoose schemas
    Category.js                 # Course categories
    Course.js                   # Course model
    CourseProgress.js           # User progress tracking
    OTP.js                      # OTP verification
    Profile.js                  # User profile
    RatingAndRaview.js          # Course ratings
    Section.js                  # Course sections
    SubSection.js               # Course subsections
    Tags.js                     # Course tags
    User.js                     # User accounts
  router/                       # Express routes
    Course.router.js            # Course-related routes
    Payment.router.js           # Payment routes
    Profile.router.js           # Profile routes
    SendMail.router.js          # Email routes
    User.router.js              # User authentication routes
  utils/                        # Utility functions
    imageUploader.js            # Cloudinary image upload
    mailSend.js                 # Email sending utilities
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (local or cloud)

### Installation

1. **Clone the repository:**
   ```powershell
   git clone https://github.com/azad52786/LearnCode-website.git
   cd LearnCode-website
   ```

2. **Install dependencies:**
   ```powershell
   cd frontend/learning-platfrom
   npm install
   cd ../../server
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env` file in `server/` with your MongoDB URI, payment keys, and other secrets.

4. **Run the development servers:**
   - **Frontend:**
     ```powershell
     cd frontend/learning-platfrom
     npm start
     ```
   - **Backend:**
     ```powershell
     cd server
     npm start
     ```

5. **Access the app:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000](http://localhost:5000)

## Technologies Used

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Payments:** Razorpay, CashFree
- **Email:** Nodemailer

## Folder Details

- `frontend/learning-platfrom/src/` - Main React app code
- `server/controllers/` - API logic for authentication, courses, payments, etc.
- `server/models/` - Mongoose schemas for database entities
- `server/router/` - Express route definitions
- `server/config/` - Payment and cloud configuration files
- `server/utils/` - Helper functions (image upload, mail send, etc.)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, open an issue or contact [azad52786](https://github.com/azad52786).
