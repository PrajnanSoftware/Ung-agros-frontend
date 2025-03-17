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
import { useDispatch } from "react-redux";
import { initializeAuth } from "./redux/slice/userSlice";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentFailurePage from "./pages/PaymentFailurePage";
import ProfilePage from "./pages/ProfilePage";
import AddressPage from "./pages/AddressPage";
import VerifyOtpPage from "./pages/verifyOtpPage";




const LandingHome = lazy(() => import("./pages/LandingHomePage"));

// NOTE: Only use defined colors in tailwind.confog.js file
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch])

  return (
    <Router>
      <Suspense fallback={<div className="min-h-[calc(100vh-100px)] w-full flex justify-center items-center">
        <h1 className="font-semibold text-2xl">Loading...</h1>
      </div>}>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<LandingHome />}/>
          <Route path="/my-orders" element={<OrdersPage />}/>
          <Route path="/order-details" element={<OrderDetailsPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/signup" element={<SignUpPage />}/>
          <Route path="/verify-otp" element={<VerifyOtpPage />}/>
          <Route path="/profile" element={<ProfilePage />}/>
          <Route path="/address" element={<AddressPage />}/>
          <Route path="/search-result" element={<ProductSearchPage />}/>
          <Route path="/search-result/:category" element={<ProductSearchPage />}/>
          <Route path="/product/:id/:category" element={<ProductDetailsPage />}/>
          <Route path="/cart" element={<CartPage />}/>
          <Route path="/contact-us" element={<ContactUsPage />}/>
          <Route path="/about-us" element={<AboutPage />}/>
          <Route path="/checkout" element={<CheckoutPage />}/>
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/payment-failure" element={<PaymentFailurePage />}/>
          <Route path="*" element={<NotFoundComponent/>}/>
        </Routes>
        <FooterComponent />
      </Suspense>
    </Router>
  )
}

export default App
