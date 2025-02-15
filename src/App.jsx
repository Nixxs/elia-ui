import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout";

const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout />,
    children: [
      {path:"/",element:<p>root</p>},
      {path:"/login",element:<h1>login</h1>},
      {path:"/signup",element:<h1>signup</h1>}
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
