import { lazy, Suspense, useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeAuth } from "./redux/slice/userSlice";
import ScrollToTop from "./components/ScrollToTop";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";

const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactUsPage = lazy(() => import("./pages/ContactUsPage"));
const NotFoundComponent = lazy(() => import("./components/NotFoundComponent"));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetailsPage"));
const ProductSearchPage = lazy(() => import("./pages/ProductSearchPage"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const OrderDetailsPage = lazy(() => import("./pages/OrderDetialsPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const PaymentSuccessPage = lazy(() => import("./pages/PaymentSuccessPage"));
const PaymentFailurePage = lazy(() => import("./pages/PaymentFailurePage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const AddressPage = lazy(() => import("./pages/AddressPage"));
const VerifyOtpPage = lazy(() => import("./pages/VerifyOtpPage"));
const DashboardLayout = lazy(() => import("./layout/DashboardLayout"));

import "./styles/base.scss";
import "./styles/variables.scss";
import PrivacyPage from "./pages/PrivacyPage";
import TermsAndConditionPage from "./pages/TermsAndConditionPage";

const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const CategoriesManagement = lazy(() => import("./pages/Categories/CategoriesManagement"));
const OrderManagement = lazy(() => import("./pages/OrderManagement/OrderManagement"));
const ProductManagement = lazy(() => import("./pages/ProductManagement/ProductManagement"));
const SalesAnalytics = lazy(() => import("./pages/SalesAnalytics/SalesAnalytics"));
const InventoryManagement = lazy(() => import("./pages/InventoryManagement/InventoryManagement"));
const UserManagement = lazy(() => import("./pages/UserManagement/UserManagement"));
const AuthGuard = lazy(() => import("./components/AuthGuard/AuthGuard"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const UnauthorizedPage = lazy(() => import("./pages/UnauthorizedPage"));
const NonAdminRoutes = lazy(() => import("./components/NonAdminRoutes"));



const LandingHome = lazy(() => import("./pages/LandingHomePage"));

// NOTE: Only use defined colors in tailwind.confog.js file
function App() {
  const dispatch = useDispatch();
  const { error, initializeAuthLoading, isAuthenticated, success, user } = useSelector((state) => state.user);

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

  if (initializeAuthLoading) {
    return (<div className="min-h-[calc(100vh-100px)] w-full flex justify-center items-center">
              <div className="flex justify-center items-center min-h-screen">
                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
    </div>)
  }

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
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="/terms-and-condition" element={<TermsAndConditionPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        <Route element={<NonAdminRoutes />}>
          <Route path="/" element={<LandingHome />}/>
          <Route path="/signup" element={<SignUpPage />}/>
          <Route path="/search-result" element={<ProductSearchPage />}/>
          <Route path="/verify-otp" element={<VerifyOtpPage />}/>
          <Route path="/search-result/:category" element={<ProductSearchPage />}/>
          <Route path="/product/:id/:category" element={<ProductDetailsPage />}/>
          <Route path="/contact-us" element={<ContactUsPage />}/>
          <Route path="/about-us" element={<AboutPage />}/>


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
        </Route>

        <Route path="/unauthorized" element={<UnauthorizedPage />}/>
{/* Admin only routes */}
          
        <Route path="*" element={<NotFoundComponent/>}/>
      </Routes>
        
        {(!isAuthenticated || user?.role !== "admin") && <FooterComponent />}
      </Suspense>
    </Router>
  )
}

export default App
