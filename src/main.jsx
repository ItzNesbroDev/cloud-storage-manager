import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import SubDir from "./components/subDir.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:remote_name/:file_name",
    element: <SubDir />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <div>
    <RouterProvider router={router} />
  </div>
);
