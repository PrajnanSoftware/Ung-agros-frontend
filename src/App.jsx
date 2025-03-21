import { lazy, Suspense, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import AboutPage from "./pages/AboutPage";
import ContactUsPage from "./pages/ContactUsPage";
import NotFoundComponent from "./components/NotFoundComponent";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductSearchPage from "./pages/ProductSearchPage";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailsPage from "./pages/OrderDetialsPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CartPage from "./pages/CartPage";
import { useDispatch, useSelector } from "react-redux";
import { initializeAuth } from "./redux/slice/userSlice";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentFailurePage from "./pages/PaymentFailurePage";
import ProfilePage from "./pages/ProfilePage";
import AddressPage from "./pages/AddressPage";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import ScrollToTop from "./components/ScrollToTop";

import DashboardLayout from './layout/DashboardLayout';
import './styles/base.scss';
import './styles/variables.scss';
import Dashboard from './pages/Dashboard/Dashboard';
import CategoriesManagement from './pages/Categories/CategoriesManagement';
import OrderManagement from './pages/OrderManagement/OrderManagement';
import ProductManagement from './pages/ProductManagement/ProductManagement';
import SalesAnalytics from './pages/SalesAnalytics/SalesAnalytics';
import InventoryManagement from './pages/InventoryManagement/InventoryManagement';
import UserManagement from './pages/UserManagement/UserManagement';
import AuthGuard from './components/AuthGuard/AuthGuard';
import ProtectedRoute from "./components/ProtectedRoute";
import UnauthorizedPage from "./pages/UnauthorizedPage";



const LandingHome = lazy(() => import("./pages/LandingHomePage"));

// NOTE: Only use defined colors in tailwind.confog.js file
function App() {
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated, success, user } = useSelector((state) => state.user);

  useEffect(() => {
    const initialize = async () => {
      try {
        await dispatch(initializeAuth()).unwrap();
      } catch (error) {
        console.error("Auth initialization failed:", error);
      }
    };
  
    initialize();  
  }, [dispatch])

  // if (loading) {
  //   return (<div className="min-h-[calc(100vh-100px)] w-full flex justify-center items-center">
  //             <div className="flex justify-center items-center min-h-screen">
  //               <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
  //             </div>
  //           </div>)
  // }

  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-[calc(100vh-100px)] w-full flex justify-center items-center">
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>}>
{/* Generic and customer headers */}
      {/* <HeaderComponent /> */}
      {(!isAuthenticated || user?.role !== "admin") && <HeaderComponent />}
        <Routes>
{/* Generic routes */}
          <Route path="/" element={<LandingHome />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/signup" element={<SignUpPage />}/>
          <Route path="/search-result" element={<ProductSearchPage />}/>
          <Route path="/verify-otp" element={<VerifyOtpPage />}/>
          <Route path="/search-result/:category" element={<ProductSearchPage />}/>
          <Route path="/product/:id/:category" element={<ProductDetailsPage />}/>
          <Route path="/contact-us" element={<ContactUsPage />}/>
          <Route path="/about-us" element={<AboutPage />}/>
          <Route path="/unauthorized" element={<UnauthorizedPage />}/>


{/* Customer Only Routes */}
        <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
          <Route path="/my-orders" element={<OrdersPage />}/>
          <Route path="/order-details" element={<OrderDetailsPage />}/>
          <Route path="/profile" element={<ProfilePage />}/>
          <Route path="/address" element={<AddressPage />}/>
          <Route path="/cart" element={<CartPage />}/>
          <Route path="/checkout" element={<CheckoutPage />}/>
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/payment-failure" element={<PaymentFailurePage />}/>
        </Route>

{/* Admin only routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/dashboard" element={<AuthGuard> <DashboardLayout /> </AuthGuard>}>
            <Route path="" element={<Dashboard />} />
            <Route path="overview" element={<Dashboard />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="categories" element={<CategoriesManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="sales" element={<SalesAnalytics />} />
            <Route path="inventory" element={<InventoryManagement />} />
            <Route path="users" element={<UserManagement />} />
          </Route>
        </Route>
          
          <Route path="*" element={<NotFoundComponent/>}/>
        </Routes>
        
        {(!isAuthenticated || user?.role !== "admin") && <FooterComponent />}
      </Suspense>
    </Router>
  )
}

export default App
