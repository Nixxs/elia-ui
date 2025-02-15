import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

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
    <RouterProvider router={router} />
  )
}

export default App
