# Navya Customization

A premium MERN stack website for Navya Customization featuring a modern responsive landing page, product showcase, gallery, FAQ, and a contact form connected to a Node/Express backend with MongoDB storage and email notifications.

## Features
- Responsive React + Tailwind landing page
- Smooth scrolling sections and premium UI
- Contact form submission to MongoDB
- Email notifications through Nodemailer
- SEO-friendly structure and reusable component style

## Project Structure
- client/ - Vite React frontend
- server/ - Express API and MongoDB integration

## Setup
### Frontend
```bash
cd client
npm install
npm run dev
```

### Backend
```bash
cd server
npm install
npm run dev
```

## Environment Variables
Create a .env file in the server directory with:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/navya-customization
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=your_email@gmail.com
CLIENT_URL=http://localhost:3000
```

## Deployment Notes
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
