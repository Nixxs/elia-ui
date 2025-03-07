import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout />,
    children: [
      {path:"/",element:<Main />},
      {path:"/login",element:<Login />},
      {path:"/signup",element:<Signup />}
    ]
  }
]);

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  )
}

export default App
