# Fashion Admin Panel

A production-grade admin panel for managing a fashion recommendation app with React.js frontend and Django backend that integrates with Firebase services.

## 🚀 Features

### 🔐 Authentication
- Secure JWT-based admin login
- Form validation and error handling
- Protected routes with automatic token refresh
- Session management with logout functionality

### 📊 Dashboard
- Real-time overview cards showing key metrics
- Interactive charts for user trends and engagement
- Recent activity feed
- Performance metrics and system health

### 👥 User Management
- List all users with search and pagination
- View detailed user profiles and activity
- Disable/enable user accounts
- Delete users (super admin only)
- User analytics and demographics

### 🛡️ Content Moderation
- Review flagged polls and comments
- View full content context
- Approve or remove inappropriate content
- Content moderation history

### 🤖 AI Prompt Templates
- Create and manage AI prompt templates
- Categorize by occasion, weather, mood, etc.
- Edit and delete templates
- Track template usage statistics

### 💳 Subscription Management
- Manage monthly and annual pricing plans
- View subscription analytics and metrics
- Monitor conversion rates and churn
- Revenue tracking and forecasting

### 📱 Push Notifications
- Send targeted notifications via FCM
- Template-based messaging system
- Scheduled notifications
- Delivery status tracking

### 📈 Analytics & Insights
- Comprehensive analytics dashboard
- Closet upload statistics
- Poll participation metrics
- Revenue breakdowns (subscriptions + ads)
- User engagement insights

### ⚙️ System Settings
- Feature flag management (ads, AI, polling)
- System threshold configuration
- System health monitoring
- Backup and maintenance tools

## 🏗️ Technology Stack

### Frontend
- **React.js** - Modern UI framework
- **Material-UI (MUI)** - Beautiful and accessible components
- **React Router** - Client-side routing
- **React Query (@tanstack/react-query)** - Data fetching and caching
- **Recharts** - Interactive charts and graphs
- **Axios** - HTTP client with interceptors

### Backend
- **Django** - Python web framework
- **Django REST Framework** - API development
- **Django Simple JWT** - JWT authentication
- **Firebase Admin SDK** - Firebase integration
- **Django CORS Headers** - Cross-origin resource sharing

### Firebase Services
- **Firebase Auth** - User authentication
- **Firestore** - NoSQL database
- **Firebase Storage** - File storage
- **Firebase Cloud Messaging (FCM)** - Push notifications
- **AdMob** - Advertisement revenue

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8+
- pip (Python package manager)
- Firebase project with Admin SDK credentials

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd fashion-admin-panel/backend
   ```

2. **Install Python dependencies**
   ```bash
   pip3 install --break-system-packages -r requirements.txt
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Run database migrations**
   ```bash
   python3 manage.py makemigrations
   python3 manage.py migrate
   ```

5. **Create admin user**
   ```bash
   python3 manage.py createsuperuser
   ```

6. **Start Django development server**
   ```bash
   python3 manage.py runserver
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd fashion-admin-panel/frontend
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API URL
   ```

4. **Start React development server**
   ```bash
   npm start
   ```

### Firebase Configuration

1. **Download Firebase Admin SDK credentials**
   - Go to Firebase Console → Project Settings → Service Accounts
   - Generate new private key and download JSON file

2. **Update backend environment variables**
   ```env
   FIREBASE_CREDENTIALS_PATH=/path/to/your/firebase-credentials.json
   FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
   FIREBASE_PROJECT_ID=your-project-id
   ```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login/` - Admin login
- `POST /api/auth/logout/` - Admin logout
- `GET /api/auth/profile/` - Get user profile
- `POST /api/auth/refresh-token/` - Refresh JWT token

### Dashboard
- `GET /api/dashboard/overview/` - Dashboard overview data
- `GET /api/dashboard/login-trends/` - User login trends
- `GET /api/dashboard/voting-engagement/` - Voting statistics

### User Management
- `GET /api/users/` - List users with pagination
- `GET /api/users/{uid}/` - Get user details
- `POST /api/users/{uid}/disable/` - Disable user
- `DELETE /api/users/{uid}/delete/` - Delete user

### Content Moderation
- `GET /api/content/flagged/` - Get flagged content
- `POST /api/content/{id}/remove/` - Remove content
- `POST /api/content/{id}/approve/` - Approve content

### AI Templates
- `GET /api/templates/` - List templates
- `POST /api/templates/create/` - Create template
- `PUT /api/templates/{id}/update/` - Update template
- `DELETE /api/templates/{id}/delete/` - Delete template

### Subscriptions
- `GET /api/subscriptions/` - List subscriptions
- `GET /api/subscriptions/pricing/` - Get pricing plans
- `PUT /api/subscriptions/pricing/` - Update pricing

### Notifications
- `POST /api/notifications/send/` - Send notification
- `GET /api/notifications/history/` - Notification history

### Analytics
- `GET /api/analytics/closet/` - Closet analytics
- `GET /api/analytics/polls/` - Poll analytics
- `GET /api/analytics/ad-revenue/` - Ad revenue breakdown

### Settings
- `GET /api/settings/feature-flags/` - Get feature flags
- `PUT /api/settings/feature-flags/` - Update feature flags
- `GET /api/settings/thresholds/` - Get system thresholds
- `PUT /api/settings/thresholds/` - Update thresholds

## 🔒 Security Features

- **JWT Authentication** with automatic refresh
- **Protected Routes** requiring authentication
- **Role-based Access Control** (super admin privileges)
- **CORS Configuration** for cross-origin requests
- **Input Validation** on all forms
- **Session Management** with secure logout
- **Rate Limiting** on sensitive endpoints

## 🎨 UI/UX Features

- **Modern Material Design** with consistent theming
- **Responsive Layout** for all screen sizes
- **Dark/Light Mode** support
- **Interactive Charts** with hover effects
- **Loading States** and error handling
- **Toast Notifications** for user feedback
- **Keyboard Navigation** accessibility
- **Mobile-First** responsive design

## 📱 Mobile Responsiveness

The admin panel is fully responsive and works seamlessly on:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (320px - 767px)

## 🚀 Deployment

### Production Build

**Frontend:**
```bash
npm run build
```

**Backend:**
```bash
# Set DEBUG=False in production
# Configure production database
# Set up static file serving
# Configure HTTPS
```

### Environment Variables (Production)

```env
# Backend
SECRET_KEY=your-production-secret-key
DEBUG=False
FIREBASE_CREDENTIALS_PATH=/path/to/production/credentials.json
FIREBASE_DATABASE_URL=https://your-project.firebaseio.com

# Frontend
REACT_APP_API_URL=https://your-api-domain.com/api
```

## 🧪 Testing

### Frontend Testing
```bash
npm test
```

### Backend Testing
```bash
python3 manage.py test
```

## 📊 Performance

- **React Query** for efficient data caching
- **Lazy Loading** for route-based code splitting
- **Optimized Bundle Size** with tree shaking
- **Image Optimization** for faster loading
- **API Response Caching** on backend
- **Database Query Optimization**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the `/docs` folder
- Review the API documentation

## 🔮 Future Enhancements

- [ ] Real-time notifications with WebSocket
- [ ] Advanced analytics with machine learning insights
- [ ] Multi-language support (i18n)
- [ ] Advanced user segmentation
- [ ] A/B testing framework
- [ ] Enhanced security with 2FA
- [ ] Mobile app version
- [ ] Advanced reporting and exports

---

Built with ❤️ for fashion enthusiasts and administrators.