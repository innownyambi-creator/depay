# Legend Cut LCB — Website Setup Guide
**Developed by Nhabinde I.**

---

## 📁 File Structure

```
legend-cut-lcb/
├── index.html          ← Main website (open this in your browser)
├── css/
│   └── style.css       ← All styling
├── js/
│   ├── main.js         ← Booking form, animations, EmailJS logic
│   └── email-config.js ← Detailed EmailJS setup instructions
├── assets/
│   └── logo.jpeg       ← Your barbershop logo
└── README.md           ← This file
```

---

## 🚀 How to Open the Website

**Locally (testing):**
- Double-click `index.html` — opens in your browser
- OR drag and drop into Chrome/Edge/Firefox

**Live online (recommended):**
- See "Hosting" section below

---

## 📧 Setting Up Email Notifications (Bookings to Your Email)

When customers book, you need to receive their details by email.

### Step 1 — Create EmailJS Account (Free)
1. Go to **https://www.emailjs.com**
2. Click "Sign Up Free"
3. Confirm your email

### Step 2 — Connect Your Email (Gmail)
1. In EmailJS, click **"Email Services"** → **"Add New Service"**
2. Choose **Gmail**
3. Name it `LegendCutLCB`
4. Click **Connect** and log in with your Gmail
5. Copy the **Service ID** (e.g. `service_abc123`)

### Step 3 — Create Email Template
1. Click **"Email Templates"** → **"Create New Template"**
2. Set the **Subject** to:
   ```
   New Booking: {{service}} — {{from_name}}
   ```
3. Set the **Body** to:
   ```
   Hello Thuso,

   You have a new booking at Legend Cut LCB!

   ────────────────────
   CUSTOMER DETAILS
   ────────────────────
   Name:    {{from_name}}
   Phone:   {{from_phone}}
   Service: {{service}}
   Price:   {{price}}
   Date:    {{date}}
   Time:    {{time}}

   Notes: {{message}}
   ────────────────────

   Call or WhatsApp the customer at: {{from_phone}}
   ```
4. Copy the **Template ID** (e.g. `template_xyz789`)

### Step 4 — Get Your Public Key
1. Click your name (top right) → **"Account"**
2. Under **"API Keys"**, copy your **Public Key**

### Step 5 — Update the Website
Open `js/main.js` in a text editor (Notepad, VS Code, etc.) and update these 4 lines at the top:

```javascript
const EMAILJS_CONFIG = {
  publicKey:  'PASTE_YOUR_PUBLIC_KEY_HERE',
  serviceId:  'PASTE_YOUR_SERVICE_ID_HERE',
  templateId: 'PASTE_YOUR_TEMPLATE_ID_HERE',
  toEmail:    'your.email@gmail.com'   // ← Your email address
};
```

Save the file. Test by filling in the booking form — you should receive an email!

---

## 🖼️ Adding Gallery Photos

Your gallery currently shows placeholder cards. To add real photos:

1. Put your haircut photos in the `assets/` folder (e.g. `assets/cut1.jpg`)
2. Open `index.html` in a text editor
3. Find the gallery section (search for `id="gallery"`)
4. Replace the placeholder `<div class="g-item placeholder">` blocks with:

```html
<div class="g-item" data-src="assets/your-photo.jpg">
  <img src="assets/your-photo.jpg" alt="Haircut style">
  <div class="g-overlay"><span class="g-tag">Classic Cut</span></div>
</div>
```

---

## 🗺️ Updating the Google Maps Location

1. Go to **Google Maps**
2. Search for your exact location / address
3. Click **Share** → **Embed a map** → Copy the `<iframe>` code
4. Open `index.html`, find the `<iframe` inside the map section
5. Replace the `src="..."` with your new embed URL

---

## 🌐 Hosting the Website Online (Free Options)

### Option A: Netlify (Easiest — Recommended)
1. Go to **https://netlify.com** and create a free account
2. Click **"Add new site"** → **"Deploy manually"**
3. Drag and drop your entire `legend-cut-lcb` folder
4. Your site goes live instantly with a free URL!
5. Optional: connect a custom domain like `legendcutlcb.co.za`

### Option B: GitHub Pages (Free)
1. Create a free account at **https://github.com**
2. Create a new repository called `legend-cut-lcb`
3. Upload all your files
4. Go to Settings → Pages → Set source to `main` branch
5. Your site is live at `yourusername.github.io/legend-cut-lcb`

---

## ✏️ Customisation Tips

| What to change | Where to find it |
|---|---|
| Business name / owner name | `index.html` — search for "Thuso" or "Legend Cut" |
| Phone numbers | `index.html` — search for "0677779709" |
| Location | `index.html` — search for "Cork Tust" |
| Services & prices | `index.html` — inside `id="services"` section |
| Colours (gold, black) | `css/style.css` — the `:root` section at the top |
| Opening hours | `index.html` — `id="hours"` section + `js/main.js` `initOpenStatus()` |

---

## 📱 WhatsApp Button

The floating WhatsApp button links to `https://wa.me/27677779709`. To change the number:
1. Open `index.html`
2. Search for `wa.me/27677779709`
3. Replace `27677779709` with your number in international format (27 = South Africa code, then the number without the leading 0)

---

## 🔧 Technical Requirements

- No server required — runs as static HTML
- Works on any web host, including free ones
- Mobile-responsive on all screen sizes
- EmailJS free plan: 200 emails/month

---

*Website developed by Nhabinde I. — © 2026 Legend Cut LCB*
