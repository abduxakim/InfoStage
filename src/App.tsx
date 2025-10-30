//TODO вынести роуты в отдельный файл пример src/routes/index.tsx

import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import HomePage from './components/HomePage';
import AllCategoriesPage from './components/AllCategoriesPage';
import CategoryPage from './components/CategoryPage';
import EventListingPage from './components/EventListingPage';
import EventDetailsPage from './components/EventDetailsPage';
import UserProfile from './components/UserProfile';
import AdminDashboard from './components/admin/AdminDashboard';
import ManageEvents from './components/admin/ManageEvents';
import ManageCategories from './components/admin/ManageCategories';
import ManageComments from './components/admin/ManageComments';
import AdminSettings from './components/admin/AdminSettings';

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* User-facing routes */}
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/categories"
          element={
            <Layout>
              <AllCategoriesPage />
            </Layout>
          }
        />
        <Route
          path="/category/:categoryId"
          element={
            <Layout>
              <CategoryPage />
            </Layout>
          }
        />
        <Route
          path="/events"
          element={
            <Layout>
              <EventListingPage />
            </Layout>
          }
        />
        <Route
          path="/events/:eventId"
          element={
            <Layout>
              <EventDetailsPage />
            </Layout>
          }
        />
        <Route
          path="/trending"
          element={
            <Layout>
              <EventListingPage />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <EventListingPage />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <UserProfile />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl mb-6">About InfoStage</h1>
                <div className="prose max-w-none">
                  <p className="text-lg text-slate-600">
                    InfoStage is your premier destination for discovering and exploring events worldwide.
                    We connect event organizers with audiences, making it easy to find and attend the
                    experiences that matter most to you.
                  </p>
                </div>
              </div>
            </Layout>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/events"
          element={
            <AdminLayout>
              <ManageEvents />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <AdminLayout>
              <ManageCategories />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/comments"
          element={
            <AdminLayout>
              <ManageComments />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminLayout>
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl mb-2">Manage Users</h1>
                  <p className="text-slate-600">View and manage platform users</p>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
                  <p className="text-slate-600">User management interface coming soon</p>
                </div>
              </div>
            </AdminLayout>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <AdminLayout>
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl mb-2">Reports</h1>
                  <p className="text-slate-600">View activity logs and analytics</p>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
                  <p className="text-slate-600">Reports and analytics coming soon</p>
                </div>
              </div>
            </AdminLayout>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminLayout>
              <AdminSettings />
            </AdminLayout>
          }
        />

        {/* Catch-all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-right" />
    </HashRouter>
  );
}

export default App;
