# iNotebook

[Live Link to Application](https://inotebook-host.vercel.app/)
[Live Link to Portfolio](https://portfolio3-d-gray.vercel.app)

A **MERN Stack Note-Keeper Application** inspired by Google Keep. iNotebook allows users to add, edit, and manage notes in a seamless, visually appealing, and user-friendly interface. Designed to demonstrate originality, robust error handling, and aesthetic creativity.

---

## Features

1. **Add Notes**
   - Create a note with a **title**, **tagline**, and **body**.
   - Notes are displayed in a **grid layout** on the homepage.
   - Clicking on a note opens an **editable pop-up** for easy modifications.

2. **Pin Notes**
   - Notes can be **pinned**, ensuring they always appear at the top, irrespective of their creation or last-edit date.

3. **Pagination**
   - Efficiently manage notes with pagination.
   - Each page contains a maximum of **6 notes**.

4. **Collaborative Environment**
   - No sign-in required.
   - Multiple users can simultaneously add and view notes.

5. **Cloud Integration**
   - Utilizes **Google Cloud Managed Services** for CRUD operations.

6. **Error Handling**
   - Comprehensive error handling with **toast notifications** and/or **pop-ups**.
   - Avoids using `window.alert()` for a polished user experience.

---

## Technologies Used

### Frontend:
- **React.js**
- **CSS** / **TailwindCSS** for styling
- **React-toastify** for error notifications
- **React-pagination** for pagination functionality

### Backend:
- **Node.js** with **Express.js**
- **MongoDB** for database management
- **Mongoose** for object modeling

### Cloud:
- **Google Cloud** for managed CRUD services

---

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Aman12f/inotebook.git
   cd inotebook
   ```

2. **Install dependencies:**
   ```bash
   # Install server dependencies
   cd backend
   npm install

   # Install client dependencies
   cd ../frontend
   npm install
   ```

3. **Configure Environment Variables:**
   - Create a `.env` file in the backend folder.
   - Add the following variables:
     ```env
     MONGO_URI=your_mongodb_connection_string
     PORT=5000
     GOOGLE_CLOUD_API_KEY=your_google_cloud_api_key
     ```

4. **Run the application:**
   ```bash
   # Start the backend server
   cd backend
   npm start

   # Start the frontend server
   cd ../frontend
   npm start
   ```

5. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`.

---

## Folder Structure

```
.
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── utils
│   └── server.js
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── utils
│   │   └── App.js
└── README.md
```

---

## Design and Aesthetics
- Unique and unconventional design tailored for an engaging user experience.
- Responsive and optimized for different devices.
- Focused on **clean layouts** and **intuitive interactions**.

---

## Key Points

1. **Error Handling:**
   - Implements robust error handling using `react-toastify` for user notifications.

2. **Originality:**
   - The application features a unique and unconventional design to set it apart from typical note-keeping apps.

3. **Code Organization:**
   - Well-structured codebase with modular components for scalability and maintainability.

---

## Future Enhancements
- Add user authentication for personalized note management.
- Implement note categories and advanced filtering options.
- Add support for file attachments.

---

## Screenshots
_Add screenshots here to showcase the application._

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Contact
For any inquiries, reach out at:
- **Email:** your.email@example.com
- **GitHub:** [Aman12f](https://github.com/Aman12f)
