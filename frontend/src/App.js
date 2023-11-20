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

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    // {
    //   path: "/test",
    //   element: <Test />,
    // },
    {
      path: "/navtest",
      element: <Navbartest />,
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
      path: "/esewa-success",
      element: <Success />,
    },
    {
      path: "/esewa-failed",
      element: <Failed />,
    },
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
