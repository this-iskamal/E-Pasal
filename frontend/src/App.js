import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Homepage from "./components/Pages/Homepage";
import Retialerreg from "./components/Registration/Retialerreg";
// import Test from "./components/Testing/Test";
import Navbartest from "./components/Navbar/Navbartest";
import Register from "./components/Registration/Register";
import Login from "./components/Registration/Login";
import Registration from "./components/Registration/Registraion";
import Confirmation from "./components/Registration/Confirmation";
import Seller from "./components/Seller/Seller";
import SingleProduct from "./components/Products/SingleProduct";
import Success from "./components/Esewa/Success";
import Failed from "./components/Esewa/Failed";
import SellerRegistration from "./components/SellerRegistration/SellerRegistration";
import Cartitems from "./components/CartItems/Cartitems";
import PurchaseHistory from "./components/PurcharseHistory/PurchaseHistory";
import SecondHand from "./components/SecondHandProduct/SecondHand";
// import ProductAddToCart from "./components/Products/ProductAddToCart";
import AllNewArrivals from "./components/Products/AllNewArrivals";
import Freedelivery from "./components/Cotegoriespages/Freedelivery";
import Newarrival from "./components/Cotegoriespages/Newarrival";
import Beauty from "./components/Cotegoriespages/Beauty";
import Electronics from "./components/Cotegoriespages/Electronics";
import Discount from "./components/Cotegoriespages/Discount";
import Proudlynepali from "./components/Cotegoriespages/Proudlynepali";
import Fashion from "./components/Cotegoriespages/Fashion";
import Home from "./components/Cotegoriespages/Home";
import SearchProducts from "./components/Products/SearchProducts";
import SuperUserLogin from "./components/Pages/SuperUserLogin";
import SuperUser from "./components/Pages/SuperUser";
import SingleSecondProduct from "./components/SecondHandProduct/SingleSecondProduct";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/second-hand-product/:id",
      element: <SingleSecondProduct />,
    },
    {
      path: "/superuserlogin",
      element: <SuperUserLogin />,
    },
    {
      path: "/superuser",
      element: <SuperUser />,
    },
    {
      path: "search/:q",
      element: <SearchProducts />,
    },
    {
      path: "/freedelivery",
      element: <Freedelivery />,
    },
    {
      path: "/newarrival",
      element: <Newarrival />,
    },
    {
      path: "/beauty",
      element: <Beauty />,
    },
    {
      path: "/electronics",
      element: <Electronics />,
    },
    {
      path: "/discount",
      element: <Discount />,
    },
    {
      path: "/proudllynepali",
      element: <Proudlynepali />,
    },
    {
      path: "/fashion",
      element: <Fashion />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    
    {
      path: "/all-new-arrivals",
      element: <AllNewArrivals />,
    },
    {
      path: "/secondhandproducts",
      element: <SecondHand />,
    },
    
    {
      path: "/purchase-history",
      element: <PurchaseHistory />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/registration",
      element: <Registration />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/products/:product_name/:id",
      element: <SingleProduct />,
    },
    {
      path: "/register-as-retailer",
      element: <Retialerreg />,
    },
    {
      path: "/confirmation",
      element: <Confirmation />,
    },
    {
      path: "/seller/dashboard",
      element: <Seller />,
    },
    {
      path: "/esewa-success/:q",
      element: <Success />,
    },
    {
      path: "/esewa-failed",
      element: <Failed />,
    },
    {
      path: "/cart-items",
      element: <Cartitems />,
    },
    // {
    //   path: "/productview-test",
    //   element: <ProductAddToCart />,
    // },
    {
      path: "/seller-registration",
      element: <SellerRegistration/>,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
