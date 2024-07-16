import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import GuestRoute from './GuestRoute'; // Import the GuestRoute
import './styles/App.css';
import './styles/Auth.css';

// Lazy load the pages
const Home = lazy(() => import('./pages/Home'));
const Manga = lazy(() => import('./pages/Manga'));
const Chapter = lazy(() => import('./pages/Chapter'));
const MangaListPage = lazy(() => import('./pages/MangaListPage'));
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <main>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/manga" element={<MangaListPage />} />
                <Route path="/manga/:id" element={<Manga />} />
                <Route
                  path="/manga/:mangaId/chapter/:chapterNumber"
                  element={
                    <ProtectedRoute>
                      <Chapter />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <GuestRoute>
                      <Login />
                    </GuestRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <GuestRoute>
                      <Register />
                    </GuestRoute>
                  }
                />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;