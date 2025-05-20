import React from "react";
import PaymentFailure from "./components/PaymentStatus/PaymentFailure";
import PaymentStatus from "./components/PaymentStatus/PaymentStatus";
import PaymentSuccess from "./components/PaymentStatus/PaymentSuccess";
import AboutPage from "./pages/AboutPage";
import AfterCheckoutPage from "./pages/AfterCheckoutPage";
import CheckOutPage from "./pages/CheckOutPage";
import ContactPage from "./pages/ContactPage";
import ForgotPassword from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductFavoritePage from "./pages/ProductFavoritePage";
import ProductPage from "./pages/ProductPage";
import ProductSearchPage from "./pages/ProductSerachPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import ShopCategoryPage from "./pages/ShopCategoryPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
const routes = [
  {
    path: "/",
    exact: true,
    main: (match) => <HomePage match={match} />,
  },
  {
    path: "/payment-status",
    exact: true,
    main: (match) => <PaymentStatus match={match} />,
  },
  {
    path: "/payment-success",
    exact: true,
    main: (match) => <PaymentSuccess match={match} />,
  },
  {
    path: "/payment-failure",
    exact: true,
    main: (match) => <PaymentFailure match={match} />,
  },
  {
    path: "/products",
    exact: true,
    main: (match) => <ProductPage match={match} />,
  },
  {
    path: "/products/search",
    exact: true,
    main: (match) => <ProductSearchPage match={match} />,
  },
  {
    path: "/products/:id",
    exact: true,
    main: (match) => <ProductDetailPage match={match} />,
  },
  {
    path: "/orders/history/:id",
    exact: true,
    main: (match) => <OrderHistoryPage match={match} />,
  },
  {
    path: "/login-register",
    exact: false,
    main: (match) => <LoginRegisterPage match={match} />,
  },
  {
    path: "/register",
    exact: false,
    main: (match) => <RegisterPage match={match} />,
  },
  {
    path: "/forgot-password",
    exact: false,
    main: (match) => <ForgotPassword match={match} />,
  },
  {
    path: "/cart",
    exact: false,
    main: (match) => <ShoppingCartPage match={match} />,
  },
  {
    path: "/checkout",
    exact: false,
    main: (match) => <CheckOutPage match={match} />,
  },
  {
    path: "/after-checkout",
    exact: false,
    main: (match) => <AfterCheckoutPage match={match} />,
  },
  {
    path: "/categories/:id",
    exact: false,
    main: (match) => <ShopCategoryPage match={match} />,
  },
  {
    path: "/contact",
    exact: false,
    main: (match) => <ContactPage match={match} />,
  },
  {
    path: "/about",
    exact: false,
    main: (match) => <AboutPage match={match} />,
  },
  // {
  //   path: "/blogs",
  //   exact: false,
  //   main: (match) => <BlogPage match={match} />,
  // },
  // {
  //   path: "/sales",
  //   exact: false,
  //   main: (match) => <SalePage match={match} />,
  // },
  {
    path: "/profile",
    exact: false,
    main: (match) => <ProfilePage match={match} />,
  },
  {
    path: "/product-favorites",
    exact: false,
    main: (match) => <ProductFavoritePage match={match} />,
  },
  {
    path: "",
    exact: true,
    main: (match) => <NotFoundPage match={match} />,
  },
];

export default routes;
