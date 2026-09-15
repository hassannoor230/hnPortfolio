# Hassan Noor — Portfolio

A luxury, dark-themed portfolio built with React, Framer Motion, and EmailJS.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build
```

---

## 📧 Setting Up EmailJS (Gmail Integration)

To receive contact form submissions at **hassannoor2309@gmail.com**, follow these steps:

### Step 1: Create an EmailJS Account
1. Go to [https://www.emailjs.com](https://www.emailjs.com)
2. Sign up for a **free account**
3. The free tier allows **200 emails/month** — more than enough

### Step 2: Connect Gmail Service
1. In EmailJS dashboard → **Email Services** → **Add New Service**
2. Select **Gmail**
3. Click **Connect Account** → Sign in with `hassannoor2309@gmail.com`
4. Give it a name like `gmail_portfolio`
5. Copy your **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template
1. In EmailJS dashboard → **Email Templates** → **Create New Template**
2. Set the template like this:

**Subject:**
```
New Portfolio Message: {{subject}}
```

**Body:**
```
You have a new message from your portfolio!

Name: {{name}}
Email: {{email}}
Subject: {{subject}}

Message:
{{message}}
```

3. Set **To Email**: `hassannoor2309@gmail.com`
4. Save and copy your **Template ID** (e.g., `template_xyz789`)

### Step 4: Get Your Public Key
1. In EmailJS dashboard → **Account** → **API Keys**
2. Copy your **Public Key** (e.g., `user_ABCDEFG...`)

### Step 5: Update the Code
Open `src/components/Contact.jsx` and replace these values at the top:

```javascript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'   // e.g., 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID' // e.g., 'template_xyz789'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'   // e.g., 'user_ABCDEFG...'
```

---

## 🎨 Customization

### Update Personal Info
- **Hero**: Edit `src/components/Hero.jsx` — update title, description, stats
- **About**: Edit `src/components/About.jsx` — update bio, skills, timeline
- **Works**: Edit `src/components/Works.jsx` — update projects array
- **Contact**: Edit `src/components/Contact.jsx` — update contact info & social links
- **Footer**: Edit `src/components/Footer.jsx` — update links

### Add Your Photo
In `src/components/About.jsx`, find the avatar placeholder section and replace it with:
```jsx
<img 
  src="/your-photo.jpg" 
  alt="Hassan Noor"
  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
/>
```
Place your photo in the `public/` folder.

### Update Social Links
Search for `href="#"` in the components and replace with your actual URLs.

---

## 🛠 Tech Stack

- **React 18** — UI library
- **Vite** — Build tool
- **Framer Motion** — Animations
- **EmailJS** — Contact form email delivery
- **Lucide React** — Icons
- **Google Fonts** — Cormorant Garamond + DM Sans

---

## 📦 Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload the `dist/` folder to Netlify
```

---

## 📁 Project Structure

```
portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Works.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

---

Made with ♥ by Hassan Noor
