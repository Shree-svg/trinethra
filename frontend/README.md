# Trinethra Frontend

The React-based frontend for Trinethra – the Supervisor Feedback Analyzer. This dashboard provides an intuitive interface for uploading transcripts, initiating analyses, and reviewing detailed performance feedback.

---

## 🎯 Overview

The Trinethra frontend is a modern React application built with Create React App that delivers:
- **Dark-themed dashboard** – Optimized for readability during extended analysis sessions
- **Real-time feedback** – Displays scores, evidence, and insights as they stream from the backend
- **Interactive heat-maps** – Visual representation of KPI alignment
- **Error handling** – Clear, user-friendly error messages when analysis fails

---

## 🚀 Quick Start

### Prerequisites
- Node.js v20 or higher
- Backend running on `http://localhost:5001` (see `/backend` for setup)

### Installation & Development

```bash
npm install
npm start
```

The app will open at **http://localhost:3000** in your browser. Hot-reload is enabled – changes to source files will trigger an automatic refresh.

---

## 📦 Available Scripts

### `npm start`
Runs the app in development mode with hot-reload enabled.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production. Output is optimized and minified in the `build/` folder.

### `npm run eject`
**⚠️ One-way operation** – Ejects from Create React App to expose webpack and other configurations. Use only if you need full control over the build setup.

---

## 🏗️ Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/           # Top-level page components
│   ├── api/             # Backend API calls
│   ├── App.js           # Root component
│   └── index.js         # Entry point
├── package.json
└── README.md
```

---

## 🔗 API Integration

The frontend communicates with the backend via the `/api/analyze` endpoint:

```javascript
POST http://localhost:5001/api/analyze
Content-Type: application/json

{
  "transcript": "Your transcript text here..."
}
```

Response includes:
- Rubric scores (1–10 scale)
- Evidence snippets
- KPI heat-map
- Identified gaps
- Suggested follow-up questions

---

## 🛠️ Development Tips

- **Debugging** – Use React Developer Tools browser extension for component inspection
- **API Testing** – Use Postman or `curl` to test the backend endpoint independently
- **Environment Variables** – Create a `.env` file to override `REACT_APP_*` variables
- **Styling** – Modify CSS files in the components directory to match your design system

---

## 📚 Learn More

- [React Documentation](https://reactjs.org/)
- [Create React App Docs](https://create-react-app.dev/)
- [Main Trinethra README](../README.md)

---

*Part of the Trinethra project – Supervisor Feedback Analyzer*
