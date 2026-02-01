# Proclean - Cleaning Service Booking System

Proclean is a modern, full-stack web application designed to streamline the process of booking professional cleaning services.

## Project Structure

The project is organized into a modular directory structure for clear separation of concerns:

```text
cleaning-service-booking/
├── public/              # Static assets (logos, icons)
├── src/
│   ├── components/      # Reusable UI components (Navbar, Button, Card, etc.)
│   ├── context/         # React Context for global state management (Auth)
│   ├── pages/           # High-level page components
│   │   ├── bookings/    # Booking-related views (My Bookings, Management)
│   │   └── services/    # Service-related views (Detail, Create, Edit)
│   ├── routes/          # Application routing configuration
│   ├── service/         # API integration layer and business logic
│   ├── types.ts         # TypeScript interface definitions
│   └── main.tsx         # Application entry point
├── .env                 # Environment variables (API URLs)
├── package.json         # Project dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Steps to Run
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ntkfxy/Proclean.git
   cd Proclean
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your backend API URL:
   ```env
   VITE_BASE_URL=http://localhost:5000/api/v1
   VITE_AUTH_API=/user
   VITE_SERVICE_API=/services
   VITE_BOOKING_API=/bookings
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

## How to Use

### For Customers
1. **Register/Login:** Create an account to access booking features.
2. **Browse Services:** View available cleaning services on the Home page.
3. **View Details:** Click on a service to see full descriptions and pricing.
4. **Book a Service:** Fill out the booking form with your preferred date, time, and address.
5. **My Bookings:** Track the status of your current and past cleanings.

### For Administrators (Author Role)
1. **Manage Services:** Access the "Manage Services" menu to Add, Edit, or Delete service offerings.
2. **All Bookings:** Monitor all incoming bookings and update their status (e.g., Pending to Completed).

## Component Architecture

The frontend is built using React and TypeScript, following a modular component-based architecture designed for scalability and reusability.

### 1. Global Components
- **Navbar**: Responsive navigation bar with integrated authentication state and role-based conditional rendering (User vs. Author).
- **Footer**: Standard footer with essential links and site branding.
- **MainLayout**: A wrapper component that maintains the consistent layout across all routes.

### 2. Shared UI Components (Atomic)
- **Button**: Standardized button component supporting multiple styles (Primary, Outline, Danger, Ghost) and states (Loading, Disabled).
- **Card**: Flexible container component used to present information and forms with a unified shadow and border style.

### 3. Feature-Specific Components
- **ServiceCard**: Specialized component for displaying cleaning service summaries on the landing page.
- **BookingForm**: Complex form component designed to capture scheduling details, address, and special instructions.
- **ProtectedRoute**: Higher-Order Component (HOC) used to guard routes based on login status and user permissions.

### 4. Page Structure
The application logic is organized into three primary modules:
- **Core Pages**: `Home`, `Login`, `Register`.
- **Service Management**:
  - `ManageServices`: Admin view for listing all available services.
  - `CreateService` / `EditService`: Forms for adding or modifying service offerings.
  - `ServiceDetail`: Customer-facing view for deep-diving into service benefits.
- **Booking Management**:
  - `Booking`: The scheduling flow for customers.
  - `MyBookings`: Personal dashboard for users to track their service history.
  - `ManageAllBookings`: Administrative dashboard to monitor and update all scheduled cleanings.

---

## Technical Design
- **Styling**: Utility-first CSS using **Tailwind CSS** and **DaisyUI** components.
- **Icons**: Vector iconography powered by **Lucide React**.
- **State**: Centralized user authentication state using **React Context API**.
- **Communication**: Robust API interaction layer using **Axios** with request interceptors for JWT injection.
