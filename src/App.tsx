import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NavBar } from './components/NavBar';

/**
 * You can check it if you run the app, and you go to inspect
 * the page in the Network tab and filter it by JS files,
 * you will see how all the pages are loaded, Login.tsx, Profile.tsx, About.tsx, etc.
 */
// import { About, Contact, FAQs, Profile, Login } from './pages';

/**
 * Applying code splitting. by comment import above and uncomment import with lazy function below and change withLazy to true.
 */
const Profile = lazy(() => import('./pages/Profile'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQs = lazy(() => import('./pages/FAQs'));
const Login = lazy(() => import('./pages/Login'));

const withLazy = true; // change this line to see difference

/**
  By using lazyload you will see that not all of them are loaded,
  only the Profile.tsx because it is the page you are currently viewing.
  If you start moving between pages with the Navbar, 
  you will see how they are loaded every page you visit, 
  so they are only loaded until you need them.
  And they are loaded only once, if you navigate again, they will be available.
 */

const isAuthenticated = true;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <Route path="/*" element={<PrivateRoutes />} />
        ) : (
          <Route path="/*" element={<PublicRoutes />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export const PrivateRoutes = () => {
  return (
    <>
      <NavBar />
      <Routes>
        {withLazy ? (
          <>
            <Route
              path="profile"
              element={
                <Suspense fallback={<>loading...</>}>
                  <Profile />
                </Suspense>
              }
            />
            <Route
              path="about"
              element={
                <Suspense fallback={<>loading...</>}>
                  <About />
                </Suspense>
              }
            />
            <Route
              path="contact"
              element={
                <Suspense fallback={<>loading...</>}>
                  <Contact />
                </Suspense>
              }
            />
            <Route
              path="faqs"
              element={
                <Suspense fallback={<>loading...</>}>
                  <FAQs />
                </Suspense>
              }
            />
          </>
        ) : (
          <>
            <Route path="profile" element={<Profile />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="faqs" element={<FAQs />} />
          </>
        )}

        <Route path="/*" element={<Navigate to="/profile" replace />} />
      </Routes>
    </>
  );
};

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route
        path="login"
        element={
          <Suspense fallback={<>...</>}>
            {' '}
            <Login />
          </Suspense>
        }
      />

      <Route path="/*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
