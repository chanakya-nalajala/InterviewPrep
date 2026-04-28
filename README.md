# 🚀 Interview Prep – Your Personal Interview Coach

> A comprehensive interview preparation platform for Java, Spring Boot, Microservices, and related technologies.

[![Tech Stack](https://img.shields.io/badge/Tech-React%2019%20%7C%20TypeScript%20%7C%20Firebase-blue?style=for-the-badge)](/README.md)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](/LICENSE)

## ✨ Features

### 📚 **Comprehensive Question Bank**
- **600+ Interview Questions** across 13 technology categories
- Organized by categories and topic sections
- Real-world scenario-based questions
- Expert-curated hints for every question
- Preloaded answers with Markdown formatting and code examples

### 📊 **Progress Tracking**
- Track the completion status for each question
- Mark questions as Done, Revisit, or Skip
- Confidence rating system (1–5 stars)
- Visual progress indicators and statistics
- Personal dashboard with insights
- Real-time sync across devices via Firebase

### 🎯 **Smart Organization**
- **13 Categories**: Java Core, Spring Framework, Microservices, and more
- **Drill-down Navigation**: Category → Section → Questions
- **Search functionality** across all questions
- Filter and find questions quickly
- PDF export for sections (with hints and answers)

### 🔐 **Secure Authentication**
- Google Sign-In via Firebase Authentication
- User data privacy and security
- Individual user progress isolation

### 🎨 **Modern UI/UX**
- Dark theme optimized for extended study sessions
- Responsive design (mobile, tablet, desktop)
- Smooth animations and fluid transitions
- Perky, motivational greetings
- Clean, professional interface with custom CSS styling

---

## 🛠️ Tech Stack

| Category       | Technologies                                                       |
|----------------|--------------------------------------------------------------------|
| **Frontend**   | React 19.2.5, TypeScript 6.0.3                                     |
| **Routing**    | React Router 7.14.2                                                |
| **Build Tool** | Vite 7.3.2                                                         |
| **Backend**    | Firebase 12.12.1 (Auth, Firestore)                                 |
| **Styling**    | Custom CSS with CSS Variables, Google Fonts (JetBrains Mono, Syne) |
| **Markdown**   | react-markdown 10.1.0, remark-gfm 4.0.1                            |
| **PDF Export** | jsPDF 4.2.1                                                        |
| **Deployment** | GitHub Pages (via gh-pages)                                        |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Firebase account (for authentication and progress tracking)

### Installation

**Clone the repository**
```bash
git clone https://github.com/chanakya-nalajala/InterviewPrep.git
cd InterviewPrep
```

**Install dependencies**
```bash
npm install
```
**Set up environment variables**

Create a `.env` file in the root directory:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

**Configure Firebase**

- Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
- Enable Google Authentication
- Enable Firestore Database
- Deploy security rules from `firestore.rules`

**Run development server**
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 📁 Project Structure

```
InterviewPrep/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Breadcrumb.tsx
│   │   ├── CategoryCard.tsx
│   │   ├── EmptyState.tsx
│   │   ├── GoogleIcon.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── QuestionsList.tsx
│   │   ├── SearchBar.tsx
│   │   ├── SectionCard.tsx
│   │   ├── SkeletonLoader.tsx
│   │   ├── StatCard.tsx
│   │   ├── StatusButton.tsx
│   │   └── Toast.tsx
│   ├── data/                # Question data and types
│   │   ├── data.json        # All questions with answers
│   │   ├── dataLoader.ts    # Data loading utilities
│   │   └── types.ts         # TypeScript type definitions
│   ├── firebase/            # Firebase configuration
│   │   ├── config.ts        # Firebase initialization
│   │   └── progressService.ts # Progress tracking service
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.tsx      # Authentication hook
│   │   └── useProgress.tsx  # Progress tracking hook
│   ├── pages/               # Page components
│   │   ├── Dashboard.tsx    # Main dashboard (categories/sections/questions)
│   │   └── Login.tsx        # Login page
│   ├── services/            # External services
│   │   └── pdfExport.ts     # PDF generation service
│   ├── styles/              # Global styles
│   │   └── global.css       # CSS variables and global styles
│   ├── App.tsx              # Main app component with routing
│   ├── main.tsx             # Application entry point
│   └── vite-env.d.ts        # Vite type definitions
├── firestore.rules          # Firebase security rules
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies and scripts
└── README.md
```

---

## 🎯 Usage Guide

### 1. **Login**
- Sign in with your Google account
- Secure authentication via Firebase

### 2. **Browse Categories**
- View all 13 technology categories on the dashboard
- See progress statistics for each category

### 3. **Select a Section**
- Click on a category to view its sections
- Each section shows total questions and completion status

### 4. **Practice Questions**
- Browse interview and scenario questions
- Click "Show Hint" for helpful guidance
- Click "Show Answer" to view the preloaded answer with code examples
- Use "Search Google" to find additional resources

### 5. **Track Progress**
- Mark questions as:
  - ✓ **Done** - Mastered
  - ⟲ **Revisit** – Need review
  - → **Skip** – For later
- Rate your confidence (1–5 stars)
- Progress syncs automatically across devices

### 6. **Export to PDF**
- Export any section to PDF
- Choose to include hints and/or answers
- Perfect for offline study

### 7. **Review Progress**
- Check your dashboard for overall statistics
- Track completion rates by category
- Monitor your confidence levels

---

## 🔥 Firebase Setup

### Required Collections

- **`userProgress`** - Individual user progress (private per user)

### Firestore Security Rules

Deploy the security rules from `firestore.rules`:

```bash
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /userProgress/{userId} {
      allow read, write: if request.auth != null
                         && request.auth.uid == userId;
    }
  }
}
```

These rules ensure:
- Only authenticated users can access data
- Users can only read/write their own progress
- Complete privacy and security

---

## 📦 Build & Deployment

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

### Preview Production Build

```bash
npm run preview
```

---

## 🎨 Customization

### Adding Questions

1. Open `src/data/data.json`
2. Follow the existing structure:

```json
{
  "categoryId": "my-category",
  "categoryName": "My Category",
  "icon": "🎯",
  "color": "var(--blue)",
  "description": "Category description",
  "sections": [
    {
      "sectionId": "my-section",
      "sectionName": "Section Name",
      "questions": [
        {
          "id": "unique-q-id",
          "type": "interview",
          "question": "Your question?",
          "hint": "Helpful hint",
          "answer": "Detailed answer with markdown support"
        }
      ]
    }
  ]
}
```

### Theming

Edit `src/styles/global.css` to customize:
- CSS color variables (dark theme colors)
- Fonts (currently using JetBrains Mono and Syne from Google Fonts)
- Animation timings
- Border radius and spacing

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Firebase for authentication and database services
- React and Vite teams for an excellent development experience
- Google Fonts for JetBrains Mono and Syne typefaces
- All contributors and users

---

## 📊 Statistics

- **608** Interview Questions
- **13** Technology Categories
- **Multiple** Topic Sections per Category
- **Preloaded** Answers with Code Examples
- **Google** Authentication
- **100%** TypeScript
- **Dark Theme** Optimized for Study
- **PDF Export** Functionality

---

## 🗺️ Roadmap

- [ ] Add more question categories (AWS, Docker, Kubernetes, System Design)
- [ ] Implement spaced repetition algorithm for review scheduling
- [ ] Add interview simulation mode with a timer
- [ ] Enhanced PDF export with better formatting
- [ ] Mobile app (React Native)
- [ ] Community-contributed questions
- [ ] Dark/Light theme toggle
- [ ] Interview tips and strategies section
- [ ] Flashcard mode for quick review

---

## 🐛 Known Issues

- Environment variables require dev server restart to update

**Note:** All answers are stored in `src/data/data.json` and loaded directly from the file. PDF export includes both hints and answers by default.

---

## 💡 Pro Tips

1. **Use Search**: Quickly find specific topics using the search bar
2. **Mark Revisits**: Don't skip challenging questions – mark them for review
3. **Try Before Reading**: Attempt to answer before viewing hints or answers
4. **Confidence Ratings**: Be honest – it helps track real progress
5. **Daily Practice**: Consistency beats cramming every time
6. **Export to PDF**: Download sections for offline study
7. **Google Search**: Use the integrated search button for additional resources

---

## ❓ FAQ

<details>
<summary><strong>Do I need any API keys to use this app?</strong></summary>

No external API keys are needed! All answers are preloaded in the application. You only need a Firebase account for authentication and progress tracking.
</details>

<details>
<summary><strong>Is my progress saved?</strong></summary>

Yes! Your progress is automatically saved to Firebase Firestore and syncs in real-time across all your devices. As long as you're logged in with the same Google account, your progress will be preserved.
</details>

<details>
<summary><strong>Can I use this offline?</strong></summary>

Not currently. The app requires an internet connection for Firebase authentication and data sync. However, you can export sections to PDF for offline study.
</details>

<details>
<summary><strong>Can I add my own questions?</strong></summary>

Yes! Fork the repository, add your questions to `src/data/data.json` following the existing structure, and submit a pull request. We welcome community contributions!
</details>

<details>
<summary><strong>Which browsers are supported?</strong></summary>

All modern browsers: Chrome, Firefox, Safari, Edge (latest two versions). Mobile browsers are also fully supported with responsive design.
</details>

<details>
<summary><strong>How do I export questions to PDF?</strong></summary>

When viewing a section, click the PDF export button. You can choose to include hints and/or answers in the export. Perfect for printing or offline study.
</details>

<details>
<summary><strong>Is the app free to use?</strong></summary>

Yes! The app is completely free and open-source. You only need a free Firebase account for the backend services (which has generous free tier limits).
</details>

---

## 🔒 Security & Privacy

- ✅ All user data is encrypted and stored securely in the Firebase Firestore
- ✅ User progress is completely private (only accessible by the authenticated user)
- ✅ Firestore security rules ensure data isolation per user
- ✅ Authentication uses industry-standard OAuth 2.0 via Google Sign-In
- ✅ No third-party tracking or analytics
- ✅ All questions and answers are stored locally in the codebase (no external API calls)

---

## 📞 Support

Having issues? Check out:
- Firebase Console for authentication and database setup
- [Issues](https://github.com/chanakya-nalajala/InterviewPrep/issues) – Report bugs or request features
- Review `firestore.rules` for security rule configuration

---

## ⚡ Performance

- **Optimized Bundle**: Code-splitting with React lazy loading
- **Vendor Chunks**: Separate chunks for React and Firebase (configured in vite.config.ts)
- **Real-time Sync**: Firestore real-time listeners for instant progress updates
- **Lazy Loading**: A dashboard component lazy-loaded for a faster initial load
- **Preloaded Answers**: Instant answer display (loaded from data.json)
- **Responsive Design**: Optimized for all screen sizes

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ for developers preparing for technical interviews

Built with React 19, TypeScript, Firebase, and Vite

[Report Bug](https://github.com/chanakya-nalajala/InterviewPrep/issues) · [Request Feature](https://github.com/chanakya-nalajala/InterviewPrep/issues)

</div>
