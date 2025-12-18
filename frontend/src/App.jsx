import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import ContactPage from "./components/ContactPage";
import Faculty from "./pages/Faculty";
import { ArrowUp } from "lucide-react";
import CourseDetailPageHome from "./pages/CourseDetailPageHome";
import CourseDetailPage from "./pages/CourseDetailPage";

// To protect the route 
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return Boolean(token);
  };
  if (!isAuthenticated()) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }
  return children;
};

const ScrollToTopOnRouteChange = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location]);

  return null;
};

const ScrollTopButton = ({ threshold = 200, showOnMount = false }) => {
  const [visible, setVisible] = useState(!!showOnMount);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button 
      onClick={scrollToTop} 
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl cursor-pointer transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-sky-300"
    >
      <ArrowUp className="w-6 h-6 text-sky-600 drop-shadow-sm" />
    </button>
  );
};

const App = () => {
  return (
    <>
      <ScrollToTopOnRouteChange />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<ProtectedRoute>
          <CourseDetailPageHome/>
        </ProtectedRoute>}/>
      


      <Route path="/courses/:id" element={<ProtectedRoute>
          <CourseDetailPage/>
        </ProtectedRoute>
      }/>
      </Routes>
      <ScrollTopButton threshold={250} />
    </>
  );
};

export default App;