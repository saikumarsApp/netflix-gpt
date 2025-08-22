import Login from "./Login";
import Browse from "./Browse";
import MovieDetails from "./MovieDetails";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/movie/:id",
      element: <MovieDetails />,
    },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default Body;
