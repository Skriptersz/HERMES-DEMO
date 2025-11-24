# REM Dubai - Real Estate Demo

A stunning, interactive single-page application for luxury real estate lead capture, built with React and featuring a beautiful stepper component.

## ✨ Features

- **Interactive Stepper Component** - Smooth animated 4-step form with progress tracking
- **Luxury Design** - Premium gold/black theme with elegant animations
- **Property Showcase** - 6 exclusive Dubai properties with images and details
- **Salesforce Integration** - Structured data format ready for Salesforce lead capture
- **Fully Responsive** - Beautiful on all devices from mobile to desktop
- **Loading States** - Professional loading and success animations

## 🏢 Property Listings

- Dubai Marina 2BR - AED 2.5M
- Downtown Dubai 3BR Penthouse - AED 5.8M
- Palm Jumeirah Villa - AED 12M
- Jumeirah Beach Residence 1BR - AED 1.8M
- Business Bay 2BR - AED 2.2M
- Burj Khalifa View 4BR - AED 8.5M

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📝 Form Steps

1. **Welcome** - Introduction to REM Dubai's services
2. **Your Information** - Name, email, phone, and budget selection
3. **Property Selection** - Browse and select from luxury properties
4. **Review & Submit** - Review details and submit to Salesforce

## 🔌 Salesforce Integration

The app now includes **full Salesforce integration** via Netlify Functions with the `jsforce` library.

### Setup Instructions

1. **Create Custom Fields in Salesforce**
   - Go to Salesforce Setup → Object Manager → Lead → Fields & Relationships
   - Create two custom fields:
     - `Property_Interest__c` (Text, length 255)
     - `Budget__c` (Picklist with values: 1-2M, 2-5M, 5-10M, 10M+)

2. **Get Your Salesforce Credentials**
   - Username: Your Salesforce login email
   - Password: Your Salesforce password
   - Security Token: Setup → Personal Setup → My Personal Information → Reset My Security Token
   - Login URL: `https://login.salesforce.com` (or `https://test.salesforce.com` for sandbox)

3. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Fill in your Salesforce credentials:
     ```bash
     SF_LOGIN_URL=https://login.salesforce.com
     SF_USERNAME=your_email@example.com
     SF_PASSWORD=your_password
     SF_SECURITY_TOKEN=your_token
     ```

4. **Deploy to Netlify**
   - Push your code to GitHub
   - Connect your repo to Netlify
   - Add the same environment variables in Netlify: Site Settings → Build & Deploy → Environment Variables
   - Deploy!

5. **Test Locally (Optional)**
   - Install Netlify CLI: `npm install -g netlify-cli`
   - Run: `netlify dev`
   - The function will be available at `http://localhost:8888/.netlify/functions/salesforce`

### Data Structure
The integration automatically maps form data to Salesforce Lead fields:
   - `FirstName` / `LastName` - Parsed from name input
   - `Email` - Contact email
   - `Phone` - Contact phone
   - `Property_Interest__c` - Selected property name (custom field)
   - `Budget__c` - Budget range (custom field)
   - `Description` - Additional notes
   - `LeadSource` - Set to "Website"
   - `Company` - Set to "REM Dubai Lead"

## 🎨 Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **Framer Motion** - Smooth animations
- **CSS3** - Custom styling with gradients and animations
- **Google Fonts** - Inter font family
- **JSforce** - Salesforce API integration
- **Netlify Functions** - Serverless backend

## 📱 Responsive Design

The application is fully responsive with breakpoints at:
- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: < 768px

## 🎯 Key Components

- `src/App.jsx` - Main application component
- `src/components/Stepper.jsx` - Reusable stepper component
- `src/components/Stepper.css` - Stepper styling
- `src/App.css` - Application-specific styles
- `src/index.css` - Global styles

## 🌟 Design Highlights

- Luxury gold (#d4af37) and black theme
- Smooth slide animations between steps
- Hover effects on all interactive elements
- Custom scrollbar styling
- Gradient backgrounds and borders
- Pulsing animations on selected items
- Professional loading spinner
- Success screen with checkmark animation

## 📄 License

This is a demo project for REM Dubai.

---

Built with ❤️ using React + Vite
