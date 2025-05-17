import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import BooksLibrary from './pages/BooksLibrary';
import AudioLibrary from './pages/AudioLibrary';
import VideoLibrary from './pages/VideoLibrary';
import Settings from './pages/Settings';
import UserManagement from './pages/UserManagement';
import Browse from './pages/Browse';
import Login from './pages/Login';
import './styles/index.css';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Browse />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/books/*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <BooksLibrary />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/audio/*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <AudioLibrary />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/video/*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <VideoLibrary />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Settings />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <Layout>
                    <UserManagement />
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;