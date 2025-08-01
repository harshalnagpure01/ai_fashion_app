# Fashion Admin Dashboard

A comprehensive admin dashboard built with React.js using Vite, following the MVC architecture pattern. This dashboard provides complete management capabilities for a fashion community platform.

## 🚀 Features

### 4.1 User Management
- **List of all registered users** with detailed information
- **View activity** including uploads, polls, and voting history
- **Deactivate or delete user accounts** with confirmation dialogs
- User search and filtering capabilities
- Bulk user operations
- User statistics and analytics

### 4.2 Content Moderation
- **Review and remove offensive content** (polls/comments)
- Content approval/rejection workflows
- Flagged content management
- Content search and filtering
- Bulk content moderation actions
- Content statistics and trends

### 4.3 Statistical Count for Decision Making
- **User activity trends** (daily/weekly logins)
- **Closet uploads per user** analytics
- **Voting and engagement metrics** with detailed breakdowns
- **Total revenue tracking** with growth indicators
- **Subscription-based earnings** analysis
- **Ad revenue tracking** and reporting
- Interactive charts and data visualization

### 4.4 Subscription Management
- **Admin account configuration** with secure settings
- **Add/Edit subscription fees** for monthly and annual plans
- **Date-wise filters** for subscription analysis
- **Subscription earnings breakdown** with detailed list views
- Revenue forecasting and analytics
- Subscription lifecycle management

## 🏗️ Architecture

This project follows the **MVC (Model-View-Controller)** architecture pattern:

```
admin-dashboard/
├── src/
│   ├── models/                 # Data layer
│   │   ├── UserModel.js        # User data operations
│   │   ├── ContentModel.js     # Content data operations
│   │   ├── StatsModel.js       # Statistics data operations
│   │   └── SubscriptionModel.js # Subscription data operations
│   ├── controllers/            # Business logic layer
│   │   ├── UserController.js   # User business logic
│   │   ├── ContentController.js # Content business logic
│   │   ├── StatsController.js  # Statistics business logic
│   │   └── SubscriptionController.js # Subscription business logic
│   ├── views/                  # Presentation layer
│   │   ├── components/         # React components
│   │   │   ├── Navbar.jsx      # Navigation component
│   │   │   ├── UserManagement.jsx # User management interface
│   │   │   ├── ContentModeration.jsx # Content moderation interface
│   │   │   ├── StatisticalCount.jsx # Analytics dashboard
│   │   │   └── SubscriptionManagement.jsx # Subscription management
│   │   └── App.jsx             # Main application component
│   ├── data/                   # Mock data
│   │   └── mockData.js         # JSON mock data for development
│   └── main.jsx                # Application entry point
├── public/
│   └── index.html              # HTML template
└── package.json                # Dependencies and scripts
```

## 🛠️ Technology Stack

- **Frontend Framework**: React.js (with Vite)
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Package Manager**: npm

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd admin-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📊 Mock Data

The application comes with comprehensive mock data that simulates a real fashion platform:

- **Users**: 5 sample users with different statuses and activity levels
- **Content**: Sample polls and comments with various moderation states
- **Statistics**: Realistic engagement and revenue data
- **Subscriptions**: Sample subscription plans and earnings data

## 🔧 API Integration Ready

The application is structured to easily integrate with real APIs:

1. **Replace mock data** in `src/data/mockData.js` with API calls
2. **Update models** to use actual endpoints instead of mock data
3. **Add authentication** and error handling as needed
4. **Configure environment variables** for API endpoints

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern Interface**: Clean, professional design with intuitive navigation
- **Interactive Elements**: Hover effects, loading states, and smooth transitions
- **Accessibility**: ARIA labels, keyboard navigation, and color contrast compliance
- **Data Visualization**: Charts, progress bars, and statistical displays

## 📱 Mobile Responsive

The dashboard is fully responsive with:
- Collapsible sidebar for mobile devices
- Touch-friendly interactive elements
- Optimized layouts for different screen sizes
- Mobile-first design approach

## 🔐 Security Considerations

- Input validation and sanitization
- Confirmation dialogs for destructive actions
- Role-based access patterns (ready for implementation)
- Secure data handling practices

## 🚀 Future API Integration

To connect with a real backend:

1. **Update Models**: Replace mock data calls with actual API endpoints
2. **Add Authentication**: Implement login/logout functionality
3. **Error Handling**: Add comprehensive error handling and user feedback
4. **Real-time Updates**: Consider WebSocket integration for live data
5. **Caching**: Implement data caching for better performance

## 📈 Performance Optimizations

- **Code Splitting**: Routes are loaded dynamically
- **Optimized Images**: Responsive image loading
- **Efficient Rendering**: React best practices implemented
- **Bundle Optimization**: Vite's built-in optimizations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the documentation
- Review the code comments
- Create an issue in the repository

---

**Built with ❤️ for the Fashion Community Platform**
