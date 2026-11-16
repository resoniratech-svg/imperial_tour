import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CustomerLayout } from './layouts/CustomerLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { ProtectedRoute } from './routes/ProtectedRoute';

// Customer Pages
import { HomePage } from './pages/customer/HomePage';
import { AllToursPage } from './pages/customer/AllToursPage';
import { TourDetailPage } from './pages/customer/TourDetailPage';
import { BookingCheckoutPage } from './pages/customer/BookingCheckoutPage';
import { BookingConfirmationPage } from './pages/customer/BookingConfirmationPage';
import { AboutUsPage } from './pages/customer/AboutUsPage';
import { ContactUsPage } from './pages/customer/ContactUsPage';
import { FaqPage } from './pages/customer/FaqPage';
import { PrivacyPolicyPage } from './pages/customer/PrivacyPolicyPage';
import { TermsConditionsPage } from './pages/customer/TermsConditionsPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardOverview } from './pages/admin/AdminDashboardOverview';
import { AdminToursPage } from './pages/admin/AdminToursPage';
import { AdminCategoriesPage } from './pages/admin/AdminCategoriesPage';
import { AdminPricingPage } from './pages/admin/AdminPricingPage';
import { AdminBookingsPage } from './pages/admin/AdminBookingsPage';
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage';
import { AdminAddonsPage } from './pages/admin/AdminAddonsPage';
import { AdminGalleryPage } from './pages/admin/AdminGalleryPage';
import { AdminReviewsPage } from './pages/admin/AdminReviewsPage';
import { AdminMessagesPage } from './pages/admin/AdminMessagesPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminProfilePage } from './pages/admin/AdminProfilePage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Public Portal */}
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/tours" element={<AllToursPage />} />
          <Route path="/tours/category/:categorySlug" element={<AllToursPage />} />
          <Route path="/tours/:slug" element={<TourDetailPage />} />
          <Route path="/booking/:slug" element={<BookingCheckoutPage />} />
          <Route path="/booking-confirmation/:ref" element={<BookingConfirmationPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/faqs" element={<FaqPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-conditions" element={<TermsConditionsPage />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected Admin Portal */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardOverview />} />
            <Route path="tours" element={<AdminToursPage />} />
            <Route path="tours/new" element={<AdminToursPage />} />
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="pricing" element={<AdminPricingPage />} />
            <Route path="bookings" element={<AdminBookingsPage />} />
            <Route path="customers" element={<AdminCustomersPage />} />
            <Route path="addons" element={<AdminAddonsPage />} />
            <Route path="gallery" element={<AdminGalleryPage />} />
            <Route path="reviews" element={<AdminReviewsPage />} />
            <Route path="messages" element={<AdminMessagesPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="reports" element={<AdminReportsPage />} />
            <Route path="profile" element={<AdminProfilePage />} />
          </Route>
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
