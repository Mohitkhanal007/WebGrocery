import React, { lazy, Suspense } from "react";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";

// Lazy Imports
const Home = lazy(() => import("./components/public/Home"));
const Login = lazy(() => import("./components/public/Login"));
const Register = lazy(() => import("./components/public/Register"));
const Layout = lazy(() => import("./components/private/Layout"));
const Checkout = lazy(() => import("./components/public/Checkout"));
const Faq = lazy(() => import("./components/public/Faq"));
const Terms = lazy(() => import("./components/public/Terms"));
const Privacy = lazy(() => import("./components/public/Privacy"));
const Aboutus = lazy(() => import("./components/public/Aboutus"));
const Contact = lazy(() => import("./components/public/Contact"));
const Review = lazy(() => import("./components/public/Review"));

const Favorite = lazy(() => import("./components/public/Favorite"));
const Myprofile = lazy(() => import("./components/public/Myprofile"));
const Mybooking = lazy(() => import("./components/public/Mybooking"));
const EditProfile = lazy(() => import("./components/public/Editprofile"));
const ProductDetail = lazy(() => import("./components/public/ProductDetail"));
const Products = lazy(() => import("./components/public/Products"));
const CartPage = lazy(() => import("./components/common/customer/CartPage"));

const Dashboard = lazy(() => import("./components/private/dashboard/Dashboard"));
const AddProduct = lazy(() => import("./components/private/products/AddProduct"));
const ManageProducts = lazy(() => import("./components/private/products/ManageProducts"));
const PendingOrders = lazy(() => import("./components/private/orders/PendingOrders"));
const ConfirmedOrders = lazy(() => import("./components/private/orders/ConfirmedOrders"));
const Payments = lazy(() => import("./components/private/payments/Payments"));
const Customers = lazy(() => import("./components/private/users/Users"));
const CustomerReviews = lazy(() => import("./components/private/reviews/Reviews"));
const Profile = lazy(() => import("./components/private/profile/profile"));
const Settings = lazy(() => import("./components/private/setting/settings"));

function App() {
  const router = createBrowserRouter([
    // Public routes that are always available
    {
      path: "/",
      element: <Suspense><Home /></Suspense>,
    },
    {
      path: "/login",
      element: <Suspense><Login /></Suspense>,
    },
    {
      path: "/register",
      element: <Suspense><Register /></Suspense>,
    },
    {
      path: "/checkout/:id",
      element: <Suspense><Checkout /></Suspense>,
    },
    {
      path: "/faq",
      element: <Suspense><Faq /></Suspense>,
    },
    {
      path: "/terms",
      element: <Suspense><Terms /></Suspense>,
    },
    {
      path: "/privacy",
      element: <Suspense><Privacy /></Suspense>,
    },
    {
      path: "/aboutus",
      element: <Suspense><Aboutus /></Suspense>,
    },
    {
      path: "/contact",
      element: <Suspense><Contact /></Suspense>,
    },
    {
      path: "/review",
      element: <Suspense><Review /></Suspense>,
    },
    {
      path: "/favorite",
      element: <Suspense><Favorite /></Suspense>,
    },
    {
      path: "/myprofile",
      element: <Suspense><Myprofile /></Suspense>,
    },
    {
      path: "/mybooking",
      element: <Suspense><Mybooking /></Suspense>,
    },
    {
      path: "/editprofile",
      element: <Suspense><EditProfile /></Suspense>,
    },
    {
      path: "/products",
      element: <Suspense><Products /></Suspense>,
    },
    {
      path: "/products/:id",
      element: <Suspense><ProductDetail /></Suspense>,
    },
    {
      path: "/cart",
      element: <Suspense><CartPage /></Suspense>,
    },

    // Admin routes wrapped in a layout
    {
      path: "/admin",
      element: <Suspense><Layout /></Suspense>, // This layout can handle auth checks
      children: [
        { path: "dashboard", element: <Suspense><Dashboard /></Suspense> },
        { path: "addproducts", element: <Suspense><AddProduct /></Suspense> },
        { path: "manageproducts", element: <Suspense><ManageProducts /></Suspense> },
        { path: "pending", element: <Suspense><PendingOrders /></Suspense> },
        { path: "confirmed", element: <Suspense><ConfirmedOrders /></Suspense> },
        { path: "payments", element: <Suspense><Payments /></Suspense> },
        { path: "customers", element: <Suspense><Customers /></Suspense> },
        { path: "reviews", element: <Suspense><CustomerReviews /></Suspense> },
        { path: "profile", element: <Suspense><Profile /></Suspense> },
        { path: "settings", element: <Suspense><Settings /></Suspense> },
      ],
    },

    // Catch-all 404 page
    { path: "*", element: <div>404: Page Not Found</div> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
