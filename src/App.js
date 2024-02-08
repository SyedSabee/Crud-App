import AddCategory from "./Components/AddCategory";
import Category from "./Components/Category";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./Components/RootLayout";
import Detail from "./Components/Detail";
import Update from "./Components/Update";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { path: "", element: <Category /> },
      { path: "category", element: <Category /> },
      { path: "add-category", element: <AddCategory /> },
      { path: "detail/:id", element: <Detail /> },
      { path: "edit/:id", element: <Update /> },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
