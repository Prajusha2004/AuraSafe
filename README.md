# AuraSafe - AI-Powered Personal Safety Platform

AuraSafe is a comprehensive personal safety application that leverages AI technology to provide real-time protection, emergency assistance, and community-driven safety features. Built for individuals who prioritize their safety and want to stay connected with their trusted network.

## 🌟 Features

### Core Safety Features
- **Emergency SOS Button** - Instant emergency alert with 5-second countdown
- **Real-time Location Sharing** - Share your location with trusted contacts
- **Safe Route Finder** - AI-powered route planning avoiding dangerous areas
- **Trust Network Management** - Build and manage your safety circle
- **Quick Check-in** - Regular safety status updates

### Advanced AI Features
- **AI Safety Assistant** - Intelligent chatbot for safety advice and support
- **Voice Command Integration** - Hands-free safety activation ("Hey Aura, I feel unsafe")
- **Personal Risk Score** - Dynamic safety assessment based on location and behavior
- **Behavioral Pattern Recognition** - Detects unusual patterns and proactively checks on user

### Community & Reporting
- **Community Safety Feed** - Real-time safety updates from local community
- **Incident Reporting** - Report and document safety incidents with evidence
- **Anonymous Posting** - Share safety concerns without revealing identity
- **Real-time Alerts** - Instant notifications about nearby safety threats

### Emergency Tools
- **Fake Call Feature** - Escape dangerous situations with realistic fake calls
- **Customizable Exit Strategies** - Pre-configured escape plans
- **Evidence Collection** - Auto-capture audio, photos during emergencies
- **Multi-contact Emergency Alerts** - Notify multiple trusted contacts simultaneously

## 🛠 Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Maps**: Leaflet with OpenStreetMap
- **Voice Recognition**: Web Speech API
- **State Management**: React Hooks

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd aurasafe
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Mobile Development

AuraSafe supports mobile development through Capacitor integration:

1. Install Capacitor dependencies:
```bash
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
```

2. Initialize Capacitor:
```bash
npx cap init
```

3. Add platforms:
```bash
npx cap add ios
npx cap add android
```

4. Build and sync:
```bash
npm run build
npx cap sync
```

5. Run on device:
```bash
npx cap run ios
npx cap run android
```

## 🎨 Design System

AuraSafe uses a custom design system built with Tailwind CSS:

- **Colors**: HSL-based semantic color tokens
- **Typography**: Responsive font scales
- **Components**: Reusable UI components with variants
- **Animations**: Smooth transitions and micro-interactions
- **Dark/Light Mode**: Full theme support

## 🔒 Privacy & Security

- All location data is processed locally when possible
- Emergency contacts are stored securely
- Anonymous reporting options available
- No personal data shared without explicit consent

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Emergency Disclaimer

AuraSafe is designed to assist with personal safety but should not replace official emergency services. In case of immediate danger, always call your local emergency number (911, 112, etc.) first.

## 📞 Support

For support and questions, please contact [support@aurasafe.com](mailto:support@aurasafe.com)

---

Built with ❤️ for safer communities worldwide.