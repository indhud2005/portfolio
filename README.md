# B. Indhuja (Indhuja Bandreddi) — Developer Portfolio Website

A modern, high-performance single-page developer portfolio website tailored for fresher and graduate software engineers. Designed with a sleek developer / terminal aesthetic, glowing glassmorphic cards, light/dark mode memory, and zero build step dependencies so it can be hosted 100% free on **GitHub Pages**.

---

## 🚀 Live Demo & Structure

- **Demo URL**: `https://indhud2005.github.io/`
- **Stack**: HTML5, CSS3, Vanilla ES6+ JavaScript (No bundlers or npm dependencies needed)

### Directory Layout
```text
Indhuja/portfolio/
│
├── index.html                 # Semantic single-page HTML5 structure & SEO metadata
├── css/
│   └── style.css              # Custom CSS3 styles, CSS variables, dark/light theme, responsive layout
├── js/
│   └── script.js              # Theme manager, scrollspy, typewriter, project filtering, counter logic
├── assets/
│   ├── Indhuja_Bandreddi_Resume.pdf # Downloadable developer resume
│   ├── profile.svg            # Circular developer vector portrait with glowing rings
│   ├── favicon.svg            # Cyan terminal brackets favicon
│   ├── certificates/
│   │   ├── ediglobe_internship.pdf  # AI internship certificate
│   │   └── fullstack_cert.pdf       # Full stack certification
│   └── projects/
│       ├── project1.svg       # RecruitLink preview banner
│       ├── project2.svg       # TaskForge preview banner
│       ├── project3.svg       # Skycast preview banner
│       └── project4.svg       # NeuroVision AI preview banner
└── README.md                  # Deployment guide & customization documentation
```

---

## 🛠️ Step-by-Step GitHub Pages Deployment Guide

Deploying this portfolio to GitHub Pages takes less than 3 minutes:

### Step 1: Create a GitHub Repository
1. Log in to [GitHub](https://github.com/) under your account `indhud2005`.
2. Click **New Repository** (or visit [github.com/new](https://github.com/new)).
3. Name your repository:
   - For a user site: `indhud2005.github.io` (will be hosted directly at `https://indhud2005.github.io/`)
   - Or as a project repository: `portfolio` (will be hosted at `https://indhud2005.github.io/portfolio/`).
4. Set the visibility to **Public**.
5. Leave "Add a README file" unchecked (we already have one).
6. Click **Create repository**.

### Step 2: Upload or Push the Code
#### Method A: Using Git Command Line (Recommended)
Open your terminal inside the `Indhuja/portfolio` folder and run:
```bash
git init
git add .
git commit -m "Initial commit: Indhuja Bandreddi modern portfolio website"
git branch -M main
git remote add origin https://github.com/indhud2005/indhud2005.github.io.git
git push -u origin main
```

#### Method B: Using GitHub Web UI
1. In your newly created repository page, click **uploading an existing file**.
2. Drag and drop all files and folders (`index.html`, `css/`, `js/`, `assets/`, `README.md`) from `Indhuja/portfolio`.
3. Click **Commit changes**.

### Step 3: Enable GitHub Pages
1. Go to your repository's **Settings** tab.
2. In the left sidebar, click **Pages** (under the "Code and automation" section).
3. Under **Build and deployment > Source**, select **Deploy from a branch**.
4. Under **Branch**, select `main` and folder `/ (root)`, then click **Save**.
5. Refresh the page after 60 seconds. A green banner will appear:  
   `"Your site is live at https://indhud2005.github.io/"`.

---

## 💡 How to Add or Edit Projects

All project cards are driven by a clean, lightweight JavaScript array located inside `js/script.js`. You do **not** need to touch messy HTML markup to add or remove projects!

### The Project Object Structure
Open `js/script.js` and locate the `projectsData` array:

```javascript
const projectsData = [
  {
    title: "RecruitLink - Job Board",
    category: "Web Dev",        // Used for filter buttons ("Web Dev", "Software Eng", "AI")
    description: "Full-stack job discovery platform with search filters and applicant tracking.",
    tags: ["React", "Node.js", "MySQL", "CSS Grid"],
    image: "assets/projects/project1.svg", // Path to screenshot or banner
    liveUrl: "https://indhud2005.github.io/recruitlink-demo",  // Deployed URL (opens in new tab)
    githubUrl: "https://github.com/indhud2005/recruitlink-job-board" // Repository link
  },
  // ... more projects
];
```

### Automatic "Live Demo" Button Detection
- If a project is deployed online, put the URL in `liveUrl`.
- If a project is a desktop/backend application or not yet hosted online, simply leave `liveUrl: ""` (empty string). The **🔴 Live Demo** button will be automatically hidden from the card, leaving only the GitHub repository button!

---

## 📜 How to Add or Edit Certifications

Certifications are defined in an array in `js/script.js` under `certificatesData`:

```javascript
const certificatesData = [
  {
    title: "NodeJS Case Study - Movie App on Node JS and MongoDB",
    issuer: "Infosys (Infosys Springboard)",
    date: "October 2025",
    link: "https://your-verification-link.com", // Or leave "" to hide button
    skills: ["Node.js", "MongoDB", "REST APIs"],
    icon: `<i class="devicon-nodejs-plain colored"></i>`
  },
  // ... more certificates
];
```
- If a certificate does not have an online verification URL yet, leave `link: ""` and the "View Certificate" button is automatically hidden!

---

## 📬 Setting Up the Formspree Contact Form

The contact form is pre-configured to submit asynchronously using Formspree:
1. Go to [Formspree.io](https://formspree.io/) and create a free account.
2. Click **+ New Form**, name it "Portfolio Contact", and copy your unique Form ID (e.g. `xpzgvkrq`).
3. Open `index.html` and search for:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" novalidate>
   ```
4. Replace `YOUR_FORM_ID` with your actual ID:
   ```html
   <form id="contact-form" action="https://formspree.io/f/xpzgvkrq" method="POST" novalidate>
   ```
5. When visitors submit the form, messages will arrive straight to your email with instant feedback on screen!

---

## 📋 Final Checklist of Placeholders to Replace

Before publishing, customize these bracketed placeholders with your exact personal details:

| File | Line / Location | Placeholder | Recommended Value |
| :--- | :--- | :--- | :--- |
| `js/script.js` | `certificatesData[0].date` | `[MONTH YEAR]` | e.g. "October 2025" for Infosys Springboard |
| `js/script.js` | `certificatesData[0].link` | `[CERTIFICATE URL]` | Your Infosys Springboard certificate verification link |
| `js/script.js` | `certificatesData[1].date` | `[MONTH YEAR]` | e.g. "August 2025" for Cisco Data Science |
| `js/script.js` | `certificatesData[1].link` | `[CERTIFICATE URL or Credly badge URL]` | Your Cisco/Credly badge verification link |
| `js/script.js` | `certificatesData[2].date` | `[MONTH YEAR]` | e.g. "September 2025" for AWS GenAI |
| `js/script.js` | `certificatesData[2].link` | `[CERTIFICATE URL]` | Your AWS certificate verification link |
| `index.html` | `<section id="education">` | `[COLLEGE NAME]` | Your actual university/college name in Chennai |
| `index.html` | `<section id="education">` | `[8.5 / 10]` | Your actual CGPA |
| `index.html` | `<section id="education">` | `[SCHOOL NAME]` | Your Class XII school name in Chennai |
| `index.html` | `<section id="education">` | `[90%]` | Your actual Class XII percentage |
| `index.html` | `<section id="contact">` | `https://formspree.io/f/YOUR_FORM_ID` | Your actual Formspree form ID |
| `index.html` | `<section id="contact">` | `https://www.linkedin.com/in/indhuja-bandreddi-a0757a361/` | Configured with your LinkedIn |
| `index.html` | `<section id="contact">` | `https://github.com/indhud2005` | Configured with your GitHub |
| `js/script.js` | `projectsData[0].liveUrl` | `https://indhud2005.github.io/recruitlink-demo` | Real deployed URL or leave `""` |
| `assets/` | `assets/Indhuja_Bandreddi_Resume.pdf` | Resume PDF file | Replace with your finalized PDF resume export |
| `assets/` | `assets/profile.svg` | Profile photo | Keep vector avatar or replace with your personal headshot photo |

---

## 🌟 Key Features Built-in

- **Developer & Terminal Aesthetic**: Custom dark theme with cyan/teal neon accents, monospace typography, code editor cards, and interactive bash prompt.
- **Theme Memory**: Light/Dark toggle that remembers user preference via `localStorage`.
- **Performance & SEO**: Semantic HTML5 tags, full Open Graph and Twitter Card tags, lazy loaded images, zero heavy dependencies.
- **Responsive Layout**: Designed for mobile phones (375px+), tablets, and high-resolution desktop displays with an accessible hamburger drawer.
- **Animated Interactions**: IntersectionObserver scroll animations, animated typing hero roles, animated stat count-up, and filling skill bars.

